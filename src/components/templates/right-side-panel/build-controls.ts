import type { Control } from './types';

/**
 * Conditional visibility for an argType. Two entry points:
 *   - `argType.if`      — Storybook's native single-condition predicate
 *                        (leaf shape only; Storybook rejects compound shapes
 *                        at preview boot time).
 *   - `argType.showIf`  — our extension, accepts the same leaf shape PLUS
 *                        `{ and: [...] }` / `{ or: [...] }` compounds. Use
 *                        this when a control needs to gate on more than one
 *                        arg (see the Article playground's cell pickers).
 * If both are set on the same argType, `showIf` wins.
 */
export type IfLeaf = {
  arg?: string;
  /** Reserved — Storybook supports `global:` too, but we don't use it yet. */
  global?: string;
  truthy?: boolean;
  exists?: boolean;
  eq?: unknown;
  neq?: unknown;
};
export type IfCondition = IfLeaf | { and: IfCondition[] } | { or: IfCondition[] };

function isAndNode(cond: IfCondition): cond is { and: IfCondition[] } {
  return Array.isArray((cond as { and?: unknown }).and);
}
function isOrNode(cond: IfCondition): cond is { or: IfCondition[] } {
  return Array.isArray((cond as { or?: unknown }).or);
}

/** Pure evaluator for the `if:` predicate against the current args snapshot.
 *  Returns `true` when the control should be visible. Missing predicate → visible. */
export function evaluateIf(
  cond: IfCondition | undefined,
  args: Record<string, unknown>,
): boolean {
  if (!cond) return true;
  if (isAndNode(cond)) return cond.and.every((child) => evaluateIf(child, args));
  if (isOrNode(cond)) return cond.or.some((child) => evaluateIf(child, args));

  // Leaf. `global:` is not wired up — treat as always-visible so we don't
  // silently hide controls that gate on globals we can't see.
  if (cond.global) return true;
  if (!cond.arg) return true;
  const value = args[cond.arg];

  if (cond.exists !== undefined) {
    const isDefined = value !== undefined && value !== null;
    if (cond.exists ? !isDefined : isDefined) return false;
  }
  if (cond.eq !== undefined && value !== cond.eq) return false;
  if (cond.neq !== undefined && value === cond.neq) return false;
  // `truthy` defaults to `true` per Storybook when only `arg` is given.
  const needsTruthCheck =
    cond.truthy !== undefined ||
    (cond.eq === undefined && cond.neq === undefined && cond.exists === undefined);
  if (needsTruthCheck) {
    const want = cond.truthy ?? true;
    if (Boolean(value) !== want) return false;
  }
  return true;
}

/** Subset of Storybook's `argType` shape that the mapper consumes — kept minimal
 *  so the helper works with both `Meta['argTypes']` (build-time, from .stories.tsx)
 *  and `api.getCurrentStoryData().argTypes` (runtime, in the manager bundle). */
export interface ArgTypeLike {
  name?: string;
  type?: { name?: string } | string;
  control?:
    | false
    | {
        type?: string;
        [k: string]: unknown;
      };
  options?: ReadonlyArray<string | number>;
  defaultValue?: unknown;
  table?: { disable?: boolean; [k: string]: unknown };
  /** Native Storybook predicate — leaf shape only. */
  if?: IfLeaf;
  /** Our compound-capable predicate — takes precedence over `if`. */
  showIf?: IfCondition;
}

export type ArgTypesLike = Record<string, ArgTypeLike>;

// React-internal props that leak into argTypes when a component extends
// HTMLAttributes<> / ButtonHTMLAttributes<> / etc. via TypeScript inference.
// They aren't design-configurable so we hide them from the controls panel.
// Story authors can still surface any of these by declaring an explicit
// argType — that path stays untouched.
const REACT_INTERNAL_PROP_KEYS = new Set([
  'className',
  'style',
  'id',
  'key',
  'ref',
  'tabIndex',
  'dir',
  'hidden',
  'title',
  'translate',
  'contentEditable',
  'contextMenu',
  'draggable',
  'spellCheck',
  'htmlFor',
]);

function isEventHandlerKey(key: string): boolean {
  // matches onClick, onKeyDown, onMouseEnter, onFocus, etc.
  return key.length > 2 && key.startsWith('on') && key[2] === key[2].toUpperCase();
}

function isReactInternalProp(key: string): boolean {
  if (REACT_INTERNAL_PROP_KEYS.has(key)) return true;
  if (isEventHandlerKey(key)) return true;
  if (key.startsWith('aria-') || key.startsWith('data-')) return true;
  return false;
}

/** Pure helper used by both Phase 1 stories (importing meta from a .stories.tsx
 *  file) and Phase 2 manager integration (`api.getCurrentStoryData().argTypes`).
 *
 *  Drops:
 *    - argTypes with `control: false` (explicitly disabled by author)
 *    - argTypes with `table.disable: true`
 *    - unsupported control types (color/date/file/object) — silently skipped
 *      per pilot spec.
 *
 *  Returns a stable-order array (Object.entries preserves insertion order). */
export function buildControlsFromArgTypes(
  argTypes: ArgTypesLike | undefined,
  args: Record<string, unknown> = {},
): Control[] {
  if (!argTypes) return [];
  const controls: Control[] = [];

  for (const [name, argType] of Object.entries(argTypes)) {
    if (!argType || argType.control === false) continue;
    if (argType.table?.disable === true) continue;
    // Skip React-internal props (className, style, event handlers, aria-*,
    // data-*) that leak via TypeScript inference. Note: Storybook auto-populates
    // `argType.name` with the key at runtime, so a story author cannot bypass
    // this via `name` alone — if they need to surface one of these props, they
    // must whitelist by using a different key (e.g. `htmlClassName`).
    if (isReactInternalProp(name)) continue;
    // Conditional visibility — evaluated against the current args snapshot.
    // `showIf` (our compound extension) wins over the native leaf-only `if`.
    // Missing predicate always resolves to visible.
    const predicate = argType.showIf ?? argType.if;
    if (!evaluateIf(predicate, args)) continue;

    const explicit =
      typeof argType.control === 'object' ? argType.control.type : undefined;
    const typeName =
      typeof argType.type === 'string' ? argType.type : argType.type?.name;
    const kind = explicit ?? typeName;

    const value = args[name];
    // Design-friendly override — `argType.name` in Storybook meta becomes the
    // visible label in the panel (falls back to the argType key at render time).
    const label = argType.name;

    if (kind === 'boolean') {
      controls.push({
        kind: 'toggle',
        name,
        label,
        value: typeof value === 'boolean' ? value : Boolean(argType.defaultValue),
      });
      continue;
    }

    if (
      kind === 'select' ||
      kind === 'radio' ||
      kind === 'inline-radio' ||
      kind === 'multi-select' ||
      kind === 'check'
    ) {
      const options = argType.options ?? [];
      controls.push({
        kind: 'select',
        name,
        label,
        value: (value as string | number | undefined) ??
          (typeof argType.defaultValue === 'string' ||
          typeof argType.defaultValue === 'number'
            ? (argType.defaultValue as string | number)
            : undefined),
        options,
      });
      continue;
    }

    if (kind === 'text' || kind === 'string' || kind === 'number') {
      const inputType: 'text' | 'number' = kind === 'number' ? 'number' : 'text';
      // Fallback chain for input value: story args → argType.defaultValue → ''.
      // Matches the pattern used for toggle/select above so text/number stories
      // that only set `defaultValue` (no `args`) don't show as empty/inactive.
      const fallback = argType.defaultValue;
      const resolvedValue =
        value != null
          ? String(value)
          : typeof fallback === 'string' || typeof fallback === 'number'
            ? String(fallback)
            : '';
      controls.push({
        kind: 'input',
        name,
        label,
        value: resolvedValue,
        inputType,
      });
      continue;
    }

    // Unsupported types (color, date, file, object, range, etc.) are skipped
    // silently per pilot scope.
  }

  return controls;
}

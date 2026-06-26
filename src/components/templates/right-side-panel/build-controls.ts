import type { Control } from './types';

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
}

export type ArgTypesLike = Record<string, ArgTypeLike>;

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

    const explicit =
      typeof argType.control === 'object' ? argType.control.type : undefined;
    const typeName =
      typeof argType.type === 'string' ? argType.type : argType.type?.name;
    const kind = explicit ?? typeName;

    const value = args[name];

    if (kind === 'boolean') {
      controls.push({
        kind: 'toggle',
        name,
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
      controls.push({
        kind: 'input',
        name,
        value: value == null ? '' : String(value),
        inputType,
      });
      continue;
    }

    // Unsupported types (color, date, file, object, range, etc.) are skipped
    // silently per pilot scope.
  }

  return controls;
}

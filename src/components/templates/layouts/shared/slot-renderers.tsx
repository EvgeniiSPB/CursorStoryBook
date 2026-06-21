import type { ReactNode } from 'react';
import { LayoutSwapPlaceholder, type LayoutSwapKind } from './LayoutSwapPlaceholder';

/** Storybook / constructor sentinel — slot shows swap placeholder. */
export const SWAP = 'swap';

export type LayoutSlotName = string;

export type LayoutSlotRendererMap = Record<string, () => ReactNode>;

/**
 * Returns slot content when `name !== SWAP`, otherwise `undefined` so the
 * parent shell renders its default swap bound.
 */
export function renderLayoutSlot(
  name: LayoutSlotName,
  renderers: LayoutSlotRendererMap,
): ReactNode | undefined {
  if (name === SWAP) {
    return undefined;
  }
  return renderers[name]?.();
}

/**
 * Always returns a node: swap placeholder or rendered content.
 * Use in Playground stories where the slot is not owned by a layout shell.
 */
export function resolveLayoutSlot(
  name: LayoutSlotName,
  kind: LayoutSwapKind,
  renderers: LayoutSlotRendererMap,
): ReactNode {
  if (name === SWAP) {
    return <LayoutSwapPlaceholder kind={kind} />;
  }
  return renderers[name]?.() ?? <LayoutSwapPlaceholder kind={kind} />;
}

/** Build select options for Storybook Controls: swap first, then whitelist. */
export function layoutSlotOptions(
  whitelist: readonly string[],
  includeSwap = true,
): readonly string[] {
  return includeSwap ? [SWAP, ...whitelist] : whitelist;
}

import type { LayoutGap, LayoutRows } from '../shared/types';

/** Figma `section` page frame (6113:2696). */
export const SECTION_FIGMA_NODE_ID = '6113:2696';

/** Vertical gap between `section` symbols on the Figma page artboard. */
export const SECTION_SHOWCASE_VARIANT_GAP_PX = 128;

/** Row gap (px) when `rows >= 2`, keyed by Figma `gap` property. */
export const SECTION_GAP_PX: Record<LayoutGap, number> = {
  '---': 0,
  tiny: 8,
  small: 12,
  medium: 16,
};

/** Figma `section` symbol node IDs keyed by `rows` + `gap`. */
export const SECTION_VARIANT_FIGMA_NODE_IDS: Record<
  `${LayoutRows}-${LayoutGap}`,
  string
> = {
  '1---': '6113:2695',
  '2---': '6113:2697',
  '3---': '6113:2706',
  '4---': '6113:2719',
  '5---': '6113:2736',
  '1-tiny': '6113:2822',
  '2-tiny': '6113:2824',
  '3-tiny': '6113:2827',
  '4-tiny': '6113:2831',
  '5-tiny': '6113:2836',
  '1-small': '6113:2887',
  '2-small': '6113:2889',
  '3-small': '6113:2892',
  '4-small': '6113:2896',
  '5-small': '6113:2901',
  '1-medium': '6113:2952',
  '2-medium': '6113:2954',
  '3-medium': '6113:2957',
  '4-medium': '6113:2961',
  '5-medium': '6113:2966',
};

export function sectionVariantKey(rows: LayoutRows, gap: LayoutGap): `${LayoutRows}-${LayoutGap}` {
  return `${rows}-${gap}`;
}

export function sectionFigmaNodeId(rows: LayoutRows, gap: LayoutGap): string {
  return (
    SECTION_VARIANT_FIGMA_NODE_IDS[sectionVariantKey(rows, gap)] ?? SECTION_FIGMA_NODE_ID
  );
}

export function sectionGapPx(rows: LayoutRows, gap: LayoutGap): number {
  if (rows < 2) {
    return 0;
  }
  return SECTION_GAP_PX[gap];
}

export const SECTION_ROW_SLOT_NAMES = ['row1', 'row2', 'row3', 'row4', 'row5'] as const;

export type SectionRowSlotName = (typeof SECTION_ROW_SLOT_NAMES)[number];

export type DividerVerticalType = 'thin';

export type DividerVerticalVariant = {
  type: DividerVerticalType;
};

/** Figma `divider - vertical` component set (225:35). */
export const DIVIDER_VERTICAL_FIGMA_NODE_ID = '225:35';
export const DIVIDER_VERTICAL_BOARD_WIDTH_PX = 256;

/** Figma `type=thin` bound height (225:34) */
export const DIVIDER_VERTICAL_THIN_HEIGHT_PX = 68;

export const DIVIDER_VERTICAL_PLAYGROUND_PADDING_PX = 128;

export const DIVIDER_VERTICAL_LARGEST_BOUND_HEIGHT_PX = DIVIDER_VERTICAL_THIN_HEIGHT_PX;

export const DIVIDER_VERTICAL_PLAYGROUND_SECTION_WIDTH_PX =
  DIVIDER_VERTICAL_LARGEST_BOUND_HEIGHT_PX + DIVIDER_VERTICAL_PLAYGROUND_PADDING_PX * 2;

/** Matches Figma board height (324px) when bound is vertical line */
export const DIVIDER_VERTICAL_PLAYGROUND_SECTION_HEIGHT_PX =
  DIVIDER_VERTICAL_PLAYGROUND_SECTION_WIDTH_PX;

export const DIVIDER_VERTICAL_VARIANTS: readonly DividerVerticalVariant[] = [
  { type: 'thin' },
];

export function dividerVerticalTypeToHeightPx(type: DividerVerticalType): number {
  if (type === 'thin') return DIVIDER_VERTICAL_THIN_HEIGHT_PX;
  return DIVIDER_VERTICAL_THIN_HEIGHT_PX;
}

export function dividerVerticalVariantKey(variant: DividerVerticalVariant): string {
  return variant.type;
}

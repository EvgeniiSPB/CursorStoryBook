export type DividerHorizontalType = 'thin';

export type DividerHorizontalVariant = {
  type: DividerHorizontalType;
};

/** Figma `divider - horizontal` component set (225:44). */
export const DIVIDER_HORIZONTAL_FIGMA_NODE_ID = '225:44';
export const DIVIDER_HORIZONTAL_BOARD_WIDTH_PX = 412;

/** Figma `type=thin` bound width (225:43) */
export const DIVIDER_HORIZONTAL_THIN_WIDTH_PX = 156;

export const DIVIDER_HORIZONTAL_PLAYGROUND_PADDING_PX = 128;

export const DIVIDER_HORIZONTAL_LARGEST_BOUND_WIDTH_PX = DIVIDER_HORIZONTAL_THIN_WIDTH_PX;

export const DIVIDER_HORIZONTAL_PLAYGROUND_SECTION_WIDTH_PX =
  DIVIDER_HORIZONTAL_LARGEST_BOUND_WIDTH_PX + DIVIDER_HORIZONTAL_PLAYGROUND_PADDING_PX * 2;

/** Matches Figma board height (256px) */
export const DIVIDER_HORIZONTAL_PLAYGROUND_SECTION_HEIGHT_PX =
  1 + DIVIDER_HORIZONTAL_PLAYGROUND_PADDING_PX * 2;

export const DIVIDER_HORIZONTAL_VARIANTS: readonly DividerHorizontalVariant[] = [
  { type: 'thin' },
];

export function dividerHorizontalTypeToWidthPx(type: DividerHorizontalType): number {
  if (type === 'thin') return DIVIDER_HORIZONTAL_THIN_WIDTH_PX;
  return DIVIDER_HORIZONTAL_THIN_WIDTH_PX;
}

export function dividerHorizontalVariantKey(variant: DividerHorizontalVariant): string {
  return variant.type;
}

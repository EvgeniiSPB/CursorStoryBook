export type TextDisplayTypography =
  | 'displayXS'
  | 'displayS'
  | 'displayM'
  | 'displayL'
  | 'displayXL';

export type TextDisplayFontWeight = 'regular' | 'medium';

/**
 * Figma `text - display` (85:530) — все размеры используют fontFamilies/display.
 * Mode в коллекции `03 - typography`: **Oceanic Text** (default).
 */
export const TEXT_DISPLAY_FIGMA_FONT_FAMILIES = {
  display: 'Oceanic Text',
} as const;

/** Slug для `data-font-mode` / toolbar Font */
export const TEXT_DISPLAY_FIGMA_FONT_MODE_SLUG = 'oceanic-text';

export type TextDisplayVariant = {
  typography: TextDisplayTypography;
  fontWeight: TextDisplayFontWeight;
  tPadding: boolean;
  bPadding: boolean;
};

/** Figma `text - display` variant order (node 85:530) */
export const TEXT_DISPLAY_VARIANTS: readonly TextDisplayVariant[] = [
  { typography: 'displayXS', fontWeight: 'regular', tPadding: false, bPadding: false },
  { typography: 'displayXS', fontWeight: 'medium', tPadding: false, bPadding: false },
  { typography: 'displayS', fontWeight: 'regular', tPadding: false, bPadding: false },
  { typography: 'displayS', fontWeight: 'medium', tPadding: false, bPadding: false },
  { typography: 'displayM', fontWeight: 'regular', tPadding: false, bPadding: false },
  { typography: 'displayM', fontWeight: 'medium', tPadding: false, bPadding: false },
  { typography: 'displayL', fontWeight: 'regular', tPadding: false, bPadding: false },
  { typography: 'displayL', fontWeight: 'medium', tPadding: false, bPadding: false },
  { typography: 'displayXL', fontWeight: 'regular', tPadding: false, bPadding: false },
  { typography: 'displayXL', fontWeight: 'medium', tPadding: false, bPadding: false },
  { typography: 'displayXS', fontWeight: 'regular', tPadding: true, bPadding: true },
  { typography: 'displayXS', fontWeight: 'medium', tPadding: true, bPadding: true },
  { typography: 'displayS', fontWeight: 'regular', tPadding: true, bPadding: true },
  { typography: 'displayS', fontWeight: 'medium', tPadding: true, bPadding: true },
  { typography: 'displayM', fontWeight: 'regular', tPadding: true, bPadding: true },
  { typography: 'displayM', fontWeight: 'medium', tPadding: true, bPadding: true },
  { typography: 'displayL', fontWeight: 'regular', tPadding: true, bPadding: true },
  { typography: 'displayL', fontWeight: 'medium', tPadding: true, bPadding: true },
  { typography: 'displayXL', fontWeight: 'regular', tPadding: true, bPadding: true },
  { typography: 'displayXL', fontWeight: 'medium', tPadding: true, bPadding: true },
  { typography: 'displayXS', fontWeight: 'regular', tPadding: false, bPadding: true },
  { typography: 'displayXS', fontWeight: 'medium', tPadding: false, bPadding: true },
  { typography: 'displayS', fontWeight: 'regular', tPadding: false, bPadding: true },
  { typography: 'displayS', fontWeight: 'medium', tPadding: false, bPadding: true },
  { typography: 'displayM', fontWeight: 'regular', tPadding: false, bPadding: true },
  { typography: 'displayM', fontWeight: 'medium', tPadding: false, bPadding: true },
  { typography: 'displayL', fontWeight: 'regular', tPadding: false, bPadding: true },
  { typography: 'displayL', fontWeight: 'medium', tPadding: false, bPadding: true },
  { typography: 'displayXL', fontWeight: 'regular', tPadding: false, bPadding: true },
  { typography: 'displayXL', fontWeight: 'medium', tPadding: false, bPadding: true },
];

const TYPOGRAPHY_TOKEN_SUFFIX: Record<TextDisplayTypography, string> = {
  displayXS: 'display-xs',
  displayS: 'display-s',
  displayM: 'display-m',
  displayL: 'display-l',
  displayXL: 'display-xl',
};

const B_PADDING_TOKEN_KEY: Record<TextDisplayTypography, string> = {
  displayXS: '500',
  displayS: '600',
  displayM: '700',
  displayL: '800',
  displayXL: '900',
};

const LINE_HEIGHT_FALLBACK: Record<TextDisplayTypography, number> = {
  displayXS: 40,
  displayS: 48,
  displayM: 52,
  displayL: 60,
  displayXL: 64,
};

const B_PADDING_FALLBACK: Record<TextDisplayTypography, number> = {
  displayXS: 20,
  displayS: 24,
  displayM: 28,
  displayL: 32,
  displayXL: 36,
};

export function textDisplayTypographyToClassSuffix(
  typography: TextDisplayTypography,
): string {
  return TYPOGRAPHY_TOKEN_SUFFIX[typography];
}

export function textDisplayLineHeightCssVar(
  typography: TextDisplayTypography,
): string {
  const suffix = TYPOGRAPHY_TOKEN_SUFFIX[typography];
  const px = LINE_HEIGHT_FALLBACK[typography];
  return `var(--line-heights-${suffix}, ${px})`;
}

export function textDisplayBPaddingCssVar(
  typography: TextDisplayTypography,
): string {
  const key = B_PADDING_TOKEN_KEY[typography];
  const px = B_PADDING_FALLBACK[typography];
  return `var(--spaces-static-${key}, ${px})`;
}

export function textDisplayVariantKey(variant: TextDisplayVariant): string {
  return `${variant.typography}-${variant.fontWeight}-t${variant.tPadding}-b${variant.bPadding}`;
}

/** Figma largest bound without extra padding (displayXL / medium): 225×64 */
export const TEXT_DISPLAY_LARGEST_BOUND_WIDTH_PX = 225;
export const TEXT_DISPLAY_LARGEST_BOUND_HEIGHT_PX = 64;

export const TEXT_DISPLAY_PLAYGROUND_PADDING_PX = 128;

export const TEXT_DISPLAY_PLAYGROUND_SECTION_WIDTH_PX =
  TEXT_DISPLAY_LARGEST_BOUND_WIDTH_PX + TEXT_DISPLAY_PLAYGROUND_PADDING_PX * 2;

export const TEXT_DISPLAY_PLAYGROUND_SECTION_HEIGHT_PX =
  TEXT_DISPLAY_LARGEST_BOUND_HEIGHT_PX + TEXT_DISPLAY_PLAYGROUND_PADDING_PX * 2;

/** Figma board frame width */
export const TEXT_DISPLAY_BOARD_WIDTH_PX = 353;

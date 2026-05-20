export type TextHeadlineTypography =
  | 'headlineXS'
  | 'headlineS'
  | 'headlineM'
  | 'headlineL'
  | 'headlineXL';

export type TextHeadlineFontWeight = 'regular' | 'medium';

/**
 * Figma `text - headline` (38:423) — все размеры используют fontFamilies/headline.
 * Mode в коллекции `03 - typography`: **Oceanic Text** (default).
 */
export const TEXT_HEADLINE_FIGMA_FONT_FAMILIES = {
  headline: 'Oceanic Text',
} as const;

/** Slug для `data-font-mode` / toolbar Font */
export const TEXT_HEADLINE_FIGMA_FONT_MODE_SLUG = 'oceanic-text';

export type TextHeadlineVariant = {
  typography: TextHeadlineTypography;
  fontWeight: TextHeadlineFontWeight;
  tPadding: boolean;
  bPadding: boolean;
};

/** Figma `text - headline` variant order (node 38:423) */
export const TEXT_HEADLINE_VARIANTS: readonly TextHeadlineVariant[] = [
  { typography: 'headlineXS', fontWeight: 'regular', tPadding: false, bPadding: false },
  { typography: 'headlineXS', fontWeight: 'medium', tPadding: false, bPadding: false },
  { typography: 'headlineS', fontWeight: 'regular', tPadding: false, bPadding: false },
  { typography: 'headlineS', fontWeight: 'medium', tPadding: false, bPadding: false },
  { typography: 'headlineM', fontWeight: 'regular', tPadding: false, bPadding: false },
  { typography: 'headlineM', fontWeight: 'medium', tPadding: false, bPadding: false },
  { typography: 'headlineL', fontWeight: 'regular', tPadding: false, bPadding: false },
  { typography: 'headlineL', fontWeight: 'medium', tPadding: false, bPadding: false },
  { typography: 'headlineXL', fontWeight: 'regular', tPadding: false, bPadding: false },
  { typography: 'headlineXL', fontWeight: 'medium', tPadding: false, bPadding: false },
  { typography: 'headlineXS', fontWeight: 'regular', tPadding: true, bPadding: true },
  { typography: 'headlineXS', fontWeight: 'medium', tPadding: true, bPadding: true },
  { typography: 'headlineS', fontWeight: 'regular', tPadding: true, bPadding: true },
  { typography: 'headlineS', fontWeight: 'medium', tPadding: true, bPadding: true },
  { typography: 'headlineM', fontWeight: 'regular', tPadding: true, bPadding: true },
  { typography: 'headlineM', fontWeight: 'medium', tPadding: true, bPadding: true },
  { typography: 'headlineL', fontWeight: 'regular', tPadding: true, bPadding: true },
  { typography: 'headlineL', fontWeight: 'medium', tPadding: true, bPadding: true },
  { typography: 'headlineXL', fontWeight: 'regular', tPadding: true, bPadding: true },
  { typography: 'headlineXL', fontWeight: 'medium', tPadding: true, bPadding: true },
  { typography: 'headlineXS', fontWeight: 'regular', tPadding: false, bPadding: true },
  { typography: 'headlineXS', fontWeight: 'medium', tPadding: false, bPadding: true },
  { typography: 'headlineS', fontWeight: 'regular', tPadding: false, bPadding: true },
  { typography: 'headlineS', fontWeight: 'medium', tPadding: false, bPadding: true },
  { typography: 'headlineM', fontWeight: 'regular', tPadding: false, bPadding: true },
  { typography: 'headlineM', fontWeight: 'medium', tPadding: false, bPadding: true },
  { typography: 'headlineL', fontWeight: 'regular', tPadding: false, bPadding: true },
  { typography: 'headlineL', fontWeight: 'medium', tPadding: false, bPadding: true },
  { typography: 'headlineXL', fontWeight: 'regular', tPadding: false, bPadding: true },
  { typography: 'headlineXL', fontWeight: 'medium', tPadding: false, bPadding: true },
];

const TYPOGRAPHY_TOKEN_SUFFIX: Record<TextHeadlineTypography, string> = {
  headlineXS: 'headline-xs',
  headlineS: 'headline-s',
  headlineM: 'headline-m',
  headlineL: 'headline-l',
  headlineXL: 'headline-xl',
};

/** Figma spaces/static token key for bPadding per headline size */
const B_PADDING_TOKEN_KEY: Record<TextHeadlineTypography, string> = {
  headlineXS: '200',
  headlineS: '300',
  headlineM: '400',
  headlineL: '500',
  headlineXL: '600',
};

const LINE_HEIGHT_FALLBACK: Record<TextHeadlineTypography, number> = {
  headlineXS: 24,
  headlineS: 28,
  headlineM: 36,
  headlineL: 40,
  headlineXL: 48,
};

const B_PADDING_FALLBACK: Record<TextHeadlineTypography, number> = {
  headlineXS: 8,
  headlineS: 12,
  headlineM: 16,
  headlineL: 20,
  headlineXL: 24,
};

export function textHeadlineTypographyToClassSuffix(
  typography: TextHeadlineTypography,
): string {
  return TYPOGRAPHY_TOKEN_SUFFIX[typography];
}

export function textHeadlineLineHeightCssVar(
  typography: TextHeadlineTypography,
): string {
  const suffix = TYPOGRAPHY_TOKEN_SUFFIX[typography];
  const px = LINE_HEIGHT_FALLBACK[typography];
  return `var(--line-heights-${suffix}, ${px})`;
}

export function textHeadlineBPaddingCssVar(
  typography: TextHeadlineTypography,
): string {
  const key = B_PADDING_TOKEN_KEY[typography];
  const px = B_PADDING_FALLBACK[typography];
  return `var(--spaces-static-${key}, ${px})`;
}

export function textHeadlineVariantKey(variant: TextHeadlineVariant): string {
  return `${variant.typography}-${variant.fontWeight}-t${variant.tPadding}-b${variant.bPadding}`;
}

/** Figma largest bound without extra padding (headlineXL / medium): 193×48 */
export const TEXT_HEADLINE_LARGEST_BOUND_WIDTH_PX = 193;
export const TEXT_HEADLINE_LARGEST_BOUND_HEIGHT_PX = 48;

export const TEXT_HEADLINE_PLAYGROUND_PADDING_PX = 128;

export const TEXT_HEADLINE_PLAYGROUND_SECTION_WIDTH_PX =
  TEXT_HEADLINE_LARGEST_BOUND_WIDTH_PX + TEXT_HEADLINE_PLAYGROUND_PADDING_PX * 2;

export const TEXT_HEADLINE_PLAYGROUND_SECTION_HEIGHT_PX =
  TEXT_HEADLINE_LARGEST_BOUND_HEIGHT_PX + TEXT_HEADLINE_PLAYGROUND_PADDING_PX * 2;

/** Figma board frame width */
export const TEXT_HEADLINE_BOARD_WIDTH_PX = 321;

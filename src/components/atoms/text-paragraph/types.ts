export type TextParagraphTypography = 'bodyL';

export type TextParagraphFontWeight = 'regular' | 'medium';

/**
 * Figma `text - paragraph` (171:839) — fontFamilies/body по fontWeight.
 * regular → Oceanic Text; medium → Oceanic Grotesk (разные modes в `03 - typography`).
 */
export const TEXT_PARAGRAPH_FIGMA_FONT_BY_WEIGHT = {
  regular: {
    family: 'Oceanic Text',
    fontModeSlug: 'oceanic-text',
  },
  medium: {
    family: 'Oceanic Grotesk',
    fontModeSlug: 'oceanic-grotesk',
  },
} as const;

/** Figma line-heights collection mode for all paragraph variants */
export { TEXT_PARAGRAPH_LINE_HEIGHT_MODE_SLUG as TEXT_PARAGRAPH_FIGMA_LINE_HEIGHT_MODE_SLUG } from '../../../tokens/line-height-mode-options';

/** CSS custom properties for font-family (not --font-families-body) */
export const TEXT_PARAGRAPH_FONT_FAMILY_CSS_VAR = {
  regular: '--text-paragraph-font-family-regular',
  medium: '--text-paragraph-font-family-medium',
} as const;

export type TextParagraphVariant = {
  typography: TextParagraphTypography;
  fontWeight: TextParagraphFontWeight;
  tPadding: boolean;
  bPadding: boolean;
};

/** Figma `text - paragraph` variant order (node 171:839) */
export const TEXT_PARAGRAPH_VARIANTS: readonly TextParagraphVariant[] = [
  { typography: 'bodyL', fontWeight: 'regular', tPadding: true, bPadding: true },
  { typography: 'bodyL', fontWeight: 'regular', tPadding: true, bPadding: false },
  { typography: 'bodyL', fontWeight: 'regular', tPadding: false, bPadding: false },
  { typography: 'bodyL', fontWeight: 'regular', tPadding: false, bPadding: true },
  { typography: 'bodyL', fontWeight: 'medium', tPadding: true, bPadding: true },
  { typography: 'bodyL', fontWeight: 'medium', tPadding: true, bPadding: false },
  { typography: 'bodyL', fontWeight: 'medium', tPadding: false, bPadding: false },
  { typography: 'bodyL', fontWeight: 'medium', tPadding: false, bPadding: true },
];

const TYPOGRAPHY_TOKEN_SUFFIX: Record<TextParagraphTypography, string> = {
  bodyL: 'body-l',
};

/** wide mode: lineHeights/body/L → 24px (frame padding uses same token) */
const FRAME_PADDING_FALLBACK: Record<TextParagraphTypography, number> = {
  bodyL: 24,
};

export function textParagraphTypographyToClassSuffix(
  typography: TextParagraphTypography,
): string {
  return TYPOGRAPHY_TOKEN_SUFFIX[typography];
}

export function textParagraphFramePaddingCssVar(
  typography: TextParagraphTypography,
): string {
  const suffix = TYPOGRAPHY_TOKEN_SUFFIX[typography];
  const px = FRAME_PADDING_FALLBACK[typography];
  return `var(--line-heights-${suffix}, ${px})`;
}

export function textParagraphVariantKey(variant: TextParagraphVariant): string {
  return `${variant.typography}-${variant.fontWeight}-t${variant.tPadding}-b${variant.bPadding}`;
}

/** Figma largest bound without extra padding (bodyL / medium): 89×24 */
export const TEXT_PARAGRAPH_LARGEST_BOUND_WIDTH_PX = 89;
export const TEXT_PARAGRAPH_LARGEST_BOUND_HEIGHT_PX = 24;

export const TEXT_PARAGRAPH_PLAYGROUND_PADDING_PX = 128;

export const TEXT_PARAGRAPH_PLAYGROUND_SECTION_WIDTH_PX =
  TEXT_PARAGRAPH_LARGEST_BOUND_WIDTH_PX + TEXT_PARAGRAPH_PLAYGROUND_PADDING_PX * 2;

export const TEXT_PARAGRAPH_PLAYGROUND_SECTION_HEIGHT_PX =
  TEXT_PARAGRAPH_LARGEST_BOUND_HEIGHT_PX + TEXT_PARAGRAPH_PLAYGROUND_PADDING_PX * 2;

/** Figma board frame width */
export const TEXT_PARAGRAPH_BOARD_WIDTH_PX = 217;

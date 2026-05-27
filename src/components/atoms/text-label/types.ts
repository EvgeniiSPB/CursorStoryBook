export type TextLabelTypography = 'bodyXS' | 'bodyS' | 'bodyM' | 'bodyL' | 'bodyXL';

/** Figma `paddingSize` on `text - label` (125:626) */
export type TextLabelPaddingSize = 'none' | 'tiny' | 'small';

export type TextLabelVariant = {
  typography: TextLabelTypography;
  tPadding: boolean;
  bPadding: boolean;
  paddingSize: TextLabelPaddingSize;
};

/**
 * Figma `text - label` (125:626) — fontFamilies/body = Oceanic Grotesk; только regular.
 * Text color: primary/50. Frame padding via spaces/semantic.
 */
export const TEXT_LABEL_FIGMA_FONT_FAMILY = 'Oceanic Grotesk';
export const TEXT_LABEL_FIGMA_FONT_MODE_SLUG = 'oceanic-grotesk';
export const TEXT_LABEL_FIGMA_COLOR_CSS_VAR = '--primary-50';

const PADDING_BLOCK = [
  { tPadding: false, bPadding: false, paddingSize: 'none' },
  { tPadding: true, bPadding: false, paddingSize: 'tiny' },
  { tPadding: true, bPadding: false, paddingSize: 'small' },
  { tPadding: false, bPadding: true, paddingSize: 'tiny' },
  { tPadding: false, bPadding: true, paddingSize: 'small' },
] as const satisfies ReadonlyArray<{
  tPadding: boolean;
  bPadding: boolean;
  paddingSize: TextLabelPaddingSize;
}>;

const TYPOGRAPHY_ORDER: TextLabelTypography[] = [
  'bodyXS',
  'bodyS',
  'bodyM',
  'bodyL',
  'bodyXL',
];

function buildVariantsFor(typography: TextLabelTypography): TextLabelVariant[] {
  return PADDING_BLOCK.map((block) => ({
    typography,
    ...block,
  }));
}

/** Figma variant order (node 125:626) — regular only */
export const TEXT_LABEL_VARIANTS: readonly TextLabelVariant[] = TYPOGRAPHY_ORDER.flatMap(
  (typography) => buildVariantsFor(typography),
);

type PaddingToken = { cssVar: string; fallback: number };

const PADDING_TINY_BY_TYPOGRAPHY: Record<TextLabelTypography, PaddingToken> = {
  bodyXS: { cssVar: '--spaces-semantic-xxs', fallback: 4 },
  bodyS: { cssVar: '--spaces-semantic-xxs', fallback: 4 },
  bodyM: { cssVar: '--spaces-semantic-xs', fallback: 8 },
  bodyL: { cssVar: '--spaces-semantic-xs', fallback: 8 },
  bodyXL: { cssVar: '--spaces-semantic-m', fallback: 16 },
};

const PADDING_SMALL_BY_TYPOGRAPHY: Record<TextLabelTypography, PaddingToken> = {
  bodyXS: { cssVar: '--spaces-semantic-xs', fallback: 8 },
  bodyS: { cssVar: '--spaces-semantic-xs', fallback: 8 },
  bodyM: { cssVar: '--spaces-semantic-s', fallback: 12 },
  bodyL: { cssVar: '--spaces-semantic-s', fallback: 12 },
  bodyXL: { cssVar: '--spaces-static-600', fallback: 24 },
};

export function textLabelFramePaddingCssVar(
  typography: TextLabelTypography,
  paddingSize: TextLabelPaddingSize,
): string {
  if (paddingSize === 'none') return '0';

  const token =
    paddingSize === 'tiny'
      ? PADDING_TINY_BY_TYPOGRAPHY[typography]
      : PADDING_SMALL_BY_TYPOGRAPHY[typography];

  return `var(${token.cssVar}, ${token.fallback})`;
}

export function textLabelVariantKey(variant: TextLabelVariant): string {
  return `${variant.typography}-t${variant.tPadding}-b${variant.bPadding}-${variant.paddingSize}`;
}

/** Figma largest bound without padding (bodyXL / regular): 60×28 */
export const TEXT_LABEL_LARGEST_BOUND_WIDTH_PX = 60;
export const TEXT_LABEL_LARGEST_BOUND_HEIGHT_PX = 28;

export const TEXT_LABEL_PLAYGROUND_PADDING_PX = 128;

export const TEXT_LABEL_PLAYGROUND_SECTION_WIDTH_PX =
  TEXT_LABEL_LARGEST_BOUND_WIDTH_PX + TEXT_LABEL_PLAYGROUND_PADDING_PX * 2;

export const TEXT_LABEL_PLAYGROUND_SECTION_HEIGHT_PX =
  TEXT_LABEL_LARGEST_BOUND_HEIGHT_PX + TEXT_LABEL_PLAYGROUND_PADDING_PX * 2;

/** Figma board frame width */
export const TEXT_LABEL_BOARD_WIDTH_PX = 188;

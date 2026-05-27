export type TextWarningTypography = 'bodyXS' | 'bodyS' | 'bodyM' | 'bodyL' | 'bodyXL';

/** Figma `paddingSize` on `text - warning` (180:15) */
export type TextWarningPaddingSize = 'none' | 'tiny' | 'small';

export type TextWarningVariant = {
  typography: TextWarningTypography;
  tPadding: boolean;
  bPadding: boolean;
  paddingSize: TextWarningPaddingSize;
};

/**
 * Figma `text - warning` (180:15) — fontFamilies/body = Oceanic Grotesk; только regular.
 * Text color: error/primary. Frame padding via spaces/semantic.
 */
export const TEXT_WARNING_FIGMA_FONT_FAMILY = 'Oceanic Grotesk';
export const TEXT_WARNING_FIGMA_FONT_MODE_SLUG = 'oceanic-grotesk';
export const TEXT_WARNING_FIGMA_COLOR_CSS_VAR = '--error-primary';
export const TEXT_WARNING_DEFAULT_TEXT = 'Warning';

const PADDING_BLOCK = [
  { tPadding: false, bPadding: false, paddingSize: 'none' },
  { tPadding: true, bPadding: false, paddingSize: 'tiny' },
  { tPadding: true, bPadding: false, paddingSize: 'small' },
  { tPadding: false, bPadding: true, paddingSize: 'tiny' },
  { tPadding: false, bPadding: true, paddingSize: 'small' },
] as const satisfies ReadonlyArray<{
  tPadding: boolean;
  bPadding: boolean;
  paddingSize: TextWarningPaddingSize;
}>;

const TYPOGRAPHY_ORDER: TextWarningTypography[] = [
  'bodyXS',
  'bodyS',
  'bodyM',
  'bodyL',
  'bodyXL',
];

function buildVariantsFor(typography: TextWarningTypography): TextWarningVariant[] {
  return PADDING_BLOCK.map((block) => ({
    typography,
    ...block,
  }));
}

/** Figma variant order (node 180:15) — regular only */
export const TEXT_WARNING_VARIANTS: readonly TextWarningVariant[] = TYPOGRAPHY_ORDER.flatMap(
  (typography) => buildVariantsFor(typography),
);

type PaddingToken = { cssVar: string; fallback: number };

const PADDING_TINY_BY_TYPOGRAPHY: Record<TextWarningTypography, PaddingToken> = {
  bodyXS: { cssVar: '--spaces-semantic-xxs', fallback: 4 },
  bodyS: { cssVar: '--spaces-semantic-xxs', fallback: 4 },
  bodyM: { cssVar: '--spaces-semantic-xs', fallback: 8 },
  bodyL: { cssVar: '--spaces-semantic-xs', fallback: 8 },
  bodyXL: { cssVar: '--spaces-semantic-m', fallback: 16 },
};

const PADDING_SMALL_BY_TYPOGRAPHY: Record<TextWarningTypography, PaddingToken> = {
  bodyXS: { cssVar: '--spaces-semantic-xs', fallback: 8 },
  bodyS: { cssVar: '--spaces-semantic-xs', fallback: 8 },
  bodyM: { cssVar: '--spaces-semantic-s', fallback: 12 },
  bodyL: { cssVar: '--spaces-semantic-s', fallback: 12 },
  bodyXL: { cssVar: '--spaces-semantic-l', fallback: 24 },
};

export function textWarningFramePaddingCssVar(
  typography: TextWarningTypography,
  paddingSize: TextWarningPaddingSize,
): string {
  if (paddingSize === 'none') return '0';

  const token =
    paddingSize === 'tiny'
      ? PADDING_TINY_BY_TYPOGRAPHY[typography]
      : PADDING_SMALL_BY_TYPOGRAPHY[typography];

  return `var(${token.cssVar}, ${token.fallback})`;
}

export function textWarningVariantKey(variant: TextWarningVariant): string {
  return `${variant.typography}-t${variant.tPadding}-b${variant.bPadding}-${variant.paddingSize}`;
}

/** Figma largest bound without padding (bodyXL / regular): 92×28 */
export const TEXT_WARNING_LARGEST_BOUND_WIDTH_PX = 92;
export const TEXT_WARNING_LARGEST_BOUND_HEIGHT_PX = 28;

export const TEXT_WARNING_PLAYGROUND_PADDING_PX = 128;

export const TEXT_WARNING_PLAYGROUND_SECTION_WIDTH_PX =
  TEXT_WARNING_LARGEST_BOUND_WIDTH_PX + TEXT_WARNING_PLAYGROUND_PADDING_PX * 2;

export const TEXT_WARNING_PLAYGROUND_SECTION_HEIGHT_PX =
  TEXT_WARNING_LARGEST_BOUND_HEIGHT_PX + TEXT_WARNING_PLAYGROUND_PADDING_PX * 2;

/** Figma board frame width */
export const TEXT_WARNING_BOARD_WIDTH_PX = 220;

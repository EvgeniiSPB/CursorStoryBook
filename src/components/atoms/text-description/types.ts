export type TextDescriptionTypography =
  | 'bodyXS'
  | 'bodyS'
  | 'bodyM'
  | 'bodyL'
  | 'bodyXL';

export type TextDescriptionFontWeight = 'regular' | 'medium';

/** Figma `paddingSize` on `text - description` (158:732) */
export type TextDescriptionPaddingSize = 'none' | 'tiny' | 'small';

export type TextDescriptionVariant = {
  typography: TextDescriptionTypography;
  fontWeight: TextDescriptionFontWeight;
  tPadding: boolean;
  bPadding: boolean;
  paddingSize: TextDescriptionPaddingSize;
};

/**
 * Figma `text - description` (158:732) — fontFamilies/body = Oceanic Grotesk (mode oceanic-grotesk).
 * Frame padding via spaces/semantic (not line-height).
 */
export const TEXT_DESCRIPTION_FIGMA_FONT_FAMILY = 'Oceanic Grotesk';
export const TEXT_DESCRIPTION_FIGMA_FONT_MODE_SLUG = 'oceanic-grotesk';

const PADDING_BLOCK = [
  { tPadding: false, bPadding: false, paddingSize: 'none' },
  { tPadding: true, bPadding: false, paddingSize: 'tiny' },
  { tPadding: true, bPadding: false, paddingSize: 'small' },
  { tPadding: false, bPadding: true, paddingSize: 'tiny' },
  { tPadding: false, bPadding: true, paddingSize: 'small' },
] as const satisfies ReadonlyArray<{
  tPadding: boolean;
  bPadding: boolean;
  paddingSize: TextDescriptionPaddingSize;
}>;

const TYPOGRAPHY_ORDER: TextDescriptionTypography[] = [
  'bodyXS',
  'bodyS',
  'bodyM',
  'bodyL',
  'bodyXL',
];

const WEIGHT_ORDER: TextDescriptionFontWeight[] = ['regular', 'medium'];

function buildVariantsFor(
  typography: TextDescriptionTypography,
  fontWeight: TextDescriptionFontWeight,
): TextDescriptionVariant[] {
  return PADDING_BLOCK.map((block) => ({
    typography,
    fontWeight,
    ...block,
  }));
}

/** Figma variant order (node 158:732) */
export const TEXT_DESCRIPTION_VARIANTS: readonly TextDescriptionVariant[] =
  TYPOGRAPHY_ORDER.flatMap((typography) =>
    WEIGHT_ORDER.flatMap((fontWeight) => buildVariantsFor(typography, fontWeight)),
  );

type PaddingToken = { cssVar: string; fallback: number };

const PADDING_TINY_BY_TYPOGRAPHY: Record<TextDescriptionTypography, PaddingToken> = {
  bodyXS: { cssVar: '--spaces-semantic-xxs', fallback: 4 },
  bodyS: { cssVar: '--spaces-semantic-xxs', fallback: 4 },
  bodyM: { cssVar: '--spaces-semantic-xs', fallback: 8 },
  bodyL: { cssVar: '--spaces-semantic-xs', fallback: 8 },
  bodyXL: { cssVar: '--spaces-semantic-m', fallback: 16 },
};

const PADDING_SMALL_BY_TYPOGRAPHY: Record<TextDescriptionTypography, PaddingToken> = {
  bodyXS: { cssVar: '--spaces-semantic-xs', fallback: 8 },
  bodyS: { cssVar: '--spaces-semantic-xs', fallback: 8 },
  bodyM: { cssVar: '--spaces-semantic-s', fallback: 12 },
  bodyL: { cssVar: '--spaces-semantic-s', fallback: 12 },
  bodyXL: { cssVar: '--spaces-static-600', fallback: 24 },
};

export function textDescriptionFramePaddingCssVar(
  typography: TextDescriptionTypography,
  paddingSize: TextDescriptionPaddingSize,
): string {
  if (paddingSize === 'none') return '0';

  const token =
    paddingSize === 'tiny'
      ? PADDING_TINY_BY_TYPOGRAPHY[typography]
      : PADDING_SMALL_BY_TYPOGRAPHY[typography];

  return `var(${token.cssVar}, ${token.fallback})`;
}

export function textDescriptionVariantKey(variant: TextDescriptionVariant): string {
  return `${variant.typography}-${variant.fontWeight}-t${variant.tPadding}-b${variant.bPadding}-${variant.paddingSize}`;
}

/** Figma largest bound without padding (bodyXL / medium): 129×28 */
export const TEXT_DESCRIPTION_LARGEST_BOUND_WIDTH_PX = 129;
export const TEXT_DESCRIPTION_LARGEST_BOUND_HEIGHT_PX = 28;

export const TEXT_DESCRIPTION_PLAYGROUND_PADDING_PX = 128;

export const TEXT_DESCRIPTION_PLAYGROUND_SECTION_WIDTH_PX =
  TEXT_DESCRIPTION_LARGEST_BOUND_WIDTH_PX + TEXT_DESCRIPTION_PLAYGROUND_PADDING_PX * 2;

export const TEXT_DESCRIPTION_PLAYGROUND_SECTION_HEIGHT_PX =
  TEXT_DESCRIPTION_LARGEST_BOUND_HEIGHT_PX + TEXT_DESCRIPTION_PLAYGROUND_PADDING_PX * 2;

/** Figma board frame width */
export const TEXT_DESCRIPTION_BOARD_WIDTH_PX = 257;

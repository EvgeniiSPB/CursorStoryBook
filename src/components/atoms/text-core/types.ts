export type TextCoreTypography =
  | 'special'
  | 'bodyXS'
  | 'bodyS'
  | 'bodyM'
  | 'bodyL'
  | 'bodyXL';

export type TextCoreFontWeight = 'regular' | 'medium';

export type TextCoreVariant = {
  typography: TextCoreTypography;
  fontWeight: TextCoreFontWeight;
};

/** Figma `text - core` variant order */
export const TEXT_CORE_VARIANTS: readonly TextCoreVariant[] = [
  { typography: 'special', fontWeight: 'medium' },
  { typography: 'bodyXS', fontWeight: 'regular' },
  { typography: 'bodyXS', fontWeight: 'medium' },
  { typography: 'bodyS', fontWeight: 'regular' },
  { typography: 'bodyS', fontWeight: 'medium' },
  { typography: 'bodyM', fontWeight: 'regular' },
  { typography: 'bodyM', fontWeight: 'medium' },
  { typography: 'bodyL', fontWeight: 'regular' },
  { typography: 'bodyL', fontWeight: 'medium' },
  { typography: 'bodyXL', fontWeight: 'regular' },
  { typography: 'bodyXL', fontWeight: 'medium' },
];

const TYPOGRAPHY_TOKEN_SUFFIX: Record<
  Exclude<TextCoreTypography, 'special'>,
  string
> = {
  bodyXS: 'body-xs',
  bodyS: 'body-s',
  bodyM: 'body-m',
  bodyL: 'body-l',
  bodyXL: 'body-xl',
};

export function textCoreTypographyToClassSuffix(
  typography: TextCoreTypography,
): string {
  if (typography === 'special') return 'special';
  return TYPOGRAPHY_TOKEN_SUFFIX[typography];
}

export function textCoreVariantKey(variant: TextCoreVariant): string {
  return `${variant.typography}-${variant.fontWeight}`;
}

/** Figma `text - core` largest bound box (bodyXL / medium): 62×28 */
export const TEXT_CORE_LARGEST_BOUND_WIDTH_PX = 62;
export const TEXT_CORE_LARGEST_BOUND_HEIGHT_PX = 28;

/** Playground section inset around largest bound */
export const TEXT_CORE_PLAYGROUND_PADDING_PX = 128;

/** Fixed Playground section size (does not grow with longer `text`) */
export const TEXT_CORE_PLAYGROUND_SECTION_WIDTH_PX =
  TEXT_CORE_LARGEST_BOUND_WIDTH_PX + TEXT_CORE_PLAYGROUND_PADDING_PX * 2;

export const TEXT_CORE_PLAYGROUND_SECTION_HEIGHT_PX =
  TEXT_CORE_LARGEST_BOUND_HEIGHT_PX + TEXT_CORE_PLAYGROUND_PADDING_PX * 2;

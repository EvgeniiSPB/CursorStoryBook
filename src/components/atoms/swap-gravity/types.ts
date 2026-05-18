export type SwapGravitySize =
  | 'special'
  | 'bodyXS'
  | 'bodyS'
  | 'bodyM'
  | 'bodyL'
  | 'bodyXL'
  | 'headlineXS'
  | 'headlineS'
  | 'headlineM'
  | 'headlineL'
  | 'headlineXL'
  | 'displayXS'
  | 'displayS'
  | 'displayM'
  | 'displayL'
  | 'displayXL';

/** Figma `!swap - gravity` variant order */
export const SWAP_GRAVITY_SIZES: readonly SwapGravitySize[] = [
  'special',
  'bodyXS',
  'bodyS',
  'bodyM',
  'bodyL',
  'bodyXL',
  'headlineXS',
  'headlineS',
  'headlineM',
  'headlineL',
  'headlineXL',
  'displayXS',
  'displayS',
  'displayM',
  'displayL',
  'displayXL',
];

const LINE_HEIGHT_TOKEN: Record<SwapGravitySize, string> = {
  special: 'line-heights-special-100',
  bodyXS: 'line-heights-body-xs',
  bodyS: 'line-heights-body-s',
  bodyM: 'line-heights-body-m',
  bodyL: 'line-heights-body-l',
  bodyXL: 'line-heights-body-xl',
  headlineXS: 'line-heights-headline-xs',
  headlineS: 'line-heights-headline-s',
  headlineM: 'line-heights-headline-m',
  headlineL: 'line-heights-headline-l',
  headlineXL: 'line-heights-headline-xl',
  displayXS: 'line-heights-display-xs',
  displayS: 'line-heights-display-s',
  displayM: 'line-heights-display-m',
  displayL: 'line-heights-display-l',
  displayXL: 'line-heights-display-xl',
};

/** Figma bound box dimensions (px) */
const FALLBACK_PX: Record<SwapGravitySize, number> = {
  special: 12,
  bodyXS: 16,
  bodyS: 16,
  bodyM: 20,
  bodyL: 20,
  bodyXL: 28,
  headlineXS: 24,
  headlineS: 28,
  headlineM: 36,
  headlineL: 40,
  headlineXL: 48,
  displayXS: 40,
  displayS: 48,
  displayM: 52,
  displayL: 60,
  displayXL: 64,
};

export function swapGravitySizeToPx(size: SwapGravitySize): number {
  return FALLBACK_PX[size];
}

/** Unitless line-height token for `calc(var(--swap-gravity-size) * 1px)` */
export function swapGravitySizeToCssVar(size: SwapGravitySize): string {
  const token = LINE_HEIGHT_TOKEN[size];
  const px = FALLBACK_PX[size];
  return `var(--${token}, ${px})`;
}

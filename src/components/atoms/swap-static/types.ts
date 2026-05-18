export type SwapStaticSize =
  | 'x1'
  | 'x2'
  | 'x3'
  | 'x4'
  | 'x5'
  | 'x6'
  | 'x7'
  | 'x8'
  | 'x9'
  | 'x10'
  | 'x11'
  | 'x12'
  | 'x13'
  | 'x14'
  | 'x15'
  | 'x16'
  | 'x17'
  | 'x18'
  | 'x19'
  | 'x20'
  | 'x21'
  | 'x22'
  | 'x23'
  | 'x24'
  | 'x25'
  | 'x26'
  | 'x27'
  | 'x28'
  | 'x29'
  | 'x30'
  | 'x31'
  | 'x32'
  | 'x33'
  | 'x34'
  | 'x35'
  | 'x36'
  | 'x37'
  | 'x38'
  | 'x39'
  | 'x40';

/** Figma `!swap - static` variant order (size=x1 … size=x40) */
export const SWAP_STATIC_SIZES: readonly SwapStaticSize[] = Array.from(
  { length: 40 },
  (_, i) => `x${i + 1}` as SwapStaticSize,
);

export function swapStaticSizeToTokenKey(size: SwapStaticSize): number {
  return Number(size.slice(1)) * 100;
}

export function swapStaticSizeToPx(size: SwapStaticSize): number {
  return Number(size.slice(1)) * 4;
}

/** Unitless size token for `calc(var(--swap-static-size) * 1px)` */
export function swapStaticSizeToCssVar(size: SwapStaticSize): string {
  const key = swapStaticSizeToTokenKey(size);
  const px = swapStaticSizeToPx(size);
  return `var(--x-base-${key}, ${px})`;
}

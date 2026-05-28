export type ToggleType = 'checkBox';

/** Figma `typography` on `toggle` (220:77) — bound matches body line-height */
export type ToggleTypography = 'bodyS' | 'bodyM';

export type ToggleVariant = {
  type: ToggleType;
  typography: ToggleTypography;
  active: boolean;
};

/** Figma `toggle` component set (220:77). */
export const TOGGLE_FIGMA_NODE_ID = '220:77';
export const TOGGLE_BOARD_WIDTH_PX = 520;

/** Largest toggle bound (bodyM): 20×20 */
export const TOGGLE_LARGEST_BOUND_SIZE_PX = 20;

/** Figma board padding (220:77) — same as Avatar playground inset */
export const TOGGLE_PLAYGROUND_PADDING_PX = 128;

export const TOGGLE_PLAYGROUND_SECTION_SIZE_PX =
  TOGGLE_LARGEST_BOUND_SIZE_PX + TOGGLE_PLAYGROUND_PADDING_PX * 2;

/** Figma variant order (left → right on board) */
export const TOGGLE_VARIANTS: readonly ToggleVariant[] = [
  { type: 'checkBox', typography: 'bodyS', active: false },
  { type: 'checkBox', typography: 'bodyS', active: true },
  { type: 'checkBox', typography: 'bodyM', active: false },
  { type: 'checkBox', typography: 'bodyM', active: true },
];

const SIZE_TOKEN: Record<ToggleTypography, { cssVar: string; fallback: number }> = {
  bodyS: { cssVar: '--line-heights-body-s', fallback: 16 },
  bodyM: { cssVar: '--line-heights-body-m', fallback: 20 },
};

/** Unitless size token for `calc(var(--toggle-size) * 1px)` */
export function toggleTypographyToCssVar(typography: ToggleTypography): string {
  const { cssVar, fallback } = SIZE_TOKEN[typography];
  return `var(${cssVar}, ${fallback})`;
}

export function toggleTypographyToPx(typography: ToggleTypography): number {
  return SIZE_TOKEN[typography].fallback;
}

export function toggleVariantKey(variant: ToggleVariant): string {
  return `${variant.type}-${variant.typography}-${variant.active ? 'on' : 'off'}`;
}

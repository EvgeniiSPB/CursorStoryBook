export type ShapeType = 'filled' | 'outlined' | 'tonned';

export type ShapeRadius = 'x0' | 'x6' | 'x8';

export type ShapeColorRole =
  | 'primary'
  | 'primaryInverted'
  | 'constant'
  | 'constantInverted'
  | 'brand'
  | 'success'
  | 'warning'
  | 'info';

export type ShapeState = 'normal' | 'hover' | 'click';

export type ShapeVariant = {
  type: ShapeType;
  color: ShapeColorRole;
  radius: ShapeRadius;
  state: ShapeState;
};

/** Figma page `shapes` (281:1569). */
export const SHAPE_FIGMA_PAGE_NODE_ID = '281:1569';

export const SHAPE_SIZE_PX = 64;

export const SHAPE_BOARD_WIDTH_PX = 640;

export const SHAPE_PLAYGROUND_PADDING_PX = 128;

export const SHAPE_PLAYGROUND_SECTION_SIZE_PX =
  SHAPE_SIZE_PX + SHAPE_PLAYGROUND_PADDING_PX * 2;

export const SHAPE_RADII: readonly ShapeRadius[] = ['x0', 'x6', 'x8'];

export const SHAPE_STATES: readonly ShapeState[] = ['normal', 'hover', 'click'];

const RADIUS_CSS_VAR: Record<ShapeRadius, { cssVar: string; fallback: number }> = {
  x0: { cssVar: '--radii-semantic-xs', fallback: 0 },
  x6: { cssVar: '--radii-semantic-l', fallback: 24 },
  x8: { cssVar: '--radii-semantic-xl', fallback: 32 },
};

export function shapeRadiusToCssVar(radius: ShapeRadius): string {
  const { cssVar, fallback } = RADIUS_CSS_VAR[radius];
  return `var(${cssVar}, ${fallback})`;
}

export const SHAPE_FILLED_COLORS: readonly ShapeColorRole[] = [
  'primary',
  'primaryInverted',
  'constant',
  'constantInverted',
  'brand',
  'success',
  'warning',
  'info',
];

export const SHAPE_OUTLINED_COLORS: readonly ShapeColorRole[] = [
  'primary',
  'primaryInverted',
  'constant',
  'constantInverted',
  'brand',
  'success',
  'warning',
];

export const SHAPE_TONNED_COLORS: readonly ShapeColorRole[] = ['primary', 'primaryInverted'];

export function shapeColorsForType(type: ShapeType): readonly ShapeColorRole[] {
  if (type === 'filled') return SHAPE_FILLED_COLORS;
  if (type === 'outlined') return SHAPE_OUTLINED_COLORS;
  return SHAPE_TONNED_COLORS;
}

export function isShapeColorValid(type: ShapeType, color: ShapeColorRole): boolean {
  return shapeColorsForType(type).includes(color);
}

function buildVariantsForType(type: ShapeType): ShapeVariant[] {
  const colors = shapeColorsForType(type);
  const variants: ShapeVariant[] = [];
  for (const color of colors) {
    for (const state of SHAPE_STATES) {
      for (const radius of SHAPE_RADII) {
        variants.push({ type, color, radius, state });
      }
    }
  }
  return variants;
}

export const SHAPE_FILLED_VARIANTS = buildVariantsForType('filled');
export const SHAPE_OUTLINED_VARIANTS = buildVariantsForType('outlined');
export const SHAPE_TONNED_VARIANTS = buildVariantsForType('tonned');

export const SHAPE_ALL_VARIANTS: readonly ShapeVariant[] = [
  ...SHAPE_FILLED_VARIANTS,
  ...SHAPE_OUTLINED_VARIANTS,
  ...SHAPE_TONNED_VARIANTS,
];

export function shapeVariantKey(variant: ShapeVariant): string {
  return `${variant.type}-${variant.color}-${variant.radius}-${variant.state}`;
}

/** Figma variable mode on the shapes page (`06 - semantic` light / dark). */
export type ShapeFigmaTheme = 'light' | 'dark';

/**
 * Boards in Figma with `mode: dark` (e.g. `314:1633`, `285:1619`, `285:1632`).
 * Background: `background0/primary` → graphite; shape tokens from dark semantic.
 */
export function shapeBoardFigmaTheme(color: ShapeColorRole): ShapeFigmaTheme {
  return color === 'primaryInverted' || color === 'constant' ? 'dark' : 'light';
}

/** @deprecated Use shapeBoardFigmaTheme */
export function shapeBoardUsesDarkSurface(color: ShapeColorRole): boolean {
  return shapeBoardFigmaTheme(color) === 'dark';
}

export function shapeBoardBackgroundCss(): string {
  return 'var(--background0-primary)';
}

export function shapeBoardTitle(type: ShapeType, color: ShapeColorRole): string {
  const typeLabel =
    type === 'filled' ? 'Filled' : type === 'outlined' ? 'Outlined' : 'Tonned';
  const colorLabels: Record<ShapeColorRole, string> = {
    primary: 'Primary',
    primaryInverted: 'Primary inverted',
    constant: 'Constant',
    constantInverted: 'Constant inverted',
    brand: 'Brand',
    success: 'Success',
    warning: 'Warning',
    info: 'Info',
  };
  return `${typeLabel} / ${colorLabels[color]}`;
}

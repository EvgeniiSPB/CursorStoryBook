export type ButtonTextIconType =
  | 'primary'
  | 'primaryConstantInverted'
  | 'secondary'
  | 'secondaryConstantInverted'
  | 'warning'
  | 'primaryBrand'
  | 'secondaryBrand';

export type ButtonTextIconSize = 'medium' | 'small' | 'tiny';

export type ButtonTextIconState = 'normal' | 'hover' | 'click';

export type ButtonTextIconVisualStyle =
  | 'outlined-base'
  | 'outlined-constantinverted'
  | 'outlined-brand'
  | 'filled-base'
  | 'filled-constantinverted'
  | 'filled-warning'
  | 'filled-brand';

export type ButtonTextIconVariant = {
  type: ButtonTextIconType;
  size: ButtonTextIconSize;
  state: ButtonTextIconState;
  extraPaddings: boolean;
  fillHug: boolean;
  figmaX: number;
  figmaY: number;
};

/** Figma `button - text + icon` component set (4063:4805). */
export const BUTTON_TEXT_ICON_FIGMA_NODE_ID = '4063:4805';

export const BUTTON_TEXT_ICON_BOARD_WIDTH_PX = 8598;
export const BUTTON_TEXT_ICON_BOARD_HEIGHT_PX = 980;
export const BUTTON_TEXT_ICON_FILL_WIDTH_PX = 368;

/** Storybook Playground: white/black square = bound + 2×padding (same layout as Avatar). */
export const BUTTON_TEXT_ICON_PLAYGROUND_BOUND_SIZE_PX = 500;
export const BUTTON_TEXT_ICON_PLAYGROUND_PADDING_PX = 0;

export type ButtonTextIconPlaygroundSurface = 'light' | 'inverted';

/** Playground stage background by Figma column contrast (4063:4805). */
export function buttonTextIconPlaygroundSurface(type: ButtonTextIconType): ButtonTextIconPlaygroundSurface {
  switch (type) {
    case 'primaryConstantInverted':
    case 'secondaryConstantInverted':
      return 'inverted';
    default:
      return 'light';
  }
}

const BUTTON_TEXT_ICON_TYPES: readonly ButtonTextIconType[] = [
  'primary',
  'primaryConstantInverted',
  'primaryBrand',
  'secondary',
  'secondaryConstantInverted',
  'secondaryBrand',
  'warning',
] as const;

const BUTTON_TEXT_ICON_SIZES: readonly ButtonTextIconSize[] = ['medium', 'small', 'tiny'] as const;

const BUTTON_TEXT_ICON_STATES: readonly ButtonTextIconState[] = ['normal', 'hover', 'click'] as const;

const TYPE_BASE_X: Record<ButtonTextIconType, number> = {
  primary: 100,
  primaryConstantInverted: 1318,
  primaryBrand: 2536,
  secondary: 3754,
  secondaryConstantInverted: 4972,
  secondaryBrand: 6190,
  warning: 7408,
};

const SIZE_STATE_Y: Record<ButtonTextIconSize, Record<ButtonTextIconState, number>> = {
  medium: { normal: 100, hover: 392, click: 684 },
  small: { normal: 184, hover: 476, click: 768 },
  tiny: { normal: 260, hover: 552, click: 844 },
};

const BRAND_TYPES = new Set<ButtonTextIconType>(['primaryBrand', 'secondaryBrand']);

/** Figma `4063:4805` — `primaryBrand` / `secondaryBrand` use segment **vivid violet**. */
export const BUTTON_TEXT_ICON_BRAND_SEGMENT = 'vivid-violet' as const;

export function buttonTextIconNeedsBrandSegment(type: ButtonTextIconType): boolean {
  return BRAND_TYPES.has(type);
}

function figmaPosition(
  type: ButtonTextIconType,
  size: ButtonTextIconSize,
  state: ButtonTextIconState,
  extraPaddings: boolean,
  fillHug: boolean,
): { figmaX: number; figmaY: number } {
  const baseX = TYPE_BASE_X[type];
  const figmaX =
    baseX + (fillHug ? (extraPaddings ? 1001 : 400) : extraPaddings ? 601 : 0);
  let figmaY = SIZE_STATE_Y[size][state];
  if (extraPaddings && size === 'medium' && BRAND_TYPES.has(type)) {
    figmaY += 6;
  }
  return { figmaX, figmaY };
}

function buildButtonTextIconVariants(): ButtonTextIconVariant[] {
  const variants: ButtonTextIconVariant[] = [];
  for (const type of BUTTON_TEXT_ICON_TYPES) {
    for (const size of BUTTON_TEXT_ICON_SIZES) {
      for (const state of BUTTON_TEXT_ICON_STATES) {
        for (const extraPaddings of [false, true] as const) {
          for (const fillHug of [false, true] as const) {
            const { figmaX, figmaY } = figmaPosition(type, size, state, extraPaddings, fillHug);
            variants.push({ type, size, state, extraPaddings, fillHug, figmaX, figmaY });
          }
        }
      }
    }
  }
  return variants;
}

/** All 252 Figma symbols on board 4063:4805. */
export const BUTTON_TEXT_ICON_VARIANTS: readonly ButtonTextIconVariant[] =
  buildButtonTextIconVariants();

export type ButtonTextIconBoardColumnSegment = 'san-marine' | 'metallic' | 'vivid-violet' | 'crimson';

export type ButtonTextIconBoardColumn = {
  type: ButtonTextIconType;
  left: number;
  width: number;
  segment?: ButtonTextIconBoardColumnSegment;
};

/** Vertical strips on `4063:4805` — same column layout as `4041:535`. */
export const BUTTON_TEXT_ICON_BOARD_COLUMNS: readonly ButtonTextIconBoardColumn[] = [
  { type: 'primary', left: 0, width: 1318, segment: 'san-marine' },
  { type: 'primaryConstantInverted', left: 1318, width: 1218 },
  { type: 'primaryBrand', left: 2536, width: 1218, segment: 'vivid-violet' },
  { type: 'secondary', left: 3754, width: 1218, segment: 'metallic' },
  { type: 'secondaryConstantInverted', left: 4972, width: 1218 },
  { type: 'secondaryBrand', left: 6190, width: 1218, segment: 'vivid-violet' },
  { type: 'warning', left: 7408, width: BUTTON_TEXT_ICON_BOARD_WIDTH_PX - 7408, segment: 'crimson' },
];

export function buttonTextIconVisualStyle(type: ButtonTextIconType): ButtonTextIconVisualStyle {
  switch (type) {
    case 'primary':
      return 'outlined-base';
    case 'primaryConstantInverted':
      return 'outlined-constantinverted';
    case 'primaryBrand':
      return 'outlined-brand';
    case 'secondary':
      return 'filled-base';
    case 'secondaryConstantInverted':
      return 'filled-constantinverted';
    case 'warning':
      return 'filled-warning';
    case 'secondaryBrand':
      return 'filled-brand';
  }
}

export function buttonTextIconVariantKey(variant: ButtonTextIconVariant): string {
  return [
    variant.type,
    variant.size,
    variant.state,
    variant.extraPaddings ? 'extra' : 'base-pad',
    variant.fillHug ? 'hug' : 'fill',
  ].join('-');
}

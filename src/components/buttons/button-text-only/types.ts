export type ButtonTextOnlyType =
  | 'primary'
  | 'primaryConstantInverted'
  | 'secondary'
  | 'secondaryConstantInverted'
  | 'warning'
  | 'primaryBrand'
  | 'secondaryBrand';

export type ButtonTextOnlySize = 'medium' | 'small' | 'tiny';

export type ButtonTextOnlyState = 'normal' | 'hover' | 'click';

export type ButtonTextOnlyVisualStyle =
  | 'outlined-base'
  | 'outlined-constantinverted'
  | 'outlined-brand'
  | 'filled-base'
  | 'filled-constantinverted'
  | 'filled-warning'
  | 'filled-brand';

export type ButtonTextOnlyVariant = {
  type: ButtonTextOnlyType;
  size: ButtonTextOnlySize;
  state: ButtonTextOnlyState;
  extraPaddings: boolean;
  fillHug: boolean;
  figmaX: number;
  figmaY: number;
};

/** Figma `button - text only` component set (4041:535). */
export const BUTTON_TEXT_ONLY_FIGMA_NODE_ID = '4041:535';

export const BUTTON_TEXT_ONLY_BOARD_WIDTH_PX = 8598;
export const BUTTON_TEXT_ONLY_BOARD_HEIGHT_PX = 980;
export const BUTTON_TEXT_ONLY_FILL_WIDTH_PX = 368;

/** Storybook Playground: white square = bound + 2×padding (same layout as Avatar). */
export const BUTTON_TEXT_ONLY_PLAYGROUND_BOUND_SIZE_PX = 500;
export const BUTTON_TEXT_ONLY_PLAYGROUND_PADDING_PX = 0;

export type ButtonTextOnlyPlaygroundSurface = 'light' | 'inverted';

/** Playground stage background by Figma column contrast (4041:535). */
export function buttonTextOnlyPlaygroundSurface(type: ButtonTextOnlyType): ButtonTextOnlyPlaygroundSurface {
  switch (type) {
    case 'primaryConstantInverted':
    case 'secondaryConstantInverted':
      return 'inverted';
    default:
      return 'light';
  }
}

const BUTTON_TEXT_ONLY_TYPES: readonly ButtonTextOnlyType[] = [
  'primary',
  'primaryConstantInverted',
  'primaryBrand',
  'secondary',
  'secondaryConstantInverted',
  'secondaryBrand',
  'warning',
] as const;

const BUTTON_TEXT_ONLY_SIZES: readonly ButtonTextOnlySize[] = ['medium', 'small', 'tiny'] as const;

const BUTTON_TEXT_ONLY_STATES: readonly ButtonTextOnlyState[] = ['normal', 'hover', 'click'] as const;

const TYPE_BASE_X: Record<ButtonTextOnlyType, number> = {
  primary: 100,
  primaryConstantInverted: 1318,
  primaryBrand: 2536,
  secondary: 3754,
  secondaryConstantInverted: 4972,
  secondaryBrand: 6190,
  warning: 7408,
};

const SIZE_STATE_Y: Record<ButtonTextOnlySize, Record<ButtonTextOnlyState, number>> = {
  medium: { normal: 100, hover: 392, click: 684 },
  small: { normal: 184, hover: 476, click: 768 },
  tiny: { normal: 260, hover: 552, click: 844 },
};

const BRAND_TYPES = new Set<ButtonTextOnlyType>(['primaryBrand', 'secondaryBrand']);

/** Figma `4041:535` — `primaryBrand` / `secondaryBrand` use segment **vivid violet**. */
export const BUTTON_TEXT_ONLY_BRAND_SEGMENT = 'vivid-violet' as const;

export function buttonTextOnlyNeedsBrandSegment(type: ButtonTextOnlyType): boolean {
  return BRAND_TYPES.has(type);
}

function figmaPosition(
  type: ButtonTextOnlyType,
  size: ButtonTextOnlySize,
  state: ButtonTextOnlyState,
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

function buildButtonTextOnlyVariants(): ButtonTextOnlyVariant[] {
  const variants: ButtonTextOnlyVariant[] = [];
  for (const type of BUTTON_TEXT_ONLY_TYPES) {
    for (const size of BUTTON_TEXT_ONLY_SIZES) {
      for (const state of BUTTON_TEXT_ONLY_STATES) {
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

/** All 252 Figma symbols on board 4041:535. */
export const BUTTON_TEXT_ONLY_VARIANTS: readonly ButtonTextOnlyVariant[] =
  buildButtonTextOnlyVariants();

/** Segment slug from `07 - segment` pinned per board column (overrides Storybook toolbar). */
export type ButtonTextOnlyBoardColumnSegment = 'san-marine' | 'metallic' | 'vivid-violet' | 'crimson';

export type ButtonTextOnlyBoardColumn = {
  type: ButtonTextOnlyType;
  left: number;
  width: number;
  /** Figma board strip: segment mode for contrast preview. */
  segment?: ButtonTextOnlyBoardColumnSegment;
};

/**
 * Vertical strips on `4041:535` — segment per column from Figma (not global toolbar crimson).
 * Inverted columns use solid black; brand/warning strips use white + filled buttons for color.
 */
export const BUTTON_TEXT_ONLY_BOARD_COLUMNS: readonly ButtonTextOnlyBoardColumn[] = [
  { type: 'primary', left: 0, width: 1318, segment: 'san-marine' },
  { type: 'primaryConstantInverted', left: 1318, width: 1218 },
  { type: 'primaryBrand', left: 2536, width: 1218, segment: 'vivid-violet' },
  { type: 'secondary', left: 3754, width: 1218, segment: 'metallic' },
  { type: 'secondaryConstantInverted', left: 4972, width: 1218 },
  { type: 'secondaryBrand', left: 6190, width: 1218, segment: 'vivid-violet' },
  { type: 'warning', left: 7408, width: BUTTON_TEXT_ONLY_BOARD_WIDTH_PX - 7408, segment: 'crimson' },
];

export function buttonTextOnlyVisualStyle(type: ButtonTextOnlyType): ButtonTextOnlyVisualStyle {
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

export function buttonTextOnlyVariantKey(variant: ButtonTextOnlyVariant): string {
  return [
    variant.type,
    variant.size,
    variant.state,
    variant.extraPaddings ? 'extra' : 'base-pad',
    variant.fillHug ? 'hug' : 'fill',
  ].join('-');
}

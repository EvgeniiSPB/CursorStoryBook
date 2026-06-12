export type ButtonIconOnlyType =
  | 'primary'
  | 'primaryConstantInverted'
  | 'secondary'
  | 'secondaryBrand';

export type ButtonIconOnlySize = 'medium' | 'small' | 'tiny';

export type ButtonIconOnlyState = 'normal' | 'hover' | 'click';

export type ButtonIconOnlyVisualStyle =
  | 'outlined-base'
  | 'outlined-constantinverted'
  | 'filled-constantinverted'
  | 'filled-constantinverted-brand';

export type ButtonIconOnlyVariant = {
  type: ButtonIconOnlyType;
  size: ButtonIconOnlySize;
  state: ButtonIconOnlyState;
  extraPaddings: boolean;
  figmaX: number;
  figmaY: number;
};

/** Figma `button - icon only` component set (4063:7653). */
export const BUTTON_ICON_ONLY_FIGMA_NODE_ID = '4063:7653';

export const BUTTON_ICON_ONLY_BOARD_WIDTH_PX = 1304;
export const BUTTON_ICON_ONLY_BOARD_HEIGHT_PX = 980;

/** Storybook Playground: white/black square (same layout as Avatar). */
export const BUTTON_ICON_ONLY_PLAYGROUND_BOUND_SIZE_PX = 500;
export const BUTTON_ICON_ONLY_PLAYGROUND_PADDING_PX = 0;

export type ButtonIconOnlyPlaygroundSurface = 'light' | 'inverted';

/** Playground stage background by Figma column contrast (4063:7653). */
export function buttonIconOnlyPlaygroundSurface(type: ButtonIconOnlyType): ButtonIconOnlyPlaygroundSurface {
  switch (type) {
    case 'primary':
      return 'light';
    default:
      return 'inverted';
  }
}

const BUTTON_ICON_ONLY_TYPES: readonly ButtonIconOnlyType[] = [
  'primary',
  'primaryConstantInverted',
  'secondary',
  'secondaryBrand',
] as const;

const BUTTON_ICON_ONLY_SIZES: readonly ButtonIconOnlySize[] = ['medium', 'small', 'tiny'] as const;

const BUTTON_ICON_ONLY_STATES: readonly ButtonIconOnlyState[] = ['normal', 'hover', 'click'] as const;

const TYPE_BASE_X: Record<ButtonIconOnlyType, number> = {
  primary: 100,
  primaryConstantInverted: 412,
  secondary: 708,
  secondaryBrand: 1020,
};

/** Figma x offset when `extraPaddings=true` (4063:7653). */
const TYPE_EXTRA_X_OFFSET: Record<ButtonIconOnlyType, number> = {
  primary: 116,
  primaryConstantInverted: 100,
  secondary: 116,
  secondaryBrand: 116,
};

const SIZE_STATE_Y: Record<ButtonIconOnlySize, Record<ButtonIconOnlyState, number>> = {
  medium: { normal: 100, hover: 392, click: 684 },
  small: { normal: 184, hover: 476, click: 768 },
  tiny: { normal: 260, hover: 552, click: 844 },
};

/** Figma `4063:7653` — `secondaryBrand` uses segment **vivid violet**. */
export const BUTTON_ICON_ONLY_BRAND_SEGMENT = 'vivid-violet' as const;

export function buttonIconOnlyNeedsBrandSegment(type: ButtonIconOnlyType): boolean {
  return type === 'secondaryBrand';
}

function figmaPosition(
  type: ButtonIconOnlyType,
  size: ButtonIconOnlySize,
  state: ButtonIconOnlyState,
  extraPaddings: boolean,
): { figmaX: number; figmaY: number } {
  const figmaX = TYPE_BASE_X[type] + (extraPaddings ? TYPE_EXTRA_X_OFFSET[type] : 0);
  return { figmaX, figmaY: SIZE_STATE_Y[size][state] };
}

function buildButtonIconOnlyVariants(): ButtonIconOnlyVariant[] {
  const variants: ButtonIconOnlyVariant[] = [];
  for (const type of BUTTON_ICON_ONLY_TYPES) {
    for (const size of BUTTON_ICON_ONLY_SIZES) {
      for (const state of BUTTON_ICON_ONLY_STATES) {
        for (const extraPaddings of [false, true] as const) {
          const { figmaX, figmaY } = figmaPosition(type, size, state, extraPaddings);
          variants.push({ type, size, state, extraPaddings, figmaX, figmaY });
        }
      }
    }
  }
  return variants;
}

/** All 72 Figma symbols on board 4063:7653 (always hug). */
export const BUTTON_ICON_ONLY_VARIANTS: readonly ButtonIconOnlyVariant[] =
  buildButtonIconOnlyVariants();

export type ButtonIconOnlyBoardColumnSegment = 'san-marine' | 'vivid-violet';

export type ButtonIconOnlyBoardColumn = {
  type: ButtonIconOnlyType;
  left: number;
  width: number;
  segment?: ButtonIconOnlyBoardColumnSegment;
};

/** Vertical strips on `4063:7653`. */
export const BUTTON_ICON_ONLY_BOARD_COLUMNS: readonly ButtonIconOnlyBoardColumn[] = [
  { type: 'primary', left: 0, width: 412, segment: 'san-marine' },
  { type: 'primaryConstantInverted', left: 412, width: 296 },
  { type: 'secondary', left: 708, width: 312 },
  { type: 'secondaryBrand', left: 1020, width: BUTTON_ICON_ONLY_BOARD_WIDTH_PX - 1020, segment: 'vivid-violet' },
];

export function buttonIconOnlyVisualStyle(type: ButtonIconOnlyType): ButtonIconOnlyVisualStyle {
  switch (type) {
    case 'primary':
      return 'outlined-base';
    case 'primaryConstantInverted':
      return 'outlined-constantinverted';
    case 'secondary':
      return 'filled-constantinverted';
    case 'secondaryBrand':
      return 'filled-constantinverted-brand';
  }
}

export function buttonIconOnlyVariantKey(variant: ButtonIconOnlyVariant): string {
  return [
    variant.type,
    variant.size,
    variant.state,
    variant.extraPaddings ? 'extra' : 'base-pad',
  ].join('-');
}

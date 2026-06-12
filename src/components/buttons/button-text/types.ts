export type ButtonTextType = 'primary' | 'warning';

export type ButtonTextState = 'normal' | 'hover' | 'click';

export type ButtonTextVariant = {
  type: ButtonTextType;
  state: ButtonTextState;
  figmaX: number;
  figmaY: number;
};

/** Figma `button - text` component set (4090:7925). */
export const BUTTON_TEXT_FIGMA_NODE_ID = '4090:7925';

export const BUTTON_TEXT_BOARD_WIDTH_PX = 314;
export const BUTTON_TEXT_BOARD_HEIGHT_PX = 324;

export const BUTTON_TEXT_PLAYGROUND_BOUND_SIZE_PX = 500;
export const BUTTON_TEXT_PLAYGROUND_PADDING_PX = 0;

const BUTTON_TEXT_TYPES: readonly ButtonTextType[] = ['primary', 'warning'] as const;

const BUTTON_TEXT_STATES: readonly ButtonTextState[] = ['normal', 'hover', 'click'] as const;

const TYPE_BASE_X: Record<ButtonTextType, number> = {
  primary: 100,
  warning: 173,
};

const STATE_Y: Record<ButtonTextState, number> = {
  normal: 100,
  hover: 152,
  click: 204,
};

function buildButtonTextVariants(): ButtonTextVariant[] {
  const variants: ButtonTextVariant[] = [];
  for (const type of BUTTON_TEXT_TYPES) {
    for (const state of BUTTON_TEXT_STATES) {
      variants.push({
        type,
        state,
        figmaX: TYPE_BASE_X[type],
        figmaY: STATE_Y[state],
      });
    }
  }
  return variants;
}

/** All 6 Figma symbols on board 4090:7925. */
export const BUTTON_TEXT_VARIANTS: readonly ButtonTextVariant[] = buildButtonTextVariants();

export type ButtonTextBoardColumn = {
  type: ButtonTextType;
  left: number;
  width: number;
};

export const BUTTON_TEXT_BOARD_COLUMNS: readonly ButtonTextBoardColumn[] = [
  { type: 'primary', left: 0, width: 173 },
  { type: 'warning', left: 173, width: BUTTON_TEXT_BOARD_WIDTH_PX - 173 },
];

export function buttonTextVariantKey(variant: ButtonTextVariant): string {
  return `${variant.type}-${variant.state}`;
}

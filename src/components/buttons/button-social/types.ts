export type ButtonSocialType = 'tertiary';

export type ButtonSocialState = 'normal' | 'hover' | 'click';

export type ButtonSocialVariant = {
  type: ButtonSocialType;
  state: ButtonSocialState;
  figmaX: number;
  figmaY: number;
};

/** Figma `button - social` component set (4089:7750). */
export const BUTTON_SOCIAL_FIGMA_NODE_ID = '4089:7750';

export const BUTTON_SOCIAL_BOARD_WIDTH_PX = 236;
export const BUTTON_SOCIAL_BOARD_HEIGHT_PX = 348;

export const BUTTON_SOCIAL_PLAYGROUND_BOUND_SIZE_PX = 500;
export const BUTTON_SOCIAL_PLAYGROUND_PADDING_PX = 0;

/** Figma `4089:7750` pins segment **metallic** → `brandConstant/8` = `#2f5e74` @ 8%. */
export const BUTTON_SOCIAL_SEGMENT = 'metallic' as const;

const BUTTON_SOCIAL_TYPES: readonly ButtonSocialType[] = ['tertiary'] as const;

const BUTTON_SOCIAL_STATES: readonly ButtonSocialState[] = ['normal', 'hover', 'click'] as const;

const STATE_Y: Record<ButtonSocialState, number> = {
  normal: 100,
  hover: 160,
  click: 220,
};

function buildButtonSocialVariants(): ButtonSocialVariant[] {
  const variants: ButtonSocialVariant[] = [];
  for (const type of BUTTON_SOCIAL_TYPES) {
    for (const state of BUTTON_SOCIAL_STATES) {
      variants.push({ type, state, figmaX: 100, figmaY: STATE_Y[state] });
    }
  }
  return variants;
}

/** All 3 Figma symbols on board 4089:7750. */
export const BUTTON_SOCIAL_VARIANTS: readonly ButtonSocialVariant[] = buildButtonSocialVariants();

export function buttonSocialVariantKey(variant: ButtonSocialVariant): string {
  return `${variant.type}-${variant.state}`;
}

export type CheckboxItemState = 'normal' | 'hover' | 'click';

export type CheckboxItemVariant = {
  active: boolean;
  disabled: boolean;
  state: CheckboxItemState;
};

/** Shared variant matrix for checkboxToggle (4106:8718) and checkboxItem (4113:9402). */
export type CheckboxToggleVariant = CheckboxItemVariant;

/** Figma `checkboxToggle` / `checkboxItem` control size (20×20). */
export const CHECKBOX_TOGGLE_SIZE_PX = 20;

/** Figma `checkboxToggle` component set (4106:8718). */
export const CHECKBOX_TOGGLE_FIGMA_NODE_ID = '4106:8718';
export const CHECKBOX_TOGGLE_BOARD_WIDTH_PX = 272;
export const CHECKBOX_TOGGLE_BOARD_PADDING_PX = 100;
export const CHECKBOX_TOGGLE_SHOWCASE_GAP_PX = 32;
export const CHECKBOX_TOGGLE_PLAYGROUND_BOUND_PX = CHECKBOX_TOGGLE_SIZE_PX;
export const CHECKBOX_TOGGLE_PLAYGROUND_PADDING_PX = 128;

/** Figma `checkboxItem` component set (4113:9402). */
export const CHECKBOX_ITEM_FIGMA_NODE_ID = '4113:9402';
export const CHECKBOX_ITEM_BOARD_WIDTH_PX = 378;
export const CHECKBOX_ITEM_BOARD_PADDING_PX = 100;
export const CHECKBOX_ITEM_GAP_PX = 12;

/** Figma `toggle` icon inset inside 20×20 checkboxToggle (4113:9402). */
export const CHECKBOX_TOGGLE_CHECK_INSET_TOP_RATIO = 0.2765;
export const CHECKBOX_TOGGLE_CHECK_INSET_SIDE_RATIO = 0.1499;

/** Figma symbol bound ~73×20 */
export const CHECKBOX_ITEM_PLAYGROUND_BOUND_WIDTH_PX = 73;
export const CHECKBOX_ITEM_PLAYGROUND_BOUND_HEIGHT_PX = 20;
export const CHECKBOX_ITEM_PLAYGROUND_PADDING_PX = 128;

/** Figma board: 2 columns (off / on) × 4 rows */
const CHECKBOX_VARIANTS: readonly CheckboxItemVariant[] = [
  { active: false, disabled: false, state: 'normal' },
  { active: true, disabled: false, state: 'normal' },
  { active: false, disabled: false, state: 'hover' },
  { active: true, disabled: false, state: 'hover' },
  { active: false, disabled: false, state: 'click' },
  { active: true, disabled: false, state: 'click' },
  { active: false, disabled: true, state: 'normal' },
  { active: true, disabled: true, state: 'normal' },
];

export const CHECKBOX_TOGGLE_VARIANTS: readonly CheckboxToggleVariant[] = CHECKBOX_VARIANTS;
export const CHECKBOX_ITEM_VARIANTS: readonly CheckboxItemVariant[] = CHECKBOX_VARIANTS;

export function checkboxToggleVariantKey(variant: CheckboxToggleVariant): string {
  return `${variant.active ? 'on' : 'off'}-${variant.disabled ? 'disabled' : 'enabled'}-${variant.state}`;
}

export function checkboxItemVariantKey(variant: CheckboxItemVariant): string {
  return checkboxToggleVariantKey(variant);
}

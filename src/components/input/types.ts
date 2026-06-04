export type InputOutlinedState = 'normal' | 'hover' | 'click';

export type InputOutlinedVariant = {
  /** Figma `placeholder` — empty single-line label (not floated) */
  placeholder: boolean;
  active: boolean;
  filled: boolean;
  disabled: boolean;
  state: InputOutlinedState;
};

/** Figma `input - outlined` component set (4136:3424). */
export const INPUT_OUTLINED_FIGMA_NODE_ID = '4136:3424';

export const INPUT_OUTLINED_WIDTH_PX = 500;
export const INPUT_OUTLINED_MIN_HEIGHT_PX = 56;

/** Figma board 756×1032 — 128px inset around 500px field */
export const INPUT_OUTLINED_BOARD_WIDTH_PX = 756;

export const INPUT_OUTLINED_PLAYGROUND_BOUND_WIDTH_PX = INPUT_OUTLINED_WIDTH_PX;
export const INPUT_OUTLINED_PLAYGROUND_BOUND_HEIGHT_PX = INPUT_OUTLINED_MIN_HEIGHT_PX;
export const INPUT_OUTLINED_PLAYGROUND_PADDING_PX = 128;

/** Figma board order (4136:3424) — top to bottom */
export const INPUT_OUTLINED_VARIANTS: readonly InputOutlinedVariant[] = [
  { placeholder: true, active: false, filled: false, disabled: false, state: 'normal' },
  { placeholder: true, active: false, filled: false, disabled: false, state: 'hover' },
  { placeholder: true, active: false, filled: false, disabled: false, state: 'click' },
  { placeholder: false, active: true, filled: false, disabled: false, state: 'normal' },
  { placeholder: false, active: false, filled: true, disabled: false, state: 'normal' },
  { placeholder: true, active: false, filled: false, disabled: true, state: 'normal' },
  { placeholder: false, active: false, filled: false, disabled: true, state: 'normal' },
];

export function inputOutlinedVariantKey(variant: InputOutlinedVariant): string {
  return [
    variant.placeholder ? 'placeholder' : 'floated',
    variant.active ? 'active' : 'idle',
    variant.filled ? 'filled' : 'empty',
    variant.disabled ? 'disabled' : 'enabled',
    variant.state,
  ].join('-');
}

export function inputOutlinedDisplayValue(
  variant: Pick<InputOutlinedVariant, 'active' | 'filled' | 'disabled'>,
  value: string,
): string {
  if (variant.filled) {
    return value;
  }
  if (variant.active) {
    return 'l';
  }
  if (variant.disabled) {
    return value;
  }
  return '';
}

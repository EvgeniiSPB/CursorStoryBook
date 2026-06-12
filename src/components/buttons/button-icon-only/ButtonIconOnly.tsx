import type { ButtonHTMLAttributes } from 'react';
import { ButtonPlaceholderIcon } from '../shared/ButtonPlaceholderIcon';
import {
  BUTTON_ICON_ONLY_BRAND_SEGMENT,
  buttonIconOnlyNeedsBrandSegment,
  buttonIconOnlyVisualStyle,
  type ButtonIconOnlySize,
  type ButtonIconOnlyState,
  type ButtonIconOnlyType,
  type ButtonIconOnlyVariant,
} from './types';
import './button-icon-only.css';

export interface ButtonIconOnlyProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'disabled' | 'type'> {
  type?: ButtonIconOnlyType;
  size?: ButtonIconOnlySize;
  extraPaddings?: boolean;
  disabled?: boolean;
  /** Storybook static rows; omit for live :hover/:active */
  state?: ButtonIconOnlyState;
  className?: string;
  /** Accessible name (required for icon-only buttons). */
  'aria-label'?: string;
}

export function ButtonIconOnly({
  type = 'primary',
  size = 'medium',
  extraPaddings = false,
  disabled = false,
  state,
  className,
  'aria-label': ariaLabel = 'Action',
  ...buttonProps
}: ButtonIconOnlyProps) {
  const staticPreview = state !== undefined;
  const visualStyle = buttonIconOnlyVisualStyle(type);

  const rootClasses = [
    'button-icon-only',
    `button-icon-only--visual-${visualStyle}`,
    `button-icon-only--size-${size}`,
    extraPaddings ? 'button-icon-only--extra-paddings' : '',
    disabled ? 'button-icon-only--disabled' : '',
    state && state !== 'normal' ? `button-icon-only--state-${state}` : '',
    staticPreview ? 'button-icon-only--static' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const brandSegment = buttonIconOnlyNeedsBrandSegment(type)
    ? BUTTON_ICON_ONLY_BRAND_SEGMENT
    : undefined;

  return (
    <button
      type="button"
      className={rootClasses}
      disabled={disabled}
      aria-label={ariaLabel}
      data-name="button - icon only"
      {...(brandSegment ? { 'data-segment': brandSegment } : {})}
      {...buttonProps}
    >
      <ButtonPlaceholderIcon className="button-icon-only__icon" />
    </button>
  );
}

export function buttonIconOnlyPropsFromVariant(variant: ButtonIconOnlyVariant): ButtonIconOnlyProps {
  return {
    type: variant.type,
    size: variant.size,
    extraPaddings: variant.extraPaddings,
    state: variant.state,
  };
}

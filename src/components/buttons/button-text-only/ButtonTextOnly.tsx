import type { ButtonHTMLAttributes, CSSProperties } from 'react';
import { TextCore } from '../../atoms/text-core/TextCore';
import {
  BUTTON_TEXT_ONLY_BRAND_SEGMENT,
  BUTTON_TEXT_ONLY_FILL_WIDTH_PX,
  buttonTextOnlyNeedsBrandSegment,
  buttonTextOnlyVisualStyle,
  type ButtonTextOnlySize,
  type ButtonTextOnlyState,
  type ButtonTextOnlyType,
  type ButtonTextOnlyVariant,
} from './types';
import './button-text-only.css';

export interface ButtonTextOnlyProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'disabled' | 'type'> {
  children?: string;
  type?: ButtonTextOnlyType;
  size?: ButtonTextOnlySize;
  extraPaddings?: boolean;
  fillHug?: boolean;
  disabled?: boolean;
  /** Storybook static rows; omit for live :hover/:active */
  state?: ButtonTextOnlyState;
  className?: string;
}

export function ButtonTextOnly({
  children = 'Value',
  type = 'primary',
  size = 'medium',
  extraPaddings = false,
  fillHug = false,
  disabled = false,
  state,
  className,
  style,
  ...buttonProps
}: ButtonTextOnlyProps) {
  const staticPreview = state !== undefined;
  const visualStyle = buttonTextOnlyVisualStyle(type);

  const rootClasses = [
    'button-text-only',
    `button-text-only--visual-${visualStyle}`,
    `button-text-only--size-${size}`,
    extraPaddings ? 'button-text-only--extra-paddings' : '',
    fillHug ? 'button-text-only--fill-hug' : 'button-text-only--fill-fixed',
    disabled ? 'button-text-only--disabled' : '',
    state && state !== 'normal' ? `button-text-only--state-${state}` : '',
    staticPreview ? 'button-text-only--static' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const rootStyle = {
    ...(fillHug
      ? {}
      : ({ '--button-text-only-width': `${BUTTON_TEXT_ONLY_FILL_WIDTH_PX}px` } as CSSProperties)),
    ...style,
  } as CSSProperties;

  const labelClass = [
    'button-text-only__label',
    extraPaddings && fillHug ? 'button-text-only__label--hug-extra' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const brandSegment = buttonTextOnlyNeedsBrandSegment(type)
    ? BUTTON_TEXT_ONLY_BRAND_SEGMENT
    : undefined;

  return (
    <button
      type="button"
      className={rootClasses}
      style={rootStyle}
      disabled={disabled}
      data-name="button - text only"
      {...(brandSegment ? { 'data-segment': brandSegment } : {})}
      {...buttonProps}
    >
      <TextCore typography="bodyM" fontWeight="regular" text={children} className={labelClass} />
    </button>
  );
}

export function buttonTextOnlyPropsFromVariant(variant: ButtonTextOnlyVariant): ButtonTextOnlyProps {
  return {
    type: variant.type,
    size: variant.size,
    extraPaddings: variant.extraPaddings,
    fillHug: variant.fillHug,
    state: variant.state,
  };
}

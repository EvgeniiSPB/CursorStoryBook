import type { ButtonHTMLAttributes, CSSProperties } from 'react';
import { TextCore } from '../../atoms/text-core/TextCore';
import { ButtonPlaceholderIcon } from '../shared/ButtonPlaceholderIcon';
import {
  BUTTON_TEXT_ICON_BRAND_SEGMENT,
  BUTTON_TEXT_ICON_FILL_WIDTH_PX,
  buttonTextIconNeedsBrandSegment,
  buttonTextIconVisualStyle,
  type ButtonTextIconSize,
  type ButtonTextIconState,
  type ButtonTextIconType,
  type ButtonTextIconVariant,
} from './types';
import './button-text-icon.css';

export interface ButtonTextIconProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'disabled' | 'type'> {
  children?: string;
  type?: ButtonTextIconType;
  size?: ButtonTextIconSize;
  extraPaddings?: boolean;
  fillHug?: boolean;
  disabled?: boolean;
  /** Storybook static rows; omit for live :hover/:active */
  state?: ButtonTextIconState;
  className?: string;
}

export function ButtonTextIcon({
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
}: ButtonTextIconProps) {
  const staticPreview = state !== undefined;
  const visualStyle = buttonTextIconVisualStyle(type);

  const rootClasses = [
    'button-text-icon',
    `button-text-icon--visual-${visualStyle}`,
    `button-text-icon--size-${size}`,
    extraPaddings ? 'button-text-icon--extra-paddings' : '',
    fillHug ? 'button-text-icon--fill-hug' : 'button-text-icon--fill-fixed',
    disabled ? 'button-text-icon--disabled' : '',
    state && state !== 'normal' ? `button-text-icon--state-${state}` : '',
    staticPreview ? 'button-text-icon--static' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const rootStyle = {
    ...(fillHug
      ? {}
      : ({ '--button-text-icon-width': `${BUTTON_TEXT_ICON_FILL_WIDTH_PX}px` } as CSSProperties)),
    ...style,
  } as CSSProperties;

  const labelClass = [
    'button-text-icon__label',
    extraPaddings && fillHug ? 'button-text-icon__label--hug-extra' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const brandSegment = buttonTextIconNeedsBrandSegment(type)
    ? BUTTON_TEXT_ICON_BRAND_SEGMENT
    : undefined;

  return (
    <button
      type="button"
      className={rootClasses}
      style={rootStyle}
      disabled={disabled}
      data-name="button - text + icon"
      {...(brandSegment ? { 'data-segment': brandSegment } : {})}
      {...buttonProps}
    >
      <ButtonPlaceholderIcon className="button-text-icon__icon" />
      <TextCore typography="bodyM" fontWeight="regular" text={children} className={labelClass} />
    </button>
  );
}

export function buttonTextIconPropsFromVariant(variant: ButtonTextIconVariant): ButtonTextIconProps {
  return {
    type: variant.type,
    size: variant.size,
    extraPaddings: variant.extraPaddings,
    fillHug: variant.fillHug,
    state: variant.state,
  };
}

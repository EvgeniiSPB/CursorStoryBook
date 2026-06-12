import type { ButtonHTMLAttributes } from 'react';
import { TextCore } from '../../atoms/text-core/TextCore';
import {
  type ButtonTextState,
  type ButtonTextType,
  type ButtonTextVariant,
} from './types';
import './button-text.css';

export interface ButtonTextProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'disabled' | 'type'> {
  children?: string;
  type?: ButtonTextType;
  disabled?: boolean;
  /** Storybook static rows; omit for live :hover/:active */
  state?: ButtonTextState;
  className?: string;
}

export function ButtonText({
  children = 'Value',
  type = 'primary',
  disabled = false,
  state,
  className,
  ...buttonProps
}: ButtonTextProps) {
  const staticPreview = state !== undefined;

  const rootClasses = [
    'button-text',
    `button-text--type-${type}`,
    disabled ? 'button-text--disabled' : '',
    state && state !== 'normal' ? `button-text--state-${state}` : '',
    staticPreview ? 'button-text--static' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" className={rootClasses} disabled={disabled} data-name="button - text" {...buttonProps}>
      <TextCore typography="bodyM" fontWeight="regular" text={children} className="button-text__label" />
    </button>
  );
}

export function buttonTextPropsFromVariant(variant: ButtonTextVariant): ButtonTextProps {
  return {
    type: variant.type,
    state: variant.state,
  };
}

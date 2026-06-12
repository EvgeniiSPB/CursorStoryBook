import type { ButtonHTMLAttributes } from 'react';
import {
  BUTTON_SOCIAL_SEGMENT,
  type ButtonSocialState,
  type ButtonSocialType,
  type ButtonSocialVariant,
} from './types';
import './button-social.css';

export interface ButtonSocialProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'disabled' | 'type'> {
  children?: string;
  type?: ButtonSocialType;
  disabled?: boolean;
  /** Storybook static rows; omit for live :hover/:active */
  state?: ButtonSocialState;
  className?: string;
}

export function ButtonSocial({
  children = 'vk',
  type = 'tertiary',
  disabled = false,
  state,
  className,
  ...buttonProps
}: ButtonSocialProps) {
  const staticPreview = state !== undefined;

  const rootClasses = [
    'button-social',
    `button-social--type-${type}`,
    disabled ? 'button-social--disabled' : '',
    state && state !== 'normal' ? `button-social--state-${state}` : '',
    staticPreview ? 'button-social--static' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={rootClasses}
      disabled={disabled}
      data-name="button - social"
      {...buttonProps}
      data-segment={BUTTON_SOCIAL_SEGMENT}
    >
      <span className="button-social__core">
        <span className="button-social__label badge-label-base">{children}</span>
      </span>
    </button>
  );
}

export function buttonSocialPropsFromVariant(variant: ButtonSocialVariant): ButtonSocialProps {
  return {
    type: variant.type,
    state: variant.state,
  };
}

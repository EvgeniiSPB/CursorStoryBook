import type { ButtonHTMLAttributes, CSSProperties } from 'react';
import checkmarkBodyM from '../../../assets/toggle/checkmark-body-m.svg';
import checkmarkBodyS from '../../../assets/toggle/checkmark-body-s.svg';
import {
  toggleTypographyToCssVar,
  type ToggleType,
  type ToggleTypography,
} from './types';
import './toggle.css';

const CHECKMARK_SRC: Record<ToggleTypography, string> = {
  bodyS: checkmarkBodyS,
  bodyM: checkmarkBodyM,
};

export interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  type?: ToggleType;
  typography?: ToggleTypography;
  active?: boolean;
  className?: string;
}

export function Toggle({
  type = 'checkBox',
  typography = 'bodyS',
  active = false,
  className,
  disabled,
  style,
  ...buttonProps
}: ToggleProps) {
  const rootClasses = [
    'toggle',
    `toggle--${type}`,
    `toggle--${typography}`,
    active ? 'toggle--active' : 'toggle--off',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const rootStyle = {
    '--toggle-size': toggleTypographyToCssVar(typography),
    ...style,
  } as CSSProperties;

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={active}
      disabled={disabled}
      className={rootClasses}
      style={rootStyle}
      {...buttonProps}
    >
      <span className="toggle__viewbox" aria-hidden>
        {active ? (
          <img className="toggle__check" src={CHECKMARK_SRC[typography]} alt="" />
        ) : null}
      </span>
    </button>
  );
}

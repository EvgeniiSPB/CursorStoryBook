// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
void React;
import type { HTMLAttributes, ReactNode } from 'react';
import './icon-only-button.css';

export interface IconOnlyButtonProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, 'children' | 'type'> {
  /** Slot for the icon — usually one of the inline SVG components. */
  icon: ReactNode;
  /** Visible label for assistive tech (the button has no text). */
  ariaLabel: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function IconOnlyButton({
  icon,
  ariaLabel,
  onClick,
  disabled = false,
  className,
  ...props
}: IconOnlyButtonProps) {
  const classes = ['rsp-icon-only-button', className].filter(Boolean).join(' ');
  return (
    <button
      type="button"
      className={classes}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      aria-label={ariaLabel}
      {...props}
    >
      <span className="rsp-icon-only-button__icon" aria-hidden="true">
        {icon}
      </span>
    </button>
  );
}

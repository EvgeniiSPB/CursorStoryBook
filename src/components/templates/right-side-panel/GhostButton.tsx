// React required for classic JSX in Storybook manager bundle.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
void React;
import type { HTMLAttributes } from 'react';
import { ResetIcon } from './internal-icons';
import './ghost-button.css';

export interface GhostButtonProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, 'disabled' | 'type'> {
  label?: string;
  disabled?: boolean;
  onClick?: () => void;
}

/** Ghost button with reset icon + uppercase label — used for the "Reset all"
 *  action in the panel header. Disabled when no story args have been changed. */
export function GhostButton({
  label = 'reset all',
  disabled = false,
  onClick,
  className,
  ...props
}: GhostButtonProps) {
  const classes = ['rsp-ghost-button', className].filter(Boolean).join(' ');
  return (
    <button
      type="button"
      className={classes}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      data-name="ghost"
      {...props}
    >
      <span className="rsp-ghost-button__icon" aria-hidden="true">
        <ResetIcon />
      </span>
      <span className="rsp-ghost-button__label">{label}</span>
    </button>
  );
}

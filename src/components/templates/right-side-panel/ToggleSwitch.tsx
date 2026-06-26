// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
void React;
import type { HTMLAttributes } from 'react';
import './toggle-switch.css';

export interface ToggleSwitchProps
  extends Omit<HTMLAttributes<HTMLButtonElement>, 'onChange' | 'type'> {
  on: boolean;
  onChange?: (next: boolean) => void;
  disabled?: boolean;
}

/** Pill-shaped on/off switch — 34×20 per Figma node 6553:41059. */
export function ToggleSwitch({
  on,
  onChange,
  disabled = false,
  className,
  ...props
}: ToggleSwitchProps) {
  const classes = [
    'rsp-toggle-switch',
    on ? 'rsp-toggle-switch--on' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      disabled={disabled}
      className={classes}
      onClick={disabled ? undefined : () => onChange?.(!on)}
      {...props}
    >
      <span className="rsp-toggle-switch__knob" aria-hidden="true" />
    </button>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
void React;
import type { HTMLAttributes } from 'react';
import { ToggleSwitch } from './ToggleSwitch';
import './toggle-row.css';

export interface ToggleRowProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  label: string;
  on: boolean;
  onChange?: (next: boolean) => void;
  firstChild?: boolean;
  disabled?: boolean;
}

/** Full-width row (375×56) with label + pill switch — Figma node 6553:41064. */
export function ToggleRow({
  label,
  on,
  onChange,
  firstChild = false,
  disabled = false,
  className,
  ...rest
}: ToggleRowProps) {
  const classes = [
    'rsp-toggle-row',
    firstChild ? 'rsp-toggle-row--first-child' : '',
    on ? 'rsp-toggle-row--on' : '',
    disabled ? 'rsp-toggle-row--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // The whole row is clickable for a generous touch target — but only when the
  // switch itself isn't focused (avoids double-toggle through event bubbling).
  const handleRowClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    const target = e.target as HTMLElement;
    if (target.closest('.rsp-toggle-switch')) return;
    onChange?.(!on);
  };

  return (
    <div className={classes} data-name="toggle-row" onClick={handleRowClick} {...rest}>
      <span className="rsp-toggle-row__label">{label}</span>
      <ToggleSwitch on={on} onChange={onChange} disabled={disabled} />
    </div>
  );
}

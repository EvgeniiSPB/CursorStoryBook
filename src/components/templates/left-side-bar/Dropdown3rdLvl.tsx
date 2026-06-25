// React required for classic JSX in Storybook manager bundle (uses Storybook-bundled React 18 via global externals).
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
void React; // satisfy noUnusedLocals — React is used at runtime by classic JSX transform
import type { HTMLAttributes } from 'react';
import {
  DROPDOWN_3RD_DEFAULT_LABEL,
  type Dropdown3rdLvlState,
} from './types';
import './left-side-bar-dropdown-3rd.css';

export interface Dropdown3rdLvlProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  label?: string;
  /** Figma axis `state`. */
  state?: Dropdown3rdLvlState;
}

export function Dropdown3rdLvl({
  label = DROPDOWN_3RD_DEFAULT_LABEL,
  state = 'rest',
  className,
  ...props
}: Dropdown3rdLvlProps) {
  // Only hoverCurrent/hoverOther are preview-only (mimic real :hover for storybook).
  // `active` and `nonActive` are real interactive states — clicks must still fire.
  const staticPreview = state === 'hoverCurrent' || state === 'hoverOther';

  const classes = [
    'left-side-bar-dropdown-3rd',
    `left-side-bar-dropdown-3rd--state-${state}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classes}
      data-name="dropdown 3rd lvl"
      role="link"
      tabIndex={0}
      aria-current={state === 'active' ? 'page' : undefined}
      {...(staticPreview ? { 'data-static-state': state } : {})}
      {...props}
    >
      <span className="left-side-bar-dropdown-3rd__label">{label}</span>
    </div>
  );
}

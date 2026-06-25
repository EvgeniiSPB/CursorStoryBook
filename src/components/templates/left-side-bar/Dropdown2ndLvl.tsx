// React required for classic JSX in Storybook manager bundle (uses Storybook-bundled React 18 via global externals).
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
void React; // satisfy noUnusedLocals — React is used at runtime by classic JSX transform
import type { HTMLAttributes, ReactNode } from 'react';
import { CaretDownIcon } from './internal-icons';
import { DROPDOWN_2ND_DEFAULT_LABEL, type DropdownLvlState } from './types';
import './left-side-bar-dropdown-2nd.css';

export interface Dropdown2ndLvlProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onClick'> {
  label?: string;
  open?: boolean;
  /** Figma axis `state`. */
  state?: DropdownLvlState;
  /** Figma axis `first child` — hides the top divider. */
  firstChild?: boolean;
  /** Slot rendered below the trigger when `open` is true (typically Dropdown3rdLvl items). */
  children?: ReactNode;
  /** Fires only when the trigger row is clicked — bubbling from children won't toggle this. */
  onClick?: HTMLAttributes<HTMLDivElement>['onClick'];
}

export function Dropdown2ndLvl({
  label = DROPDOWN_2ND_DEFAULT_LABEL,
  open = false,
  state = 'rest',
  firstChild = false,
  children,
  className,
  onClick,
  ...props
}: Dropdown2ndLvlProps) {
  const staticPreview = state === 'hover';

  const classes = [
    'left-side-bar-dropdown-2nd',
    open ? 'left-side-bar-dropdown-2nd--open' : '',
    state === 'hover' ? 'left-side-bar-dropdown-2nd--state-hover' : '',
    firstChild ? 'left-side-bar-dropdown-2nd--first-child' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classes}
      data-name="dropdown 2nd lvl"
      {...(staticPreview ? { 'data-static-state': state } : {})}
      {...props}
    >
      <div
        className="left-side-bar-dropdown-2nd__trigger"
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-expanded={open}
      >
        <span className="left-side-bar-dropdown-2nd__label">{label}</span>
        <span className="left-side-bar-dropdown-2nd__icon" aria-hidden="true">
          <CaretDownIcon />
        </span>
      </div>
      {children ? (
        <div className="left-side-bar-dropdown-2nd__children-wrap">
          <div className="left-side-bar-dropdown-2nd__children">{children}</div>
        </div>
      ) : null}
    </div>
  );
}

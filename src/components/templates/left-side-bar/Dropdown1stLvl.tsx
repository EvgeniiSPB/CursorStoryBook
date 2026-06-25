// React required for classic JSX in Storybook manager bundle (uses Storybook-bundled React 18 via global externals).
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
void React; // satisfy noUnusedLocals — React is used at runtime by classic JSX transform
import type { HTMLAttributes, ReactNode } from 'react';
import { CaretDownIcon } from './internal-icons';
import { DROPDOWN_1ST_DEFAULT_LABEL, type DropdownLvlState } from './types';
import './left-side-bar-dropdown-1st.css';

export interface Dropdown1stLvlProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onClick'> {
  label?: string;
  open?: boolean;
  /** Figma axis `state`. */
  state?: DropdownLvlState;
  /** Removes the top divider — used for the first 1st-lvl row in a section (heading provides its own border-bottom). */
  firstChild?: boolean;
  /** Layout of the children area when open.
   *  `'grouped'` (default) — vertical stack of `Dropdown2ndLvl` rows, padding `0 16px 0 40px`.
   *  `'flat'` — direct list of `Dropdown3rdLvl` leaves, padding `12px 40px` (matches Figma Assets/Icons exception). */
  layout?: 'grouped' | 'flat';
  /** Slot rendered below the trigger when `open` is true. */
  children?: ReactNode;
  /** Fires only when the trigger row is clicked — bubbling from children won't toggle this. */
  onClick?: HTMLAttributes<HTMLDivElement>['onClick'];
}

export function Dropdown1stLvl({
  label = DROPDOWN_1ST_DEFAULT_LABEL,
  open = false,
  state = 'rest',
  firstChild = false,
  layout = 'grouped',
  children,
  className,
  onClick,
  ...props
}: Dropdown1stLvlProps) {
  const staticPreview = state === 'hover';

  const classes = [
    'left-side-bar-dropdown-1st',
    open ? 'left-side-bar-dropdown-1st--open' : '',
    state === 'hover' ? 'left-side-bar-dropdown-1st--state-hover' : '',
    firstChild ? 'left-side-bar-dropdown-1st--first-child' : '',
    layout === 'flat' ? 'left-side-bar-dropdown-1st--layout-flat' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classes}
      data-name="dropdown 1st lvl"
      {...(staticPreview ? { 'data-static-state': state } : {})}
      {...props}
    >
      <div
        className="left-side-bar-dropdown-1st__trigger"
        onClick={onClick}
        role="button"
        tabIndex={0}
        aria-expanded={open}
      >
        <span className="left-side-bar-dropdown-1st__label">{label}</span>
        <span className="left-side-bar-dropdown-1st__icon" aria-hidden="true">
          <CaretDownIcon />
        </span>
      </div>
      {children ? (
        <div className="left-side-bar-dropdown-1st__children-wrap">
          <div className="left-side-bar-dropdown-1st__children">{children}</div>
        </div>
      ) : null}
    </div>
  );
}

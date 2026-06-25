// React required for classic JSX in Storybook manager bundle (uses Storybook-bundled React 18 via global externals).
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
void React; // satisfy noUnusedLocals — React is used at runtime by classic JSX transform
import type { HTMLAttributes } from 'react';
import {
  DROPDOWN_HEADING_DEFAULT_COUNT,
  DROPDOWN_HEADING_DEFAULT_LABEL,
  type DropdownHeadingBadge,
} from './types';
import './left-side-bar-heading.css';

export interface DropdownHeadingProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  label?: string;
  count?: number | string;
  /** Figma axis `badge`. */
  badge?: DropdownHeadingBadge;
}

export function DropdownHeading({
  label = DROPDOWN_HEADING_DEFAULT_LABEL,
  count = DROPDOWN_HEADING_DEFAULT_COUNT,
  badge = 'metallic',
  className,
  ...props
}: DropdownHeadingProps) {
  const countText = String(count);
  // Fixed-width buckets per Figma: 1 → narrow, 1-2 digits → mid, 3 digits → wide.
  const chars = countText.length >= 3 ? '3' : countText.length === 2 ? '2' : '1';

  const classes = [
    'left-side-bar-heading',
    `left-side-bar-heading--badge-${badge}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} data-name="dropdown heading" {...props}>
      <span className="left-side-bar-heading__label">{label}</span>
      <span className="left-side-bar-heading__counter" data-name="counter">
        <span
          className="left-side-bar-heading__counter-label"
          data-chars={chars}
        >
          {countText}
        </span>
      </span>
    </div>
  );
}

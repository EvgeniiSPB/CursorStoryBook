// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
void React;
import type { HTMLAttributes, ReactNode } from 'react';
import './select-row.css';

export interface SelectRowProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'children'> {
  label: string;
  /** Open state controlled by parent so the composer can auto-collapse siblings. */
  open: boolean;
  onOpenChange: (next: boolean) => void;
  firstChild?: boolean;
  /** Slot for the option rows (typically `<Dropdown3rdLvl>` from left-side-bar). */
  children?: ReactNode;
}

/** Disclosure row (375×56 closed / column when open) — Figma node 6553:41083.
 *  Reuses left-side-bar's `Dropdown3rdLvl` for the option list inside. */
export function SelectRow({
  label,
  open,
  onOpenChange,
  firstChild = false,
  children,
  className,
  ...rest
}: SelectRowProps) {
  const classes = [
    'rsp-select-row',
    open ? 'rsp-select-row--open' : '',
    firstChild ? 'rsp-select-row--first-child' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} data-name="select-row" {...rest}>
      <div
        className="rsp-select-row__trigger"
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onClick={() => onOpenChange(!open)}
      >
        <span className="rsp-select-row__label">{label}</span>
        {/* Plus ↔ minus morph: vertical bar scales to 0 on open. */}
        <span className="rsp-select-row__icon" aria-hidden="true">
          <span className="rsp-select-toggle-icon" data-open={open}>
            <span className="rsp-select-toggle-icon__bar rsp-select-toggle-icon__bar--h" />
            <span className="rsp-select-toggle-icon__bar rsp-select-toggle-icon__bar--v" />
          </span>
        </span>
      </div>
      {children ? (
        <div className="rsp-select-row__children-wrap">
          <div className="rsp-select-row__children">{children}</div>
        </div>
      ) : null}
    </div>
  );
}

// React required for classic JSX in Storybook manager bundle (uses Storybook-bundled React 18 via global externals).
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
void React; // satisfy noUnusedLocals — React is used at runtime by classic JSX transform
import type { HTMLAttributes, MouseEventHandler } from 'react';
import { IconOnlyButton } from '../right-side-panel/IconOnlyButton';
import { SidebarClosedIcon, SidebarMark, SidebarWordmark } from './internal-icons';
import './logo.css';

export interface LogoProps extends HTMLAttributes<HTMLElement> {
  /** When set, the mark + wordmark area becomes a clickable button. */
  onClick?: MouseEventHandler<HTMLElement>;
  /** When set, a 40×40 borderless "collapse sidebar" icon-only button is
   *  rendered at the right edge of the plate (Figma 6567:40878). */
  onCollapse?: () => void;
}

/** Sidebar header — Figma node `6520:95024`. The mark + wordmark area is
 *  rendered as `<button>` when `onClick` is provided. When `onCollapse` is
 *  set, an additional icon-only button appears on the right for collapsing
 *  the whole sidebar — the two click targets are separate. */
export function Logo({ className, onClick, onCollapse, ...props }: LogoProps) {
  const classes = ['left-side-bar-logo', className].filter(Boolean).join(' ');

  const brandContent = (
    <>
      <span className="left-side-bar-logo__mark" aria-hidden="true">
        <SidebarMark />
      </span>
      <span className="left-side-bar-logo__divider" aria-hidden="true" />
      <span className="left-side-bar-logo__wordmark" aria-label="Design System">
        <SidebarWordmark />
      </span>
    </>
  );

  const brand = onClick ? (
    <button
      type="button"
      className="left-side-bar-logo__brand left-side-bar-logo__brand--button"
      onClick={onClick}
    >
      {brandContent}
    </button>
  ) : (
    <div className="left-side-bar-logo__brand">{brandContent}</div>
  );

  return (
    <div
      className={classes}
      data-name="logo"
      {...(props as HTMLAttributes<HTMLDivElement>)}
    >
      {brand}
      {onCollapse && (
        <IconOnlyButton
          className="rsp-icon-only-button--bare left-side-bar-logo__collapse"
          icon={<SidebarClosedIcon />}
          ariaLabel="Collapse sidebar"
          onClick={onCollapse}
        />
      )}
    </div>
  );
}

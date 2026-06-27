// React required for classic JSX in Storybook manager bundle (uses Storybook-bundled React 18 via global externals).
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
void React; // satisfy noUnusedLocals — React is used at runtime by classic JSX transform
import type { HTMLAttributes, MouseEventHandler } from 'react';
import { SidebarMark, SidebarWordmark } from './internal-icons';
import './logo.css';

export interface LogoProps extends HTMLAttributes<HTMLElement> {
  /** When set, the whole mark + wordmark area becomes a clickable button. */
  onClick?: MouseEventHandler<HTMLElement>;
}

/** Sidebar header — Figma node `6520:95024`. Renders as `<button>` when
 *  `onClick` is provided so the entire mark/wordmark area is clickable (no
 *  hover styling per spec — colour stays constant on interaction). */
export function Logo({ className, onClick, ...props }: LogoProps) {
  const classes = ['left-side-bar-logo', className].filter(Boolean).join(' ');

  const content = (
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

  if (onClick) {
    return (
      <button
        type="button"
        className={classes}
        data-name="logo"
        onClick={onClick}
        {...(props as HTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }

  return (
    <div className={classes} data-name="logo" {...(props as HTMLAttributes<HTMLDivElement>)}>
      {content}
    </div>
  );
}

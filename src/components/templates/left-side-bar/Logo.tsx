// React required for classic JSX in Storybook manager bundle (uses Storybook-bundled React 18 via global externals).
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
void React; // satisfy noUnusedLocals — React is used at runtime by classic JSX transform
import type { HTMLAttributes } from 'react';
import { SidebarMark, SidebarWordmark } from './internal-icons';
import './logo.css';

export type LogoProps = HTMLAttributes<HTMLDivElement>;

/** Sidebar header — Figma node `6520:95024`. */
export function Logo({ className, ...props }: LogoProps) {
  const classes = ['left-side-bar-logo', className].filter(Boolean).join(' ');

  return (
    <div className={classes} data-name="logo" {...props}>
      <span className="left-side-bar-logo__mark" aria-hidden="true">
        <SidebarMark />
      </span>
      <span className="left-side-bar-logo__divider" aria-hidden="true" />
      <span className="left-side-bar-logo__wordmark" aria-label="Design System">
        <SidebarWordmark />
      </span>
    </div>
  );
}

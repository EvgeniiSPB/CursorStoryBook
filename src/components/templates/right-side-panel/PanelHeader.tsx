// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
void React;
import type { HTMLAttributes } from 'react';
import { GhostButton } from './GhostButton';
import { IconOnlyButton } from './IconOnlyButton';
import { CloseIcon } from './internal-icons';
import './panel-header.css';

export interface PanelHeaderProps extends HTMLAttributes<HTMLDivElement> {
  resetDisabled?: boolean;
  onReset?: () => void;
  onClose?: () => void;
  resetLabel?: string;
}

/** Top bar of the RightSidePanel (Figma node 6553:41036).
 *  Layout: 40×40 placeholder left, ghost "RESET ALL" centered, close button right. */
export function PanelHeader({
  resetDisabled = true,
  onReset,
  onClose,
  resetLabel = 'reset all',
  className,
  ...rest
}: PanelHeaderProps) {
  const classes = ['rsp-panel-header', className].filter(Boolean).join(' ');
  return (
    <div className={classes} data-name="panel-header" {...rest}>
      <div className="rsp-panel-header__spacer" aria-hidden="true" />
      <GhostButton
        label={resetLabel}
        disabled={resetDisabled}
        onClick={onReset}
      />
      <IconOnlyButton
        icon={<CloseIcon />}
        ariaLabel="Close controls panel"
        onClick={onClose}
        rotateOnHover={90}
      />
    </div>
  );
}

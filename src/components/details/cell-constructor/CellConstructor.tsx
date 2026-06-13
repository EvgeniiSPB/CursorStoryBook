import type { HTMLAttributes, ReactNode } from 'react';
import { SwapPlaceholder } from '../swap-placeholder';
import { type CellConstructorPaddingSize } from './types';
import './cell-constructor.css';

export interface CellConstructorProps extends HTMLAttributes<HTMLDivElement> {
  /** Show the left column (ignored when `fullWidth`). */
  left?: boolean;
  /** Show the right column (ignored when `fullWidth`). */
  right?: boolean;
  /** Collapse to a single full-width cell. */
  fullWidth?: boolean;
  /** Add top padding sized by `paddingSize`. */
  tPadding?: boolean;
  /** Selects the active middle slot. */
  paddingSize?: CellConstructorPaddingSize;
  leftCell?: ReactNode;
  rightCell?: ReactNode;
  fullWidthCell?: ReactNode;
  /** Middle content for `paddingSize="---"`. */
  middleCell?: ReactNode;
  middleTiny?: ReactNode;
  middleSmall?: ReactNode;
  middleMedium?: ReactNode;
  middleLarge?: ReactNode;
}

/**
 * Figma `cellConstructor` (4301:4032) — article layout shell.
 *
 * Three-column mode: `left` (flex, top-aligned) / middle (fixed 752px) / `right`
 * (flex, bottom-aligned). The active middle slot is chosen by `paddingSize`.
 * `fullWidth` collapses everything into one 1600px cell. Empty slots render a
 * dashed `SwapPlaceholder` (Figma `!change this`).
 */
export function CellConstructor({
  left = true,
  right = true,
  fullWidth = false,
  tPadding = false,
  paddingSize = '---',
  leftCell,
  rightCell,
  fullWidthCell,
  middleCell,
  middleTiny,
  middleSmall,
  middleMedium,
  middleLarge,
  className,
  ...props
}: CellConstructorProps) {
  const middleByPadding: Record<CellConstructorPaddingSize, ReactNode> = {
    '---': middleCell,
    tiny: middleTiny,
    small: middleSmall,
    medium: middleMedium,
    large: middleLarge,
  };
  const middleContent = middleByPadding[paddingSize];

  const hasTopPadding = tPadding && paddingSize !== '---';

  const classes = [
    'cell-constructor',
    fullWidth ? 'cell-constructor--full-width' : 'cell-constructor--columns',
    hasTopPadding ? `cell-constructor--pt-${paddingSize}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} data-name="cellConstructor" data-padding-size={paddingSize} {...props}>
      {fullWidth ? (
        <div className="cell-constructor__slot--full" data-name="fullWidth">
          {fullWidthCell ?? <SwapPlaceholder />}
        </div>
      ) : (
        <>
          {left ? (
            <div className="cell-constructor__slot--left" data-name="left">
              {leftCell ?? <SwapPlaceholder />}
            </div>
          ) : (
            <div className="cell-constructor__spacer" aria-hidden />
          )}
          <div className="cell-constructor__slot--middle" data-name="middle">
            {middleContent ?? <SwapPlaceholder />}
          </div>
          {right ? (
            <div className="cell-constructor__slot--right" data-name="right">
              {rightCell ?? <SwapPlaceholder />}
            </div>
          ) : (
            <div className="cell-constructor__spacer" aria-hidden />
          )}
        </>
      )}
    </div>
  );
}

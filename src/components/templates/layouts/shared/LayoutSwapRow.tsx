import type { CSSProperties, HTMLAttributes } from 'react';
import { LayoutSwapPlaceholder } from './LayoutSwapPlaceholder';
import { LAYOUT_CONTENT_WIDTH_PX, LAYOUT_SWAP_ROW_HEIGHT_PX } from './types';

export interface LayoutSwapRowProps extends HTMLAttributes<HTMLDivElement> {}

/**
 * Figma generic layout row (`!change this`, 6034:2681) — full-width grey swap bound.
 */
export function LayoutSwapRow({ className, style, ...props }: LayoutSwapRowProps) {
  const classes = ['layout-swap-row', className].filter(Boolean).join(' ');
  const rowStyle = {
    '--layout-swap-row-height': `${LAYOUT_SWAP_ROW_HEIGHT_PX}px`,
    ...style,
  } as CSSProperties;

  return (
    <div className={classes} data-name="!change this" style={rowStyle} {...props}>
      <LayoutSwapPlaceholder style={{ minHeight: LAYOUT_SWAP_ROW_HEIGHT_PX }} />
    </div>
  );
}

/** Inline width helper for stories and layout shells. */
export const layoutSwapRowWidthStyle: CSSProperties = {
  width: LAYOUT_CONTENT_WIDTH_PX,
  maxWidth: '100%',
};

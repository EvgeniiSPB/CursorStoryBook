import type { CSSProperties } from 'react';
import { LAYOUT_H_PADDING_PX } from './types';
import './layout-padding-ruler.css';

export interface LayoutVerticalPaddingRulerProps {
  px?: number;
  /** Where the ruler anchors — `top` (default) covers the top padding zone,
   *  `bottom` mirrors it to the bottom padding. */
  placement?: 'top' | 'bottom';
}

/** Vertical padding guide — hatch direction follows `placement`. */
export function LayoutVerticalPaddingRuler({
  px = 160,
  placement = 'top',
}: LayoutVerticalPaddingRulerProps) {
  const placementClass =
    placement === 'bottom' ? ' layout-padding-ruler--vertical-bottom' : '';
  return (
    <div
      aria-hidden
      className={`layout-padding-ruler layout-padding-ruler--vertical${placementClass}`}
      style={{ '--layout-padding-ruler-size': `${px}px` } as CSSProperties}
    />
  );
}

export interface LayoutHPaddingRulersProps {
  px?: number;
  /** Stops rulers below top padding (px from container top). */
  topInset?: number;
  /** Stops rulers above bottom padding (px from container bottom). */
  bottomInset?: number;
  /** Show right padding guide (default: both sides). */
  showRightRuler?: boolean;
}

/** Left + right padding guides — hatch direction left → right. */
export function LayoutHPaddingRulers({
  px = LAYOUT_H_PADDING_PX,
  topInset = 0,
  bottomInset = 0,
  showRightRuler = true,
}: LayoutHPaddingRulersProps) {
  const sizeStyle = {
    '--layout-padding-ruler-size': `${px}px`,
    '--layout-padding-ruler-top-inset': `${topInset}px`,
    '--layout-padding-ruler-bottom-inset': `${bottomInset}px`,
  } as CSSProperties;

  return (
    <>
      <div
        aria-hidden
        className="layout-padding-ruler layout-padding-ruler--horizontal layout-padding-ruler--horizontal-left"
        style={sizeStyle}
      />
      {showRightRuler ? (
        <div
          aria-hidden
          className="layout-padding-ruler layout-padding-ruler--horizontal layout-padding-ruler--horizontal-right"
          style={sizeStyle}
        />
      ) : null}
    </>
  );
}

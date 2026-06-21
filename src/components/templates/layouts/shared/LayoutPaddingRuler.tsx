import type { CSSProperties } from 'react';
import { LAYOUT_H_PADDING_PX } from './types';
import './layout-padding-ruler.css';

export interface LayoutVerticalPaddingRulerProps {
  px?: number;
}

/** Top padding guide — hatch direction top → bottom. */
export function LayoutVerticalPaddingRuler({ px = 160 }: LayoutVerticalPaddingRulerProps) {
  return (
    <div
      aria-hidden
      className="layout-padding-ruler layout-padding-ruler--vertical"
      style={{ '--layout-padding-ruler-size': `${px}px` } as CSSProperties}
    >
      <span className="layout-padding-ruler__label">{px}px</span>
    </div>
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
      >
        <span className="layout-padding-ruler__label">{px}px</span>
      </div>
      {showRightRuler ? (
        <div
          aria-hidden
          className="layout-padding-ruler layout-padding-ruler--horizontal layout-padding-ruler--horizontal-right"
          style={sizeStyle}
        >
          <span className="layout-padding-ruler__label">{px}px</span>
        </div>
      ) : null}
    </>
  );
}

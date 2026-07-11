import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactElement } from 'react';

// Shared Playground wrapper — measures the rendered child's computed
// padding-top / padding-bottom and paints blue-hatched top/bottom guides
// sized to match the component. Story authors don't pass control names in:
// the wrapper just observes, so it works uniformly for boolean toggles
// (tPadding / bPadding), size selectors (paddingSize), and any future
// control that affects the child's real padding.
//
// Rulers render as *flow siblings* (block strips above / below the child),
// not as absolutely-positioned overlays — earlier revisions used
// `inline-block` + `position: absolute` rulers, but the surrounding
// playground (a flex container) inflated the frame's height so the rulers
// (anchored to top:0 / bottom:0) drifted to the playground edges. In-flow
// strips can't drift; they always hug the child.
export function PaddingRulerFrame({ children }: { children: ReactElement }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pads, setPads] = useState({ top: 0, bottom: 0 });

  // Re-measure on every render. Story args flow into the child, which
  // updates its className / style — the change is only observable AFTER
  // React commits, so we read the fresh computed padding here and let the
  // functional setPads bail out when values match. No `[]` deps: children
  // reference is different every render, and we want the measurement to
  // follow, not lag behind.
  useLayoutEffect(() => {
    const target = ref.current?.querySelector('[data-padding-ruler-target]');
    const child = target?.firstElementChild as HTMLElement | null;
    if (!child) return;
    const style = getComputedStyle(child);
    const top = Math.round(parseFloat(style.paddingTop) || 0);
    const bottom = Math.round(parseFloat(style.paddingBottom) || 0);
    setPads((prev) => (prev.top === top && prev.bottom === bottom ? prev : { top, bottom }));
  });

  const rulerStyle = (height: number, placement: 'top' | 'bottom'): CSSProperties => ({
    height: `${height}px`,
    background: `repeating-linear-gradient(${placement === 'top' ? 'to bottom' : 'to top'}, rgba(13, 153, 255, 0.18) 0 5px, transparent 5px 10px)`,
    outline: '1px solid rgba(13, 153, 255, 0.5)',
    boxSizing: 'border-box',
    pointerEvents: 'none',
  });

  return (
    // `inline-flex` column with `align-items: stretch` shrink-wraps the frame
    // horizontally to the widest child (the TabItem) and stretches the ruler
    // strips to match. Rulers render as *flow siblings* — no absolute
    // positioning — so they can't drift to the flex-parent's edges.
    <div
      ref={ref}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        width: 'fit-content',
      }}
    >
      {pads.top > 0 ? <div aria-hidden style={rulerStyle(pads.top, 'top')} /> : null}
      <div data-padding-ruler-target style={{ display: 'flex' }}>
        {children}
      </div>
      {pads.bottom > 0 ? <div aria-hidden style={rulerStyle(pads.bottom, 'bottom')} /> : null}
    </div>
  );
}

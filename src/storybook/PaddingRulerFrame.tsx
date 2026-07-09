import { useLayoutEffect, useRef, useState, type ReactElement } from 'react';
import { LayoutVerticalPaddingRuler } from '../components/templates/layouts/shared/LayoutPaddingRuler';

// Shared Playground wrapper — measures the rendered child's computed
// padding-top / padding-bottom and overlays a LayoutVerticalPaddingRuler for
// each non-zero side. Story authors don't pass control names in: the wrapper
// just observes, so it works uniformly for boolean toggles (tPadding /
// bPadding), size selectors (paddingSize), and any future control that ends
// up affecting the child's real padding.
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
    const frame = ref.current?.firstElementChild as HTMLElement | null;
    if (!frame) return;
    const style = getComputedStyle(frame);
    const top = Math.round(parseFloat(style.paddingTop) || 0);
    const bottom = Math.round(parseFloat(style.paddingBottom) || 0);
    setPads((prev) => (prev.top === top && prev.bottom === bottom ? prev : { top, bottom }));
  });

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block' }}>
      {children}
      {pads.top > 0 ? <LayoutVerticalPaddingRuler px={pads.top} /> : null}
      {pads.bottom > 0 ? (
        <LayoutVerticalPaddingRuler px={pads.bottom} placement="bottom" />
      ) : null}
    </div>
  );
}

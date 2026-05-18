import type { CSSProperties } from 'react';
import {
  swapStaticSizeToCssVar,
  swapStaticSizeToPx,
  type SwapStaticSize,
} from './types';
import './swap-static.css';

export interface SwapStaticProps {
  size?: SwapStaticSize;
  className?: string;
}

export function SwapStatic({ size = 'x1', className }: SwapStaticProps) {
  const px = swapStaticSizeToPx(size);
  const label = `size ${size}, ${px}px`;

  const style = {
    '--swap-static-size': swapStaticSizeToCssVar(size),
  } as CSSProperties;

  const rootClass = ['swap-static', className].filter(Boolean).join(' ');

  return (
    <div className={rootClass} role="img" aria-label={label} style={style}>
      <div className="swap-static__bound" />
    </div>
  );
}

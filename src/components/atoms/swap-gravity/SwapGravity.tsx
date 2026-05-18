import type { CSSProperties } from 'react';
import {
  swapGravitySizeToCssVar,
  swapGravitySizeToPx,
  type SwapGravitySize,
} from './types';
import './swap-gravity.css';

export interface SwapGravityProps {
  size?: SwapGravitySize;
  className?: string;
}

export function SwapGravity({ size = 'special', className }: SwapGravityProps) {
  const px = swapGravitySizeToPx(size);
  const label = `size ${size}, ${px}px`;

  const style = {
    '--swap-gravity-size': swapGravitySizeToCssVar(size),
  } as CSSProperties;

  const rootClass = ['swap-gravity', className].filter(Boolean).join(' ');

  return (
    <div className={rootClass} role="img" aria-label={label} style={style}>
      <div className="swap-gravity__bound" />
    </div>
  );
}

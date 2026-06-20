import type { CSSProperties } from 'react';
import { LogoSymbol } from './LogoSymbol';
import {
  LOGO_BIG_SYMBOLS,
  LOGO_HEIGHT_PX,
  LOGO_IDEI_SYMBOLS,
  LOGO_WIDTH_PX,
} from './types';
import './logo.css';

export interface LogoProps {
  className?: string;
  style?: CSSProperties;
}

/** Figma `logo` (6054:2604): «БОЛЬШИЕ ИДЕИ» wordmark, 1600×80. */
export function Logo({ className, style }: LogoProps) {
  const rootClassName = ['logo', className].filter(Boolean).join(' ');

  return (
    <div
      className={rootClassName}
      style={{
        width: LOGO_WIDTH_PX,
        height: LOGO_HEIGHT_PX,
        ...style,
      }}
      role="img"
      aria-label="БОЛЬШИЕ ИДЕИ"
    >
      <div className="logo__big" data-figma-node-id="6054:2532">
        {LOGO_BIG_SYMBOLS.map((symbol) => (
          <LogoSymbol key={symbol.figmaNodeId} symbol={symbol} />
        ))}
      </div>
      <div className="logo__ideas" data-figma-node-id="6054:2540">
        {LOGO_IDEI_SYMBOLS.map((symbol) => (
          <LogoSymbol key={symbol.figmaNodeId} symbol={symbol} />
        ))}
      </div>
    </div>
  );
}

import type { CSSProperties } from 'react';
import { LogoSymbol } from './LogoSymbol';
import {
  LOGO_BIG_SYMBOLS,
  LOGO_FOOTER_FIGMA_NODE_ID,
  LOGO_FOOTER_HEIGHT_PX,
  LOGO_HEIGHT_PX,
  LOGO_IDEI_SYMBOLS,
  LOGO_SYMBOL_FIGMA_NODE_ID,
  LOGO_WIDTH_PX,
} from './types';
import './logo.css';

export type LogoLayout = 'default' | 'footer';
export type LogoTone = 'primary' | 'constantInverted';

export interface LogoProps {
  className?: string;
  style?: CSSProperties;
  layout?: LogoLayout;
  tone?: LogoTone;
}

/** Figma `logo` (6054:2604): «БОЛЬШИЕ ИДЕИ» wordmark, 1600×80 or footer 1600×40. */
export function Logo({ className, style, layout = 'default', tone = 'primary' }: LogoProps) {
  const isFooter = layout === 'footer';
  const rootClassName = ['logo', className].filter(Boolean).join(' ');

  return (
    <div
      className={rootClassName}
      data-layout={layout}
      data-tone={tone}
      data-figma-node-id={isFooter ? LOGO_FOOTER_FIGMA_NODE_ID : LOGO_SYMBOL_FIGMA_NODE_ID}
      style={{
        width: isFooter ? '100%' : LOGO_WIDTH_PX,
        maxWidth: isFooter ? LOGO_WIDTH_PX : undefined,
        height: isFooter ? LOGO_FOOTER_HEIGHT_PX : LOGO_HEIGHT_PX,
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

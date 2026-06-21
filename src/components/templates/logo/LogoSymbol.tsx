import type { LogoSymbolDef } from './types';

type LogoSymbolProps = {
  symbol: LogoSymbolDef;
};

/** Figma `logo-symbols` glyph slot (44px tall, per-letter width). */
export function LogoSymbol({ symbol }: LogoSymbolProps) {
  const { Component } = symbol;

  return (
    <span
      className="logo__symbol"
      style={{ width: symbol.widthPx }}
      data-figma-node-id={symbol.figmaNodeId}
    >
      <Component className="logo__symbol-svg" aria-hidden />
    </span>
  );
}

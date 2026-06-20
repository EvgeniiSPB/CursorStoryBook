import type { LogoSymbolDef } from './types';

type LogoSymbolProps = {
  symbol: LogoSymbolDef;
};

/** Figma `logo-symbols` glyph slot (44px tall, per-letter width). */
export function LogoSymbol({ symbol }: LogoSymbolProps) {
  return (
    <span
      className="logo__symbol"
      style={{ width: symbol.widthPx }}
      data-figma-node-id={symbol.figmaNodeId}
    >
      <img className="logo__symbol-img" src={symbol.src} alt="" aria-hidden />
    </span>
  );
}

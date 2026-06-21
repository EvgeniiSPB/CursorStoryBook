import type { FC, SVGProps } from 'react';
import BolshieB from '../../../assets/logo/bolshie-b.svg?react';
import BolshieE from '../../../assets/logo/bolshie-e.svg?react';
import BolshieI from '../../../assets/logo/bolshie-i.svg?react';
import BolshieL from '../../../assets/logo/bolshie-l.svg?react';
import BolshieO from '../../../assets/logo/bolshie-o.svg?react';
import BolshieSh from '../../../assets/logo/bolshie-sh.svg?react';
import BolshieSoftSign from '../../../assets/logo/bolshie-soft-sign.svg?react';
import IdeiD from '../../../assets/logo/idei-d.svg?react';
import IdeiE from '../../../assets/logo/idei-e.svg?react';
import IdeiI1 from '../../../assets/logo/idei-i1.svg?react';
import IdeiI2 from '../../../assets/logo/idei-i2.svg?react';

export type LogoSymbolDef = {
  Component: FC<SVGProps<SVGSVGElement>>;
  widthPx: number;
  figmaNodeId: string;
};

/** Figma `Logo` artboard (6054:2605). */
export const LOGO_FIGMA_NODE_ID = '6054:2605';

/** Figma `logo` symbol (6054:2604). */
export const LOGO_SYMBOL_FIGMA_NODE_ID = '6054:2604';

/** Figma footer `logo` instance (6245:2960). */
export const LOGO_FOOTER_FIGMA_NODE_ID = '6245:2960';

export const LOGO_WIDTH_PX = 1600;
export const LOGO_HEIGHT_PX = 80;
export const LOGO_FOOTER_HEIGHT_PX = 40;

export const LOGO_SHOWCASE_FRAME_WIDTH_PX = 1856;
export const LOGO_SHOWCASE_FRAME_HEIGHT_PX = 336;
export const LOGO_PLAYGROUND_PADDING_PX = 128;

/** Figma `Big` wordmark group (6054:2532). */
export const LOGO_BIG_SYMBOLS: readonly LogoSymbolDef[] = [
  { Component: BolshieB, widthPx: 21, figmaNodeId: '6054:2581' },
  { Component: BolshieO, widthPx: 29, figmaNodeId: '6054:2583' },
  { Component: BolshieL, widthPx: 24, figmaNodeId: '6054:2585' },
  { Component: BolshieSoftSign, widthPx: 25, figmaNodeId: '6054:2587' },
  { Component: BolshieSh, widthPx: 35, figmaNodeId: '6054:2589' },
  { Component: BolshieI, widthPx: 29, figmaNodeId: '6054:2591' },
  { Component: BolshieE, widthPx: 19, figmaNodeId: '6054:2593' },
];

/** Figma `ideas` wordmark group (6054:2540). */
export const LOGO_IDEI_SYMBOLS: readonly LogoSymbolDef[] = [
  { Component: IdeiI1, widthPx: 24, figmaNodeId: '6054:2595' },
  { Component: IdeiD, widthPx: 28, figmaNodeId: '6054:2597' },
  { Component: IdeiE, widthPx: 22, figmaNodeId: '6054:2599' },
  { Component: IdeiI2, widthPx: 24, figmaNodeId: '6054:2601' },
];

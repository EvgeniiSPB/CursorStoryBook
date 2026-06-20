import bolshieB from '../../../assets/logo/bolshie-b.svg?url';
import bolshieE from '../../../assets/logo/bolshie-e.svg?url';
import bolshieI from '../../../assets/logo/bolshie-i.svg?url';
import bolshieL from '../../../assets/logo/bolshie-l.svg?url';
import bolshieO from '../../../assets/logo/bolshie-o.svg?url';
import bolshieSh from '../../../assets/logo/bolshie-sh.svg?url';
import bolshieSoftSign from '../../../assets/logo/bolshie-soft-sign.svg?url';
import ideiD from '../../../assets/logo/idei-d.svg?url';
import ideiE from '../../../assets/logo/idei-e.svg?url';
import ideiI1 from '../../../assets/logo/idei-i1.svg?url';
import ideiI2 from '../../../assets/logo/idei-i2.svg?url';

export type LogoSymbolDef = {
  src: string;
  widthPx: number;
  figmaNodeId: string;
};

/** Figma `Logo` artboard (6054:2605). */
export const LOGO_FIGMA_NODE_ID = '6054:2605';

/** Figma `logo` symbol (6054:2604). */
export const LOGO_SYMBOL_FIGMA_NODE_ID = '6054:2604';

export const LOGO_WIDTH_PX = 1600;
export const LOGO_HEIGHT_PX = 80;

export const LOGO_SHOWCASE_FRAME_WIDTH_PX = 1856;
export const LOGO_SHOWCASE_FRAME_HEIGHT_PX = 336;
export const LOGO_PLAYGROUND_PADDING_PX = 128;

/** Figma `Big` wordmark group (6054:2532). */
export const LOGO_BIG_SYMBOLS: readonly LogoSymbolDef[] = [
  { src: bolshieB, widthPx: 21, figmaNodeId: '6054:2581' },
  { src: bolshieO, widthPx: 29, figmaNodeId: '6054:2583' },
  { src: bolshieL, widthPx: 24, figmaNodeId: '6054:2585' },
  { src: bolshieSoftSign, widthPx: 25, figmaNodeId: '6054:2587' },
  { src: bolshieSh, widthPx: 35, figmaNodeId: '6054:2589' },
  { src: bolshieI, widthPx: 29, figmaNodeId: '6054:2591' },
  { src: bolshieE, widthPx: 19, figmaNodeId: '6054:2593' },
];

/** Figma `ideas` wordmark group (6054:2540). */
export const LOGO_IDEI_SYMBOLS: readonly LogoSymbolDef[] = [
  { src: ideiI1, widthPx: 24, figmaNodeId: '6054:2595' },
  { src: ideiD, widthPx: 28, figmaNodeId: '6054:2597' },
  { src: ideiE, widthPx: 22, figmaNodeId: '6054:2599' },
  { src: ideiI2, widthPx: 24, figmaNodeId: '6054:2601' },
];

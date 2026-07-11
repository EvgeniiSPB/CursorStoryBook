import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { showcaseCanvas } from '../../../storybook/showcase-decorators';
import { CardTop, CARD_TOP_VARIANTS } from './CardTop';
import {
  CARD_TOP_BOARD_GAP_PX,
  CARD_TOP_BOARD_GRADIENT_GAP_OFFSET_PX,
  CARD_TOP_BOARD_PADDING_PX,
  CARD_TOP_BOARD_WIDTH_PX,
  CARD_TOP_LIGHT_BLOCKS_HEIGHT_PX,
  CARD_TOP_LIGHT_GAPS_PX,
  CARD_TOP_WRAPPER_WIDTH_PX,
} from './constants';

const boardSectionStyle = {
  '--showcase-board-width': `${CARD_TOP_WRAPPER_WIDTH_PX}px`,
  '--showcase-board-padding': CARD_TOP_BOARD_PADDING_PX,
  '--card-top-board-width': `${CARD_TOP_BOARD_WIDTH_PX}px`,
  '--card-top-board-gap': CARD_TOP_BOARD_GAP_PX,
  '--card-top-light-blocks-height': CARD_TOP_LIGHT_BLOCKS_HEIGHT_PX,
  '--card-top-light-gaps': CARD_TOP_LIGHT_GAPS_PX,
  '--card-top-board-gradient-gap-offset': CARD_TOP_BOARD_GRADIENT_GAP_OFFSET_PX,
} as CSSProperties;

const meta = {
  title: 'Constructors/Card/Top',
  component: CardTop,
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CardTop>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Gallery: Story = {
  name: 'All blocks',
  render: () => (
    <div
      className="showcase-layout-section showcase-layout-section--board card-top-board-section"
      style={boardSectionStyle}
    >
      <div className="card-top-board">
        {CARD_TOP_VARIANTS.map((variant) => (
          <CardTop key={variant} variant={variant} />
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { CardTop } from '@/components/details/card-top/CardTop';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div style={{ padding: 24 }}>`,
          `      <CardTop variant="baseM2tags" />`,
          `    </div>`,
          `  );`,
          `};`,
          ``,
          `const root = document.getElementById('root');`,
          `if (root) createRoot(root).render(<App />);`,
        ].join('\n'),
      },
    },
  },
};

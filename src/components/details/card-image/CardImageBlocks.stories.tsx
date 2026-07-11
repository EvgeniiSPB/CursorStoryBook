import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { showcaseCanvas } from '../../../storybook/showcase-decorators';
import { CardImage, CARD_IMAGE_VARIANTS } from './CardImage';
import {
  CARD_IMAGE_BOARD_GAP_PX,
  CARD_IMAGE_BOARD_PADDING_PX,
  CARD_IMAGE_WIDTH_PX,
} from './constants';

const boardSectionStyle = {
  '--showcase-board-width': `${CARD_IMAGE_WIDTH_PX}px`,
  '--showcase-board-padding': CARD_IMAGE_BOARD_PADDING_PX,
} as CSSProperties;

const boardStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: CARD_IMAGE_BOARD_GAP_PX,
  width: CARD_IMAGE_WIDTH_PX,
  maxWidth: '100%',
};

const meta = {
  title: 'Constructors/Card/Image',
  component: CardImage,
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CardImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Gallery: Story = {
  name: 'All blocks',
  render: () => (
    <div
      className="showcase-layout-section showcase-layout-section--board"
      style={boardSectionStyle}
    >
      <div style={boardStyle}>
        {CARD_IMAGE_VARIANTS.map((variant) => (
          <CardImage key={variant} variant={variant} />
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { CardImage } from '@/components/details/card-image/CardImage';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div style={{ padding: 24 }}>`,
          `      <CardImage variant="1:1" />`,
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

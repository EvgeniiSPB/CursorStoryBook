import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { showcaseCanvas } from '../../../storybook/showcase-decorators';
import { CellRespondFor } from './CellRespondFor';
import { DETAILS_LEFT_FIGMA_NODE_ID, DETAILS_LEFT_WIDTH_PX } from './index';

const meta = {
  title: 'Constructors/Article/Left',
  component: CellRespondFor,
  tags: ['autodocs'],
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Figma \`details / left\` (${DETAILS_LEFT_FIGMA_NODE_ID}) — left column blocks (fixed **${DETAILS_LEFT_WIDTH_PX}px**).`,
      },
    },
  },
} satisfies Meta<typeof CellRespondFor>;

export default meta;
type Story = StoryObj<typeof meta>;

const boardStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 32,
  width: DETAILS_LEFT_WIDTH_PX,
  maxWidth: '100%',
};

export const Gallery: Story = {
  name: 'All blocks',
  render: () => (
    <div className="showcase-layout-section showcase-layout-section--board">
      <div style={boardStyle}>
        <CellRespondFor />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { CellRespondFor } from '@/components/details/left/CellRespondFor';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div style={{ padding: 24 }}>`,
          `      <CellRespondFor label="Отвечает" name="Value" />`,
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

import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { showcaseCanvas } from '../../../storybook/showcase-decorators';
import { IncutRelated } from './IncutRelated';
import { IncutNumbers } from './IncutNumbers';
import { IncutOpinion } from './IncutOpinion';
import { IncutSocials } from './IncutSocials';
import { DETAILS_RIGHT_FIGMA_NODE_ID, DETAILS_RIGHT_WIDTH_PX } from './index';

const meta = {
  title: 'Constructors/Article/Right',
  component: IncutRelated,
  tags: ['autodocs'],
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Figma \`details / right\` (${DETAILS_RIGHT_FIGMA_NODE_ID}) — right column incut blocks (fixed **${DETAILS_RIGHT_WIDTH_PX}px**, 240px content right-aligned).`,
      },
    },
  },
} satisfies Meta<typeof IncutRelated>;

export default meta;
type Story = StoryObj<typeof meta>;

const boardStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 40,
  width: DETAILS_RIGHT_WIDTH_PX,
  maxWidth: '100%',
};

export const Gallery: Story = {
  name: 'All blocks',
  render: () => (
    <div className="showcase-layout-section showcase-layout-section--board">
      <div style={boardStyle}>
        <IncutRelated />
        <IncutNumbers />
        <IncutOpinion />
        <IncutSocials />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { IncutRelated, IncutNumbers, IncutOpinion } from '@/components/details/right';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 40 }}>`,
          `      <IncutRelated />`,
          `      <IncutNumbers />`,
          `      <IncutOpinion />`,
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

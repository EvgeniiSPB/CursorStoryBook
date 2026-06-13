import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { showcaseCanvas } from '../../../storybook/showcase-decorators';
import { TextHeadlineFull } from './TextHeadlineFull';
import { TextQuote } from './TextQuote';
import { ImageDouble } from './ImageDouble';
import { ImageTriple } from './ImageTriple';
import { ImageGallery } from './ImageGallery';
import { DETAILS_FULL_WIDTH_FIGMA_NODE_ID, DETAILS_FULL_WIDTH_PX } from './index';

const meta = {
  title: 'Constructors/cellConstructor/Full Width',
  component: TextHeadlineFull,
  tags: ['autodocs'],
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Figma \`details / fullWidth\` (${DETAILS_FULL_WIDTH_FIGMA_NODE_ID}) — blocks spanning the full constructor width (**${DETAILS_FULL_WIDTH_PX}px**, padded 40px).`,
      },
    },
  },
} satisfies Meta<typeof TextHeadlineFull>;

export default meta;
type Story = StoryObj<typeof meta>;

const boardStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 48,
  width: DETAILS_FULL_WIDTH_PX,
  maxWidth: '100%',
};

export const Gallery: Story = {
  name: 'All blocks',
  render: () => (
    <div className="showcase-layout-section showcase-layout-section--board">
      <div style={boardStyle}>
        <TextHeadlineFull />
        <TextQuote />
        <ImageDouble />
        <ImageTriple />
        <ImageGallery />
      </div>
    </div>
  ),
};

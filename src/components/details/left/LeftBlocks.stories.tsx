import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { showcaseCanvas } from '../../../storybook/showcase-decorators';
import { CellRespondFor } from './CellRespondFor';
import { DETAILS_LEFT_FIGMA_NODE_ID, DETAILS_LEFT_WIDTH_PX } from './index';

const meta = {
  title: 'Constructors/cellConstructor/Left',
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
  args: {
    label: 'Отвечает',
    name: 'Value',
  },
  argTypes: {
    label: { control: 'text' },
    name: { control: 'text' },
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

export const Playground: Story = {};

export const Gallery: Story = {
  name: 'All blocks',
  render: () => (
    <div className="showcase-layout-section showcase-layout-section--board">
      <div style={boardStyle}>
        <CellRespondFor />
      </div>
    </div>
  ),
};

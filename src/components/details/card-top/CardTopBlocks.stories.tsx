import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { showcaseCanvas } from '../../../storybook/showcase-decorators';
import { CardTop, CARD_TOP_VARIANTS } from './CardTop';

const meta = {
  title: 'Constructors/cardConstructor/Top',
  component: CardTop,
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CardTop>;

export default meta;
type Story = StoryObj<typeof meta>;

const boardStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
};

export const Gallery: Story = {
  name: 'All blocks',
  render: () => (
    <div className="showcase-layout-section showcase-layout-section--board">
      <div style={boardStyle}>
        {CARD_TOP_VARIANTS.map((variant) => (
          <div key={variant} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <code style={{ fontSize: 12, color: '#6b6e73' }}>{`cardTop - ${variant}`}</code>
            <CardTop variant={variant} />
          </div>
        ))}
      </div>
    </div>
  ),
};

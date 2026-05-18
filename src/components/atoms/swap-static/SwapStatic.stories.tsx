import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { SwapStatic } from './SwapStatic';
import { SWAP_STATIC_SIZES } from './types';
import './swap-static-showcase.css';

const showcaseCanvas: Decorator = (Story) => (
  <div className="swap-static-showcase-canvas">
    <Story />
  </div>
);

const meta = {
  title: 'Atoms/Swap Static',
  component: SwapStatic,
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    size: {
      control: 'select',
      options: [...SWAP_STATIC_SIZES],
    },
  },
} satisfies Meta<typeof SwapStatic>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    size: 'x4',
  },
};

export const AllSizes: Story = {
  name: 'All sizes',
  render: () => (
    <div className="swap-static-showcase">
      {SWAP_STATIC_SIZES.map((size) => (
        <SwapStatic key={size} size={size} />
      ))}
    </div>
  ),
};

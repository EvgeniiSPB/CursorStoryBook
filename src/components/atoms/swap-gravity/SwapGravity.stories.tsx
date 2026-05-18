import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { SwapGravity } from './SwapGravity';
import { SWAP_GRAVITY_SIZES } from './types';
import './swap-gravity-showcase.css';

const showcaseCanvas: Decorator = (Story) => (
  <div className="swap-gravity-showcase-canvas">
    <Story />
  </div>
);

const meta = {
  title: 'Atoms/Swap Gravity',
  component: SwapGravity,
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    size: {
      control: 'select',
      options: [...SWAP_GRAVITY_SIZES],
    },
  },
} satisfies Meta<typeof SwapGravity>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    size: 'bodyM',
  },
};

export const AllSizes: Story = {
  name: 'All sizes',
  render: () => (
    <div className="swap-gravity-showcase">
      {SWAP_GRAVITY_SIZES.map((size) => (
        <SwapGravity key={size} size={size} />
      ))}
    </div>
  ),
};

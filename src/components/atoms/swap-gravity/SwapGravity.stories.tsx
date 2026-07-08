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
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { SwapGravity } from '@/components/atoms/swap-gravity/SwapGravity';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div style={{ padding: 24 }}>`,
          `      <SwapGravity size="bodyM" />`,
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

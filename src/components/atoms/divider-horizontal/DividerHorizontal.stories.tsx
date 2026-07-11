import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { DividerHorizontal } from './DividerHorizontal';
import {
  DIVIDER_HORIZONTAL_FIGMA_NODE_ID,
  DIVIDER_HORIZONTAL_VARIANTS,
  dividerHorizontalVariantKey,
  type DividerHorizontalType,
} from './types';
import './divider-horizontal-showcase.css';

const showcaseCanvas: Decorator = (Story) => (
  <div className="divider-horizontal-showcase-canvas">
    <Story />
  </div>
);

const typeOptions: DividerHorizontalType[] = ['thin'];

const meta = {
  title: 'Atoms/Divider Horizontal',
  component: DividerHorizontal,
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Figma \`divider - horizontal\` (${DIVIDER_HORIZONTAL_FIGMA_NODE_ID}): **thin** — 1px stroke **divider/base**, width **156px**.`,
      },
    },
  },
  argTypes: {
    type: { control: 'select', options: typeOptions },
  },
} satisfies Meta<typeof DividerHorizontal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div className="divider-horizontal-showcase-section divider-horizontal-showcase-section--board">
      <div className="divider-horizontal-showcase">
        {DIVIDER_HORIZONTAL_VARIANTS.map((variant) => (
          <DividerHorizontal key={dividerHorizontalVariantKey(variant)} type={variant.type} />
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { DividerHorizontal } from '@/components/atoms/divider-horizontal/DividerHorizontal';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div style={{ padding: 24 }}>`,
          `      <DividerHorizontal type="thin" />`,
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

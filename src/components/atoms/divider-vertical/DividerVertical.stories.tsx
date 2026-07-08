import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { DividerVertical } from './DividerVertical';
import {
  DIVIDER_VERTICAL_FIGMA_NODE_ID,
  DIVIDER_VERTICAL_LARGEST_BOUND_HEIGHT_PX,
  DIVIDER_VERTICAL_PLAYGROUND_PADDING_PX,
  DIVIDER_VERTICAL_VARIANTS,
  dividerVerticalVariantKey,
  type DividerVerticalType,
} from './types';
import './divider-vertical-showcase.css';

const showcaseCanvas: Decorator = (Story) => (
  <div className="divider-vertical-showcase-canvas">
    <Story />
  </div>
);

const playgroundSectionStyle = {
  '--divider-vertical-playground-bound-width': '1px',
  '--divider-vertical-playground-bound-height': `${DIVIDER_VERTICAL_LARGEST_BOUND_HEIGHT_PX}px`,
  '--divider-vertical-playground-padding': `${DIVIDER_VERTICAL_PLAYGROUND_PADDING_PX}px`,
} as CSSProperties;

const playgroundSection: Decorator = (Story) => (
  <div
    className="divider-vertical-showcase-section divider-vertical-showcase-section--playground"
    style={playgroundSectionStyle}
  >
    <div className="divider-vertical-showcase-playground">
      <Story />
    </div>
  </div>
);

const typeOptions: DividerVerticalType[] = ['thin'];

const meta = {
  title: 'Atoms/Divider Vertical',
  component: DividerVertical,
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Figma \`divider - vertical\` (${DIVIDER_VERTICAL_FIGMA_NODE_ID}): **thin** — 1px stroke **divider/base**, height **68px**.`,
      },
    },
  },
  argTypes: {
    type: { control: 'select', options: typeOptions },
  },
} satisfies Meta<typeof DividerVertical>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [playgroundSection],
  args: {
    type: 'thin',
  },
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { DividerVertical } from '@/components/atoms/divider-vertical/DividerVertical';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div style={{ padding: 24 }}>`,
          `      <DividerVertical type="thin" />`,
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

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div className="divider-vertical-showcase-section divider-vertical-showcase-section--board">
      <div className="divider-vertical-showcase">
        {DIVIDER_VERTICAL_VARIANTS.map((variant) => (
          <DividerVertical key={dividerVerticalVariantKey(variant)} type={variant.type} />
        ))}
      </div>
    </div>
  ),
};

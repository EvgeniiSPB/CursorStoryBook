import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { DividerHorizontal } from './DividerHorizontal';
import {
  DIVIDER_HORIZONTAL_FIGMA_NODE_ID,
  DIVIDER_HORIZONTAL_LARGEST_BOUND_WIDTH_PX,
  DIVIDER_HORIZONTAL_PLAYGROUND_PADDING_PX,
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

const playgroundSectionStyle = {
  '--divider-horizontal-playground-bound-width': `${DIVIDER_HORIZONTAL_LARGEST_BOUND_WIDTH_PX}px`,
  '--divider-horizontal-playground-bound-height': '1px',
  '--divider-horizontal-playground-padding': `${DIVIDER_HORIZONTAL_PLAYGROUND_PADDING_PX}px`,
} as CSSProperties;

const playgroundSection: Decorator = (Story) => (
  <div
    className="divider-horizontal-showcase-section divider-horizontal-showcase-section--playground"
    style={playgroundSectionStyle}
  >
    <div className="divider-horizontal-showcase-playground">
      <Story />
    </div>
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

export const Playground: Story = {
  decorators: [playgroundSection],
  args: {
    type: 'thin',
  },
};

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
};

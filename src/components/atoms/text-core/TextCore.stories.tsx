import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { TextCore } from './TextCore';
import {
  TEXT_CORE_FIGMA_FONT_FAMILIES,
  TEXT_CORE_LARGEST_BOUND_HEIGHT_PX,
  TEXT_CORE_LARGEST_BOUND_WIDTH_PX,
  TEXT_CORE_PLAYGROUND_PADDING_PX,
  TEXT_CORE_VARIANTS,
  textCoreVariantKey,
  type TextCoreFontWeight,
  type TextCoreTypography,
} from './types';
import './text-core-showcase.css';

const showcaseCanvas: Decorator = (Story) => (
  <div className="text-core-showcase-canvas">
    <Story />
  </div>
);

const playgroundSectionStyle = {
  '--text-core-playground-bound-w': `${TEXT_CORE_LARGEST_BOUND_WIDTH_PX}px`,
  '--text-core-playground-bound-h': `${TEXT_CORE_LARGEST_BOUND_HEIGHT_PX}px`,
  '--text-core-playground-padding': `${TEXT_CORE_PLAYGROUND_PADDING_PX}px`,
} as CSSProperties;

const playgroundSection: Decorator = (Story) => (
  <div
    className="text-core-showcase-section text-core-showcase-section--playground"
    style={playgroundSectionStyle}
  >
    <div className="text-core-showcase-playground">
      <Story />
    </div>
  </div>
);

const typographyOptions: TextCoreTypography[] = [
  'special',
  'bodyXS',
  'bodyS',
  'bodyM',
  'bodyL',
  'bodyXL',
];

const fontWeightOptions: TextCoreFontWeight[] = ['regular', 'medium'];

const meta = {
  title: 'Atoms/Text Core',
  component: TextCore,
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Figma \`text - core\` (24:330): body → **${TEXT_CORE_FIGMA_FONT_FAMILIES.body}**, special → **${TEXT_CORE_FIGMA_FONT_FAMILIES.special}**. Showcase фиксирует эти семейства поверх глобального Font.`,
      },
    },
  },
  argTypes: {
    typography: {
      control: 'select',
      options: typographyOptions,
    },
    fontWeight: {
      control: 'select',
      options: fontWeightOptions,
    },
    text: { control: 'text' },
  },
} satisfies Meta<typeof TextCore>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [playgroundSection],
  args: {
    typography: 'bodyM',
    fontWeight: 'regular',
    text: 'Value',
  },
};

export const AllSizes: Story = {
  name: 'All sizes',
  render: () => (
    <div className="text-core-showcase-section text-core-showcase-section--board">
      <div className="text-core-showcase">
        {TEXT_CORE_VARIANTS.map((variant) => (
          <TextCore
            key={textCoreVariantKey(variant)}
            typography={variant.typography}
            fontWeight={variant.fontWeight}
          />
        ))}
      </div>
    </div>
  ),
};

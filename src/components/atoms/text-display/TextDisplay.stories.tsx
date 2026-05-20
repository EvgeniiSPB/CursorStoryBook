import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { TextDisplay } from './TextDisplay';
import {
  TEXT_DISPLAY_FIGMA_FONT_FAMILIES,
  TEXT_DISPLAY_FIGMA_FONT_MODE_SLUG,
  TEXT_DISPLAY_LARGEST_BOUND_HEIGHT_PX,
  TEXT_DISPLAY_LARGEST_BOUND_WIDTH_PX,
  TEXT_DISPLAY_PLAYGROUND_PADDING_PX,
  TEXT_DISPLAY_VARIANTS,
  textDisplayVariantKey,
  type TextDisplayFontWeight,
  type TextDisplayTypography,
} from './types';
import './text-display-showcase.css';

const showcaseCanvas: Decorator = (Story) => (
  <div className="text-display-showcase-canvas">
    <Story />
  </div>
);

const playgroundSectionStyle = {
  '--text-display-playground-bound-w': `${TEXT_DISPLAY_LARGEST_BOUND_WIDTH_PX}px`,
  '--text-display-playground-bound-h': `${TEXT_DISPLAY_LARGEST_BOUND_HEIGHT_PX}px`,
  '--text-display-playground-padding': `${TEXT_DISPLAY_PLAYGROUND_PADDING_PX}px`,
} as CSSProperties;

const playgroundSection: Decorator = (Story) => (
  <div
    className="text-display-showcase-section text-display-showcase-section--playground"
    style={playgroundSectionStyle}
  >
    <div className="text-display-showcase-playground">
      <Story />
    </div>
  </div>
);

const typographyOptions: TextDisplayTypography[] = [
  'displayXS',
  'displayS',
  'displayM',
  'displayL',
  'displayXL',
];

const fontWeightOptions: TextDisplayFontWeight[] = ['regular', 'medium'];

const meta = {
  title: 'Atoms/Text Display',
  component: TextDisplay,
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Figma \`text - display\` (85:530): fontFamilies/display → **${TEXT_DISPLAY_FIGMA_FONT_FAMILIES.display}** (mode \`${TEXT_DISPLAY_FIGMA_FONT_MODE_SLUG}\`). Showcase фиксирует семейство поверх глобального Font.`,
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
    tPadding: { control: 'boolean' },
    bPadding: { control: 'boolean' },
    text: { control: 'text' },
  },
} satisfies Meta<typeof TextDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [playgroundSection],
  args: {
    typography: 'displayM',
    fontWeight: 'regular',
    tPadding: false,
    bPadding: false,
    text: 'Display',
  },
};

export const AllSizes: Story = {
  name: 'All sizes',
  render: () => (
    <div className="text-display-showcase-section text-display-showcase-section--board">
      <div className="text-display-showcase">
        {TEXT_DISPLAY_VARIANTS.map((variant) => (
          <TextDisplay
            key={textDisplayVariantKey(variant)}
            typography={variant.typography}
            fontWeight={variant.fontWeight}
            tPadding={variant.tPadding}
            bPadding={variant.bPadding}
          />
        ))}
      </div>
    </div>
  ),
};

import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { TextWarning } from './TextWarning';
import {
  TEXT_WARNING_DEFAULT_TEXT,
  TEXT_WARNING_FIGMA_COLOR_CSS_VAR,
  TEXT_WARNING_FIGMA_FONT_FAMILY,
  TEXT_WARNING_FIGMA_FONT_MODE_SLUG,
  TEXT_WARNING_LARGEST_BOUND_HEIGHT_PX,
  TEXT_WARNING_LARGEST_BOUND_WIDTH_PX,
  TEXT_WARNING_PLAYGROUND_PADDING_PX,
  TEXT_WARNING_VARIANTS,
  textWarningVariantKey,
  type TextWarningPaddingSize,
  type TextWarningTypography,
} from './types';
import './text-warning-showcase.css';

const showcaseCanvas: Decorator = (Story) => (
  <div
    className="text-warning-showcase-canvas"
    data-font-mode={TEXT_WARNING_FIGMA_FONT_MODE_SLUG}
  >
    <Story />
  </div>
);

const playgroundSectionStyle = {
  '--text-warning-playground-bound-w': `${TEXT_WARNING_LARGEST_BOUND_WIDTH_PX}px`,
  '--text-warning-playground-bound-h': `${TEXT_WARNING_LARGEST_BOUND_HEIGHT_PX}px`,
  '--text-warning-playground-padding': `${TEXT_WARNING_PLAYGROUND_PADDING_PX}px`,
} as CSSProperties;

const playgroundSection: Decorator = (Story) => (
  <div
    className="text-warning-showcase-section text-warning-showcase-section--playground"
    style={playgroundSectionStyle}
  >
    <div className="text-warning-showcase-playground">
      <Story />
    </div>
  </div>
);

const typographyOptions: TextWarningTypography[] = [
  'bodyXS',
  'bodyS',
  'bodyM',
  'bodyL',
  'bodyXL',
];

const paddingSizeOptions: TextWarningPaddingSize[] = ['none', 'tiny', 'small'];

const meta = {
  title: 'Atoms/Text Warning',
  component: TextWarning,
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Figma \`text - warning\` (180:15): **${TEXT_WARNING_FIGMA_FONT_FAMILY}**, **regular** only. Color: **${TEXT_WARNING_FIGMA_COLOR_CSS_VAR}** (error/primary). Default text: **${TEXT_WARNING_DEFAULT_TEXT}**.`,
      },
    },
  },
  argTypes: {
    typography: {
      control: 'select',
      options: typographyOptions,
    },
    paddingSize: {
      control: 'select',
      options: paddingSizeOptions,
    },
    tPadding: { control: 'boolean' },
    bPadding: { control: 'boolean' },
    text: { control: 'text' },
  },
} satisfies Meta<typeof TextWarning>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [playgroundSection],
  args: {
    typography: 'bodyM',
    paddingSize: 'none',
    tPadding: false,
    bPadding: false,
    text: TEXT_WARNING_DEFAULT_TEXT,
  },
};

export const AllSizes: Story = {
  name: 'All sizes',
  render: () => (
    <div className="text-warning-showcase-section text-warning-showcase-section--board">
      <div className="text-warning-showcase">
        {TEXT_WARNING_VARIANTS.map((variant) => (
          <TextWarning
            key={textWarningVariantKey(variant)}
            typography={variant.typography}
            tPadding={variant.tPadding}
            bPadding={variant.bPadding}
            paddingSize={variant.paddingSize}
          />
        ))}
      </div>
    </div>
  ),
};

import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { PaddingRulerFrame } from '../../../storybook/PaddingRulerFrame';
import { TextHeadline } from './TextHeadline';
import {
  TEXT_HEADLINE_FIGMA_FONT_FAMILIES,
  TEXT_HEADLINE_FIGMA_FONT_MODE_SLUG,
  TEXT_HEADLINE_LARGEST_BOUND_HEIGHT_PX,
  TEXT_HEADLINE_LARGEST_BOUND_WIDTH_PX,
  TEXT_HEADLINE_PLAYGROUND_PADDING_PX,
  TEXT_HEADLINE_VARIANTS,
  textHeadlineVariantKey,
  type TextHeadlineFontWeight,
  type TextHeadlineTypography,
} from './types';
import './text-headline-showcase.css';

const showcaseCanvas: Decorator = (Story) => (
  <div className="text-headline-showcase-canvas">
    <Story />
  </div>
);

const playgroundSectionStyle = {
  '--text-headline-playground-bound-w': `${TEXT_HEADLINE_LARGEST_BOUND_WIDTH_PX}px`,
  '--text-headline-playground-bound-h': `${TEXT_HEADLINE_LARGEST_BOUND_HEIGHT_PX}px`,
  '--text-headline-playground-padding': `${TEXT_HEADLINE_PLAYGROUND_PADDING_PX}px`,
} as CSSProperties;

const playgroundSection: Decorator = (Story) => (
  <div
    className="text-headline-showcase-section text-headline-showcase-section--playground"
    style={playgroundSectionStyle}
  >
    <div className="text-headline-showcase-playground">
      <Story />
    </div>
  </div>
);

const typographyOptions: TextHeadlineTypography[] = [
  'headlineXS',
  'headlineS',
  'headlineM',
  'headlineL',
  'headlineXL',
];

const fontWeightOptions: TextHeadlineFontWeight[] = ['regular', 'medium'];

const meta = {
  title: 'Atoms/Text Headline',
  component: TextHeadline,
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Figma \`text - headline\` (38:423): fontFamilies/headline → **${TEXT_HEADLINE_FIGMA_FONT_FAMILIES.headline}** (mode \`${TEXT_HEADLINE_FIGMA_FONT_MODE_SLUG}\`). Showcase фиксирует семейство поверх глобального Font.`,
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
} satisfies Meta<typeof TextHeadline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [playgroundSection],
  args: {
    typography: 'headlineM',
    fontWeight: 'regular',
    tPadding: false,
    bPadding: false,
    text: 'Headline',
  },
  render: (args) => (
    <PaddingRulerFrame>
      <TextHeadline {...args} />
    </PaddingRulerFrame>
  ),
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { TextHeadline } from '@/components/atoms/text-headline/TextHeadline';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div style={{ padding: 24 }}>`,
          `      <TextHeadline typography="headlineM" fontWeight="regular" text="Headline" />`,
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
    <div className="text-headline-showcase-section text-headline-showcase-section--board">
      <div className="text-headline-showcase">
        {TEXT_HEADLINE_VARIANTS.map((variant) => (
          <TextHeadline
            key={textHeadlineVariantKey(variant)}
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

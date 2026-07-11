import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { PaddingRulerFrame } from '../../../storybook/PaddingRulerFrame';
import { TextParagraph } from './TextParagraph';
import {
  TEXT_PARAGRAPH_FIGMA_FONT_BY_WEIGHT,
  TEXT_PARAGRAPH_FIGMA_LINE_HEIGHT_MODE_SLUG,
  TEXT_PARAGRAPH_LARGEST_BOUND_HEIGHT_PX,
  TEXT_PARAGRAPH_LARGEST_BOUND_WIDTH_PX,
  TEXT_PARAGRAPH_PLAYGROUND_PADDING_PX,
  TEXT_PARAGRAPH_VARIANTS,
  textParagraphVariantKey,
  type TextParagraphFontWeight,
  type TextParagraphTypography,
} from './types';
import './text-paragraph-showcase.css';

const showcaseCanvas: Decorator = (Story) => (
  <div
    className="text-paragraph-showcase-canvas"
    data-line-height-mode={TEXT_PARAGRAPH_FIGMA_LINE_HEIGHT_MODE_SLUG}
  >
    <Story />
  </div>
);

const playgroundSectionStyle = {
  '--text-paragraph-playground-bound-w': `${TEXT_PARAGRAPH_LARGEST_BOUND_WIDTH_PX}px`,
  '--text-paragraph-playground-bound-h': `${TEXT_PARAGRAPH_LARGEST_BOUND_HEIGHT_PX}px`,
  '--text-paragraph-playground-padding': `${TEXT_PARAGRAPH_PLAYGROUND_PADDING_PX}px`,
} as CSSProperties;

const playgroundSection: Decorator = (Story) => (
  <div
    className="text-paragraph-showcase-section text-paragraph-showcase-section--playground"
    style={playgroundSectionStyle}
  >
    <div className="text-paragraph-showcase-playground">
      <Story />
    </div>
  </div>
);

const typographyOptions: TextParagraphTypography[] = ['bodyL'];

const fontWeightOptions: TextParagraphFontWeight[] = ['regular', 'medium'];

const meta = {
  title: 'Atoms/Text Paragraph',
  component: TextParagraph,
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Figma \`text - paragraph\` (171:839): **regular** → ${TEXT_PARAGRAPH_FIGMA_FONT_BY_WEIGHT.regular.family}, **medium** → ${TEXT_PARAGRAPH_FIGMA_FONT_BY_WEIGHT.medium.family} (жёстко по fontWeight, не зависит от toolbar Font). Line-height: **${TEXT_PARAGRAPH_FIGMA_LINE_HEIGHT_MODE_SLUG}**.`,
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
    wide: { control: 'boolean' },
    text: { control: 'text' },
  },
} satisfies Meta<typeof TextParagraph>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [playgroundSection],
  args: {
    typography: 'bodyL',
    fontWeight: 'regular',
    tPadding: false,
    bPadding: false,
    wide: true,
    text: 'Paragraph',
  },
  render: (args) => (
    <PaddingRulerFrame>
      <TextParagraph {...args} />
    </PaddingRulerFrame>
  ),
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { TextParagraph } from '@/components/atoms/text-paragraph/TextParagraph';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div style={{ padding: 24 }}>`,
          `      <TextParagraph typography="bodyL" fontWeight="regular" wide text="Paragraph" />`,
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
    <div className="text-paragraph-showcase-section text-paragraph-showcase-section--board">
      <div className="text-paragraph-showcase">
        {TEXT_PARAGRAPH_VARIANTS.map((variant) => (
          <TextParagraph
            key={textParagraphVariantKey(variant)}
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

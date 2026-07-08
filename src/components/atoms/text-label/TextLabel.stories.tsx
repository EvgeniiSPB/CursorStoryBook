import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { TextLabel } from './TextLabel';
import {
  TEXT_LABEL_FIGMA_COLOR_CSS_VAR,
  TEXT_LABEL_FIGMA_FONT_FAMILY,
  TEXT_LABEL_FIGMA_FONT_MODE_SLUG,
  TEXT_LABEL_LARGEST_BOUND_HEIGHT_PX,
  TEXT_LABEL_LARGEST_BOUND_WIDTH_PX,
  TEXT_LABEL_PLAYGROUND_PADDING_PX,
  TEXT_LABEL_VARIANTS,
  textLabelVariantKey,
  type TextLabelPaddingSize,
  type TextLabelTypography,
} from './types';
import './text-label-showcase.css';

const showcaseCanvas: Decorator = (Story) => (
  <div className="text-label-showcase-canvas" data-font-mode={TEXT_LABEL_FIGMA_FONT_MODE_SLUG}>
    <Story />
  </div>
);

const playgroundSectionStyle = {
  '--text-label-playground-bound-w': `${TEXT_LABEL_LARGEST_BOUND_WIDTH_PX}px`,
  '--text-label-playground-bound-h': `${TEXT_LABEL_LARGEST_BOUND_HEIGHT_PX}px`,
  '--text-label-playground-padding': `${TEXT_LABEL_PLAYGROUND_PADDING_PX}px`,
} as CSSProperties;

const playgroundSection: Decorator = (Story) => (
  <div
    className="text-label-showcase-section text-label-showcase-section--playground"
    style={playgroundSectionStyle}
  >
    <div className="text-label-showcase-playground">
      <Story />
    </div>
  </div>
);

const typographyOptions: TextLabelTypography[] = [
  'bodyXS',
  'bodyS',
  'bodyM',
  'bodyL',
  'bodyXL',
];

const paddingSizeOptions: TextLabelPaddingSize[] = ['none', 'tiny', 'small'];

const meta = {
  title: 'Atoms/Text Label',
  component: TextLabel,
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Figma \`text - label\` (125:626): **${TEXT_LABEL_FIGMA_FONT_FAMILY}**, **regular** only. Color: **${TEXT_LABEL_FIGMA_COLOR_CSS_VAR}** (primary/50). Frame padding: spaces/semantic (tiny/small).`,
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
} satisfies Meta<typeof TextLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [playgroundSection],
  args: {
    typography: 'bodyM',
    paddingSize: 'none',
    tPadding: false,
    bPadding: false,
    text: 'Label',
  },
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { TextLabel } from '@/components/atoms/text-label/TextLabel';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div style={{ padding: 24 }}>`,
          `      <TextLabel typography="bodyM" text="Label" />`,
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
    <div className="text-label-showcase-section text-label-showcase-section--board">
      <div className="text-label-showcase">
        {TEXT_LABEL_VARIANTS.map((variant) => (
          <TextLabel
            key={textLabelVariantKey(variant)}
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

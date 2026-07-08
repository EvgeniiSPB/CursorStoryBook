import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { TextDescription } from './TextDescription';
import {
  TEXT_DESCRIPTION_FIGMA_FONT_FAMILY,
  TEXT_DESCRIPTION_FIGMA_FONT_MODE_SLUG,
  TEXT_DESCRIPTION_LARGEST_BOUND_HEIGHT_PX,
  TEXT_DESCRIPTION_LARGEST_BOUND_WIDTH_PX,
  TEXT_DESCRIPTION_PLAYGROUND_PADDING_PX,
  TEXT_DESCRIPTION_VARIANTS,
  textDescriptionVariantKey,
  type TextDescriptionFontWeight,
  type TextDescriptionPaddingSize,
  type TextDescriptionTypography,
} from './types';
import './text-description-showcase.css';

const showcaseCanvas: Decorator = (Story) => (
  <div
    className="text-description-showcase-canvas"
    data-font-mode={TEXT_DESCRIPTION_FIGMA_FONT_MODE_SLUG}
  >
    <Story />
  </div>
);

const playgroundSectionStyle = {
  '--text-description-playground-bound-w': `${TEXT_DESCRIPTION_LARGEST_BOUND_WIDTH_PX}px`,
  '--text-description-playground-bound-h': `${TEXT_DESCRIPTION_LARGEST_BOUND_HEIGHT_PX}px`,
  '--text-description-playground-padding': `${TEXT_DESCRIPTION_PLAYGROUND_PADDING_PX}px`,
} as CSSProperties;

const playgroundSection: Decorator = (Story) => (
  <div
    className="text-description-showcase-section text-description-showcase-section--playground"
    style={playgroundSectionStyle}
  >
    <div className="text-description-showcase-playground">
      <Story />
    </div>
  </div>
);

const typographyOptions: TextDescriptionTypography[] = [
  'bodyXS',
  'bodyS',
  'bodyM',
  'bodyL',
  'bodyXL',
];

const fontWeightOptions: TextDescriptionFontWeight[] = ['regular', 'medium'];

const paddingSizeOptions: TextDescriptionPaddingSize[] = ['none', 'tiny', 'small'];

const meta = {
  title: 'Atoms/Text Description',
  component: TextDescription,
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Figma \`text - description\` (158:732): **${TEXT_DESCRIPTION_FIGMA_FONT_FAMILY}** для всех вариантов. Frame padding: **spaces/semantic** (tiny/small по typography). Line-height: **tight** (default).`,
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
    paddingSize: {
      control: 'select',
      options: paddingSizeOptions,
    },
    tPadding: { control: 'boolean' },
    bPadding: { control: 'boolean' },
    text: { control: 'text' },
  },
} satisfies Meta<typeof TextDescription>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [playgroundSection],
  args: {
    typography: 'bodyM',
    fontWeight: 'regular',
    paddingSize: 'none',
    tPadding: false,
    bPadding: false,
    text: 'Description',
  },
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { TextDescription } from '@/components/atoms/text-description/TextDescription';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div style={{ padding: 24 }}>`,
          `      <TextDescription typography="bodyM" fontWeight="regular" text="Description" />`,
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
    <div className="text-description-showcase-section text-description-showcase-section--board">
      <div className="text-description-showcase">
        {TEXT_DESCRIPTION_VARIANTS.map((variant) => (
          <TextDescription
            key={textDescriptionVariantKey(variant)}
            typography={variant.typography}
            fontWeight={variant.fontWeight}
            tPadding={variant.tPadding}
            bPadding={variant.bPadding}
            paddingSize={variant.paddingSize}
          />
        ))}
      </div>
    </div>
  ),
};

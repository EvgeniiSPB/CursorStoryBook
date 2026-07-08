import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { showcaseCanvas } from '../../../storybook/showcase-decorators';
import { SHOWCASE_PLAYGROUND_PADDING_PX } from '../../../storybook/showcase-constants';
import {
  BadgeDigits,
  type BadgeDigitsProps,
  type BadgeDigitsType,
  type BadgeDigitsCharacters,
} from './BadgeDigits';
import { tonnedSegmentDecorator, TONNED_SEGMENT } from '../decorators';
import '../badge-showcase.css';

const types: BadgeDigitsType[] = [
  'outlined',
  'outlinedConstantInverted',
  'tonned',
];

const charactersOptions: BadgeDigitsCharacters[] = ['1-2', '3'];

const BADGE_DIGITS_PLAYGROUND_BOUND_W_PX = 36;
const BADGE_DIGITS_PLAYGROUND_BOUND_H_PX = 20;

const playgroundSectionStyle = {
  '--showcase-playground-bound-w': `${BADGE_DIGITS_PLAYGROUND_BOUND_W_PX}px`,
  '--showcase-playground-bound-h': `${BADGE_DIGITS_PLAYGROUND_BOUND_H_PX}px`,
  '--showcase-playground-padding': `${SHOWCASE_PLAYGROUND_PADDING_PX}px`,
} as CSSProperties;

const playgroundSection: Decorator = (Story) => (
  <div
    className="showcase-layout-section showcase-layout-section--playground"
    style={playgroundSectionStyle}
  >
    <div className="showcase-layout-playground">
      <Story />
    </div>
  </div>
);

const meta = {
  title: 'Components/Badges/Digits',
  component: BadgeDigits,
  tags: ['autodocs'],
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    type: {
      control: 'select',
      options: types,
    },
    characters: {
      control: 'select',
      options: charactersOptions,
    },
    children: { control: 'text', name: 'value' },
  },
  args: {
    type: 'outlined',
    characters: '1-2',
    children: '00',
  },
  render: (args: BadgeDigitsProps) => (
    <div {...(args.type === 'tonned' ? { 'data-segment': TONNED_SEGMENT } : {})}>
      <BadgeDigits {...args} />
    </div>
  ),
} satisfies Meta<typeof BadgeDigits>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [playgroundSection],
};

export const OutlinedOneTwo: Story = {
  name: 'Outlined / 1-2 chars',
  args: { type: 'outlined', characters: '1-2' },
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { BadgeDigits } from '@/components/Badges/digits/BadgeDigits';`,
          `import '@/components/Badges/badges-shared.css';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div style={{ padding: 24 }}>`,
          `      <BadgeDigits type="outlined" characters="1-2" />`,
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

export const OutlinedThree: Story = {
  name: 'Outlined / 3 chars',
  args: { type: 'outlined', characters: '3', children: '000' },
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { BadgeDigits } from '@/components/Badges/digits/BadgeDigits';`,
          `import '@/components/Badges/badges-shared.css';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div style={{ padding: 24 }}>`,
          `      <BadgeDigits type="outlined" characters="3" />`,
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

export const OutlinedConstantInvertedOneTwo: Story = {
  name: 'Outlined constant inverted / 1-2 chars',
  args: { type: 'outlinedConstantInverted', characters: '1-2' },
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { BadgeDigits } from '@/components/Badges/digits/BadgeDigits';`,
          `import '@/components/Badges/badges-shared.css';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div style={{ padding: 24 }}>`,
          `      <BadgeDigits type="outlinedConstantInverted" characters="1-2" />`,
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

export const OutlinedConstantInvertedThree: Story = {
  name: 'Outlined constant inverted / 3 chars',
  args: { type: 'outlinedConstantInverted', characters: '3', children: '000' },
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { BadgeDigits } from '@/components/Badges/digits/BadgeDigits';`,
          `import '@/components/Badges/badges-shared.css';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div style={{ padding: 24 }}>`,
          `      <BadgeDigits type="outlinedConstantInverted" characters="3" />`,
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

export const TonnedOneTwo: Story = {
  name: 'Tonned / 1-2 chars',
  args: { type: 'tonned', characters: '1-2' },
  decorators: [tonnedSegmentDecorator],
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { BadgeDigits } from '@/components/Badges/digits/BadgeDigits';`,
          `import '@/components/Badges/badges-shared.css';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div data-segment="metallic" style={{ padding: 24 }}>`,
          `      <BadgeDigits type="tonned" characters="1-2" />`,
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

export const TonnedThree: Story = {
  name: 'Tonned / 3 chars',
  args: { type: 'tonned', characters: '3', children: '000' },
  decorators: [tonnedSegmentDecorator],
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { BadgeDigits } from '@/components/Badges/digits/BadgeDigits';`,
          `import '@/components/Badges/badges-shared.css';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div data-segment="metallic" style={{ padding: 24 }}>`,
          `      <BadgeDigits type="tonned" characters="3" />`,
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
    <div className="showcase-layout-section showcase-layout-section--board">
      <div className="badge-showcase">
        {types.map((type) => (
          <div
            key={type}
            className="badge-showcase__column"
            {...(type === 'tonned' ? { 'data-segment': TONNED_SEGMENT } : {})}
          >
            {charactersOptions.map((characters) => (
              <BadgeDigits key={characters} type={type} characters={characters} />
            ))}
          </div>
        ))}
      </div>
    </div>
  ),
};

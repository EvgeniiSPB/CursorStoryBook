import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { showcaseCanvas } from '../../../storybook/showcase-decorators';
import { SHOWCASE_PLAYGROUND_PADDING_PX } from '../../../storybook/showcase-constants';
import { BadgeGroup, type BadgeGroupProps, type BadgeGroupDigits } from './BadgeGroup';
import '../badge-showcase.css';

const digitsOptions: BadgeGroupDigits[] = ['2', '3'];

const BADGE_GROUP_PLAYGROUND_BOUND_W_PX = 88;
const BADGE_GROUP_PLAYGROUND_BOUND_H_PX = 24;

const playgroundSectionStyle = {
  '--showcase-playground-bound-w': `${BADGE_GROUP_PLAYGROUND_BOUND_W_PX}px`,
  '--showcase-playground-bound-h': `${BADGE_GROUP_PLAYGROUND_BOUND_H_PX}px`,
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
  title: 'Components/Badges/BadgeGroup',
  component: BadgeGroup,
  tags: ['autodocs'],
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    digits: {
      control: 'select',
      options: digitsOptions,
    },
    text: { control: 'text', name: 'value' },
    digitsLabel: { control: 'text', name: 'digitsLabel' },
  },
  args: {
    text: 'Value',
    digits: '2',
    digitsLabel: '00',
  },
} satisfies Meta<typeof BadgeGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [playgroundSection],
};

export const DigitsTwo: Story = {
  name: 'digits=2',
  args: { digits: '2' },
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { BadgeGroup } from '@/components/Badges/badgeGroup/BadgeGroup';`,
          `import '@/components/Badges/badges-shared.css';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div style={{ padding: 24 }}>`,
          `      <BadgeGroup text="Value" digits="2" />`,
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

export const DigitsThree: Story = {
  name: 'digits=3',
  args: { digits: '3', digitsLabel: '000' },
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { BadgeGroup } from '@/components/Badges/badgeGroup/BadgeGroup';`,
          `import '@/components/Badges/badges-shared.css';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div style={{ padding: 24 }}>`,
          `      <BadgeGroup text="Value" digits="3" />`,
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
  render: (args: BadgeGroupProps) => (
    <div className="showcase-layout-section showcase-layout-section--board">
      <div className="badge-showcase__row">
        {digitsOptions.map((digits) => (
          <BadgeGroup key={digits} {...args} digits={digits} />
        ))}
      </div>
    </div>
  ),
};

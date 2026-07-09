import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs, useEffect } from 'storybook/preview-api';
import { showcaseCanvas } from '../../../storybook/showcase-decorators';
import { SHOWCASE_PLAYGROUND_PADDING_PX } from '../../../storybook/showcase-constants';
import { BadgeGroup, type BadgeGroupProps, type BadgeGroupDigits } from './BadgeGroup';
import '../badge-showcase.css';

const digitsOptions: BadgeGroupDigits[] = ['2', '3'];

// Auto-sync `digitsLabel` with the `digits` selector on Playground so switching
// digits=2 ↔ digits=3 updates the right-panel input from '00' ↔ '000'. Sync
// runs when the current label looks like a stray zeros-only default (empty,
// '0', '00', '000', …) — a user-typed override like '42' is preserved because
// it doesn't match the pattern.
const DIGITS_DEFAULT_LABEL: Record<BadgeGroupDigits, string> = { '2': '00', '3': '000' };
const ZEROS_ONLY = /^0*$/;

const BADGE_GROUP_PLAYGROUND_BOUND_W_PX = 88;
const BADGE_GROUP_PLAYGROUND_BOUND_H_PX = 24;

const playgroundSectionStyle = {
  '--showcase-playground-bound-w': `${BADGE_GROUP_PLAYGROUND_BOUND_W_PX}px`,
  '--showcase-playground-bound-h': `${BADGE_GROUP_PLAYGROUND_BOUND_H_PX}px`,
  '--showcase-playground-padding': `${SHOWCASE_PLAYGROUND_PADDING_PX}px`,
} as CSSProperties;

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
  render: (args) => {
    const [, updateArgs] = useArgs<BadgeGroupProps>();
    // Defensive lookup — if args.digits arrives as something outside the
    // declared options (URL pollution, reset edge cases), fall back to '2'.
    const digits: BadgeGroupDigits = args.digits === '3' ? '3' : '2';
    const expected = DIGITS_DEFAULT_LABEL[digits];
    useEffect(() => {
      const current = args.digitsLabel;
      if (
        typeof current === 'string' &&
        ZEROS_ONLY.test(current) &&
        current !== expected
      ) {
        updateArgs({ digitsLabel: expected });
      }
    }, [args.digits, expected, args.digitsLabel]);
    // Wrap in the playground surface so ALL non-showcase stories get the same
    // container (Playground + digits=2 + digits=3). AllVariants defines its
    // own render. BadgeGroup has no "inverted" type — always light surface.
    return (
      <div
        className={[
          'showcase-layout-section',
          'showcase-layout-section--playground',
          'showcase-layout-section--playground-surface-light',
        ].join(' ')}
        style={playgroundSectionStyle}
      >
        <div className="showcase-layout-playground">
          <BadgeGroup {...args} />
        </div>
      </div>
    );
  },
} satisfies Meta<typeof BadgeGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

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

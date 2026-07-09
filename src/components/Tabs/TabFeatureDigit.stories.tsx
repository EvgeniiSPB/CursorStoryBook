import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { showcaseCanvas } from '../../storybook/showcase-decorators';
import { SHOWCASE_PLAYGROUND_PADDING_PX } from '../../storybook/showcase-constants';
import { TabFeatureDigit, type TabFeatureDigitState } from './TabFeatureDigit';
import './tabs-showcase.css';

const states: TabFeatureDigitState[] = ['default', 'hover', 'click', 'active'];

const TAB_FEATURE_DIGIT_PLAYGROUND_BOUND_PX = 36;

const playgroundSectionStyle = {
  '--showcase-playground-bound-w': `${TAB_FEATURE_DIGIT_PLAYGROUND_BOUND_PX}px`,
  '--showcase-playground-bound-h': `${TAB_FEATURE_DIGIT_PLAYGROUND_BOUND_PX}px`,
  '--showcase-playground-padding': `${SHOWCASE_PLAYGROUND_PADDING_PX}px`,
} as CSSProperties;

const playgroundSection: Decorator = (Story) => (
  <div
    className="showcase-layout-section showcase-layout-section--playground tab-feature-digit-showcase-section"
    style={playgroundSectionStyle}
  >
    <div className="showcase-layout-playground">
      <Story />
    </div>
  </div>
);

const meta = {
  title: 'Components/Tabs/Tab Feature Digit',
  component: TabFeatureDigit,
  tags: ['autodocs'],
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    state: { control: 'select', options: states },
    children: { control: 'text', name: 'value' },
    active: { table: { disable: true } },
  },
  args: {
    children: '00',
    state: 'default',
  },
} satisfies Meta<typeof TabFeatureDigit>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [playgroundSection],
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { TabFeatureDigit } from '@/components/Tabs/TabFeatureDigit';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div style={{ padding: 24 }}>`,
          `      <TabFeatureDigit>00</TabFeatureDigit>`,
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
    <div className="showcase-layout-section showcase-layout-section--board tab-feature-digit-showcase-section">
      <div className="tabs-showcase">
        {states.map((state) => (
          <TabFeatureDigit
            key={state}
            state={state === 'default' ? undefined : state}
            className={state === 'default' ? undefined : 'tabs-showcase__row--static'}
          />
        ))}
      </div>
    </div>
  ),
};

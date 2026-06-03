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
    className="showcase-layout-section showcase-layout-section--playground"
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
    children: { control: 'text' },
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
};

export const Default: Story = {
  args: { state: 'default' },
};

export const Hover: Story = {
  args: { state: 'hover' },
};

export const Click: Story = {
  args: { state: 'click' },
};

export const Active: Story = {
  args: { state: 'active' },
};

export const AllStates: Story = {
  name: 'All states',
  render: () => (
    <div className="showcase-layout-section showcase-layout-section--board">
      <div className="tabs-showcase">
        {states.map((state) => (
          <TabFeatureDigit
            key={state}
            state={state}
            className="tabs-showcase__row--static"
          />
        ))}
      </div>
    </div>
  ),
};

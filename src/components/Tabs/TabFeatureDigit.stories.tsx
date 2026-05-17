import type { Meta, StoryObj } from '@storybook/react-vite';
import { TabFeatureDigit, type TabFeatureDigitState } from './TabFeatureDigit';
import { tabsCanvasDecorator } from './decorators';

const states: TabFeatureDigitState[] = ['default', 'hover', 'click', 'active'];

const meta = {
  title: 'Tabs/Tab Feature Digit',
  component: TabFeatureDigit,
  tags: ['autodocs'],
  decorators: [tabsCanvasDecorator],
  parameters: {
    layout: 'centered',
    backgrounds: { disable: true },
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

export const Playground: Story = {};

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
  parameters: {
    layout: 'centered',
  },
  render: () => (
    <div className="tabs-showcase">
      {states.map((state) => (
        <TabFeatureDigit
          key={state}
          state={state}
          className="tabs-showcase__row--static"
        />
      ))}
    </div>
  ),
};

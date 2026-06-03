import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { showcaseCanvas } from '../../../storybook/showcase-decorators';
import { SHOWCASE_PLAYGROUND_PADDING_PX } from '../../../storybook/showcase-constants';
import { BadgeText, type BadgeTextProps, type BadgeTextType } from './BadgeText';
import { tonnedSegmentDecorator, TONNED_SEGMENT } from '../decorators';
import '../badge-showcase.css';

const types: BadgeTextType[] = ['filled', 'outlined', 'brand', 'tonned'];

const BADGE_TEXT_PLAYGROUND_BOUND_W_PX = 72;
const BADGE_TEXT_PLAYGROUND_BOUND_H_PX = 24;

const playgroundSectionStyle = {
  '--showcase-playground-bound-w': `${BADGE_TEXT_PLAYGROUND_BOUND_W_PX}px`,
  '--showcase-playground-bound-h': `${BADGE_TEXT_PLAYGROUND_BOUND_H_PX}px`,
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
  title: 'Components/Badges/Text',
  component: BadgeText,
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
    icon: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    children: 'Value',
    type: 'filled',
    icon: true,
  },
  render: (args: BadgeTextProps) => (
    <div {...(args.type === 'tonned' ? { 'data-segment': TONNED_SEGMENT } : {})}>
      <BadgeText {...args} />
    </div>
  ),
} satisfies Meta<typeof BadgeText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [playgroundSection],
};

export const Filled: Story = {
  args: { type: 'filled', icon: false },
};

export const FilledWithIcon: Story = {
  name: 'Filled / with icon',
  args: { type: 'filled', icon: true },
};

export const Outlined: Story = {
  args: { type: 'outlined', icon: false },
};

export const OutlinedWithIcon: Story = {
  name: 'Outlined / with icon',
  args: { type: 'outlined', icon: true },
};

export const Brand: Story = {
  args: { type: 'brand', icon: false },
};

export const BrandWithIcon: Story = {
  name: 'Brand / with icon',
  args: { type: 'brand', icon: true },
};

export const Tonned: Story = {
  args: { type: 'tonned', icon: false },
  decorators: [tonnedSegmentDecorator],
};

export const TonnedWithIcon: Story = {
  name: 'Tonned / with icon',
  args: { type: 'tonned', icon: true },
  decorators: [tonnedSegmentDecorator],
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
            <BadgeText type={type} icon />
            <BadgeText type={type} icon={false} />
          </div>
        ))}
      </div>
    </div>
  ),
};

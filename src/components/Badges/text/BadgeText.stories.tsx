import type { Meta, StoryObj } from '@storybook/react-vite';
import { BadgeText, type BadgeTextProps, type BadgeTextType } from './BadgeText';
import {
  badgeCanvasDecorator,
  tonnedSegmentDecorator,
  TONNED_SEGMENT,
} from '../decorators';

const types: BadgeTextType[] = ['filled', 'outlined', 'brand', 'tonned'];

const meta = {
  title: 'Badges/Text',
  component: BadgeText,
  tags: ['autodocs'],
  decorators: [badgeCanvasDecorator],
  parameters: {
    layout: 'centered',
    backgrounds: { disable: true },
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

export const Playground: Story = {};

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
  ),
};

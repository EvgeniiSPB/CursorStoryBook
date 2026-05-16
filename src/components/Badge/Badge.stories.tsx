import type { Meta, StoryObj } from '@storybook/react-vite';
import type { Decorator } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { Badge, type BadgeProps, type BadgeType } from './Badge';
import './badge.css';

const types: BadgeType[] = ['filled', 'outlined', 'brand', 'tonned'];

/** Tonned в макете на segment metallic; локально, без смены global toolbar */
const TONNED_SEGMENT = 'metallic';

function TonnedSegmentScope({
  type,
  children,
}: {
  type?: BadgeType;
  children: ReactNode;
}) {
  if (type === 'tonned') {
    return <div data-segment={TONNED_SEGMENT}>{children}</div>;
  }
  return <>{children}</>;
}

/** Фон превью как в макете Figma (#E4E4E4) */
const badgeCanvasDecorator: Decorator = (Story) => (
  <div className="badge-canvas">
    <Story />
  </div>
);

const tonnedSegmentDecorator: Decorator = (Story) => (
  <div data-segment={TONNED_SEGMENT}>
    <Story />
  </div>
);

const meta = {
  title: 'Badge',
  component: Badge,
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
  render: (args: BadgeProps) => (
    <TonnedSegmentScope type={args.type}>
      <Badge {...args} />
    </TonnedSegmentScope>
  ),
} satisfies Meta<typeof Badge>;

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
          <Badge type={type} icon />
          <Badge type={type} icon={false} />
        </div>
      ))}
    </div>
  ),
};

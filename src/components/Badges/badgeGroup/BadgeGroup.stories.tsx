import type { Meta, StoryObj } from '@storybook/react-vite';
import { BadgeGroup, type BadgeGroupProps, type BadgeGroupDigits } from './BadgeGroup';
import { badgeCanvasDecorator } from '../decorators';

const digitsOptions: BadgeGroupDigits[] = ['2', '3'];

const meta = {
  title: 'Badges/BadgeGroup',
  component: BadgeGroup,
  tags: ['autodocs'],
  decorators: [badgeCanvasDecorator],
  parameters: {
    layout: 'centered',
    backgrounds: { disable: true },
  },
  argTypes: {
    digits: {
      control: 'select',
      options: digitsOptions,
    },
    text: { control: 'text' },
    digitsLabel: { control: 'text' },
  },
  args: {
    text: 'Value',
    digits: '2',
  },
} satisfies Meta<typeof BadgeGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const DigitsTwo: Story = {
  name: 'digits=2',
  args: { digits: '2' },
};

export const DigitsThree: Story = {
  name: 'digits=3',
  args: { digits: '3' },
};

export const AllVariants: Story = {
  name: 'All variants',
  render: (args: BadgeGroupProps) => (
    <div className="badge-showcase__row">
      {digitsOptions.map((digits) => (
        <BadgeGroup key={digits} {...args} digits={digits} />
      ))}
    </div>
  ),
};

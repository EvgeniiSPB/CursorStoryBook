import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined'],
    },
    children: { control: 'text' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {
  args: {
    children: 'Кнопка',
    variant: 'filled',
  },
};

export const Outlined: Story = {
  args: {
    children: 'Кнопка',
    variant: 'outlined',
  },
};

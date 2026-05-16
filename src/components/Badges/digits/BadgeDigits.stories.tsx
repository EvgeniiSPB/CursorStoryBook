import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  BadgeDigits,
  type BadgeDigitsProps,
  type BadgeDigitsType,
  type BadgeDigitsCharacters,
} from './BadgeDigits';
import {
  badgeCanvasDecorator,
  tonnedSegmentDecorator,
  TONNED_SEGMENT,
} from '../decorators';

const types: BadgeDigitsType[] = [
  'outlined',
  'outlinedConstantInverted',
  'tonned',
];

const charactersOptions: BadgeDigitsCharacters[] = ['1-2', '3'];

const meta = {
  title: 'Badges/Digits',
  component: BadgeDigits,
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
    characters: {
      control: 'select',
      options: charactersOptions,
    },
    children: { control: 'text' },
  },
  args: {
    type: 'outlined',
    characters: '1-2',
  },
  render: (args: BadgeDigitsProps) => (
    <div {...(args.type === 'tonned' ? { 'data-segment': TONNED_SEGMENT } : {})}>
      <BadgeDigits {...args} />
    </div>
  ),
} satisfies Meta<typeof BadgeDigits>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const OutlinedOneTwo: Story = {
  name: 'Outlined / 1–2 chars',
  args: { type: 'outlined', characters: '1-2' },
};

export const OutlinedThree: Story = {
  name: 'Outlined / 3 chars',
  args: { type: 'outlined', characters: '3' },
};

export const OutlinedConstantInvertedOneTwo: Story = {
  name: 'Outlined constant inverted / 1–2 chars',
  args: { type: 'outlinedConstantInverted', characters: '1-2' },
};

export const OutlinedConstantInvertedThree: Story = {
  name: 'Outlined constant inverted / 3 chars',
  args: { type: 'outlinedConstantInverted', characters: '3' },
};

export const TonnedOneTwo: Story = {
  name: 'Tonned / 1–2 chars',
  args: { type: 'tonned', characters: '1-2' },
  decorators: [tonnedSegmentDecorator],
};

export const TonnedThree: Story = {
  name: 'Tonned / 3 chars',
  args: { type: 'tonned', characters: '3' },
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
          {charactersOptions.map((characters) => (
            <BadgeDigits key={characters} type={type} characters={characters} />
          ))}
        </div>
      ))}
    </div>
  ),
};

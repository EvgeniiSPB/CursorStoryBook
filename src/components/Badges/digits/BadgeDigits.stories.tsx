import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { showcaseCanvas } from '../../../storybook/showcase-decorators';
import { SHOWCASE_PLAYGROUND_PADDING_PX } from '../../../storybook/showcase-constants';
import {
  BadgeDigits,
  type BadgeDigitsProps,
  type BadgeDigitsType,
  type BadgeDigitsCharacters,
} from './BadgeDigits';
import { tonnedSegmentDecorator, TONNED_SEGMENT } from '../decorators';
import '../badge-showcase.css';

const types: BadgeDigitsType[] = [
  'outlined',
  'outlinedConstantInverted',
  'tonned',
];

const charactersOptions: BadgeDigitsCharacters[] = ['1-2', '3'];

const BADGE_DIGITS_PLAYGROUND_BOUND_W_PX = 36;
const BADGE_DIGITS_PLAYGROUND_BOUND_H_PX = 20;

const playgroundSectionStyle = {
  '--showcase-playground-bound-w': `${BADGE_DIGITS_PLAYGROUND_BOUND_W_PX}px`,
  '--showcase-playground-bound-h': `${BADGE_DIGITS_PLAYGROUND_BOUND_H_PX}px`,
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
  title: 'Components/Badges/Digits',
  component: BadgeDigits,
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

export const Playground: Story = {
  decorators: [playgroundSection],
};

export const OutlinedOneTwo: Story = {
  name: 'Outlined / 1-2 chars',
  args: { type: 'outlined', characters: '1-2' },
};

export const OutlinedThree: Story = {
  name: 'Outlined / 3 chars',
  args: { type: 'outlined', characters: '3' },
};

export const OutlinedConstantInvertedOneTwo: Story = {
  name: 'Outlined constant inverted / 1-2 chars',
  args: { type: 'outlinedConstantInverted', characters: '1-2' },
};

export const OutlinedConstantInvertedThree: Story = {
  name: 'Outlined constant inverted / 3 chars',
  args: { type: 'outlinedConstantInverted', characters: '3' },
};

export const TonnedOneTwo: Story = {
  name: 'Tonned / 1-2 chars',
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
    <div className="showcase-layout-section showcase-layout-section--board">
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
    </div>
  ),
};

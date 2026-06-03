import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { showcaseCanvas } from '../../storybook/showcase-decorators';
import { SHOWCASE_PLAYGROUND_PADDING_PX } from '../../storybook/showcase-constants';
import { Tag, type TagProps, type TagState, type TagTopic, type TagType } from './Tag';
import './tag-showcase.css';

const types: TagType[] = ['brand', 'brandConstantInverted'];
const topics: TagTopic[] = ['1stLvl', '2ndLvl'];
const states: TagState[] = ['normal', 'hover', 'click'];

const figmaColumns: { variant: TagType; topic: TagTopic }[] = [
  { variant: 'brand', topic: '1stLvl' },
  { variant: 'brand', topic: '2ndLvl' },
  { variant: 'brandConstantInverted', topic: '1stLvl' },
  { variant: 'brandConstantInverted', topic: '2ndLvl' },
];

const TAG_PLAYGROUND_BOUND_W_PX = 56;
const TAG_PLAYGROUND_BOUND_H_PX = 20;

const playgroundSectionStyle = {
  '--showcase-playground-bound-w': `${TAG_PLAYGROUND_BOUND_W_PX}px`,
  '--showcase-playground-bound-h': `${TAG_PLAYGROUND_BOUND_H_PX}px`,
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
  title: 'Components/Tags/Tag',
  component: Tag,
  tags: ['autodocs'],
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    variant: { control: 'select', options: types },
    topic: { control: 'select', options: topics },
    state: { control: 'select', options: states },
    children: { control: 'text' },
  },
  args: {
    children: 'Value',
    variant: 'brand',
    topic: '1stLvl',
    state: 'normal',
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [playgroundSection],
};

export const BrandFirstLevel: Story = {
  name: 'brand / 1stLvl',
  args: { variant: 'brand', topic: '1stLvl', state: 'normal' },
};

export const BrandSecondLevel: Story = {
  name: 'brand / 2ndLvl',
  args: { variant: 'brand', topic: '2ndLvl', state: 'normal' },
};

export const BrandConstantInvertedFirstLevel: Story = {
  name: 'brandConstantInverted / 1stLvl',
  args: { variant: 'brandConstantInverted', topic: '1stLvl', state: 'normal' },
};

export const BrandConstantInvertedSecondLevel: Story = {
  name: 'brandConstantInverted / 2ndLvl',
  args: { variant: 'brandConstantInverted', topic: '2ndLvl', state: 'normal' },
};

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div className="showcase-layout-section showcase-layout-section--board">
      <div className="tag-showcase">
        {figmaColumns.map(({ variant, topic }) => (
          <div key={`${variant}-${topic}`} className="tag-showcase__column">
            {states.map((state) => (
              <Tag
                key={state}
                variant={variant}
                topic={topic}
                state={state === 'normal' ? undefined : state}
                className={state === 'normal' ? undefined : 'tag-showcase__row--static'}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  name: 'Interactive (hover / click)',
  decorators: [playgroundSection],
  args: { state: undefined },
  argTypes: {
    state: { control: false },
  },
  render: (args: TagProps) => <Tag {...args} />,
};

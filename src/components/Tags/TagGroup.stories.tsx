import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { showcaseCanvas } from '../../storybook/showcase-decorators';
import { SHOWCASE_PLAYGROUND_PADDING_PX } from '../../storybook/showcase-constants';
import { TagGroup } from './TagGroup';
import type { TagState, TagType } from './Tag';
import './tag-showcase.css';

const variants: TagType[] = ['brand', 'brandConstantInverted'];
const states: TagState[] = ['normal', 'hover', 'click'];

const TAG_GROUP_PLAYGROUND_BOUND_W_PX = 72;
const TAG_GROUP_PLAYGROUND_BOUND_H_PX = 20;

const playgroundSectionStyle = {
  '--showcase-playground-bound-w': `${TAG_GROUP_PLAYGROUND_BOUND_W_PX}px`,
  '--showcase-playground-bound-h': `${TAG_GROUP_PLAYGROUND_BOUND_H_PX}px`,
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
  title: 'Components/Tags/TagGroup',
  component: TagGroup,
  tags: ['autodocs'],
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    variant: { control: 'select', options: variants },
    state: { control: 'select', options: states },
    firstState: { control: 'select', options: states },
    secondState: { control: 'select', options: states },
    firstLabel: { control: 'text' },
    secondLabel: { control: 'text' },
  },
  args: {
    variant: 'brand',
    firstLabel: 'Value',
    secondLabel: 'Value',
  },
} satisfies Meta<typeof TagGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [playgroundSection],
};

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div className="showcase-layout-section showcase-layout-section--board">
      <div className="tag-showcase tag-showcase--group">
        {variants.map((variant) => (
          <div key={variant} className="tag-showcase__column">
            {states.map((state) => (
              <TagGroup
                key={state}
                className={state === 'normal' ? undefined : 'tag-showcase__row--static'}
                variant={variant}
                firstState={state === 'normal' ? undefined : state}
                secondState={state === 'normal' ? undefined : 'normal'}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  ),
};

import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { showcaseCanvas } from '../../storybook/showcase-decorators';
import { SHOWCASE_PLAYGROUND_PADDING_PX } from '../../storybook/showcase-constants';
import { Tag, type TagState, type TagTopic, type TagType } from './Tag';
import './tag-showcase.css';

const types: TagType[] = ['brand', 'brandConstantInverted'];
const topics: TagTopic[] = ['1stLvl', '2ndLvl'];
const states: TagState[] = ['normal', 'hover', 'click'];

// Playground surface — `brandConstantInverted` is a variant designed for a
// dark background; flip the playground to inverted so contrast reads right.
type PlaygroundSurface = 'light' | 'inverted';

function tagPlaygroundSurface(
  variant: TagType | undefined,
): PlaygroundSurface {
  return variant === 'brandConstantInverted' ? 'inverted' : 'light';
}

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

const playgroundSection: Decorator = (Story, { args }) => {
  const variant = args.variant as TagType | undefined;
  const surface = tagPlaygroundSurface(variant);
  return (
    <div
      className={[
        'showcase-layout-section',
        'showcase-layout-section--playground',
        `showcase-layout-section--playground-surface-${surface}`,
      ].join(' ')}
      style={playgroundSectionStyle}
    >
      <div className="showcase-layout-playground">
        <Story />
      </div>
    </div>
  );
};

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
    children: { control: 'text', name: 'value' },
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
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { Tag } from '@/components/Tags/Tag';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div style={{ padding: 24 }}>`,
          `      <Tag variant="brand" topic="1stLvl">Value</Tag>`,
          `    </div>`,
          `  );`,
          `};`,
          ``,
          `const root = document.getElementById('root');`,
          `if (root) createRoot(root).render(<App />);`,
        ].join('\n'),
      },
    },
  },
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

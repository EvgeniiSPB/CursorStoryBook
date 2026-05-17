import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag, type TagProps, type TagState, type TagTopic, type TagType } from './Tag';

const types: TagType[] = ['brand', 'brandConstantInverted'];
const topics: TagTopic[] = ['1stLvl', '2ndLvl'];
const states: TagState[] = ['normal', 'hover', 'click'];

/** Порядок колонок как в Figma 4119:488 (слева направо) */
const figmaColumns: { variant: TagType; topic: TagTopic }[] = [
  { variant: 'brand', topic: '1stLvl' },
  { variant: 'brand', topic: '2ndLvl' },
  { variant: 'brandConstantInverted', topic: '1stLvl' },
  { variant: 'brandConstantInverted', topic: '2ndLvl' },
];

const meta = {
  title: 'Tags/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
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

export const Playground: Story = {};

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
  parameters: {
    layout: 'centered',
  },
  render: () => (
    <div className="tag-showcase-wrap">
      <div className="tag-showcase tag-showcase--figma">
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
  args: { state: undefined },
  argTypes: {
    state: { control: false },
  },
  render: (args: TagProps) => <Tag {...args} />,
};

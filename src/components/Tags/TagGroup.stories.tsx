import type { Meta, StoryObj } from '@storybook/react-vite';
import { TagGroup, type TagGroupProps } from './TagGroup';
import type { TagState, TagType } from './Tag';

const variants: TagType[] = ['brand', 'brandConstantInverted'];
const states: TagState[] = ['normal', 'hover', 'click'];

const meta = {
  title: 'Tags/TagGroup',
  component: TagGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
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

export const Playground: Story = {};

export const Brand: Story = {
  args: { variant: 'brand' },
};

export const BrandConstantInverted: Story = {
  name: 'brandConstantInverted',
  args: { variant: 'brandConstantInverted' },
};

export const AllVariants: Story = {
  name: 'All variants',
  parameters: {
    layout: 'centered',
  },
  render: () => (
    <div className="tag-showcase-wrap">
      <div className="tag-showcase tag-showcase--figma-group">
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

export const Interactive: Story = {
  name: 'Interactive (hover each tag)',
  render: (args: TagGroupProps) => <TagGroup {...args} />,
};

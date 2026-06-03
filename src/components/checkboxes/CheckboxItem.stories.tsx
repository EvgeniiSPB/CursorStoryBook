import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { showcaseCanvas } from '../../storybook/showcase-decorators';
import { CheckboxItem } from './CheckboxItem';
import {
  CHECKBOX_ITEM_BOARD_PADDING_PX,
  CHECKBOX_ITEM_BOARD_WIDTH_PX,
  CHECKBOX_ITEM_FIGMA_NODE_ID,
  CHECKBOX_ITEM_PLAYGROUND_BOUND_HEIGHT_PX,
  CHECKBOX_ITEM_PLAYGROUND_BOUND_WIDTH_PX,
  CHECKBOX_ITEM_PLAYGROUND_PADDING_PX,
  CHECKBOX_ITEM_VARIANTS,
  type CheckboxItemState,
} from './types';
import './checkbox-item-showcase.css';

const states: CheckboxItemState[] = ['normal', 'hover', 'click'];

const figmaColumns: { active: boolean }[] = [{ active: false }, { active: true }];

const playgroundSectionStyle = {
  '--showcase-playground-bound-w': `${CHECKBOX_ITEM_PLAYGROUND_BOUND_WIDTH_PX}px`,
  '--showcase-playground-bound-h': `${CHECKBOX_ITEM_PLAYGROUND_BOUND_HEIGHT_PX}px`,
  '--showcase-playground-padding': `${CHECKBOX_ITEM_PLAYGROUND_PADDING_PX}px`,
} as CSSProperties;

const boardSectionStyle = {
  '--showcase-board-width': `${CHECKBOX_ITEM_BOARD_WIDTH_PX}px`,
  '--showcase-board-padding': CHECKBOX_ITEM_BOARD_PADDING_PX,
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
  title: 'Components/Checkboxes/CheckboxItem',
  component: CheckboxItem,
  tags: ['autodocs'],
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Figma \`checkboxItem\` (${CHECKBOX_ITEM_FIGMA_NODE_ID}): **20px** toggle + **bodyM** label; **userChoice** on/off tokens; states **normal / hover / click** and **disabled**.`,
      },
    },
  },
  argTypes: {
    active: { control: 'boolean' },
    disabled: { control: 'boolean' },
    state: { control: 'select', options: states },
    children: { control: 'text' },
  },
  args: {
    children: 'Value',
    active: false,
    disabled: false,
    state: 'normal',
  },
} satisfies Meta<typeof CheckboxItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [playgroundSection],
  args: {
    active: false,
    disabled: false,
  },
};

export const Unchecked: Story = {
  name: 'Unchecked',
  args: { active: false, disabled: false, state: 'normal' },
};

export const Checked: Story = {
  name: 'Checked',
  args: { active: true, disabled: false, state: 'normal' },
};

export const DisabledUnchecked: Story = {
  name: 'Disabled / unchecked',
  args: { active: false, disabled: true, state: 'normal' },
};

export const DisabledChecked: Story = {
  name: 'Disabled / checked',
  args: { active: true, disabled: true, state: 'normal' },
};

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div
      className="showcase-layout-section showcase-layout-section--board"
      style={boardSectionStyle}
    >
      <div className="checkbox-item-showcase">
        {figmaColumns.map(({ active }) => (
          <div key={active ? 'on' : 'off'} className="checkbox-item-showcase__column">
            {CHECKBOX_ITEM_VARIANTS.filter((v) => v.active === active).map((variant) => (
              <CheckboxItem
                key={`${variant.active}-${variant.disabled}-${variant.state}`}
                active={variant.active}
                disabled={variant.disabled}
                state={variant.state === 'normal' ? undefined : variant.state}
                className="checkbox-item-showcase__row--static"
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
  args: { state: undefined, active: false, disabled: false },
  argTypes: {
    state: { control: false },
  },
};

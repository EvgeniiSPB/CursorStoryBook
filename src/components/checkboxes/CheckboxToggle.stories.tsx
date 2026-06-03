import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { showcaseCanvas } from '../../storybook/showcase-decorators';
import { CheckboxToggle } from './CheckboxToggle';
import {
  CHECKBOX_TOGGLE_BOARD_PADDING_PX,
  CHECKBOX_TOGGLE_BOARD_WIDTH_PX,
  CHECKBOX_TOGGLE_FIGMA_NODE_ID,
  CHECKBOX_TOGGLE_PLAYGROUND_BOUND_PX,
  CHECKBOX_TOGGLE_PLAYGROUND_PADDING_PX,
  CHECKBOX_TOGGLE_VARIANTS,
  type CheckboxItemState,
} from './types';
import './checkbox-toggle-showcase.css';

const states: CheckboxItemState[] = ['normal', 'hover', 'click'];

const figmaColumns: { active: boolean }[] = [{ active: false }, { active: true }];

const playgroundSectionStyle = {
  '--showcase-playground-bound-w': `${CHECKBOX_TOGGLE_PLAYGROUND_BOUND_PX}px`,
  '--showcase-playground-bound-h': `${CHECKBOX_TOGGLE_PLAYGROUND_BOUND_PX}px`,
  '--showcase-playground-padding': `${CHECKBOX_TOGGLE_PLAYGROUND_PADDING_PX}px`,
} as CSSProperties;

const boardSectionStyle = {
  '--showcase-board-width': `${CHECKBOX_TOGGLE_BOARD_WIDTH_PX}px`,
  '--showcase-board-padding': CHECKBOX_TOGGLE_BOARD_PADDING_PX,
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
  title: 'Components/Checkboxes/CheckboxToggle',
  component: CheckboxToggle,
  tags: ['autodocs'],
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Figma \`checkboxToggle\` (${CHECKBOX_TOGGLE_FIGMA_NODE_ID}): **20×20** control; **userChoice** on/off tokens; states **normal / hover / click**; off hover/click show preview checkmark.`,
      },
    },
  },
  argTypes: {
    active: { control: 'boolean' },
    disabled: { control: 'boolean' },
    state: { control: 'select', options: states },
  },
  args: {
    active: false,
    disabled: false,
    state: 'normal',
  },
} satisfies Meta<typeof CheckboxToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [playgroundSection],
  args: {
    active: false,
    disabled: false,
  },
};

export const OffNormal: Story = {
  name: 'Off / normal',
  args: { active: false, disabled: false, state: 'normal' },
};

export const OnNormal: Story = {
  name: 'On / normal',
  args: { active: true, disabled: false, state: 'normal' },
};

export const OffHover: Story = {
  name: 'Off / hover',
  args: { active: false, disabled: false, state: 'hover' },
};

export const OnHover: Story = {
  name: 'On / hover',
  args: { active: true, disabled: false, state: 'hover' },
};

export const OffClick: Story = {
  name: 'Off / click',
  args: { active: false, disabled: false, state: 'click' },
};

export const OnClick: Story = {
  name: 'On / click',
  args: { active: true, disabled: false, state: 'click' },
};

export const OffDisabled: Story = {
  name: 'Off / disabled',
  args: { active: false, disabled: true, state: 'normal' },
};

export const OnDisabled: Story = {
  name: 'On / disabled',
  args: { active: true, disabled: true, state: 'normal' },
};

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div
      className="showcase-layout-section showcase-layout-section--board"
      style={boardSectionStyle}
    >
      <div className="checkbox-toggle-showcase">
        {figmaColumns.map(({ active }) => (
          <div key={active ? 'on' : 'off'} className="checkbox-toggle-showcase__column">
            {CHECKBOX_TOGGLE_VARIANTS.filter((v) => v.active === active).map((variant) => (
              <CheckboxToggle
                key={`${variant.active}-${variant.disabled}-${variant.state}`}
                active={variant.active}
                disabled={variant.disabled}
                state={variant.state === 'normal' ? undefined : variant.state}
                className="checkbox-toggle-showcase__row--static"
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

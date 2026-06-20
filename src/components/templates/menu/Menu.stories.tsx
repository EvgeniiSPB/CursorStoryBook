import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { FIGMA_BODY_FONT_MODE_SLUG } from '../../../tokens/font-mode-options';
import { Menu } from './Menu';
import { MenuAtom } from './MenuAtom';
import {
  MENU_ATOM_BOARD_HEIGHT_PX,
  MENU_ATOM_BOARD_WIDTH_PX,
  MENU_ATOM_BOUND_HEIGHT_PX,
  MENU_ATOM_BOUND_WIDTH_PX,
  MENU_ATOM_DEFAULT_LABEL,
  MENU_ATOM_ICON_PICKER_LABELS,
  MENU_ATOM_ICON_PICKER_VALUES,
  MENU_ATOM_STATES,
  MENU_ATOM_SWAP_ICON,
  MENU_ATOM_VARIANTS,
  MENU_PLAYGROUND_PADDING_PX,
  menuAtomPropsFromVariant,
  menuAtomVariantKey,
} from './types';
import './menu-showcase.css';

const showcaseCanvas: Decorator = (Story) => (
  <div className="menu-showcase-canvas" data-font-mode={FIGMA_BODY_FONT_MODE_SLUG}>
    <Story />
  </div>
);

const playgroundSectionStyle = {
  '--menu-playground-bound-w': `${MENU_ATOM_BOUND_WIDTH_PX}px`,
  '--menu-playground-bound-h': `${MENU_ATOM_BOUND_HEIGHT_PX}px`,
  '--menu-playground-padding': `${MENU_PLAYGROUND_PADDING_PX}px`,
} as CSSProperties;

const playgroundSection: Decorator = (Story) => (
  <div
    className="menu-showcase-section menu-showcase-section--playground"
    style={playgroundSectionStyle}
  >
    <div className="menu-showcase-playground">
      <Story />
    </div>
  </div>
);

const atomBoardStyle = {
  '--menu-atom-board-width': MENU_ATOM_BOARD_WIDTH_PX,
  '--menu-atom-board-height': MENU_ATOM_BOARD_HEIGHT_PX,
} as CSSProperties;

const iconPickerControl = {
  control: 'select' as const,
  options: [...MENU_ATOM_ICON_PICKER_VALUES],
  labels: MENU_ATOM_ICON_PICKER_LABELS,
};

const meta = {
  title: 'Templates/Menu',
  component: MenuAtom,
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
    docs: { disable: true },
  },
  argTypes: {
    label: { control: 'text' },
    showLeftIcon: { control: 'boolean' },
    showRightIcon: { control: 'boolean' },
    leftIcon: {
      ...iconPickerControl,
      if: { arg: 'showLeftIcon' },
    },
    rightIcon: {
      ...iconPickerControl,
      if: { arg: 'showRightIcon' },
    },
    state: { control: 'select', options: [...MENU_ATOM_STATES] },
    active: { table: { disable: true } },
  },
  args: {
    label: MENU_ATOM_DEFAULT_LABEL,
    showLeftIcon: true,
    showRightIcon: true,
    leftIcon: MENU_ATOM_SWAP_ICON,
    rightIcon: MENU_ATOM_SWAP_ICON,
    state: 'default',
  },
} satisfies Meta<typeof MenuAtom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [playgroundSection],
};

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div
      className="menu-showcase-section menu-showcase-section--atom-board"
      style={atomBoardStyle}
    >
      <div className="menu-showcase-atom-board">
        {MENU_ATOM_VARIANTS.map((variant) => (
          <MenuAtom
            key={menuAtomVariantKey(variant)}
            className="menu-showcase-atom-board__variant"
            style={{ left: variant.figmaX, top: variant.figmaY }}
            {...menuAtomPropsFromVariant(variant)}
          />
        ))}
      </div>
    </div>
  ),
};

export const Template: Story = {
  render: () => (
    <div className="menu-showcase-section menu-showcase-section--template">
      <Menu />
    </div>
  ),
};

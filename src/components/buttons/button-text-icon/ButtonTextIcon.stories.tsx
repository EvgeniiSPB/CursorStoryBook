import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { FIGMA_BODY_FONT_MODE_SLUG } from '../../../tokens/font-mode-options';
import { ButtonTextIcon, buttonTextIconPropsFromVariant } from './ButtonTextIcon';
import {
  BUTTON_TEXT_ICON_BOARD_HEIGHT_PX,
  BUTTON_TEXT_ICON_BOARD_COLUMNS,
  BUTTON_TEXT_ICON_BOARD_WIDTH_PX,
  BUTTON_TEXT_ICON_FIGMA_NODE_ID,
  BUTTON_TEXT_ICON_PLAYGROUND_BOUND_SIZE_PX,
  BUTTON_TEXT_ICON_PLAYGROUND_PADDING_PX,
  BUTTON_TEXT_ICON_VARIANTS,
  buttonTextIconPlaygroundSurface,
  buttonTextIconVariantKey,
  type ButtonTextIconSize,
  type ButtonTextIconType,
} from './types';
import './button-text-icon-showcase.css';
import './button-text-icon-board.css';
import { buttonBoardScrollDecorator } from '../shared/button-board-decorators';

const showcaseCanvas: Decorator = (Story) => (
  <div
    className="button-text-icon-showcase-canvas"
    data-font-mode={FIGMA_BODY_FONT_MODE_SLUG}
  >
    <Story />
  </div>
);

const playgroundSectionStyle = {
  '--button-text-icon-playground-bound-size': `${BUTTON_TEXT_ICON_PLAYGROUND_BOUND_SIZE_PX}px`,
  '--button-text-icon-playground-padding': `${BUTTON_TEXT_ICON_PLAYGROUND_PADDING_PX}px`,
} as CSSProperties;

const playgroundSection: Decorator = (Story, { args }) => {
  const type = (args.type ?? 'primary') as ButtonTextIconType;
  const surface = buttonTextIconPlaygroundSurface(type);

  return (
    <div
      className={[
        'button-text-icon-showcase-section',
        'button-text-icon-showcase-section--playground',
        `button-text-icon-showcase-section--playground-surface-${surface}`,
      ].join(' ')}
      style={playgroundSectionStyle}
    >
      <div className="button-text-icon-showcase-playground">
        <Story />
      </div>
    </div>
  );
};

const types: ButtonTextIconType[] = [
  'primary',
  'primaryConstantInverted',
  'primaryBrand',
  'secondary',
  'secondaryConstantInverted',
  'secondaryBrand',
  'warning',
];

const sizes: ButtonTextIconSize[] = ['medium', 'small', 'tiny'];

const meta = {
  title: 'Components/Buttons/Button Text Icon',
  component: ButtonTextIcon,
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Figma \`button - text + icon\` (${BUTTON_TEXT_ICON_FIGMA_NODE_ID}): **252** variants on board **${BUTTON_TEXT_ICON_BOARD_WIDTH_PX}×${BUTTON_TEXT_ICON_BOARD_HEIGHT_PX}**; types **primary … warning**; sizes **medium / small / tiny**; states **normal / hover / click**; **fill** (368px) or **hug**; optional **extraPaddings**; icon **20px** + gap **4px**.`,
      },
    },
  },
  argTypes: {
    children: { control: 'text' },
    type: { control: 'select', options: types },
    size: { control: 'select', options: sizes },
    extraPaddings: { control: 'boolean' },
    fillHug: { control: 'boolean' },
    disabled: { control: 'boolean' },
    state: { table: { disable: true } },
  },
  args: {
    children: 'Value',
    type: 'primary',
    size: 'medium',
    extraPaddings: false,
    fillHug: false,
    disabled: false,
  },
} satisfies Meta<typeof ButtonTextIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [playgroundSection],
  args: {
    type: 'primary',
    size: 'medium',
    extraPaddings: false,
    fillHug: false,
    disabled: false,
  },
};

export const AllVariants: Story = {
  name: 'All variants',
  decorators: [buttonBoardScrollDecorator],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `Reference board **${BUTTON_TEXT_ICON_BOARD_WIDTH_PX}×${BUTTON_TEXT_ICON_BOARD_HEIGHT_PX}** — scroll horizontally. Seven background columns by \`type\`; each button at Figma x/y with static \`state\`.`,
      },
    },
  },
  render: () => (
    <div
      className="button-text-icon-board"
      style={
        {
          '--button-text-icon-board-width': BUTTON_TEXT_ICON_BOARD_WIDTH_PX,
          '--button-text-icon-board-height': BUTTON_TEXT_ICON_BOARD_HEIGHT_PX,
        } as CSSProperties
      }
    >
      <div className="button-text-icon-board__backgrounds" aria-hidden>
        {BUTTON_TEXT_ICON_BOARD_COLUMNS.map((column) => (
          <div
            key={column.type}
            className={`button-text-icon-board__column button-text-icon-board__column--${column.type}`}
            style={{ left: column.left, width: column.width }}
            {...(column.segment ? { 'data-segment': column.segment } : {})}
          />
        ))}
      </div>
      <div className="button-text-icon-board__variants">
        {BUTTON_TEXT_ICON_VARIANTS.map((variant) => (
          <ButtonTextIcon
            key={buttonTextIconVariantKey(variant)}
            {...buttonTextIconPropsFromVariant(variant)}
            className="button-text-icon-board__variant"
            style={{ left: variant.figmaX, top: variant.figmaY }}
          />
        ))}
      </div>
    </div>
  ),
};

import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { FIGMA_BODY_FONT_MODE_SLUG } from '../../../tokens/font-mode-options';
import { ButtonText, buttonTextPropsFromVariant } from './ButtonText';
import {
  BUTTON_TEXT_BOARD_COLUMNS,
  BUTTON_TEXT_BOARD_HEIGHT_PX,
  BUTTON_TEXT_BOARD_WIDTH_PX,
  BUTTON_TEXT_FIGMA_NODE_ID,
  BUTTON_TEXT_PLAYGROUND_BOUND_SIZE_PX,
  BUTTON_TEXT_PLAYGROUND_PADDING_PX,
  BUTTON_TEXT_VARIANTS,
  buttonTextVariantKey,
  type ButtonTextType,
} from './types';
import './button-text-showcase.css';
import './button-text-board.css';
import { buttonBoardScrollDecorator } from '../shared/button-board-decorators';

const showcaseCanvas: Decorator = (Story) => (
  <div className="button-text-showcase-canvas" data-font-mode={FIGMA_BODY_FONT_MODE_SLUG}>
    <Story />
  </div>
);

const playgroundSectionStyle = {
  '--button-text-playground-bound-size': `${BUTTON_TEXT_PLAYGROUND_BOUND_SIZE_PX}px`,
  '--button-text-playground-padding': `${BUTTON_TEXT_PLAYGROUND_PADDING_PX}px`,
} as CSSProperties;

const playgroundSection: Decorator = (Story) => (
  <div
    className={[
      'button-text-showcase-section',
      'button-text-showcase-section--playground',
    ].join(' ')}
    style={playgroundSectionStyle}
  >
    <div className="button-text-showcase-playground">
      <Story />
    </div>
  </div>
);

const types: ButtonTextType[] = ['primary', 'warning'];

const meta = {
  title: 'Components/Buttons/Button Text',
  component: ButtonText,
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Figma \`button - text\` (${BUTTON_TEXT_FIGMA_NODE_ID}): **6** variants on board **${BUTTON_TEXT_BOARD_WIDTH_PX}×${BUTTON_TEXT_BOARD_HEIGHT_PX}**; types **primary / warning**; states **normal / hover / click**; transparent text link.`,
      },
    },
  },
  argTypes: {
    type: { control: 'select', options: types },
    children: { control: 'text' },
    disabled: { control: 'boolean' },
    state: { table: { disable: true } },
  },
  args: {
    children: 'Value',
    type: 'primary',
    disabled: false,
  },
} satisfies Meta<typeof ButtonText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [playgroundSection],
  args: {
    children: 'Value',
    type: 'primary',
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
        story: `Reference board **${BUTTON_TEXT_BOARD_WIDTH_PX}×${BUTTON_TEXT_BOARD_HEIGHT_PX}** — two columns by \`type\`; each button at Figma x/y with static \`state\`.`,
      },
    },
  },
  render: () => (
    <div
      className="button-text-board"
      style={
        {
          '--button-text-board-width': BUTTON_TEXT_BOARD_WIDTH_PX,
          '--button-text-board-height': BUTTON_TEXT_BOARD_HEIGHT_PX,
        } as CSSProperties
      }
    >
      <div className="button-text-board__backgrounds" aria-hidden>
        {BUTTON_TEXT_BOARD_COLUMNS.map((column) => (
          <div
            key={column.type}
            className={`button-text-board__column button-text-board__column--${column.type}`}
            style={{ left: column.left, width: column.width }}
          />
        ))}
      </div>
      <div className="button-text-board__variants">
        {BUTTON_TEXT_VARIANTS.map((variant) => (
          <ButtonText
            key={buttonTextVariantKey(variant)}
            {...buttonTextPropsFromVariant(variant)}
            className="button-text-board__variant"
            style={{ left: variant.figmaX, top: variant.figmaY }}
          />
        ))}
      </div>
    </div>
  ),
};

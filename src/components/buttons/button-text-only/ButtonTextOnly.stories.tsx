import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { FIGMA_BODY_FONT_MODE_SLUG } from '../../../tokens/font-mode-options';
import { ButtonTextOnly, buttonTextOnlyPropsFromVariant } from './ButtonTextOnly';
import {
  BUTTON_TEXT_ONLY_BOARD_HEIGHT_PX,
  BUTTON_TEXT_ONLY_BOARD_COLUMNS,
  BUTTON_TEXT_ONLY_BOARD_WIDTH_PX,
  BUTTON_TEXT_ONLY_FIGMA_NODE_ID,
  BUTTON_TEXT_ONLY_PLAYGROUND_BOUND_SIZE_PX,
  BUTTON_TEXT_ONLY_PLAYGROUND_PADDING_PX,
  BUTTON_TEXT_ONLY_VARIANTS,
  buttonTextOnlyPlaygroundSurface,
  buttonTextOnlyVariantKey,
  type ButtonTextOnlySize,
  type ButtonTextOnlyType,
} from './types';
import './button-text-only-showcase.css';
import './button-text-only-board.css';
import { buttonBoardScrollDecorator } from '../shared/button-board-decorators';

const showcaseCanvas: Decorator = (Story) => (
  <div
    className="button-text-only-showcase-canvas"
    data-font-mode={FIGMA_BODY_FONT_MODE_SLUG}
  >
    <Story />
  </div>
);

const playgroundSectionStyle = {
  '--button-text-only-playground-bound-size': `${BUTTON_TEXT_ONLY_PLAYGROUND_BOUND_SIZE_PX}px`,
  '--button-text-only-playground-padding': `${BUTTON_TEXT_ONLY_PLAYGROUND_PADDING_PX}px`,
} as CSSProperties;

const playgroundSection: Decorator = (Story, { args }) => {
  const type = (args.type ?? 'primary') as ButtonTextOnlyType;
  const surface = buttonTextOnlyPlaygroundSurface(type);

  return (
    <div
      className={[
        'button-text-only-showcase-section',
        'button-text-only-showcase-section--playground',
        `button-text-only-showcase-section--playground-surface-${surface}`,
      ].join(' ')}
      style={playgroundSectionStyle}
    >
      <div className="button-text-only-showcase-playground">
        <Story />
      </div>
    </div>
  );
};

const types: ButtonTextOnlyType[] = [
  'primary',
  'primaryConstantInverted',
  'primaryBrand',
  'secondary',
  'secondaryConstantInverted',
  'secondaryBrand',
  'warning',
];

const sizes: ButtonTextOnlySize[] = ['medium', 'small', 'tiny'];

const meta = {
  title: 'Components/Buttons/Button Text Only',
  component: ButtonTextOnly,
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Figma \`button - text only\` (${BUTTON_TEXT_ONLY_FIGMA_NODE_ID}): **252** variants on board **${BUTTON_TEXT_ONLY_BOARD_WIDTH_PX}×${BUTTON_TEXT_ONLY_BOARD_HEIGHT_PX}**; types **primary … warning**; sizes **medium / small / tiny**; states **normal / hover / click**; **fill** (368px) or **hug**; optional **extraPaddings**.`,
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
} satisfies Meta<typeof ButtonTextOnly>;

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
        story: `Reference board **${BUTTON_TEXT_ONLY_BOARD_WIDTH_PX}×${BUTTON_TEXT_ONLY_BOARD_HEIGHT_PX}** — scroll horizontally. Seven background columns by \`type\`; each button at Figma x/y with static \`state\`.`,
      },
    },
  },
  render: () => (
    <div
      className="button-text-only-board"
      style={
        {
          '--button-text-only-board-width': BUTTON_TEXT_ONLY_BOARD_WIDTH_PX,
          '--button-text-only-board-height': BUTTON_TEXT_ONLY_BOARD_HEIGHT_PX,
        } as CSSProperties
      }
    >
      <div className="button-text-only-board__backgrounds" aria-hidden>
        {BUTTON_TEXT_ONLY_BOARD_COLUMNS.map((column) => (
          <div
            key={column.type}
            className={`button-text-only-board__column button-text-only-board__column--${column.type}`}
            style={{ left: column.left, width: column.width }}
            {...(column.segment ? { 'data-segment': column.segment } : {})}
          />
        ))}
      </div>
      <div className="button-text-only-board__variants">
        {BUTTON_TEXT_ONLY_VARIANTS.map((variant) => (
          <ButtonTextOnly
            key={buttonTextOnlyVariantKey(variant)}
            {...buttonTextOnlyPropsFromVariant(variant)}
            className="button-text-only-board__variant"
            style={{ left: variant.figmaX, top: variant.figmaY }}
          />
        ))}
      </div>
    </div>
  ),
};

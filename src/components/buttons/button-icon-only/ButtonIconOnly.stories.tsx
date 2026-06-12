import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { FIGMA_BODY_FONT_MODE_SLUG } from '../../../tokens/font-mode-options';
import { ButtonIconOnly, buttonIconOnlyPropsFromVariant } from './ButtonIconOnly';
import {
  BUTTON_ICON_ONLY_BOARD_HEIGHT_PX,
  BUTTON_ICON_ONLY_BOARD_COLUMNS,
  BUTTON_ICON_ONLY_BOARD_WIDTH_PX,
  BUTTON_ICON_ONLY_FIGMA_NODE_ID,
  BUTTON_ICON_ONLY_PLAYGROUND_BOUND_SIZE_PX,
  BUTTON_ICON_ONLY_PLAYGROUND_PADDING_PX,
  BUTTON_ICON_ONLY_VARIANTS,
  buttonIconOnlyPlaygroundSurface,
  buttonIconOnlyVariantKey,
  type ButtonIconOnlySize,
  type ButtonIconOnlyType,
} from './types';
import './button-icon-only-showcase.css';
import './button-icon-only-board.css';

const showcaseCanvas: Decorator = (Story) => (
  <div
    className="button-icon-only-showcase-canvas"
    data-font-mode={FIGMA_BODY_FONT_MODE_SLUG}
  >
    <Story />
  </div>
);

const playgroundSectionStyle = {
  '--button-icon-only-playground-bound-size': `${BUTTON_ICON_ONLY_PLAYGROUND_BOUND_SIZE_PX}px`,
  '--button-icon-only-playground-padding': `${BUTTON_ICON_ONLY_PLAYGROUND_PADDING_PX}px`,
} as CSSProperties;

const playgroundSection: Decorator = (Story, { args }) => {
  const type = (args.type ?? 'primary') as ButtonIconOnlyType;
  const surface = buttonIconOnlyPlaygroundSurface(type);

  return (
    <div
      className={[
        'button-icon-only-showcase-section',
        'button-icon-only-showcase-section--playground',
        `button-icon-only-showcase-section--playground-surface-${surface}`,
      ].join(' ')}
      style={playgroundSectionStyle}
    >
      <div className="button-icon-only-showcase-playground">
        <Story />
      </div>
    </div>
  );
};

const boardScroll: Decorator = (Story) => (
  <div className="button-icon-only-board-scroll" data-font-mode={FIGMA_BODY_FONT_MODE_SLUG}>
    <Story />
  </div>
);

const types: ButtonIconOnlyType[] = [
  'primary',
  'primaryConstantInverted',
  'secondary',
  'secondaryBrand',
];

const sizes: ButtonIconOnlySize[] = ['medium', 'small', 'tiny'];

const meta = {
  title: 'Components/Buttons/Button Icon Only',
  component: ButtonIconOnly,
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Figma \`button - icon only\` (${BUTTON_ICON_ONLY_FIGMA_NODE_ID}): **72** variants on board **${BUTTON_ICON_ONLY_BOARD_WIDTH_PX}×${BUTTON_ICON_ONLY_BOARD_HEIGHT_PX}**; types **primary / primaryConstantInverted / secondary / secondaryBrand**; sizes **medium / small / tiny**; states **normal / hover / click**; always **hug**; optional **extraPaddings**; icon **20px**.`,
      },
    },
  },
  argTypes: {
    type: { control: 'select', options: types },
    size: { control: 'select', options: sizes },
    extraPaddings: { control: 'boolean' },
    disabled: { control: 'boolean' },
    'aria-label': { control: 'text' },
    state: { table: { disable: true } },
  },
  args: {
    type: 'primary',
    size: 'medium',
    extraPaddings: false,
    disabled: false,
    'aria-label': 'Action',
  },
} satisfies Meta<typeof ButtonIconOnly>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [playgroundSection],
  args: {
    type: 'primary',
    size: 'medium',
    extraPaddings: false,
    disabled: false,
    'aria-label': 'Action',
  },
};

export const AllVariants: Story = {
  name: 'All variants',
  decorators: [boardScroll],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `Reference board **${BUTTON_ICON_ONLY_BOARD_WIDTH_PX}×${BUTTON_ICON_ONLY_BOARD_HEIGHT_PX}** — scroll horizontally. Four columns by \`type\`; each button at Figma x/y with static \`state\`.`,
      },
    },
  },
  render: () => (
    <div
      className="button-icon-only-board"
      style={
        {
          '--button-icon-only-board-width': BUTTON_ICON_ONLY_BOARD_WIDTH_PX,
          '--button-icon-only-board-height': BUTTON_ICON_ONLY_BOARD_HEIGHT_PX,
        } as CSSProperties
      }
    >
      <div className="button-icon-only-board__backgrounds" aria-hidden>
        {BUTTON_ICON_ONLY_BOARD_COLUMNS.map((column) => (
          <div
            key={column.type}
            className={`button-icon-only-board__column button-icon-only-board__column--${column.type}`}
            style={{ left: column.left, width: column.width }}
            {...(column.segment ? { 'data-segment': column.segment } : {})}
          />
        ))}
      </div>
      <div className="button-icon-only-board__variants">
        {BUTTON_ICON_ONLY_VARIANTS.map((variant) => (
          <ButtonIconOnly
            key={buttonIconOnlyVariantKey(variant)}
            {...buttonIconOnlyPropsFromVariant(variant)}
            className="button-icon-only-board__variant"
            style={{ left: variant.figmaX, top: variant.figmaY }}
          />
        ))}
      </div>
    </div>
  ),
};

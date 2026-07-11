import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { FIGMA_BODY_FONT_MODE_SLUG } from '../../../tokens/font-mode-options';
import { ButtonSocial, buttonSocialPropsFromVariant } from './ButtonSocial';
import { buttonSocialSegmentDecorator } from './decorators';
import {
  BUTTON_SOCIAL_BOARD_HEIGHT_PX,
  BUTTON_SOCIAL_BOARD_WIDTH_PX,
  BUTTON_SOCIAL_FIGMA_NODE_ID,
  BUTTON_SOCIAL_PLAYGROUND_BOUND_SIZE_PX,
  BUTTON_SOCIAL_PLAYGROUND_PADDING_PX,
  BUTTON_SOCIAL_SEGMENT,
  BUTTON_SOCIAL_VARIANTS,
  buttonSocialVariantKey,
  type ButtonSocialState,
} from './types';
import './button-social-showcase.css';
import './button-social-board.css';
import { buttonSocialBoardScrollDecorator } from '../shared/button-board-decorators';

const showcaseCanvas: Decorator = (Story) => (
  <div className="button-social-showcase-canvas" data-font-mode={FIGMA_BODY_FONT_MODE_SLUG}>
    <Story />
  </div>
);

const playgroundSectionStyle = {
  '--button-social-playground-bound-size': `${BUTTON_SOCIAL_PLAYGROUND_BOUND_SIZE_PX}px`,
  '--button-social-playground-padding': `${BUTTON_SOCIAL_PLAYGROUND_PADDING_PX}px`,
} as CSSProperties;

const playgroundSection: Decorator = (Story) => (
  <div
    className={[
      'button-social-showcase-section',
      'button-social-showcase-section--playground',
    ].join(' ')}
    style={playgroundSectionStyle}
    data-segment={BUTTON_SOCIAL_SEGMENT}
  >
    <div className="button-social-showcase-playground">
      <Story />
    </div>
  </div>
);

const meta = {
  title: 'Components/Buttons/Button Social',
  component: ButtonSocial,
  decorators: [showcaseCanvas, buttonSocialSegmentDecorator],
  parameters: {
    layout: 'fullscreen',
    globals: {
      segment: BUTTON_SOCIAL_SEGMENT,
    },
    docs: {
      description: {
        component: `Figma \`button - social\` (${BUTTON_SOCIAL_FIGMA_NODE_ID}): **3** variants on board **${BUTTON_SOCIAL_BOARD_WIDTH_PX}×${BUTTON_SOCIAL_BOARD_HEIGHT_PX}**; type **tertiary**; states **normal / hover / click**; tonned pill (**segment ${BUTTON_SOCIAL_SEGMENT}** pinned) with special label (**vk**).`,
      },
    },
  },
  argTypes: {
    children: { control: 'text', name: 'label' },
    disabled: { control: 'boolean' },
    state: {
      control: 'select',
      options: ['normal', 'hover', 'click'] satisfies ButtonSocialState[],
    },
    type: { table: { disable: true } },
  },
  args: {
    children: 'vk',
    disabled: false,
    state: 'normal',
  },
} satisfies Meta<typeof ButtonSocial>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [playgroundSection],
  args: {
    children: 'vk',
    disabled: false,
    state: 'normal',
  },
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { ButtonSocial } from '@/components/buttons/button-social/ButtonSocial';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div data-segment="metallic" style={{ padding: 24 }}>`,
          `      <ButtonSocial>vk</ButtonSocial>`,
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
  decorators: [buttonSocialBoardScrollDecorator],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `Reference board **${BUTTON_SOCIAL_BOARD_WIDTH_PX}×${BUTTON_SOCIAL_BOARD_HEIGHT_PX}** — segment **${BUTTON_SOCIAL_SEGMENT}** pinned (Figma \`4089:7750\`); three \`tertiary\` states at Figma x/y.`,
      },
    },
  },
  render: () => (
    <div
      className="button-social-board"
      style={
        {
          '--button-social-board-width': BUTTON_SOCIAL_BOARD_WIDTH_PX,
          '--button-social-board-height': BUTTON_SOCIAL_BOARD_HEIGHT_PX,
        } as CSSProperties
      }
    >
      <div className="button-social-board__variants">
        {BUTTON_SOCIAL_VARIANTS.map((variant) => (
          <ButtonSocial
            key={buttonSocialVariantKey(variant)}
            {...buttonSocialPropsFromVariant(variant)}
            className="button-social-board__variant"
            style={{ left: variant.figmaX, top: variant.figmaY }}
          />
        ))}
      </div>
    </div>
  ),
};

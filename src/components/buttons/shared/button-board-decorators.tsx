import type { Decorator } from '@storybook/react-vite';
import { FIGMA_BODY_FONT_MODE_SLUG } from '../../../tokens/font-mode-options';
import { BUTTON_SOCIAL_SEGMENT } from '../button-social/types';

export const buttonBoardScrollDecorator: Decorator = (Story) => (
  <div className="button-board-scroll" data-font-mode={FIGMA_BODY_FONT_MODE_SLUG}>
    <div className="button-board-scroll__align">
      <Story />
    </div>
  </div>
);

export const buttonSocialBoardScrollDecorator: Decorator = (Story) => (
  <div
    className="button-board-scroll"
    data-font-mode={FIGMA_BODY_FONT_MODE_SLUG}
    data-segment={BUTTON_SOCIAL_SEGMENT}
  >
    <div className="button-board-scroll__align">
      <Story />
    </div>
  </div>
);

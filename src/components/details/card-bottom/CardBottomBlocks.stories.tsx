import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { showcaseCanvas } from '../../../storybook/showcase-decorators';
import { CardBottom, CARD_BOTTOM_VARIANTS } from './CardBottom';
import {
  CARD_BOTTOM_BASE_PRIMARY_HEIGHT_PX,
  CARD_BOTTOM_BOARD_GAP_PX,
  CARD_BOTTOM_BOARD_GRADIENT_GAP_OFFSET_PX,
  CARD_BOTTOM_BOARD_PADDING_PX,
  CARD_BOTTOM_BOARD_WIDTH_PX,
  CARD_BOTTOM_HBR_HEIGHT_PX,
  CARD_BOTTOM_WRAPPER_WIDTH_PX,
} from './constants';

const boardSectionStyle = {
  '--showcase-board-width': `${CARD_BOTTOM_WRAPPER_WIDTH_PX}px`,
  '--showcase-board-padding': CARD_BOTTOM_BOARD_PADDING_PX,
  '--card-bottom-board-width': `${CARD_BOTTOM_BOARD_WIDTH_PX}px`,
  '--card-bottom-board-gap': CARD_BOTTOM_BOARD_GAP_PX,
  '--card-bottom-base-primary-height': CARD_BOTTOM_BASE_PRIMARY_HEIGHT_PX,
  '--card-bottom-hbr-height': CARD_BOTTOM_HBR_HEIGHT_PX,
  '--card-bottom-board-gradient-gap-offset': CARD_BOTTOM_BOARD_GRADIENT_GAP_OFFSET_PX,
} as CSSProperties;

const meta = {
  title: 'Constructors/Card/Bottom',
  component: CardBottom,
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CardBottom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Gallery: Story = {
  name: 'All blocks',
  render: () => (
    <div
      className="showcase-layout-section showcase-layout-section--board card-bottom-board-section"
      style={boardSectionStyle}
    >
      <div className="card-bottom-board">
        {CARD_BOTTOM_VARIANTS.map((variant) => (
          <CardBottom key={variant} variant={variant} />
        ))}
      </div>
    </div>
  ),
};

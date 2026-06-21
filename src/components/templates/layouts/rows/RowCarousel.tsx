import type { HTMLAttributes } from 'react';
import { CardHBR } from '../../../details/cards/CardHBR';
import { LayoutHPaddingRulers } from '../shared/LayoutPaddingRuler';
import { ROW_CAROUSEL_CARD_SEGMENTS, ROW_CAROUSEL_FIGMA_NODE_ID } from './types';
import './rows.css';

export interface RowCarouselProps extends HTMLAttributes<HTMLDivElement> {}

/** Figma `row - carousel` (6047:4726) — five `card - HBR` with distinct segments. */
export function RowCarousel({ className, ...props }: RowCarouselProps) {
  const classes = ['layout-row', 'layout-row--carousel', 'layout-row--h-paddings', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classes}
      data-name="row - carousel"
      data-figma-node={ROW_CAROUSEL_FIGMA_NODE_ID}
      data-h-paddings
      {...props}
    >
      <LayoutHPaddingRulers showRightRuler={false} />
      {ROW_CAROUSEL_CARD_SEGMENTS.map((segment) => (
        <div key={segment} className="layout-row--carousel__item">
          <CardHBR segment={segment} />
        </div>
      ))}
    </div>
  );
}

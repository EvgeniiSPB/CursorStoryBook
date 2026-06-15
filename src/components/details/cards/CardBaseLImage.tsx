import type { HTMLAttributes, ReactNode } from 'react';
import imageSampleUrl from '../../../assets/image-container/image-container-sample.png';
import { CardTop } from '../card-top/CardTop';
import { CARD_BASE_L_IMAGE_FIGMA_NODE_ID } from '../card/types';
import { SwapPlaceholder } from '../swap-placeholder';
import type { CardRows } from '../card/types';
import './cards.css';

export interface CardBaseLImageProps extends HTMLAttributes<HTMLDivElement> {
  rows?: CardRows;
  /** Swap content for `cell 1` inside `card / bottomSection` (left half of the bottom row). */
  bottomCell1?: ReactNode;
  /** Swap content for `cell 2` inside `card / bottomSection` when `rows === 2`. */
  bottomCell2?: ReactNode;
  headline?: string;
  src?: string;
}

/** Figma `card - baseLImage` (4239:592) — photo bg + glass text panel + swap bottom cells. */
export function CardBaseLImage({
  rows = 1,
  bottomCell1,
  bottomCell2,
  headline = 'Headline',
  src = imageSampleUrl,
  className,
  ...props
}: CardBaseLImageProps) {
  const classes = ['card', 'card--baseLImage', className].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      data-name="card - baseLImage"
      data-node-id={CARD_BASE_L_IMAGE_FIGMA_NODE_ID}
      data-rows={rows}
      {...props}
    >
      <img className="card__image-fill" src={src} alt="" aria-hidden />
      <div className="card__baseLImage-body">
        <div className="card__baseLImage-text" data-name="text">
          <CardTop variant="baseL" headline={headline} />
          <div className="card__bottom-row">
            <div
              className="card__bottom-section"
              data-name="bottomSection"
              data-rows={rows}
            >
              {rows === 1 ? (
                bottomCell1 ?? <SwapPlaceholder />
              ) : (
                <>
                  <div className="card__bottom-section-cell" data-name="cell 1">
                    {bottomCell1 ?? <SwapPlaceholder />}
                  </div>
                  <div className="card__bottom-section-cell" data-name="cell 2">
                    {bottomCell2 ?? <SwapPlaceholder />}
                  </div>
                </>
              )}
            </div>
            <div className="card__bottom" data-name="bottom" aria-hidden />
          </div>
        </div>
        <div className="card__baseLImage-spacer" data-name="div" aria-hidden />
      </div>
    </div>
  );
}

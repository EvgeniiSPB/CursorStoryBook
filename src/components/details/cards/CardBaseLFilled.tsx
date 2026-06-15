import type { HTMLAttributes, CSSProperties, ReactNode } from 'react';
import imageSampleUrl from '../../../assets/image-container/image-container-sample.png';
import { Shape } from '../../../shapes';
import { CardTop } from '../card-top/CardTop';
import { CardImage } from '../card-image/CardImage';
import { CARD_BASE_L_FILLED_FIGMA_NODE_ID } from '../card/types';
import { SwapPlaceholder } from '../swap-placeholder';
import type { CardRadius, CardRows, CardState } from '../card/types';
import './cards.css';

const shapeFillStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
};

export interface CardBaseLFilledProps extends HTMLAttributes<HTMLDivElement> {
  state?: CardState;
  radius?: CardRadius;
  rows?: CardRows;
  /** Background `shape` swatch. Empty → filled/brand normal. Pass swap placeholder explicitly. */
  shape?: ReactNode;
  /** Swap content for `cell 1` inside `card / bottomSection` (left half of the bottom row). */
  bottomCell1?: ReactNode;
  /** Swap content for `cell 2` inside `card / bottomSection` when `rows === 2`. */
  bottomCell2?: ReactNode;
  headline?: string;
  src?: string;
}

function DefaultShapeBackground({
  state,
  radius,
}: {
  state: CardState;
  radius: CardRadius;
}) {
  return (
    <Shape type="filled" color="brand" state={state} radius={radius} style={shapeFillStyle} />
  );
}

/** Figma `card - baseLFilled` — shape bg + fixed cardTop baseL + swap bottom cells + fixed cardImage 4:5. */
export function CardBaseLFilled({
  state = 'normal',
  radius = 'x6',
  rows = 1,
  shape,
  bottomCell1,
  bottomCell2,
  headline = 'Headline',
  src = imageSampleUrl,
  className,
  ...props
}: CardBaseLFilledProps) {
  const classes = ['card', 'card--baseLFilled', className].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      data-name="card - baseLFilled"
      data-node-id={CARD_BASE_L_FILLED_FIGMA_NODE_ID}
      data-radius={radius}
      data-state={state}
      data-rows={rows}
      {...props}
    >
      <div className="card__bg" data-name="shape">
        {shape ?? <DefaultShapeBackground state={state} radius={radius} />}
      </div>
      <div className="card__baseLFilled-body">
        <div className="card__baseLFilled-text" data-name="text">
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
        <div className="card__baseLFilled-image" data-name="image">
          <CardImage variant="4:5" src={src} />
        </div>
      </div>
    </div>
  );
}

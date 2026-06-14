import type { HTMLAttributes, ReactNode } from 'react';
import { TagGroup } from '../../Tags';
import { TextHeadline } from '../../atoms/text-headline/TextHeadline';
import { SwapPlaceholder } from '../swap-placeholder';
import type { CardRadius, CardRows, CardState } from '../card-constructor/types';
import './cards.css';

export interface CardBaseLFilledProps extends HTMLAttributes<HTMLDivElement> {
  state?: CardState;
  radius?: CardRadius;
  rows?: CardRows;
  /** Background `shape` swatch. Empty → swap. */
  shape?: ReactNode;
  /** `cell 1` of the `bottomSection`. Empty → swap. */
  bottomCell?: ReactNode;
  headline?: string;
}

/** Figma `card - baseLFilled` (4217:1161) — horizontal filled card with shape bg + bottom cell. */
export function CardBaseLFilled({
  state = 'normal',
  radius = 'x6',
  rows = 1,
  shape,
  bottomCell,
  headline = 'Headline',
  className,
  ...props
}: CardBaseLFilledProps) {
  const classes = ['card', 'card--baseLFilled', className].filter(Boolean).join(' ');
  const cells = Array.from({ length: rows }, (_, i) => i);

  return (
    <div
      className={classes}
      data-name="card - baseLFilled"
      data-radius={radius}
      data-state={state}
      {...props}
    >
      <div className="card__bg" data-name="shape">
        {shape ?? <SwapPlaceholder />}
      </div>
      <div className="card__content">
        <TagGroup firstLabel="Value" secondLabel="Value" />
        <TextHeadline typography="headlineL" fontWeight="medium" text={headline} />
        <div className="card__bottom-section" data-name="bottomSection">
          {cells.map((i) => (
            <div key={i} className="card__bottom-row" data-name={`cell ${i + 1}`}>
              {i === 0 ? bottomCell ?? <SwapPlaceholder /> : <SwapPlaceholder />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

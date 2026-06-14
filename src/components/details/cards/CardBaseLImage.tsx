import type { HTMLAttributes, ReactNode } from 'react';
import imageSampleUrl from '../../../assets/image-container/image-container-sample.png';
import { TagGroup } from '../../Tags';
import { TextHeadline } from '../../atoms/text-headline/TextHeadline';
import { SwapPlaceholder } from '../swap-placeholder';
import type { CardRows } from '../card-constructor/types';
import './cards.css';

export interface CardBaseLImageProps extends HTMLAttributes<HTMLDivElement> {
  rows?: CardRows;
  /** `cell 1` of the `bottomSection`. Empty → swap. */
  bottomCell?: ReactNode;
  headline?: string;
  src?: string;
}

/** Figma `card - baseLImage` (4208:704) — horizontal image card with a bottom cell. */
export function CardBaseLImage({
  rows = 1,
  bottomCell,
  headline = 'Headline',
  src = imageSampleUrl,
  className,
  ...props
}: CardBaseLImageProps) {
  const classes = ['card', 'card--baseLImage', 'card--has-image', className]
    .filter(Boolean)
    .join(' ');
  const cells = Array.from({ length: rows }, (_, i) => i);

  return (
    <div className={classes} data-name="card - baseLImage" {...props}>
      <img className="card__image-fill" src={src} alt="" aria-hidden />
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

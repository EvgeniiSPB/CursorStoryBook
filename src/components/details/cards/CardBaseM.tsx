import type { HTMLAttributes, ReactNode } from 'react';
import imageSampleUrl from '../../../assets/image-container/image-container-sample.png';
import { TextHeadline } from '../../atoms/text-headline/TextHeadline';
import { TextCore } from '../../atoms/text-core/TextCore';
import { SwapPlaceholder } from '../swap-placeholder';
import './cards.css';

export interface CardBaseMProps extends HTMLAttributes<HTMLDivElement> {
  /** `top` slot — Figma preferred instances `cardTop - *`. Empty → swap. */
  top?: ReactNode;
  headline?: string;
  author?: string;
  src?: string;
}

/** Figma `card - baseM` (4234:624) — vertical image card with a swappable `top`. */
export function CardBaseM({
  top,
  headline = 'Headline',
  author = 'Author',
  src = imageSampleUrl,
  className,
  ...props
}: CardBaseMProps) {
  const classes = ['card', 'card--baseM', 'card--has-image', className].filter(Boolean).join(' ');

  return (
    <div className={classes} data-name="card - baseM" {...props}>
      <img className="card__image-fill" src={src} alt="" aria-hidden />
      <div className="card__content card__content--between">
        <div className="card__top" data-name="top">
          {top ?? <SwapPlaceholder />}
        </div>
        <div className="card__meta">
          <TextHeadline typography="headlineM" fontWeight="medium" text={headline} />
          <TextCore typography="bodyS" fontWeight="regular" text={author} />
        </div>
      </div>
    </div>
  );
}

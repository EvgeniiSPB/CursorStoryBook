import type { HTMLAttributes, ReactNode } from 'react';
import imageSampleUrl from '../../../assets/image-container/image-container-sample.png';
import { CardBottom } from '../card-bottom/CardBottom';
import { CardImage, type CardImageVariant } from '../card-image/CardImage';
import { CARD_BASE_M_FIGMA_NODE_ID } from '../card/types';
import { SwapPlaceholder } from '../swap-placeholder';
import './cards.css';

export interface CardBaseMProps extends HTMLAttributes<HTMLDivElement> {
  /** `cardImage - *` aspect ratio block. */
  imageVariant?: CardImageVariant;
  /** `top` slot — Figma preferred instances `cardTop - *`. Empty → swap. */
  top?: ReactNode;
  src?: string;
  text?: string;
  author?: string;
  date?: string;
}

/** Figma `card - baseM` — CardImage 4:5 + swappable `top` + fixed CardBottom basePrimary. */
export function CardBaseM({
  imageVariant = '4:5',
  top,
  src = imageSampleUrl,
  text,
  author,
  date,
  className,
  ...props
}: CardBaseMProps) {
  const classes = ['card', 'card--baseM', className].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      data-name="card - baseM"
      data-node-id={CARD_BASE_M_FIGMA_NODE_ID}
      {...props}
    >
      <CardImage variant={imageVariant} src={src} />
      <div className="card__baseM-body">
        <div className="card__top" data-name="top">
          {top ?? <SwapPlaceholder />}
        </div>
        <CardBottom variant="basePrimary" text={text} author={author} date={date} />
      </div>
    </div>
  );
}

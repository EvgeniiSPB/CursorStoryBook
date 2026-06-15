import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import imageSampleUrl from '../../../assets/image-container/image-container-sample.png';
import { Shape } from '../../../shapes';
import { CardBottom } from '../card-bottom/CardBottom';
import { CardTop } from '../card-top/CardTop';
import { CardImage } from '../card-image/CardImage';
import { CARD_FIRST_SCREEN_FIGMA_NODE_ID } from '../card/types';
import type { CardState } from '../card/types';
import './cards.css';

const shapeFillStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
};

function DefaultShapeBackground({ state }: { state: CardState }) {
  return (
    <Shape type="filled" color="brand" state={state} radius="x0" style={shapeFillStyle} />
  );
}

export interface CardFirstScreenProps extends HTMLAttributes<HTMLDivElement> {
  state?: CardState;
  /** Background `shape` swatch. Empty → filled/brand with `state`. */
  shape?: ReactNode;
  headline?: string;
  text?: string;
  author?: string;
  date?: string;
  src?: string;
}

/** Figma `card - firstScreen` (4252:769) — shape + CardTop baseL + CardBottom mainFeature + CardImage 1:1. */
export function CardFirstScreen({
  state = 'normal',
  shape,
  headline = 'Headline',
  text,
  author,
  date,
  src = imageSampleUrl,
  className,
  ...props
}: CardFirstScreenProps) {
  const classes = ['card', 'card--firstScreen', className].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      data-name="card - firstScreen"
      data-node-id={CARD_FIRST_SCREEN_FIGMA_NODE_ID}
      data-state={state}
      {...props}
    >
      <div className="card__firstScreen-text" data-name="text">
        <div className="card__bg" data-name="shape">
          {shape ?? <DefaultShapeBackground state={state} />}
        </div>
        <div className="card__firstScreen-spacer" data-name="div" aria-hidden />
        <CardTop variant="baseL" headline={headline} />
        <CardBottom variant="mainFeature" text={text} author={author} date={date} />
      </div>
      <div className="card__firstScreen-image" data-name="image">
        <CardImage variant="1:1" src={src} />
      </div>
    </div>
  );
}

import type { HTMLAttributes, ReactNode } from 'react';
import { CardBottom } from '../card-bottom/CardBottom';
import { CardTop } from '../card-top/CardTop';
import { SwapPlaceholder } from '../swap-placeholder';
import type { CardState } from '../card/types';
import './cards.css';

export interface CardSubscriptionOffProps extends HTMLAttributes<HTMLDivElement> {
  state?: CardState;
  /** Background `shape` swatch. Empty → swap. */
  shape?: ReactNode;
}

/** Figma `card - subscriptionOff` (4252:1024) — inactive subscription card. */
export function CardSubscriptionOff({
  state = 'normal',
  shape,
  className,
  ...props
}: CardSubscriptionOffProps) {
  const classes = ['card', 'card--subscriptionOff', className].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      data-name="card - subscriptionOff"
      data-state={state}
      {...props}
    >
      <div className="card__bg" data-name="shape">
        {shape ?? <SwapPlaceholder />}
      </div>
      <div className="card__content card__content--subscription">
        <CardTop variant="subscriptionOff" />
        <CardBottom variant="subscriptionNonActiveoff" className="card__subscription-bottom" />
      </div>
    </div>
  );
}

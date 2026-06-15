import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { Shape } from '../../../shapes';
import type { ShapeColorRole } from '../../../shapes';
import { CardBottom } from '../card-bottom/CardBottom';
import { CardTop } from '../card-top/CardTop';
import { CARD_SUBSCRIPTION_ON_FIGMA_NODE_ID } from '../card/types';
import type { CardState } from '../card/types';
import './cards.css';

const shapeFillStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
};

function DefaultShapeBackground({
  state,
  color,
}: {
  state: CardState;
  color: ShapeColorRole;
}) {
  return (
    <Shape type="filled" color={color} state={state} radius="x6" style={shapeFillStyle} />
  );
}

export interface CardSubscriptionOnProps extends HTMLAttributes<HTMLDivElement> {
  state?: CardState;
  /** Background `shape` swatch. Empty → filled/brand with `state`. */
  shape?: ReactNode;
  headline?: string;
  badgeLabel?: string;
  text?: string;
}

/** Figma `card - subscriptionOn` (4252:1023) — CardTop subscriptionOn + CardBottom subscriptionOn. */
export function CardSubscriptionOn({
  state = 'normal',
  shape,
  headline = 'Headline',
  badgeLabel = 'Value',
  text,
  className,
  ...props
}: CardSubscriptionOnProps) {
  const classes = ['card', 'card--subscriptionOn', className].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      data-name="card - subscriptionOn"
      data-node-id={CARD_SUBSCRIPTION_ON_FIGMA_NODE_ID}
      data-state={state}
      {...props}
    >
      <div className="card__bg" data-name="shape">
        {shape ?? <DefaultShapeBackground state={state} color="brand" />}
      </div>
      <div className="card__subscription-body">
        <CardTop variant="subscriptionOn" headline={headline} badgeLabel={badgeLabel} />
        <CardBottom variant="subscriptionOn" text={text} />
      </div>
    </div>
  );
}

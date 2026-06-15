import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { Shape } from '../../../shapes';
import type { ShapeColorRole } from '../../../shapes';
import { CardBottom } from '../card-bottom/CardBottom';
import { CardTop } from '../card-top/CardTop';
import { CARD_SUBSCRIPTION_OFF_FIGMA_NODE_ID } from '../card/types';
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

export interface CardSubscriptionOffProps extends HTMLAttributes<HTMLDivElement> {
  state?: CardState;
  /** Background `shape` swatch. Empty → filled/constantInverted with `state`. */
  shape?: ReactNode;
  headline?: string;
  badgeLabel?: string;
  text?: string;
}

/** Figma `card - subscriptionOff` (4252:1024) — CardTop subscriptionOff + CardBottom subscriptionNonActiveoff. */
export function CardSubscriptionOff({
  state = 'normal',
  shape,
  headline = 'Headline',
  badgeLabel = 'Value',
  text,
  className,
  ...props
}: CardSubscriptionOffProps) {
  const classes = ['card', 'card--subscriptionOff', className].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      data-name="card - subscriptionOff"
      data-node-id={CARD_SUBSCRIPTION_OFF_FIGMA_NODE_ID}
      data-state={state}
      {...props}
    >
      <div className="card__bg" data-name="shape">
        {shape ?? <DefaultShapeBackground state={state} color="constantInverted" />}
      </div>
      <div className="card__subscription-body">
        <CardTop variant="subscriptionOff" headline={headline} badgeLabel={badgeLabel} />
        <CardBottom variant="subscriptionNonActiveoff" text={text} />
      </div>
    </div>
  );
}

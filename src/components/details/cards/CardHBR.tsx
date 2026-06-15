import type { CSSProperties, HTMLAttributes } from 'react';
import HbrShieldIcon from '../../../assets/cards/hbr-shield.svg?react';
import { Shape } from '../../../shapes';
import { TONNED_SEGMENT } from '../../Badges/decorators';
import { CardBottom } from '../card-bottom/CardBottom';
import { CARD_HBR_FIGMA_NODE_ID, CARD_DEFAULT_SEGMENT, type CardSegment, type CardState } from '../card/types';
import './cards.css';

const shapeFillStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
};

export interface CardHBRProps extends HTMLAttributes<HTMLDivElement> {
  state?: CardState;
  /** Foreground segment; background shape stays pinned to metallic. */
  segment?: CardSegment;
  label?: string;
  headline?: string;
  text?: string;
}

/** Figma `card - HBR` (4217:1017) — tonned metallic bg + Icon shield + CardBottom HBR. */
export function CardHBR({
  state = 'normal',
  segment = CARD_DEFAULT_SEGMENT.HBR ?? 'crimson',
  label = 'label',
  headline = 'Headline',
  text,
  className,
  ...props
}: CardHBRProps) {
  const classes = ['card', 'card--HBR', className].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      data-name="card - HBR"
      data-node-id={CARD_HBR_FIGMA_NODE_ID}
      data-state={state}
      {...props}
    >
      <div className="card__bg" data-name="shape" data-segment={TONNED_SEGMENT}>
        <Shape type="tonned" color="primary" state={state} radius="x0" style={shapeFillStyle} />
      </div>
      <div className="card__hbr-body" data-segment={segment}>
        <div className="card__hbr-icon" data-name="icon20 - container">
          <HbrShieldIcon className="card__hbr-shield" aria-hidden />
        </div>
        <CardBottom variant="HBR" label={label} headline={headline} text={text} />
      </div>
    </div>
  );
}

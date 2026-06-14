import type { HTMLAttributes, ReactNode } from 'react';
import { TextHeadline } from '../../atoms/text-headline/TextHeadline';
import { TextCore } from '../../atoms/text-core/TextCore';
import { SwapPlaceholder } from '../swap-placeholder';
import type { CardState } from '../card-constructor/types';
import './cards.css';

export interface CardHBRProps extends HTMLAttributes<HTMLDivElement> {
  state?: CardState;
  /** Background `shape` swatch. Empty → swap. */
  shape?: ReactNode;
  headline?: string;
  text?: string;
}

/** Figma `card - HBR` — compact light card with a swappable shape background. */
export function CardHBR({
  state = 'normal',
  shape,
  headline = 'Headline',
  text = 'Value',
  className,
  ...props
}: CardHBRProps) {
  const classes = ['card', 'card--HBR', className].filter(Boolean).join(' ');

  return (
    <div className={classes} data-name="card - HBR" data-state={state} {...props}>
      <div className="card__bg" data-name="shape">
        {shape ?? <SwapPlaceholder />}
      </div>
      <div className="card__content">
        <span className="card__hbr-logo">HBR</span>
        <div className="card__meta">
          <TextHeadline typography="headlineS" fontWeight="medium" text={headline} />
          <TextCore typography="bodyS" fontWeight="regular" text={text} />
        </div>
      </div>
    </div>
  );
}

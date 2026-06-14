import type { HTMLAttributes, ReactNode } from 'react';
import { BadgeText } from '../../Badges';
import { TextHeadline } from '../../atoms/text-headline/TextHeadline';
import { TextCore } from '../../atoms/text-core/TextCore';
import { SwapPlaceholder } from '../swap-placeholder';
import type { CardState, CardTheme } from '../card-constructor/types';
import './cards.css';

const SUBSCRIPTION_PARAGRAPH =
  'Экспертный обзор самых актуальных бизнес-идей, технологий и управленческих практик.';

export interface CardSubscriptionOnProps extends HTMLAttributes<HTMLDivElement> {
  state?: CardState;
  theme?: CardTheme;
  /** Background `shape` swatch. Empty → swap. */
  shape?: ReactNode;
  headline?: string;
  subheadline?: string;
  badge?: string;
  paragraph?: string;
}

/** Figma `card - subscriptionOn` (4206:375) — subscription card with shape bg, light/dark. */
export function CardSubscriptionOn({
  state = 'normal',
  theme = 'light',
  shape,
  headline = 'Headline',
  subheadline = 'Headline',
  badge = 'VALUE',
  paragraph = SUBSCRIPTION_PARAGRAPH,
  className,
  ...props
}: CardSubscriptionOnProps) {
  const classes = ['card', 'card--subscriptionOn', className].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      data-name="card - subscriptionOn"
      data-state={state}
      data-theme={theme}
      {...props}
    >
      <div className="card__bg" data-name="shape">
        {shape ?? <SwapPlaceholder />}
      </div>
      <div className="card__content">
        <div className="card__subscription-head">
          <TextHeadline typography="headlineM" fontWeight="medium" text={headline} />
          <TextHeadline typography="headlineM" fontWeight="regular" text={subheadline} />
        </div>
        <BadgeText type="filled">{badge}</BadgeText>
        <TextCore typography="bodyS" fontWeight="regular" text={paragraph} />
        <div className="card__subscription-foot">
          <span className="card__check" aria-hidden>
            ✓
          </span>
        </div>
      </div>
    </div>
  );
}

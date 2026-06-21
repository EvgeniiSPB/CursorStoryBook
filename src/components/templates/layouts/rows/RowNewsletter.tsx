import type { HTMLAttributes } from 'react';
import { CardSubscriptionOff } from '../../../details/cards/CardSubscriptionOff';
import { CardSubscriptionOn } from '../../../details/cards/CardSubscriptionOn';
import { LayoutHPaddingRulers } from '../shared/LayoutPaddingRuler';
import { ROW_NEWSLETTER_FIGMA_NODE_ID } from './types';
import './rows.css';

export interface RowNewsletterProps extends HTMLAttributes<HTMLDivElement> {
  hPaddings?: boolean;
}

/** Figma `row - newsletter` (6046:4541). */
export function RowNewsletter({
  hPaddings = true,
  className,
  ...props
}: RowNewsletterProps) {
  const classes = [
    'layout-row',
    'layout-row--newsletter',
    hPaddings ? 'layout-row--h-paddings' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classes}
      data-name="row - newsletter"
      data-figma-node={ROW_NEWSLETTER_FIGMA_NODE_ID}
      data-h-paddings={hPaddings}
      {...props}
    >
      {hPaddings ? <LayoutHPaddingRulers /> : null}
      <div className="layout-row--newsletter__item">
        <CardSubscriptionOn />
      </div>
      <div className="layout-row--newsletter__item">
        <CardSubscriptionOff />
      </div>
      <div className="layout-row--newsletter__item">
        <CardSubscriptionOff />
      </div>
    </div>
  );
}

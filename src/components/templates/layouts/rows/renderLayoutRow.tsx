import type { ReactNode } from 'react';
import { LayoutSwapRow } from '../shared/LayoutSwapRow';
import type { RowCardsType } from '../shared/types';
import { LayoutFooter } from './LayoutFooter';
import { RowButton } from './RowButton';
import { RowCards } from './RowCards';
import { RowCarousel } from './RowCarousel';
import { RowFeature } from './RowFeature';
import { RowHeadline } from './RowHeadline';
import { RowNewsletter } from './RowNewsletter';
import {
  ROW_HEADLINE_INNER_SWAP,
  ROW_TYPE_BUTTON,
  ROW_TYPE_CARDS,
  ROW_TYPE_CAROUSEL,
  ROW_TYPE_FEATURE,
  ROW_TYPE_FOOTER,
  ROW_TYPE_HEADLINE,
  ROW_TYPE_NEWSLETTER,
  type RowPlaygroundProps,
  type RowType,
  rowCardsHasHPaddings,
} from './types';
import { SWAP } from '../shared/slot-renderers';

export type LayoutRowRenderProps = RowPlaygroundProps & {
  row: string;
};

/** Renders a layout row by playground `row` slot value. */
export function renderLayoutRow({
  row,
  hPaddings = true,
  cardsType = 'double',
  featureBackground = 'fill',
  buttonText,
  headlineInnerSlot = ROW_HEADLINE_INNER_SWAP,
  tPadding = true,
  button = true,
  headlineText,
  headlineButtonText,
}: LayoutRowRenderProps): ReactNode {
  if (row === SWAP) {
    return <LayoutSwapRow />;
  }

  switch (row as RowType) {
    case ROW_TYPE_HEADLINE:
      return (
        <RowHeadline
          hPaddings={hPaddings}
          innerSlot={headlineInnerSlot}
          tPadding={tPadding}
          button={button}
          headlineText={headlineText}
          headlineButtonText={headlineButtonText}
        />
      );
    case ROW_TYPE_CARDS:
      return (
        <RowCards
          type={cardsType as RowCardsType}
          hPaddings={rowCardsHasHPaddings(cardsType as RowCardsType) ? hPaddings : undefined}
        />
      );
    case ROW_TYPE_FEATURE:
      return <RowFeature background={featureBackground} />;
    case ROW_TYPE_BUTTON:
      return <RowButton buttonText={buttonText} />;
    case ROW_TYPE_NEWSLETTER:
      return <RowNewsletter hPaddings={hPaddings} />;
    case ROW_TYPE_CAROUSEL:
      return <RowCarousel />;
    case ROW_TYPE_FOOTER:
      return <LayoutFooter />;
    default:
      return <LayoutSwapRow />;
  }
}

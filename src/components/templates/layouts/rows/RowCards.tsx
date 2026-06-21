import type { CSSProperties, HTMLAttributes } from 'react';
import type { RowCardsType } from '../shared/types';
import { TabsGroupColumn } from '../../../Tabs/TabsGroupColumn';
import { CardBaseM } from '../../../details/cards/CardBaseM';
import { CardFirstScreen } from '../../../details/cards/CardFirstScreen';
import { LayoutHPaddingRulers } from '../shared/LayoutPaddingRuler';
import {
  rowCardsCount,
  rowCardsFigmaNodeId,
  rowCardsHasHPaddings,
  rowCardsImageVariant,
  ROW_CARDS_TRIPLE_TABS_COLUMN_FIGMA_NODE_ID,
  ROW_CARDS_TRIPLE_TABS_COLUMN_ITEMS,
  ROW_CARDS_TRIPLE_TABS_COLUMN_WIDTH_PX,
} from './types';
import './rows.css';

export interface RowCardsProps extends HTMLAttributes<HTMLDivElement> {
  type?: RowCardsType;
  /** Ignored for `type=single` — always full content width per Figma. */
  hPaddings?: boolean;
}

/** Figma `row - cards` (6044:4169). */
export function RowCards({
  type = 'double',
  hPaddings = true,
  className,
  ...props
}: RowCardsProps) {
  if (type === 'single') {
    return (
      <div
        className={['layout-row', 'layout-row--cards-wrap', 'layout-row--cards-single', className]
          .filter(Boolean)
          .join(' ')}
        data-name="row - cards"
        data-figma-node={rowCardsFigmaNodeId('single', false)}
        data-type={type}
        {...props}
      >
        <CardFirstScreen />
      </div>
    );
  }

  const count = rowCardsCount(type);
  const isTripleTabs = type === 'tripleTabs';
  const resolvedHPaddings = rowCardsHasHPaddings(type) ? hPaddings : false;
  const wrapClasses = [
    'layout-row',
    'layout-row--cards-wrap',
    isTripleTabs ? 'layout-row--cards-tripleTabs' : '',
    resolvedHPaddings ? 'layout-row--h-paddings' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={wrapClasses}
      data-name="row - cards"
      data-figma-node={rowCardsFigmaNodeId(type, resolvedHPaddings)}
      data-type={type}
      data-h-paddings={resolvedHPaddings}
      {...props}
    >
      {resolvedHPaddings ? <LayoutHPaddingRulers /> : null}
      <div
        className={['layout-row--cards', isTripleTabs ? 'layout-row--cards--tripleTabs' : '']
          .filter(Boolean)
          .join(' ')}
      >
        {isTripleTabs ? (
          <TabsGroupColumn
            items={ROW_CARDS_TRIPLE_TABS_COLUMN_ITEMS}
            className="layout-row--cards__tabs-column"
            style={
              {
                '--tabs-group-column-width': ROW_CARDS_TRIPLE_TABS_COLUMN_WIDTH_PX,
              } as CSSProperties
            }
            data-figma-node={ROW_CARDS_TRIPLE_TABS_COLUMN_FIGMA_NODE_ID}
          />
        ) : null}
        {Array.from({ length: count }, (_, index) => (
          <div key={index} className="layout-row--cards__item">
            <CardBaseM imageVariant={rowCardsImageVariant(type, index)} />
          </div>
        ))}
      </div>
    </div>
  );
}

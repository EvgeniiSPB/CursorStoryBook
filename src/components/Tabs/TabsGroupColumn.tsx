import { Fragment, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import { DividerHorizontal } from '../atoms/divider-horizontal/DividerHorizontal';
import { TextCore } from '../atoms/text-core/TextCore';
import { TabItem } from './TabItem';
import {
  TAB_ITEM_SEGMENT,
  TABS_GROUP_COLUMN_WIDTH_PX,
  type TabsGroupColumnItems,
  type TabsGroupColumnVariant,
} from './types';
import './tabs-group-column.css';

export interface TabsGroupColumnProps extends HTMLAttributes<HTMLDivElement> {
  /** Figma axis `items` — count of tab items in the column (4322:4871). */
  items?: TabsGroupColumnItems;
  title?: ReactNode;
  tabLabel?: ReactNode;
  counter?: string;
  /** Index of the active tab; omit for all inactive (Figma board default). */
  activeIndex?: number | null;
}

export function TabsGroupColumn({
  items = 2,
  title = 'Related',
  tabLabel = 'Value',
  counter = '00',
  activeIndex = null,
  className,
  style,
  ...props
}: TabsGroupColumnProps) {
  const classes = ['tabs-group-column', className].filter(Boolean).join(' ');
  const titleText = typeof title === 'string' ? title : undefined;

  return (
    <div
      className={classes}
      style={
        {
          '--tabs-group-column-width': TABS_GROUP_COLUMN_WIDTH_PX,
          ...style,
        } as CSSProperties
      }
      role="tablist"
      data-name="tabsGroupColumn"
      data-segment={TAB_ITEM_SEGMENT}
      {...props}
    >
      <div className="tabs-group-column__title">
        {titleText !== undefined ? (
          <TextCore
            typography="bodyXS"
            fontWeight="regular"
            text={titleText}
            className="tabs-group-column__heading"
          />
        ) : (
          <div className="tabs-group-column__heading">{title}</div>
        )}
        <DividerHorizontal type="thin" className="tabs-group-column__divider" />
      </div>

      {Array.from({ length: items }, (_, index) => (
        <Fragment key={index}>
          <TabItem
            className="tabs-group-column__tab"
            paddingSize="tiny"
            labelFill
            showCounter
            counter={counter}
            active={activeIndex === index}
          >
            {tabLabel}
          </TabItem>
          {index < items - 1 ? (
            <DividerHorizontal type="thin" className="tabs-group-column__divider" />
          ) : null}
        </Fragment>
      ))}
    </div>
  );
}

export function tabsGroupColumnPropsFromVariant(
  variant: TabsGroupColumnVariant,
): Pick<TabsGroupColumnProps, 'items'> {
  return { items: variant.items };
}

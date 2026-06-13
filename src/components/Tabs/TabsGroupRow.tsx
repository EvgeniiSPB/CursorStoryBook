import type { HTMLAttributes, ReactNode } from 'react';
import { TabItem } from './TabItem';
import { TAB_ITEM_SEGMENT, type TabsGroupRowItems, type TabsGroupRowVariant } from './types';
import './tabs-group-row.css';

export interface TabsGroupRowProps extends HTMLAttributes<HTMLDivElement> {
  /** Figma axis `items` — count of tab items in the row (4151:894). */
  items?: TabsGroupRowItems;
  tabLabel?: ReactNode;
  counter?: string;
  /** Index of the active tab; omit for all inactive (Figma board default). */
  activeIndex?: number | null;
}

export function TabsGroupRow({
  items = 2,
  tabLabel = 'Value',
  counter = '00',
  activeIndex = null,
  className,
  ...props
}: TabsGroupRowProps) {
  const classes = ['tabs-group-row', className].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      role="tablist"
      data-name="tabsGroupRow"
      data-segment={TAB_ITEM_SEGMENT}
      {...props}
    >
      {Array.from({ length: items }, (_, index) => (
        <TabItem
          key={index}
          paddingSize="small"
          showCounter
          counter={counter}
          active={activeIndex === index}
        >
          {tabLabel}
        </TabItem>
      ))}
    </div>
  );
}

export function tabsGroupRowPropsFromVariant(
  variant: TabsGroupRowVariant,
): Pick<TabsGroupRowProps, 'items'> {
  return { items: variant.items };
}

import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { BadgeDigits } from '../Badges/digits/BadgeDigits';
import { TextCore } from '../atoms/text-core/TextCore';
import { TabItemIcon } from './TabItemIcon';
import { TAB_ITEM_SEGMENT, type TabItemPadding, type TabItemState, type TabItemVariant } from './types';
import './tab-item.css';

export interface TabItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  active?: boolean;
  showIcon?: boolean;
  showCounter?: boolean;
  counter?: string;
  paddingSize?: TabItemPadding;
  /** Figma column tabItem: label fills remaining width, gap stays 8px. */
  labelFill?: boolean;
  /** Принудительное состояние для Storybook; без prop — normal/hover/click через :hover/:active */
  state?: TabItemState;
}

export function TabItem({
  children = 'Value',
  active = false,
  showIcon = false,
  showCounter = false,
  counter = '00',
  paddingSize = 'tiny',
  labelFill = false,
  state,
  className,
  type: buttonType = 'button',
  ...props
}: TabItemProps) {
  const classes = [
    'tab-item',
    paddingSize === 'small' ? 'tab-item--padding-small' : '',
    labelFill ? 'tab-item--label-fill' : '',
    active ? 'tab-item--active' : '',
    state && state !== 'normal' ? `tab-item--state-${state}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const label = typeof children === 'string' ? children : undefined;

  return (
    <button
      type={buttonType}
      className={classes}
      role="tab"
      aria-selected={active}
      data-name="tabItem"
      {...(showCounter ? { 'data-segment': TAB_ITEM_SEGMENT } : {})}
      {...props}
    >
      {showIcon ? <TabItemIcon active={active} /> : null}
      {label !== undefined ? (
        <div className="tab-item__label">
          <TextCore typography="bodyM" fontWeight="regular" text={label} />
        </div>
      ) : (
        <span className="tab-item__label">{children}</span>
      )}
      {showCounter ? (
        <BadgeDigits type="tonned" characters="1-2" className="tab-item__counter">
          {counter}
        </BadgeDigits>
      ) : null}
    </button>
  );
}

export function tabItemPropsFromVariant(variant: TabItemVariant): TabItemProps {
  return {
    active: variant.active,
    showIcon: variant.showIcon,
    showCounter: variant.showCounter,
    paddingSize: variant.paddingSize,
    state: variant.state,
  };
}

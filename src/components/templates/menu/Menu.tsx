import type { CSSProperties } from 'react';
import { MenuAtom } from './MenuAtom';
import {
  MENU_HEIGHT_PX,
  MENU_TEMPLATE_DEFAULT_ACTIVE_ID,
  MENU_TEMPLATE_LEFT_ITEM,
  MENU_TEMPLATE_NAV_ITEMS,
  MENU_TEMPLATE_RIGHT_ITEM,
  MENU_WIDTH_PX,
  type MenuNavItem,
} from './types';
import './menu.css';

export interface MenuProps {
  leftItem?: MenuNavItem;
  navItems?: readonly MenuNavItem[];
  rightItem?: MenuNavItem;
  activeId?: string;
  className?: string;
  style?: CSSProperties;
}

function renderNavItem(item: MenuNavItem, activeId: string) {
  const isActive = item.id === activeId;

  return (
    <li key={item.id} className="menu__nav-item">
      <MenuAtom
        label={item.label}
        showLeftIcon={item.leftIcon !== undefined}
        showRightIcon={item.rightIcon !== undefined}
        leftIcon={item.leftIcon}
        rightIcon={item.rightIcon}
        state={isActive ? 'active' : 'default'}
      />
    </li>
  );
}

export function Menu({
  leftItem = MENU_TEMPLATE_LEFT_ITEM,
  navItems = MENU_TEMPLATE_NAV_ITEMS,
  rightItem = MENU_TEMPLATE_RIGHT_ITEM,
  activeId = MENU_TEMPLATE_DEFAULT_ACTIVE_ID,
  className,
  style,
}: MenuProps) {
  const rootStyle = {
    '--menu-width': MENU_WIDTH_PX,
    ...style,
  } as CSSProperties;

  const rootClass = ['menu', className].filter(Boolean).join(' ');

  return (
    <header
      className={rootClass}
      style={rootStyle}
      data-name="menu"
      aria-label="Main navigation"
    >
      <div className="menu__left">
        <MenuAtom
          label={leftItem.label}
          showLeftIcon={leftItem.leftIcon !== undefined}
          leftIcon={leftItem.leftIcon}
          state="default"
        />
      </div>
      <ul className="menu__nav">
        {navItems.map((item) => renderNavItem(item, activeId))}
      </ul>
      <div className="menu__right">
        <MenuAtom
          label={rightItem.label}
          showRightIcon={rightItem.rightIcon !== undefined}
          rightIcon={rightItem.rightIcon}
          state="default"
        />
      </div>
    </header>
  );
}

export { MENU_HEIGHT_PX, MENU_WIDTH_PX };

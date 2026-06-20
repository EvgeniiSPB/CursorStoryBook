import type { HTMLAttributes } from 'react';
import { TextCore } from '../../atoms/text-core/TextCore';
import type { IconName20 } from '../../Icon/types';
import { MenuAtomIcon } from './MenuAtomIcon';
import { MENU_ATOM_DEFAULT_LABEL, MENU_ATOM_SWAP_ICON, type MenuAtomState } from './types';
import './menu-atom.css';

export interface MenuAtomProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  label?: string;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  leftIcon?: IconName20;
  rightIcon?: IconName20;
  /** Template: active nav item when `state` is `default`. */
  active?: boolean;
  /** Figma axis `state`. */
  state?: MenuAtomState;
}

export function MenuAtom({
  label = MENU_ATOM_DEFAULT_LABEL,
  showLeftIcon = false,
  showRightIcon = false,
  leftIcon = MENU_ATOM_SWAP_ICON,
  rightIcon = MENU_ATOM_SWAP_ICON,
  active = false,
  state = 'default',
  className,
  ...props
}: MenuAtomProps) {
  const isActive = state === 'active' || (state === 'default' && active);
  const staticPreview = state === 'hover' || state === 'active';

  const classes = [
    'menu-atom',
    isActive ? 'menu-atom--active' : '',
    state === 'hover' ? 'menu-atom--state-hover' : '',
    state === 'active' ? 'menu-atom--state-active' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classes}
      role="menuitem"
      aria-current={isActive ? 'page' : undefined}
      data-name="menuAtom"
      {...(staticPreview ? { 'data-static-state': state } : {})}
      {...props}
    >
      {showLeftIcon ? <MenuAtomIcon name={leftIcon} active={isActive} /> : null}
      <div className="menu-atom__label">
        <TextCore typography="bodyM" fontWeight="regular" text={label} />
      </div>
      {showRightIcon ? <MenuAtomIcon name={rightIcon} active={isActive} /> : null}
    </div>
  );
}

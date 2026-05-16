import type { HTMLAttributes, ReactNode } from 'react';
import { BadgeIcon } from './BadgeIcon';
import './badge.css';

export type BadgeType = 'filled' | 'outlined' | 'brand' | 'tonned';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  type?: BadgeType;
  icon?: boolean;
}

export function Badge({
  children = 'Value',
  type = 'filled',
  icon = false,
  className,
  ...props
}: BadgeProps) {
  const classes = [
    'badge',
    `badge--${type}`,
    icon ? 'badge--with-icon' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...props}>
      {icon ? <BadgeIcon type={type} /> : null}
      <span className="badge__label">{children}</span>
    </span>
  );
}

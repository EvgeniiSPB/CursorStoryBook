import type { HTMLAttributes, ReactNode } from 'react';
import { BadgeTextIcon } from './BadgeTextIcon';
import './badge-text.css';

export type BadgeTextType = 'filled' | 'outlined' | 'brand' | 'tonned';

export interface BadgeTextProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  type?: BadgeTextType;
  icon?: boolean;
}

export function BadgeText({
  children = 'Value',
  type = 'filled',
  icon = false,
  className,
  ...props
}: BadgeTextProps) {
  const classes = [
    'badge-text',
    `badge-text--${type}`,
    icon ? 'badge-text--with-icon' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...props}>
      {icon ? <BadgeTextIcon type={type} /> : null}
      <span className="badge-text__core">
        <span className="badge-text__label badge-label-base">{children}</span>
      </span>
    </span>
  );
}

/** @deprecated use BadgeText */
export const Badge = BadgeText;
export type BadgeProps = BadgeTextProps;
export type BadgeType = BadgeTextType;

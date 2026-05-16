import type { HTMLAttributes, ReactNode } from 'react';
import './badge-digits.css';

export type BadgeDigitsType = 'outlined' | 'outlinedConstantInverted' | 'tonned';

export type BadgeDigitsCharacters = '1-2' | '3';

const defaultLabel: Record<BadgeDigitsCharacters, string> = {
  '1-2': '00',
  '3': '000',
};

const typeClass: Record<BadgeDigitsType, string> = {
  outlined: 'badge-digits--outlined',
  outlinedConstantInverted: 'badge-digits--outlined-constant-inverted',
  tonned: 'badge-digits--tonned',
};

export interface BadgeDigitsProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode;
  type?: BadgeDigitsType;
  characters?: BadgeDigitsCharacters;
}

export function BadgeDigits({
  children,
  type = 'outlined',
  characters = '1-2',
  className,
  ...props
}: BadgeDigitsProps) {
  const label = children ?? defaultLabel[characters];

  const classes = [
    'badge-digits',
    typeClass[type],
    `badge-digits--chars-${characters}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...props}>
      <span className="badge-digits__label badge-label-base">{label}</span>
    </span>
  );
}

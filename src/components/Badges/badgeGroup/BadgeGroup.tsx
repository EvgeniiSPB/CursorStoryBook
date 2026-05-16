import type { HTMLAttributes, ReactNode } from 'react';
import { BadgeDigits } from '../digits/BadgeDigits';
import type { BadgeDigitsCharacters } from '../digits/BadgeDigits';
import { BadgeText } from '../text/BadgeText';
import './badge-group.css';

export type BadgeGroupDigits = '2' | '3';

/** digits=2 → min-width 32px; digits=3 → min-width/width 36px (см. badge-digits.css) */
const charactersByDigits: Record<BadgeGroupDigits, BadgeDigitsCharacters> = {
  '2': '1-2',
  '3': '3',
};

export interface BadgeGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Текстовый бейдж (outlined, без иконки) */
  text?: ReactNode;
  /** Количество цифр во втором бейдже — Figma `digits=2|3` */
  digits?: BadgeGroupDigits;
  /** Подпись цифрового бейджа; по умолчанию «00» / «000» */
  digitsLabel?: ReactNode;
}

export function BadgeGroup({
  text = 'Value',
  digits = '2',
  digitsLabel,
  className,
  ...props
}: BadgeGroupProps) {
  const characters = charactersByDigits[digits];

  const classes = ['badge-group', className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      <BadgeText type="outlined" icon={false}>
        {text}
      </BadgeText>
      <BadgeDigits type="outlined" characters={characters}>
        {digitsLabel}
      </BadgeDigits>
    </div>
  );
}

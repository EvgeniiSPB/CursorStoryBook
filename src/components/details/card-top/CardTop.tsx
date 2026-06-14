import type { HTMLAttributes, ReactNode } from 'react';
import { Tag, TagGroup } from '../../Tags';
import { BadgeText, BadgeGroup } from '../../Badges';
import './card-top.css';

export type CardTopVariant =
  | 'baseM2tags'
  | 'baseM1lvlTag'
  | 'baseM2lvlTag'
  | 'baseMBadge1tag'
  | 'baseMBadge2tags';

export const CARD_TOP_VARIANTS: readonly CardTopVariant[] = [
  'baseM2tags',
  'baseM1lvlTag',
  'baseM2lvlTag',
  'baseMBadge1tag',
  'baseMBadge2tags',
];

export interface CardTopProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardTopVariant;
}

const VARIANT_CONTENT: Record<CardTopVariant, () => ReactNode> = {
  baseM2tags: () => <TagGroup firstLabel="Value" secondLabel="Value" />,
  baseM1lvlTag: () => <Tag topic="1stLvl">Value</Tag>,
  baseM2lvlTag: () => <Tag topic="2ndLvl">Value</Tag>,
  baseMBadge1tag: () => (
    <>
      <BadgeText type="filled">Value</BadgeText>
      <Tag topic="1stLvl">Value</Tag>
    </>
  ),
  baseMBadge2tags: () => (
    <>
      <BadgeGroup text="Value" digits="2" />
      <Tag topic="1stLvl">Value</Tag>
    </>
  ),
};

/**
 * Figma `cardTop - *` — top row of a card (preferred instances of the `top` slot
 * in `card - baseM`). Composes Tag / TagGroup / BadgeText / BadgeGroup.
 */
export function CardTop({ variant = 'baseM2tags', className, ...props }: CardTopProps) {
  const classes = ['card-top', `card-top--${variant}`, className].filter(Boolean).join(' ');

  return (
    <div className={classes} data-name={`cardTop - ${variant}`} {...props}>
      {VARIANT_CONTENT[variant]()}
    </div>
  );
}

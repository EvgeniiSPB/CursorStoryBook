import type { HTMLAttributes, ReactNode } from 'react';
import { Tag } from './Tag';
import { TagGroupIcon } from './TagGroupIcon';
import type { TagState, TagType } from './Tag';
import './tag-group.css';

const variantClass: Record<TagType, string> = {
  brand: 'tag-group--brand',
  brandConstantInverted: 'tag-group--brand-constant-inverted',
};

export interface TagGroupProps extends HTMLAttributes<HTMLDivElement> {
  variant?: TagType;
  firstLabel?: ReactNode;
  secondLabel?: ReactNode;
  /** Принудительное состояние левого тега (1stLvl), для Storybook */
  firstState?: TagState;
  /** Принудительное состояние правого тега (2ndLvl), для Storybook */
  secondState?: TagState;
  /** Применить одно состояние к обоим тегам (только stories) */
  state?: TagState;
}

export function TagGroup({
  variant = 'brand',
  firstLabel = 'Value',
  secondLabel = 'Value',
  firstState,
  secondState,
  state,
  className,
  ...props
}: TagGroupProps) {
  const leftState = firstState ?? state;
  const rightState = secondState ?? state;

  const classes = ['tag-group', variantClass[variant], className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      <Tag variant={variant} topic="1stLvl" state={leftState}>
        {firstLabel}
      </Tag>
      <TagGroupIcon variant={variant} />
      <Tag variant={variant} topic="2ndLvl" state={rightState}>
        {secondLabel}
      </Tag>
    </div>
  );
}

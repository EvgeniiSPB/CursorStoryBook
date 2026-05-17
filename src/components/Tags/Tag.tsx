import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './tag.css';

export type TagType = 'brand' | 'brandConstantInverted';

export type TagTopic = '1stLvl' | '2ndLvl';

export type TagState = 'normal' | 'hover' | 'click';

const typeClass: Record<TagType, string> = {
  brand: 'tag--brand',
  brandConstantInverted: 'tag--brand-constant-inverted',
};

const topicClass: Record<TagTopic, string> = {
  '1stLvl': 'tag--topic-1st-lvl',
  '2ndLvl': 'tag--topic-2nd-lvl',
};

export interface TagProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  /** Figma `type` */
  variant?: TagType;
  topic?: TagTopic;
  /** Принудительное состояние для Storybook; без prop — normal/hover/click через :hover/:active */
  state?: TagState;
}

export function Tag({
  children = 'Value',
  variant = 'brand',
  topic = '1stLvl',
  state,
  className,
  type: buttonType = 'button',
  ...props
}: TagProps) {
  const classes = [
    'tag',
    typeClass[variant],
    topicClass[topic],
    state && state !== 'normal' ? `tag--state-${state}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={buttonType} className={classes} {...props}>
      <span className="tag__core">
        <span className="tag__label">{children}</span>
      </span>
    </button>
  );
}

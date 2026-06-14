import type { HTMLAttributes, ReactNode } from 'react';
import { TagGroup } from '../../Tags';
import { TextDisplay } from '../../atoms/text-display/TextDisplay';
import { TextParagraph } from '../../atoms/text-paragraph/TextParagraph';
import { TextCore } from '../../atoms/text-core/TextCore';
import { SwapPlaceholder } from '../swap-placeholder';
import type { CardState } from '../card-constructor/types';
import './cards.css';

const FIRST_SCREEN_PARAGRAPH =
  'Это руководство по работе с дизайн-системой и выстраиванию рабочих процессов команды.';

export interface CardFirstScreenProps extends HTMLAttributes<HTMLDivElement> {
  state?: CardState;
  /** Background `shape` swatch. Empty → swap. */
  shape?: ReactNode;
  headline?: string;
  paragraph?: string;
  author?: string;
  date?: string;
}

/** Figma `card - firstScreen` (4172:547) — hero card with a swappable shape background. */
export function CardFirstScreen({
  state = 'normal',
  shape,
  headline = 'Headline',
  paragraph = FIRST_SCREEN_PARAGRAPH,
  author = 'Author',
  date = 'Date',
  className,
  ...props
}: CardFirstScreenProps) {
  const classes = ['card', 'card--firstScreen', className].filter(Boolean).join(' ');

  return (
    <div className={classes} data-name="card - firstScreen" data-state={state} {...props}>
      <div className="card__bg" data-name="shape">
        {shape ?? <SwapPlaceholder />}
      </div>
      <div className="card__content">
        <TagGroup firstLabel="Value" secondLabel="Value" />
        <TextDisplay typography="displayM" fontWeight="medium" text={headline} />
        <TextParagraph typography="bodyL" fontWeight="regular" text={paragraph} />
        <div className="card__authors">
          <TextCore typography="bodyM" fontWeight="medium" text={author} />
          <TextCore typography="bodyS" fontWeight="regular" text={date} />
        </div>
      </div>
    </div>
  );
}

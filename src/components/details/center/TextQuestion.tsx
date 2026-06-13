import type { HTMLAttributes } from 'react';
import { TextParagraph } from '../../atoms/text-paragraph/TextParagraph';
import { BadgeDigits } from '../../Badges/digits/BadgeDigits';
import { DETAILS_BADGE_SEGMENT } from './constants';
import './center-blocks.css';

export interface TextQuestionProps extends HTMLAttributes<HTMLDivElement> {
  text?: string;
  /** Leading tonned badge label (Figma uses a single Cyrillic letter). */
  marker?: string;
}

/** Figma `text - question` (4267:3412) — bodyL/medium paragraph + leading tonned badge. */
export function TextQuestion({
  text = 'Научившись применять их в других профессиональных ролях, вы будете выгодно выделяться среди коллег?',
  marker = 'В',
  className,
  ...props
}: TextQuestionProps) {
  const classes = ['details-center-block', 'details-badged', 'text-question', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} data-name="text - question" {...props}>
      <div className="details-paragraph-fill">
        <TextParagraph typography="bodyL" fontWeight="medium" text={text} />
      </div>
      <span className="details-badged__badge">
        <BadgeDigits type="tonned" characters="1-2" data-segment={DETAILS_BADGE_SEGMENT}>
          {marker}
        </BadgeDigits>
      </span>
    </div>
  );
}

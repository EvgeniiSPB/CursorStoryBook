import type { HTMLAttributes } from 'react';
import { TextParagraph } from '../../atoms/text-paragraph/TextParagraph';
import { BadgeDigits } from '../../Badges/digits/BadgeDigits';
import { DETAILS_BADGE_SEGMENT } from './constants';
import './center-blocks.css';

export interface TextAnswerProps extends HTMLAttributes<HTMLDivElement> {
  text?: string;
  /** Leading tonned badge label (Figma uses a single Cyrillic letter). */
  marker?: string;
}

/** Figma `text - answer` (4275:4505) — bodyL/regular paragraph + leading tonned badge. */
export function TextAnswer({
  text = 'Несмотря на сложности в самом начале, ваш опыт наверняка принес вам ценные навыки на всю жизнь, которые можно применить в любой желаемой роли в будущем. Три основных — это мышление роста, склонность к инновациям и внутренняя мотивация. Научившись применять их в других профессиональных ролях, вы будете выгодно выделяться среди коллег.',
  marker = 'О',
  className,
  ...props
}: TextAnswerProps) {
  const classes = ['details-center-block', 'details-badged', 'text-answer', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} data-name="text - answer" {...props}>
      <div className="details-paragraph-fill">
        <TextParagraph typography="bodyL" fontWeight="regular" text={text} />
      </div>
      <span className="details-badged__badge">
        <BadgeDigits type="tonned" characters="1-2" data-segment={DETAILS_BADGE_SEGMENT}>
          {marker}
        </BadgeDigits>
      </span>
    </div>
  );
}

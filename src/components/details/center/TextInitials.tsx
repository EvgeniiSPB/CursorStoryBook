import type { HTMLAttributes } from 'react';
import { TextParagraph } from '../../atoms/text-paragraph/TextParagraph';
import { BadgeDigits } from '../../Badges/digits/BadgeDigits';
import { DETAILS_BADGE_SEGMENT } from './constants';
import './center-blocks.css';

export interface TextInitialsProps extends HTMLAttributes<HTMLDivElement> {
  text?: string;
  /** Leading tonned badge label (Figma uses author initials). */
  marker?: string;
}

/** Figma `text - initials` (4275:4529) — bodyL/regular paragraph + leading tonned initials badge. */
export function TextInitials({
  text = 'Мы опросили 150 человек, которые, подобно вам, сознательно выбрали творческую карьеру в начале своего пути — от музыкантов, актеров и кинорежиссеров до балерин, инфлюенсеров, стримеров и людей других профессий.',
  marker = 'ех',
  className,
  ...props
}: TextInitialsProps) {
  const classes = ['details-center-block', 'details-badged', 'text-initials', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} data-name="text - initials" {...props}>
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

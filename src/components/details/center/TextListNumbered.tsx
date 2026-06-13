import type { HTMLAttributes } from 'react';
import { TextParagraph } from '../../atoms/text-paragraph/TextParagraph';
import './center-blocks.css';

export interface TextListNumberedProps extends HTMLAttributes<HTMLDivElement> {
  text?: string;
  /** Fixed-width marker column (Figma `1.`). */
  marker?: string;
}

/** Figma `text - listNumbered` (4280:4551) — 44px numbered marker + filling bodyL/regular text. */
export function TextListNumbered({
  text = 'Мы полагаем, что наши исследования и собранные истории помогут вам, следующему поколению творческих деятелей, реализовать свой потенциал, какими бы ни были перемены в вашей карьере.',
  marker = '1.',
  className,
  ...props
}: TextListNumberedProps) {
  const classes = ['details-center-block', 'text-list', 'text-list--numbered', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} data-name="text - listNumbered" {...props}>
      <div className="text-list__marker">
        <TextParagraph typography="bodyL" fontWeight="regular" text={marker} />
      </div>
      <div className="text-list__content details-paragraph-fill">
        <TextParagraph typography="bodyL" fontWeight="regular" text={text} />
      </div>
    </div>
  );
}

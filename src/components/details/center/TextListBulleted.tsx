import type { HTMLAttributes } from 'react';
import { TextParagraph } from '../../atoms/text-paragraph/TextParagraph';
import './center-blocks.css';

export interface TextListBulletedProps extends HTMLAttributes<HTMLDivElement> {
  text?: string;
  /** Fixed-width marker column (Figma em dash). */
  marker?: string;
}

/** Figma `text - listBulleted` (4315:5092) — 44px dash marker + filling bodyL/regular text. */
export function TextListBulleted({
  text = 'Мы полагаем, что наши исследования и собранные истории помогут вам, следующему поколению творческих деятелей, реализовать свой потенциал, какими бы ни были перемены в вашей карьере.',
  marker = '—',
  className,
  ...props
}: TextListBulletedProps) {
  const classes = ['details-center-block', 'text-list', 'text-list--bulleted', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} data-name="text - listBulleted" {...props}>
      <div className="text-list__marker">
        <TextParagraph typography="bodyL" fontWeight="regular" text={marker} />
      </div>
      <div className="text-list__content details-paragraph-fill">
        <TextParagraph typography="bodyL" fontWeight="regular" text={text} />
      </div>
    </div>
  );
}

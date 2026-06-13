import type { HTMLAttributes } from 'react';
import { TextCore } from '../../atoms/text-core/TextCore';
import { TextDisplay } from '../../atoms/text-display/TextDisplay';
import './full-width-blocks.css';

export interface TextQuoteProps extends HTMLAttributes<HTMLDivElement> {
  quote?: string;
  author?: string;
}

/** Figma `text - quote` (4289:7755) — displayM/regular brand quote + dash + author, inner 1136px. */
export function TextQuote({
  quote = '«Благодаря креативной экономике у множества молодых людей появился шанс отказаться от традиционного карьерного пути и монетизировать свои таланты с помощью соцсетей.»',
  author = 'Quote’s author',
  className,
  ...props
}: TextQuoteProps) {
  const classes = ['details-full-block', 'text-quote', className].filter(Boolean).join(' ');

  return (
    <div className={classes} data-name="text - quote" {...props}>
      <div className="text-quote__inner">
        <div className="text-quote__display">
          <TextDisplay
            typography="displayM"
            fontWeight="regular"
            text={quote}
            className="text-quote__display-text"
          />
        </div>
        <div className="text-quote__author">
          <span className="text-quote__dash">
            <TextCore
              typography="bodyM"
              fontWeight="regular"
              text="—"
              className="text-quote__author-text"
            />
          </span>
          <TextCore
            typography="bodyM"
            fontWeight="regular"
            text={author}
            className="text-quote__author-text"
          />
        </div>
      </div>
    </div>
  );
}

import type { HTMLAttributes } from 'react';
import { TextHeadline } from '../../atoms/text-headline/TextHeadline';
import './center-blocks.css';

export interface TextTitleProps extends HTMLAttributes<HTMLDivElement> {
  text?: string;
}

/** Figma `text - title` (4267:3328) — headlineS/medium, wraps in the 752px column. */
export function TextTitle({
  text = 'Как найти применение творческим навыкам в деловом мире',
  className,
  ...props
}: TextTitleProps) {
  const classes = ['details-center-block', 'text-title', className].filter(Boolean).join(' ');

  return (
    <div className={classes} data-name="text - title" {...props}>
      <TextHeadline
        typography="headlineS"
        fontWeight="medium"
        text={text}
        className="text-title__headline"
      />
    </div>
  );
}

import type { HTMLAttributes } from 'react';
import { TextHeadline } from '../../atoms/text-headline/TextHeadline';
import './full-width-blocks.css';

export interface TextHeadlineFullProps extends HTMLAttributes<HTMLDivElement> {
  text?: string;
}

/** Figma `text - headline` fullWidth (4288:7649) — headlineXL/medium, inner 1136px column. */
export function TextHeadlineFull({
  text = 'Как найти применение творческим навыкам в деловом мире',
  className,
  ...props
}: TextHeadlineFullProps) {
  const classes = ['details-full-block', 'text-headline-full', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} data-name="text - headline" {...props}>
      <div className="text-headline-full__inner">
        <TextHeadline
          typography="headlineXL"
          fontWeight="medium"
          text={text}
          className="text-headline-full__headline"
        />
      </div>
    </div>
  );
}

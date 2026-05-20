import type { CSSProperties, HTMLAttributes } from 'react';
import { atomTypographyToTextStyleClass } from '../../../tokens/text-styles';
import {
  textHeadlineBPaddingCssVar,
  textHeadlineLineHeightCssVar,
  type TextHeadlineFontWeight,
  type TextHeadlineTypography,
} from './types';
import './text-headline.css';

export interface TextHeadlineProps extends HTMLAttributes<HTMLParagraphElement> {
  typography?: TextHeadlineTypography;
  fontWeight?: TextHeadlineFontWeight;
  tPadding?: boolean;
  bPadding?: boolean;
  text?: string;
}

export function TextHeadline({
  typography = 'headlineM',
  fontWeight = 'regular',
  tPadding = false,
  bPadding = false,
  text = 'Headline',
  className,
  style,
  ...props
}: TextHeadlineProps) {
  const frameClasses = [
    'text-headline__frame',
    tPadding ? 'text-headline__frame--t-padding' : '',
    bPadding ? 'text-headline__frame--b-padding' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const textClasses = [
    'text-headline',
    atomTypographyToTextStyleClass('headline', typography, fontWeight),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const frameStyle = {
    '--text-headline-line-height': textHeadlineLineHeightCssVar(typography),
    '--text-headline-b-padding': textHeadlineBPaddingCssVar(typography),
    ...style,
  } as CSSProperties;

  return (
    <div className={frameClasses} style={frameStyle}>
      <p className={textClasses} {...props}>
        {text}
      </p>
    </div>
  );
}

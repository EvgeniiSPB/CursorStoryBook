import type { CSSProperties, HTMLAttributes } from 'react';
import { atomTypographyToTextStyleClass } from '../../../tokens/text-styles';
import {
  textParagraphFramePaddingCssVar,
  type TextParagraphFontWeight,
  type TextParagraphTypography,
} from './types';
import './text-paragraph.css';

export interface TextParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  typography?: TextParagraphTypography;
  fontWeight?: TextParagraphFontWeight;
  tPadding?: boolean;
  bPadding?: boolean;
  text?: string;
}

export function TextParagraph({
  typography = 'bodyL',
  fontWeight = 'regular',
  tPadding = false,
  bPadding = false,
  text = 'Paragraph',
  className,
  style,
  ...props
}: TextParagraphProps) {
  const frameClasses = [
    'text-paragraph__frame',
    tPadding ? 'text-paragraph__frame--t-padding' : '',
    bPadding ? 'text-paragraph__frame--b-padding' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const textClasses = [
    'text-paragraph',
    atomTypographyToTextStyleClass('body', typography, fontWeight),
    `text-paragraph--${fontWeight}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const frameStyle = {
    '--text-paragraph-frame-padding': textParagraphFramePaddingCssVar(typography),
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

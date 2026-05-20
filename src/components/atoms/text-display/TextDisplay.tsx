import type { CSSProperties, HTMLAttributes } from 'react';
import { atomTypographyToTextStyleClass } from '../../../tokens/text-styles';
import {
  textDisplayBPaddingCssVar,
  textDisplayLineHeightCssVar,
  type TextDisplayFontWeight,
  type TextDisplayTypography,
} from './types';
import './text-display.css';

export interface TextDisplayProps extends HTMLAttributes<HTMLParagraphElement> {
  typography?: TextDisplayTypography;
  fontWeight?: TextDisplayFontWeight;
  tPadding?: boolean;
  bPadding?: boolean;
  text?: string;
}

export function TextDisplay({
  typography = 'displayM',
  fontWeight = 'regular',
  tPadding = false,
  bPadding = false,
  text = 'Display',
  className,
  style,
  ...props
}: TextDisplayProps) {
  const frameClasses = [
    'text-display__frame',
    tPadding ? 'text-display__frame--t-padding' : '',
    bPadding ? 'text-display__frame--b-padding' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const textClasses = [
    'text-display',
    atomTypographyToTextStyleClass('display', typography, fontWeight),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const frameStyle = {
    '--text-display-line-height': textDisplayLineHeightCssVar(typography),
    '--text-display-b-padding': textDisplayBPaddingCssVar(typography),
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

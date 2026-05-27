import type { CSSProperties, HTMLAttributes } from 'react';
import { atomTypographyToTextStyleClass } from '../../../tokens/text-styles';
import {
  TEXT_WARNING_DEFAULT_TEXT,
  textWarningFramePaddingCssVar,
  type TextWarningPaddingSize,
  type TextWarningTypography,
} from './types';
import './text-warning.css';

export interface TextWarningProps extends HTMLAttributes<HTMLParagraphElement> {
  typography?: TextWarningTypography;
  tPadding?: boolean;
  bPadding?: boolean;
  paddingSize?: TextWarningPaddingSize;
  text?: string;
}

export function TextWarning({
  typography = 'bodyM',
  tPadding = false,
  bPadding = false,
  paddingSize = 'none',
  text = TEXT_WARNING_DEFAULT_TEXT,
  className,
  style,
  ...props
}: TextWarningProps) {
  const framePadding = textWarningFramePaddingCssVar(typography, paddingSize);

  const frameClasses = [
    'text-warning__frame',
    tPadding && paddingSize !== 'none' ? 'text-warning__frame--t-padding' : '',
    bPadding && paddingSize !== 'none' ? 'text-warning__frame--b-padding' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const textClasses = [
    'text-warning',
    atomTypographyToTextStyleClass('body', typography, 'regular'),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const frameStyle = {
    '--text-warning-frame-padding': framePadding,
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

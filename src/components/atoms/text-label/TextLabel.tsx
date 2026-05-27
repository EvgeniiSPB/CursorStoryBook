import type { CSSProperties, HTMLAttributes } from 'react';
import { atomTypographyToTextStyleClass } from '../../../tokens/text-styles';
import {
  textLabelFramePaddingCssVar,
  type TextLabelPaddingSize,
  type TextLabelTypography,
} from './types';
import './text-label.css';

export interface TextLabelProps extends HTMLAttributes<HTMLParagraphElement> {
  typography?: TextLabelTypography;
  tPadding?: boolean;
  bPadding?: boolean;
  paddingSize?: TextLabelPaddingSize;
  text?: string;
}

export function TextLabel({
  typography = 'bodyM',
  tPadding = false,
  bPadding = false,
  paddingSize = 'none',
  text = 'Label',
  className,
  style,
  ...props
}: TextLabelProps) {
  const framePadding = textLabelFramePaddingCssVar(typography, paddingSize);

  const frameClasses = [
    'text-label__frame',
    tPadding && paddingSize !== 'none' ? 'text-label__frame--t-padding' : '',
    bPadding && paddingSize !== 'none' ? 'text-label__frame--b-padding' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const textClasses = [
    'text-label',
    atomTypographyToTextStyleClass('body', typography, 'regular'),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const frameStyle = {
    '--text-label-frame-padding': framePadding,
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

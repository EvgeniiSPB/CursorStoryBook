import type { CSSProperties, HTMLAttributes } from 'react';
import { atomTypographyToTextStyleClass } from '../../../tokens/text-styles';
import {
  textDescriptionFramePaddingCssVar,
  type TextDescriptionFontWeight,
  type TextDescriptionPaddingSize,
  type TextDescriptionTypography,
} from './types';
import './text-description.css';

export interface TextDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  typography?: TextDescriptionTypography;
  fontWeight?: TextDescriptionFontWeight;
  tPadding?: boolean;
  bPadding?: boolean;
  paddingSize?: TextDescriptionPaddingSize;
  text?: string;
}

export function TextDescription({
  typography = 'bodyM',
  fontWeight = 'regular',
  tPadding = false,
  bPadding = false,
  paddingSize = 'none',
  text = 'Description',
  className,
  style,
  ...props
}: TextDescriptionProps) {
  const framePadding = textDescriptionFramePaddingCssVar(typography, paddingSize);

  const frameClasses = [
    'text-description__frame',
    tPadding && paddingSize !== 'none' ? 'text-description__frame--t-padding' : '',
    bPadding && paddingSize !== 'none' ? 'text-description__frame--b-padding' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const textClasses = [
    'text-description',
    atomTypographyToTextStyleClass('body', typography, fontWeight),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const frameStyle = {
    '--text-description-frame-padding': framePadding,
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

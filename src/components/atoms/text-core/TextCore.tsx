import type { HTMLAttributes } from 'react';
import {
  textCoreTypographyToClassSuffix,
  type TextCoreFontWeight,
  type TextCoreTypography,
} from './types';
import './text-core.css';

export interface TextCoreProps extends HTMLAttributes<HTMLParagraphElement> {
  typography?: TextCoreTypography;
  fontWeight?: TextCoreFontWeight;
  text?: string;
}

export function TextCore({
  typography = 'bodyM',
  fontWeight = 'regular',
  text = 'Value',
  className,
  ...props
}: TextCoreProps) {
  const resolvedWeight = typography === 'special' ? 'medium' : fontWeight;
  const typographySuffix = textCoreTypographyToClassSuffix(typography);

  const classes = [
    'text-core',
    `text-core--${typographySuffix}`,
    `text-core--${resolvedWeight}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="text-core__frame">
      <p className={classes} {...props}>
        {text}
      </p>
    </div>
  );
}

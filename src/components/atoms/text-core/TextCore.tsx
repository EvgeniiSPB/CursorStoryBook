import type { HTMLAttributes } from 'react';
import { atomTypographyToTextStyleClass } from '../../../tokens/text-styles';
import { type TextCoreFontWeight, type TextCoreTypography } from './types';
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
  const role = typography === 'special' ? 'special' : 'body';

  const classes = [
    'text-core',
    atomTypographyToTextStyleClass(role, typography, resolvedWeight),
    typography === 'special' ? '' : 'text-core--body',
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

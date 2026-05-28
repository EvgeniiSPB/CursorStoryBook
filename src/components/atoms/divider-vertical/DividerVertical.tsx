import type { CSSProperties, HTMLAttributes } from 'react';
import {
  dividerVerticalTypeToHeightPx,
  type DividerVerticalType,
} from './types';
import './divider-vertical.css';

export interface DividerVerticalProps extends HTMLAttributes<HTMLDivElement> {
  type?: DividerVerticalType;
  className?: string;
}

export function DividerVertical({
  type = 'thin',
  className,
  style,
  ...props
}: DividerVerticalProps) {
  const heightPx = dividerVerticalTypeToHeightPx(type);

  const rootClasses = ['divider-vertical', `divider-vertical--${type}`, className]
    .filter(Boolean)
    .join(' ');

  const rootStyle = {
    '--divider-vertical-height': heightPx,
    ...style,
  } as CSSProperties;

  return (
    <div
      className={rootClasses}
      role="separator"
      aria-orientation="vertical"
      style={rootStyle}
      {...props}
    >
      <div className="divider-vertical__line" aria-hidden />
    </div>
  );
}

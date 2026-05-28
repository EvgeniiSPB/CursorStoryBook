import type { CSSProperties, HTMLAttributes } from 'react';
import {
  dividerHorizontalTypeToWidthPx,
  type DividerHorizontalType,
} from './types';
import './divider-horizontal.css';

export interface DividerHorizontalProps extends HTMLAttributes<HTMLDivElement> {
  type?: DividerHorizontalType;
  className?: string;
}

export function DividerHorizontal({
  type = 'thin',
  className,
  style,
  ...props
}: DividerHorizontalProps) {
  const widthPx = dividerHorizontalTypeToWidthPx(type);

  const rootClasses = ['divider-horizontal', `divider-horizontal--${type}`, className]
    .filter(Boolean)
    .join(' ');

  const rootStyle = {
    '--divider-horizontal-width': widthPx,
    ...style,
  } as CSSProperties;

  return (
    <div
      className={rootClasses}
      role="separator"
      aria-orientation="horizontal"
      style={rootStyle}
      {...props}
    >
      <div className="divider-horizontal__line" aria-hidden />
    </div>
  );
}

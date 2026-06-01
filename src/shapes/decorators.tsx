import type { Decorator } from '@storybook/react-vite';
import type { CSSProperties, ReactNode } from 'react';
import { TONNED_SEGMENT } from '../components/Badges/decorators';
import type { ShapeColorRole, ShapeFigmaTheme, ShapeType } from './types';
import { shapeBoardFigmaTheme } from './types';
import './shape-showcase.css';

/** Figma tonned boards (`314:1617`, `314:1633`): segment **metallic**. */
export const SHAPE_TONNED_SEGMENT = TONNED_SEGMENT;

export function ShapeTonnedSegmentScope({
  useTonnedSegment,
  children,
}: {
  useTonnedSegment: boolean;
  children: ReactNode;
}) {
  if (useTonnedSegment) {
    return <div data-segment={SHAPE_TONNED_SEGMENT}>{children}</div>;
  }
  return <>{children}</>;
}

export function shapeNeedsTonnedSegment(type: ShapeType): boolean {
  return type === 'tonned';
}

/** Figma board scope: fixed `data-theme` + optional `data-segment` (overrides Storybook toolbar). */
export function ShapeBoardScope({
  color,
  type,
  children,
  className,
  style,
}: {
  color: ShapeColorRole;
  type?: ShapeType;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const theme: ShapeFigmaTheme = shapeBoardFigmaTheme(color);
  const segmentAttr =
    type !== undefined && shapeNeedsTonnedSegment(type)
      ? { 'data-segment': SHAPE_TONNED_SEGMENT }
      : {};

  return (
    <div
      data-theme={theme}
      className={className}
      style={style}
      {...segmentAttr}
    >
      {children}
    </div>
  );
}

export const shapeShowcaseCanvas: Decorator = (Story) => (
  <div className="shape-showcase-canvas">
    <Story />
  </div>
);

export const shapeTonnedSegmentDecorator: Decorator = (Story) => (
  <div data-segment={SHAPE_TONNED_SEGMENT}>
    <Story />
  </div>
);

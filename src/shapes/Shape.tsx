import type { CSSProperties, HTMLAttributes } from 'react';
import { getMetaShapeSurface, getShapeSurfaceStyle } from './shape-tokens';
import {
  isShapeColorValid,
  shapeBoardFigmaTheme,
  shapeColorsForType,
  shapeRadiusToCssVar,
  type ShapeColorRole,
  type ShapeFigmaTheme,
  type ShapeRadius,
  type ShapeState,
  type ShapeType,
} from './types';
import './shape.css';

export interface ShapeProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  type: ShapeType;
  color: ShapeColorRole;
  radius?: ShapeRadius;
  /** Static Figma state; omit for interactive :hover/:active when `interactive` is set. */
  state?: ShapeState;
  /** Enables CSS :hover / :active surface shifts (no `state` prop). */
  interactive?: boolean;
  /** Figma `meta` board: neutral fill, radius only. */
  meta?: boolean;
  /** Figma semantic mode (`light` / `dark`); defaults from color role. */
  figmaTheme?: ShapeFigmaTheme;
  className?: string;
}

export function Shape({
  type,
  color,
  radius = 'x0',
  state,
  interactive = false,
  meta = false,
  figmaTheme,
  className,
  style,
  ...divProps
}: ShapeProps) {
  const resolvedColor = isShapeColorValid(type, color) ? color : shapeColorsFallback(type);
  const theme = figmaTheme ?? shapeBoardFigmaTheme(resolvedColor);

  const surface = meta
    ? getMetaShapeSurface()
    : getShapeSurfaceStyle(type, resolvedColor, state ?? 'normal', theme);

  const rootClasses = [
    'shape',
    `shape--type-${type}`,
    `shape--color-${resolvedColor}`,
    `shape--radius-${radius}`,
    meta ? 'shape--meta' : null,
    state ? `shape--state-${state}` : null,
    interactive && !state ? 'shape--interactive' : null,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const rootStyle = {
    borderRadius: `calc(${shapeRadiusToCssVar(radius)} * 1px)`,
    '--shape-fill': surface.backgroundColor ?? 'transparent',
    '--shape-shadow': surface.boxShadow ?? 'none',
    ...style,
  } as CSSProperties;

  return (
    <div
      className={rootClasses}
      style={rootStyle}
      role="presentation"
      aria-hidden
      data-shape-type={type}
      data-shape-color={resolvedColor}
      data-shape-radius={radius}
      data-figma-theme={theme}
      {...(state ? { 'data-shape-state': state } : {})}
      {...divProps}
    />
  );
}

function shapeColorsFallback(type: ShapeType): ShapeColorRole {
  return shapeColorsForType(type)[0];
}

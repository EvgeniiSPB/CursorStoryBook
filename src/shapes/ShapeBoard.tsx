import { Shape } from './Shape';
import {
  SHAPE_RADII,
  SHAPE_STATES,
  shapeBoardFigmaTheme,
  type ShapeColorRole,
  type ShapeType,
} from './types';

export interface ShapeBoardProps {
  type: ShapeType;
  color: ShapeColorRole;
  className?: string;
}

/** Figma board grid: rows = state, columns = radius (3×3). */
export function ShapeBoard({ type, color, className }: ShapeBoardProps) {
  const figmaTheme = shapeBoardFigmaTheme(color);

  return (
    <div className={['shape-board', className].filter(Boolean).join(' ')}>
      {SHAPE_STATES.map((state) => (
        <div key={state} className="shape-board__row" data-state-row={state}>
          {SHAPE_RADII.map((radius) => (
            <Shape
              key={`${state}-${radius}`}
              type={type}
              color={color}
              radius={radius}
              state={state}
              figmaTheme={figmaTheme}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

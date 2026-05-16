import type { ReactNode } from 'react';
import type { BadgeType } from './Badge';

/** icon20 — контейнер 16×16, filled placeholder для всех типов бейджа */
const iconPaths: Record<BadgeType, ReactNode> = {
  filled: <circle cx="8" cy="8" r="7" fill="currentColor" />,
  outlined: <circle cx="8" cy="8" r="7" fill="currentColor" />,
  brand: <circle cx="8" cy="8" r="7" fill="currentColor" />,
  tonned: <circle cx="8" cy="8" r="7" fill="currentColor" />,
};

export function BadgeIcon({ type }: { type: BadgeType }) {
  return (
    <span className="badge__icon" aria-hidden>
      <svg
        className="badge__icon-svg"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {iconPaths[type]}
      </svg>
    </span>
  );
}

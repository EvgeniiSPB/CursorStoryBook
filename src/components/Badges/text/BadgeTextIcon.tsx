import type { ReactNode } from 'react';
import type { BadgeTextType } from './BadgeText';

const iconPaths: Record<BadgeTextType, ReactNode> = {
  filled: <circle cx="8" cy="8" r="7" fill="currentColor" />,
  outlined: <circle cx="8" cy="8" r="7" fill="currentColor" />,
  brand: <circle cx="8" cy="8" r="7" fill="currentColor" />,
  tonned: <circle cx="8" cy="8" r="7" fill="currentColor" />,
};

export function BadgeTextIcon({ type }: { type: BadgeTextType }) {
  return (
    <span className="badge-text__icon" aria-hidden>
      <svg
        className="badge-text__icon-svg"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {iconPaths[type]}
      </svg>
    </span>
  );
}

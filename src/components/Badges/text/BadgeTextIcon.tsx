import { Icon, type IconTone } from '../../Icon';
import type { BadgeTextType } from './BadgeText';

const toneByType: Record<BadgeTextType, IconTone> = {
  filled: 'badge-filled',
  outlined: 'badge-outlined',
  brand: 'badge-brand',
  tonned: 'badge-tonned',
};

export function BadgeTextIcon({ type }: { type: BadgeTextType }) {
  return (
    <Icon
      name="placeholder"
      size={20}
      tone={toneByType[type]}
      className="badge-text__icon"
      aria-hidden
    />
  );
}

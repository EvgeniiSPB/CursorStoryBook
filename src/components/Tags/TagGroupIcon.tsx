import { Icon } from '../Icon';
import type { TagType } from './Tag';

const toneByVariant: Record<TagType, 'tag-brand' | 'tag-brand-inverted'> = {
  brand: 'tag-brand',
  brandConstantInverted: 'tag-brand-inverted',
};

export function TagGroupIcon({ variant = 'brand' }: { variant?: TagType }) {
  return (
    <Icon
      name="arrow-right"
      size={20}
      tone={toneByVariant[variant]}
      inset
      className="tag-group__icon"
      aria-hidden
    />
  );
}

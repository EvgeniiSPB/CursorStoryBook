import { Icon } from '../../Icon';

/** Figma `!placeholder` / `icon20` demo glyph for button previews. */
export function ButtonPlaceholderIcon({ className }: { className?: string }) {
  return (
    <Icon
      name="placeholder"
      size={20}
      inheritColor
      className={className}
      aria-hidden
    />
  );
}

import { Icon } from '../Icon';

/** Figma `icon20 - container`: 20×20 viewbox, `!placeholder` fills full area (4151:379). */
export function TabItemIcon({ active = false }: { active?: boolean }) {
  return (
    <Icon
      name="placeholder"
      size={20}
      tone={active ? 'tab-on' : 'tab-off'}
      className="tab-item__icon"
      aria-hidden
    />
  );
}

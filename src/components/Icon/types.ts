/** Global icon palette from Mode 1.tokens.json → tokens.css (--icon-*) */
export type IconColor =
  | 'primary'
  | 'primary-inverted'
  | 'constant-primary'
  | 'constant-primary-inverted'
  | 'secondary'
  | 'constant-secondary'
  | 'brand'
  | 'brand-constant'
  | 'success'
  | 'error'
  | 'placeholder'
  | 'root';

/** Component-scoped icon colors from tokens.css */
export type IconTone =
  | 'tag-brand'
  | 'tag-brand-inverted'
  | 'badge-filled'
  | 'badge-outlined'
  | 'badge-brand'
  | 'badge-tonned'
  | 'tab-off'
  | 'tab-on';

export const ICON_COLOR_VARS: Record<IconColor, string> = {
  primary: 'var(--icon-primary)',
  'primary-inverted': 'var(--icon-primary-inverted)',
  'constant-primary': 'var(--icon-constant-primary)',
  'constant-primary-inverted': 'var(--icon-constant-primary-inverted)',
  secondary: 'var(--icon-secondary)',
  'constant-secondary': 'var(--icon-constant-secondary)',
  brand: 'var(--icon-brand)',
  'brand-constant': 'var(--icon-brand-constant)',
  success: 'var(--icon-success)',
  error: 'var(--icon-error)',
  placeholder: 'var(--icon-placeholder)',
  root: 'var(--icon-root)',
};

export const ICON_TONE_VARS: Record<IconTone, string> = {
  'tag-brand': 'var(--tag-brand-icon-normal)',
  'tag-brand-inverted': 'var(--tag-brand-constant-inverted-icon-normal)',
  'badge-filled': 'var(--badge-filled-base-icon)',
  'badge-outlined': 'var(--badge-outlined-base-icon)',
  'badge-brand': 'var(--badge-filled-brand-constant-icon)',
  'badge-tonned': 'var(--badge-tonned-icon)',
  'tab-off': 'var(--tab-off-icon)',
  'tab-on': 'var(--tab-on-icon)',
};

export type IconSize = 20 | 28;

export const ICON_NAMES_20 = [
  'arrow-left',
  'arrow-right',
  'arrow-up',
  'arrow-up-right',
  'audio',
  'bookmark',
  'check',
  'close',
  'content',
  'kebab',
  'lock',
  'menu',
  'minus',
  'plus',
  'placeholder',
  'profile',
  'search',
  'shield',
  'video',
] as const;

export const ICON_NAMES_28 = [
  'arrow-left',
  'arrow-right',
  'check',
  'close',
  'plus',
] as const;

export type IconName20 = (typeof ICON_NAMES_20)[number];
export type IconName28 = (typeof ICON_NAMES_28)[number];
export type IconName = IconName20 | IconName28;

/** Per-icon color from Figma (default: icon.primary) */
export const ICON_FIGMA_COLORS: Partial<Record<IconName, IconColor>> = {
  shield: 'brand',
};

export function getIconFigmaColor(name: IconName): IconColor {
  return ICON_FIGMA_COLORS[name] ?? 'primary';
}

export function isIconAvailable(name: IconName, size: IconSize): boolean {
  if (size === 28) {
    return (ICON_NAMES_28 as readonly string[]).includes(name);
  }
  return (ICON_NAMES_20 as readonly string[]).includes(name);
}

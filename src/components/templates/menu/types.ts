import type { IconName20 } from '../../Icon/types';

export type MenuAtomState = 'default' | 'hover' | 'active';

export type MenuAtomVariant = {
  leftIcon: boolean;
  rightIcon: boolean;
  state: MenuAtomState;
  figmaX: number;
  figmaY: number;
};

/** Figma `menuAtom` component set (6060:2754). */
export const MENU_ATOM_FIGMA_NODE_ID = '6060:2754';

export const MENU_ATOM_BOARD_WIDTH_PX = 460;
export const MENU_ATOM_BOARD_HEIGHT_PX = 340;

export const MENU_ATOM_BOUND_WIDTH_PX = 89;
export const MENU_ATOM_BOUND_HEIGHT_PX = 60;
export const MENU_PLAYGROUND_PADDING_PX = 128;

/** Figma `menu` template (6065:3302). */
export const MENU_FIGMA_NODE_ID = '6065:3302';
export const MENU_WIDTH_PX = 1600;
export const MENU_HEIGHT_PX = 60;

const ICON_COLUMNS = [
  { leftIcon: true, rightIcon: true, figmaX: 40 },
  { leftIcon: false, rightIcon: true, figmaX: 169 },
  { leftIcon: true, rightIcon: false, figmaX: 274 },
  { leftIcon: false, rightIcon: false, figmaX: 379 },
] as const;

const STATE_ROWS: readonly { state: MenuAtomState; figmaY: number }[] = [
  { state: 'default', figmaY: 40 },
  { state: 'hover', figmaY: 140 },
  { state: 'active', figmaY: 240 },
];

function buildMenuAtomVariants(): MenuAtomVariant[] {
  const variants: MenuAtomVariant[] = [];

  for (const { state, figmaY } of STATE_ROWS) {
    for (const { leftIcon, rightIcon, figmaX } of ICON_COLUMNS) {
      variants.push({ leftIcon, rightIcon, state, figmaX, figmaY });
    }
  }

  return variants;
}

export const MENU_ATOM_VARIANTS: readonly MenuAtomVariant[] = buildMenuAtomVariants();

export const MENU_ATOM_STATES: readonly MenuAtomState[] = ['default', 'hover', 'active'];

/** Figma swap slot in variant board — `!placeholder` / icon20 viewbox circle. */
export const MENU_ATOM_SWAP_ICON = 'placeholder' as const satisfies IconName20;

export const MENU_ATOM_ICON_PICKER_VALUES = [
  MENU_ATOM_SWAP_ICON,
  'menu',
  'shield',
  'profile',
] as const satisfies readonly IconName20[];

export type MenuAtomIconPickerValue = (typeof MENU_ATOM_ICON_PICKER_VALUES)[number];

/** Storybook select labels (swap → placeholder icon asset). */
export const MENU_ATOM_ICON_PICKER_LABELS: Record<MenuAtomIconPickerValue, string> = {
  placeholder: 'swap',
  menu: 'menu',
  shield: 'shield',
  profile: 'profile',
};

export const MENU_ATOM_DEFAULT_LABEL = 'Value';

/** Figma `icon20 - container`: 20×20 slot, glyph centered at shape size (not stretched). */
export const MENU_ATOM_ICON_SLOT_PX = 20;

/** Shape bounds inside `icon20 - container` — matches ic_20_* SVG viewBoxes / Figma insets. */
export const MENU_ATOM_ICON_GLYPH_SIZES: Partial<
  Record<IconName20, { width: number; height: number }>
> = {
  placeholder: { width: 12, height: 12 },
  menu: { width: 15.6, height: 11.6 },
  profile: { width: 15.6, height: 15.6 },
  shield: { width: 14, height: 15 },
};

const MENU_ATOM_ICON_GLYPH_FALLBACK = { width: 15.6, height: 15.6 };

export function menuAtomIconGlyphSize(name: IconName20): { width: number; height: number } {
  return MENU_ATOM_ICON_GLYPH_SIZES[name] ?? MENU_ATOM_ICON_GLYPH_FALLBACK;
}

export function menuAtomVariantKey(variant: MenuAtomVariant): string {
  return `${variant.state}-L${variant.leftIcon ? 1 : 0}-R${variant.rightIcon ? 1 : 0}`;
}

export function menuAtomPropsFromVariant(variant: MenuAtomVariant) {
  return {
    label: MENU_ATOM_DEFAULT_LABEL,
    showLeftIcon: variant.leftIcon,
    showRightIcon: variant.rightIcon,
    leftIcon: MENU_ATOM_SWAP_ICON,
    rightIcon: MENU_ATOM_SWAP_ICON,
    state: variant.state,
  };
}

export type MenuNavItem = {
  id: string;
  label: string;
  leftIcon?: IconName20;
  rightIcon?: IconName20;
};

export const MENU_TEMPLATE_DEFAULT_ACTIVE_ID = 'technologies';

export const MENU_TEMPLATE_NAV_ITEMS: readonly MenuNavItem[] = [
  { id: 'new-ideas', label: 'Новые идеи' },
  { id: 'leader', label: 'Лидер' },
  { id: 'team', label: 'Команда' },
  { id: 'technologies', label: 'Технологии' },
  { id: 'companies', label: 'Компании' },
  { id: 'hbr-classics', label: 'Классика HBR', leftIcon: 'shield' },
];

export const MENU_TEMPLATE_LEFT_ITEM: MenuNavItem = {
  id: 'menu-trigger',
  label: 'Меню',
  leftIcon: 'menu',
};

export const MENU_TEMPLATE_RIGHT_ITEM: MenuNavItem = {
  id: 'sign-in',
  label: 'Войти',
  rightIcon: 'profile',
};

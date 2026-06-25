import type { IconName20 } from '../../Icon/types';

/** Figma `Section 1` board hosting the left side bar atom family. */
export const LEFT_SIDE_BAR_FILE_KEY = 'hRGNfOFAx9HsjPesVk1xP3';
export const LEFT_SIDE_BAR_FIGMA_NODE_ID = '6517:31536';

export const DROPDOWN_HEADING_FIGMA_NODE_ID = '6517:31334';
export const DROPDOWN_1ST_LVL_FIGMA_NODE_ID = '6517:31233';
export const DROPDOWN_2ND_LVL_FIGMA_NODE_ID = '6517:31250';
export const DROPDOWN_3RD_LVL_FIGMA_NODE_ID = '6517:31323';

/** Figma fixed widths from each component set frame. */
export const DROPDOWN_HEADING_WIDTH_PX = 383;
export const DROPDOWN_1ST_WIDTH_PX = 375;
export const DROPDOWN_2ND_WIDTH_PX = 319;
export const DROPDOWN_3RD_WIDTH_PX = 271;

export const DROPDOWN_ROW_HEIGHT_PX = 56;

export const DROPDOWN_CARET_DOWN: IconName20 = 'caret-down';
export const DROPDOWN_CARET_UP: IconName20 = 'caret-up';

export const DROPDOWN_HEADING_DEFAULT_LABEL = 'Components';
export const DROPDOWN_HEADING_DEFAULT_COUNT = '705';
export const DROPDOWN_1ST_DEFAULT_LABEL = 'Badges';
export const DROPDOWN_2ND_DEFAULT_LABEL = 'Text';
export const DROPDOWN_3RD_DEFAULT_LABEL = 'Playground';

export type DropdownHeadingBadge = 'metallic' | 'crimson';
export const DROPDOWN_HEADING_BADGES: readonly DropdownHeadingBadge[] = [
  'metallic',
  'crimson',
];

/** Figma `state` axis shared by 1st & 2nd lvl. */
export type DropdownLvlState = 'rest' | 'hover';
export const DROPDOWN_LVL_STATES: readonly DropdownLvlState[] = [
  'rest',
  'hover',
];

/** Figma `state` axis for 3rd lvl (5 states). */
export type Dropdown3rdLvlState =
  | 'rest'
  | 'hoverCurrent'
  | 'hoverOther'
  | 'active'
  | 'nonActive';

export const DROPDOWN_3RD_LVL_STATES: readonly Dropdown3rdLvlState[] = [
  'rest',
  'hoverCurrent',
  'hoverOther',
  'active',
  'nonActive',
];

/** Figma `dropdown 1st lvl` (6517:31233) variant board — 4 cells. */
export type Dropdown1stLvlVariant = {
  open: boolean;
  state: DropdownLvlState;
  figmaX: number;
  figmaY: number;
};

export const DROPDOWN_1ST_LVL_VARIANTS: readonly Dropdown1stLvlVariant[] = [
  { open: false, state: 'rest', figmaX: 40, figmaY: 40 },
  { open: true, state: 'rest', figmaX: 40, figmaY: 136 },
  { open: false, state: 'hover', figmaX: 40, figmaY: 232 },
  { open: true, state: 'hover', figmaX: 40, figmaY: 328 },
];

export function dropdown1stLvlVariantKey(v: Dropdown1stLvlVariant): string {
  return `${v.state}-${v.open ? 'open' : 'closed'}`;
}

/** Figma `dropdown 2nd lvl` (6517:31250) variant board — 8 cells. */
export type Dropdown2ndLvlVariant = {
  open: boolean;
  state: DropdownLvlState;
  firstChild: boolean;
  figmaX: number;
  figmaY: number;
};

export const DROPDOWN_2ND_LVL_VARIANTS: readonly Dropdown2ndLvlVariant[] = [
  { open: false, state: 'rest', firstChild: false, figmaX: 40, figmaY: 40 },
  { open: false, state: 'hover', firstChild: false, figmaX: 40, figmaY: 136 },
  { open: true, state: 'rest', firstChild: false, figmaX: 40, figmaY: 232 },
  { open: true, state: 'hover', firstChild: false, figmaX: 40, figmaY: 500 },
  { open: false, state: 'rest', firstChild: true, figmaX: 40, figmaY: 768 },
  { open: false, state: 'hover', firstChild: true, figmaX: 40, figmaY: 864 },
  { open: true, state: 'rest', firstChild: true, figmaX: 40, figmaY: 960 },
  { open: true, state: 'hover', firstChild: true, figmaX: 40, figmaY: 1228 },
];

export function dropdown2ndLvlVariantKey(v: Dropdown2ndLvlVariant): string {
  return `${v.state}-${v.open ? 'open' : 'closed'}-${v.firstChild ? 'first' : 'mid'}`;
}

/** Figma `dropdown 3rd lvl` (6517:31323) variant board — 5 cells. */
export type Dropdown3rdLvlVariant = {
  state: Dropdown3rdLvlState;
  figmaX: number;
  figmaY: number;
};

export const DROPDOWN_3RD_LVL_VARIANTS: readonly Dropdown3rdLvlVariant[] = [
  { state: 'rest', figmaX: 40, figmaY: 40 },
  { state: 'hoverCurrent', figmaX: 40, figmaY: 112 },
  { state: 'hoverOther', figmaX: 40, figmaY: 184 },
  { state: 'active', figmaX: 40, figmaY: 256 },
  { state: 'nonActive', figmaX: 40, figmaY: 328 },
];

export function dropdown3rdLvlVariantKey(v: Dropdown3rdLvlVariant): string {
  return v.state;
}

/** Figma `dropdown heading` (6517:31334) variant board — 2 cells. */
export type DropdownHeadingVariant = {
  badge: DropdownHeadingBadge;
  figmaX: number;
  figmaY: number;
};

export const DROPDOWN_HEADING_VARIANTS: readonly DropdownHeadingVariant[] = [
  { badge: 'metallic', figmaX: 40, figmaY: 40 },
  { badge: 'crimson', figmaX: 40, figmaY: 136 },
];

export function dropdownHeadingVariantKey(v: DropdownHeadingVariant): string {
  return v.badge;
}

/* --------------------------------------------------------------------------
 * LeftSideBar composer data model
 * ------------------------------------------------------------------------ */

/** Leaf row — corresponds to a single Storybook story export. */
export interface SidebarLeafItem {
  /** Storybook story id (e.g. `components-badges-badge-group--digits-two`). */
  id: string;
  /** Display label (uses `name` override when present, else humanised export). */
  label: string;
}

/** 2nd-lvl row — corresponds to one Storybook story file (component). */
export interface SidebarLvl2Item {
  id: string;
  label: string;
  children: SidebarLeafItem[];
}

/** 1st-lvl row (grouped layout) — opens into a list of 2nd-lvl rows. */
export interface SidebarLvl1GroupedItem {
  id: string;
  label: string;
  /** Default — children render as Dropdown2ndLvl rows. */
  layout?: 'grouped';
  children?: SidebarLvl2Item[];
}

/** 1st-lvl row (flat layout) — opens directly into leaf rows, skipping 2nd-lvl.
 *  Used by the Assets/Icons section in Figma where only Docs/20px/28px leaves exist. */
export interface SidebarLvl1FlatItem {
  id: string;
  label: string;
  layout: 'flat';
  children: SidebarLeafItem[];
}

export type SidebarLvl1Item = SidebarLvl1GroupedItem | SidebarLvl1FlatItem;

/** Top-level section — heading + list of 1st-lvl rows. */
export interface SidebarSection {
  id: string;
  heading: {
    label: string;
    count: number;
    badge?: DropdownHeadingBadge;
  };
  items: SidebarLvl1Item[];
}

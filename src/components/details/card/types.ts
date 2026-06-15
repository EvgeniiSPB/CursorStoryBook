import type { ShapeColorRole, ShapeType } from '../../../shapes';
import { SEGMENT_OPTIONS } from '../../../tokens/segment-options';

/**
 * Figma `card / placeholder` — card layout shells assembled from a colored/image
 * surface plus swappable slots (top, bottom cell, background shape).
 *
 * Source: Figma `03 - components` sections
 *   4217:1161 · 4234:624 · 4208:704 · 4172:547 · 4206:375
 */
export const CARD_PLACEHOLDER_FIGMA_NODE_ID = '4217:1161';

/** Figma `card / placeholder` frame — 2100×5732, inset 128. */
export const CARD_PLACEHOLDER_BOARD_WIDTH_PX = 2100;
export const CARD_PLACEHOLDER_BOARD_PADDING_PX = 128;

/** Figma `!card placeholder` symbol inside `card / placeholder`. */
export const CARD_SWAP_SYMBOL_FIGMA_NODE_ID = '4258:799';
export const CARD_SWAP_SYMBOL_SIZE_PX = 496;

export const CARD_FIGMA_NODE_IDS = [
  CARD_PLACEHOLDER_FIGMA_NODE_ID,
  '4234:624',
  '4208:704',
  '4172:547',
  '4206:375',
] as const;

export type CardKind =
  | 'baseM'
  | 'baseLFilled'
  | 'baseLImage'
  | 'firstScreen'
  | 'subscriptionOn'
  | 'subscriptionOff'
  | 'HBR';

export type CardState = 'normal' | 'hover' | 'click';
export type CardRadius = 'x0' | 'x6' | 'x8';
/** baseLFilled / baseLImage: `1` = one swap cell in bottomSection; `2` = two stacked cells in bottomSection. */
export type CardRows = 1 | 2;
export type CardTheme = 'light' | 'dark';

export const CARD_KINDS: readonly CardKind[] = [
  'baseM',
  'baseLFilled',
  'baseLImage',
  'firstScreen',
  'subscriptionOn',
  'subscriptionOff',
  'HBR',
];

/** Playground picker: swap stub + 7 card kinds (Figma `card / placeholder`). */
export type CardPlaygroundItem = 'swap' | CardKind;

export const CARD_PLAYGROUND_ITEMS: readonly CardPlaygroundItem[] = ['swap', ...CARD_KINDS];

export const CARD_STATES: readonly CardState[] = ['normal', 'hover', 'click'];
export const CARD_RADII: readonly CardRadius[] = ['x0', 'x6', 'x8'];
export const CARD_ROWS: readonly CardRows[] = [1, 2];
export const CARD_THEMES: readonly CardTheme[] = ['light', 'dark'];

export const CARD_SEGMENT_SLUGS = SEGMENT_OPTIONS.map(({ slug }) => slug) as readonly string[];
export type CardSegment = (typeof CARD_SEGMENT_SLUGS)[number];

export const CARD_DEFAULT_SEGMENT: Partial<Record<CardKind, CardSegment>> = {
  HBR: 'crimson',
};

/** Card frame size (px) per kind — from the Figma "Hug" boards in the screenshots. */
export const CARD_SIZE_PX: Record<CardKind, { width: number; minHeight: number }> = {
  baseM: { width: 496, minHeight: 780 },
  baseLFilled: { width: 1568, minHeight: 668 },
  baseLImage: { width: 1568, minHeight: 636 },
  firstScreen: { width: 1600, minHeight: 800 },
  subscriptionOn: { width: 496, minHeight: 372 },
  subscriptionOff: { width: 496, minHeight: 372 },
  HBR: { width: 304, minHeight: 456 },
};

/* ------------------------------------------------------------------ *
 * Figma "Preferred instances" whitelists per swappable slot.
 * ------------------------------------------------------------------ */

/** `top` slot of `card - baseM`. */
export const CARD_TOP_BLOCKS = [
  'cardTop-baseM2tags',
  'cardTop-baseM1lvlTag',
  'cardTop-baseM2lvlTag',
  'cardTop-baseMBadge1tag',
  'cardTop-baseMBadge2tags',
] as const;
export type CardTopBlock = (typeof CARD_TOP_BLOCKS)[number];

/** Preferred swap instances for cells inside `card / bottomSection`. */
export const CARD_BOTTOM_BLOCKS = ['cardBottom-baseConstantInverted', 'cardBottom-button'] as const;
export type CardBottomBlock = (typeof CARD_BOTTOM_BLOCKS)[number];

/**
 * Background `shape` swatches (preferred instances) for the colored cards.
 * Maps each swatch key to an existing `Shape` (src/shapes).
 */
export interface CardShapeOption {
  key: string;
  type: ShapeType;
  color: ShapeColorRole;
}

const COLORED_SHAPE_OPTIONS: readonly CardShapeOption[] = [
  { key: 'shape-brand', type: 'filled', color: 'brand' },
  { key: 'shape-primary', type: 'filled', color: 'primary' },
  { key: 'shape-primaryInverted', type: 'filled', color: 'primaryInverted' },
];

const LIGHT_SHAPE_OPTIONS: readonly CardShapeOption[] = [
  { key: 'shape-primaryInverted', type: 'filled', color: 'primaryInverted' },
  { key: 'shape-constantInverted', type: 'filled', color: 'constantInverted' },
  { key: 'shape-brand', type: 'filled', color: 'brand' },
];

/** Which cards have a swappable background shape, and the 3 swatch options each. */
export const CARD_SHAPE_OPTIONS: Record<CardKind, readonly CardShapeOption[]> = {
  baseM: [],
  baseLFilled: [],
  baseLImage: [],
  firstScreen: [],
  subscriptionOn: [],
  subscriptionOff: [],
  HBR: [],
};

/** Preferred shape keys for HBR (light swatches). */
export const CARD_LIGHT_SHAPE_KEYS: readonly string[] = LIGHT_SHAPE_OPTIONS.map((o) => o.key);

/** Default shape swatch per card with a swappable shape slot. */
export const CARD_DEFAULT_SHAPE_KEY: Partial<Record<CardKind, string>> = {};

/** Shape radius per card when the card has no `radius` control (Figma preferred instances). */
export const CARD_SHAPE_RADIUS: Partial<Record<CardKind, CardRadius>> = {
  firstScreen: 'x0',
  subscriptionOn: 'x6',
  subscriptionOff: 'x6',
};

export function cardShapeRadius(card: CardKind): CardRadius {
  return CARD_SHAPE_RADIUS[card] ?? 'x6';
}

/** Figma `card - baseM`. */
export const CARD_BASE_M_FIGMA_NODE_ID = '4252:3687';

/** Figma `card - baseLFilled`. */
export const CARD_BASE_L_FILLED_FIGMA_NODE_ID = '4217:1563';

/** Figma `card - baseLImage`. */
export const CARD_BASE_L_IMAGE_FIGMA_NODE_ID = '4239:592';

/** Figma `card - firstScreen`. */
export const CARD_FIRST_SCREEN_FIGMA_NODE_ID = '4252:769';

/** Figma `card - subscriptionOn`. */
export const CARD_SUBSCRIPTION_ON_FIGMA_NODE_ID = '4252:1023';

/** Figma `card - subscriptionOff`. */
export const CARD_SUBSCRIPTION_OFF_FIGMA_NODE_ID = '4252:1024';

/** Figma `card - HBR`. */
export const CARD_HBR_FIGMA_NODE_ID = '4217:1017';

/* ------------------------------------------------------------------ *
 * Swap-instance slots per card (Figma "Preferred instances").
 * ------------------------------------------------------------------ */

export type CardSwapSlotName = 'top' | 'bottomCell1' | 'bottomCell2' | 'shape';

export interface CardSwapSlotDef {
  name: CardSwapSlotName;
  preferred: readonly string[];
}

function cardShapeKeys(card: CardKind): readonly string[] {
  return CARD_SHAPE_OPTIONS[card].map((option) => option.key);
}

export const CARD_SWAP_SLOTS: Record<CardKind, readonly CardSwapSlotDef[]> = {
  baseM: [{ name: 'top', preferred: CARD_TOP_BLOCKS }],
  baseLFilled: [
    { name: 'bottomCell1', preferred: CARD_BOTTOM_BLOCKS },
    { name: 'bottomCell2', preferred: CARD_BOTTOM_BLOCKS },
  ],
  baseLImage: [
    { name: 'bottomCell1', preferred: CARD_BOTTOM_BLOCKS },
    { name: 'bottomCell2', preferred: CARD_BOTTOM_BLOCKS },
  ],
  firstScreen: [],
  subscriptionOn: [],
  subscriptionOff: [],
  HBR: [],
};

export function cardSwapSlotOptions(
  card: CardKind,
  slot: CardSwapSlotName,
  swapToken = 'swap',
): readonly string[] {
  const def = CARD_SWAP_SLOTS[card].find((entry) => entry.name === slot);
  if (!def) {
    return [];
  }
  return [...def.preferred, swapToken];
}

/** If `value` is not in the card's preferred list for `slot`, return `swapToken`. */
export function resolveCardSwapSlot(
  card: CardKind,
  slot: CardSwapSlotName,
  value: string,
  swapToken = 'swap',
): string {
  if (value === swapToken) {
    return swapToken;
  }
  const def = CARD_SWAP_SLOTS[card].find((entry) => entry.name === slot);
  if (!def || !def.preferred.includes(value)) {
    return swapToken;
  }
  return value;
}

/* ------------------------------------------------------------------ *
 * Per-kind capability flags (drive which controls/slots are relevant).
 * ------------------------------------------------------------------ */
export interface CardCapabilities {
  state: boolean;
  radius: boolean;
  rows: boolean;
  theme: boolean;
  top: boolean;
  bottomCell1: boolean;
  bottomCell2: boolean;
  shape: boolean;
  segment: boolean;
}

export const CARD_CAPABILITIES: Record<CardKind, CardCapabilities> = {
  baseM: { state: false, radius: false, rows: false, theme: false, top: true, bottomCell1: false, bottomCell2: false, shape: false, segment: false },
  baseLFilled: { state: true, radius: true, rows: true, theme: false, top: false, bottomCell1: true, bottomCell2: true, shape: false, segment: false },
  baseLImage: { state: false, radius: false, rows: true, theme: false, top: false, bottomCell1: true, bottomCell2: true, shape: false, segment: false },
  firstScreen: { state: true, radius: false, rows: false, theme: false, top: false, bottomCell1: false, bottomCell2: false, shape: false, segment: false },
  subscriptionOn: { state: true, radius: false, rows: false, theme: false, top: false, bottomCell1: false, bottomCell2: false, shape: false, segment: false },
  subscriptionOff: { state: true, radius: false, rows: false, theme: false, top: false, bottomCell1: false, bottomCell2: false, shape: false, segment: false },
  HBR: { state: true, radius: false, rows: false, theme: false, top: false, bottomCell1: false, bottomCell2: false, shape: false, segment: true },
};

/* ------------------------------------------------------------------ *
 * "All variants" matrix — every card × its variant axes (empty slots).
 * ------------------------------------------------------------------ */
export interface CardVariant {
  card: CardKind;
  state?: CardState;
  radius?: CardRadius;
  rows?: CardRows;
  theme?: CardTheme;
}

function buildCardVariants(): CardVariant[] {
  const variants: CardVariant[] = [];
  for (const card of CARD_KINDS) {
    const caps = CARD_CAPABILITIES[card];
    const states = caps.state ? CARD_STATES : [undefined];
    const radii = caps.radius ? CARD_RADII : [undefined];
    const rows = caps.rows ? CARD_ROWS : [undefined];
    const themes = caps.theme ? CARD_THEMES : [undefined];
    for (const theme of themes) {
      for (const state of states) {
        for (const radius of radii) {
          for (const row of rows) {
            variants.push({
              card,
              state: state as CardState | undefined,
              radius: radius as CardRadius | undefined,
              rows: row as CardRows | undefined,
              theme: theme as CardTheme | undefined,
            });
          }
        }
      }
    }
  }
  return variants;
}

export const CARD_VARIANTS: readonly CardVariant[] = buildCardVariants();

export function cardVariantKey(variant: CardVariant): string {
  return [
    variant.card,
    variant.theme ? `theme:${variant.theme}` : null,
    variant.state ? `state:${variant.state}` : null,
    variant.radius ? `radius:${variant.radius}` : null,
    variant.rows ? `rows:${variant.rows}` : null,
  ]
    .filter(Boolean)
    .join(' · ');
}

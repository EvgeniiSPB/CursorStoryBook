import type { ShapeColorRole, ShapeType } from '../../../shapes';

/**
 * Figma `cardConstructor` — card layout shells assembled from a colored/image
 * surface plus swappable slots (top tags/badges, bottom cell, background shape).
 *
 * Source: Figma `03 - components` sections
 *   4217:1161 · 4234:624 · 4208:704 · 4172:547 · 4206:375
 * Built from screenshots (no file edit access), so sizes/tokens are approximate.
 */
export const CARD_CONSTRUCTOR_FIGMA_NODE_IDS = [
  '4217:1161',
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
  | 'HBR';

export type CardState = 'normal' | 'hover' | 'click';
export type CardRadius = 'x0' | 'x6' | 'x8';
export type CardRows = 1 | 2;
export type CardTheme = 'light' | 'dark';

export const CARD_KINDS: readonly CardKind[] = [
  'baseM',
  'baseLFilled',
  'baseLImage',
  'firstScreen',
  'subscriptionOn',
  'HBR',
];

export const CARD_STATES: readonly CardState[] = ['normal', 'hover', 'click'];
export const CARD_RADII: readonly CardRadius[] = ['x0', 'x6', 'x8'];
export const CARD_ROWS: readonly CardRows[] = [1, 2];
export const CARD_THEMES: readonly CardTheme[] = ['light', 'dark'];

/** Card frame size (px) per kind — from the Figma "Hug" boards in the screenshots. */
export const CARD_SIZE_PX: Record<CardKind, { width: number; minHeight: number }> = {
  baseM: { width: 496, minHeight: 780 },
  baseLFilled: { width: 1568, minHeight: 668 },
  baseLImage: { width: 1568, minHeight: 636 },
  firstScreen: { width: 1600, minHeight: 800 },
  subscriptionOn: { width: 496, minHeight: 372 },
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

/** `cell 1` of the `bottomSection` (baseLFilled, baseLImage). */
export const CARD_BOTTOM_BLOCKS = ['cardBottom-baseConstantInverted', 'cardBottom-button'] as const;
export type CardBottomBlock = (typeof CARD_BOTTOM_BLOCKS)[number];

/**
 * Background `shape` swatches (preferred instances) for the colored cards.
 * Maps each swatch key to an existing `Shape` (src/shapes). Approximated from
 * the screenshots — adjust once Figma access is available.
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
  baseLFilled: COLORED_SHAPE_OPTIONS,
  baseLImage: [],
  firstScreen: COLORED_SHAPE_OPTIONS,
  subscriptionOn: COLORED_SHAPE_OPTIONS,
  HBR: LIGHT_SHAPE_OPTIONS,
};

/* ------------------------------------------------------------------ *
 * Per-kind capability flags (drive which controls/slots are relevant).
 * ------------------------------------------------------------------ */
export interface CardCapabilities {
  state: boolean;
  radius: boolean;
  rows: boolean;
  theme: boolean;
  top: boolean;
  bottomCell: boolean;
  shape: boolean;
}

export const CARD_CAPABILITIES: Record<CardKind, CardCapabilities> = {
  baseM: { state: false, radius: false, rows: false, theme: false, top: true, bottomCell: false, shape: false },
  baseLFilled: { state: true, radius: true, rows: true, theme: false, top: false, bottomCell: true, shape: true },
  baseLImage: { state: false, radius: false, rows: true, theme: false, top: false, bottomCell: true, shape: false },
  firstScreen: { state: true, radius: false, rows: false, theme: false, top: false, bottomCell: false, shape: true },
  subscriptionOn: { state: true, radius: false, rows: false, theme: true, top: false, bottomCell: false, shape: true },
  HBR: { state: true, radius: false, rows: false, theme: false, top: false, bottomCell: false, shape: true },
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

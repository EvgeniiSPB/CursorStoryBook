import type { CardSegment } from '../../../details/card/types';
import type { RowCardsType, RowFeatureBackground } from '../shared/types';
import type { CardImageVariant } from '../../../details/card-image/CardImage';

/** Figma `row` page frame (6034:2680). */
export const ROW_FIGMA_NODE_ID = '6034:2680';

export const ROW_GENERIC_SWAP_FIGMA_NODE_ID = '6034:2681';

export const ROW_HEADLINE_FIGMA_NODE_ID = '6036:2694';
export const ROW_CARDS_FIGMA_NODE_ID = '6044:4169';

/** Figma `row - cards` variant symbols keyed by `type` + `hPaddings`. */
export const ROW_CARDS_VARIANT_FIGMA_NODE_IDS = {
  'double-true': '6045:4174',
  'triple-true': '6045:4170',
  'tripleTabs-true': '6045:4177',
  'single-false': '6117:5034',
  'double-false': '6044:4166',
  'triple-false': '6044:4168',
  'tripleTabs-false': '6044:4167',
} as const;

export function rowCardsFigmaNodeId(type: RowCardsType, hPaddings: boolean): string {
  if (type === 'single') {
    return ROW_CARDS_VARIANT_FIGMA_NODE_IDS['single-false'];
  }
  const key = `${type}-${hPaddings}` as keyof typeof ROW_CARDS_VARIANT_FIGMA_NODE_IDS;
  return ROW_CARDS_VARIANT_FIGMA_NODE_IDS[key] ?? ROW_CARDS_FIGMA_NODE_ID;
}

export function rowCardsHasHPaddings(type: RowCardsType): boolean {
  return type !== 'single';
}

/** Figma `tabsGroupColumn` instance in `row - cards` / `tripleTabs` (6045:4178). */
export const ROW_CARDS_TRIPLE_TABS_COLUMN_FIGMA_NODE_ID = '6045:4178';

/** Allocated column width for `tabsGroupColumn` in `tripleTabs` row. */
export const ROW_CARDS_TRIPLE_TABS_COLUMN_WIDTH_PX = 368;

/** Figma `tabsGroupColumn` variant in `tripleTabs` row. */
export const ROW_CARDS_TRIPLE_TABS_COLUMN_ITEMS = 5 as const;
export const ROW_FEATURE_FIGMA_NODE_ID = '6117:9081';

/** Figma `row - feature` variant symbols keyed by `background`. */
export const ROW_FEATURE_VARIANT_FIGMA_NODE_IDS = {
  fill: '6117:9079',
  image: '6117:9080',
} as const;

export function rowFeatureFigmaNodeId(background: RowFeatureBackground): string {
  return ROW_FEATURE_VARIANT_FIGMA_NODE_IDS[background] ?? ROW_FEATURE_FIGMA_NODE_ID;
}

/** Figma `row - feature` top padding → `spaces/semantic/xxl`. */
export const ROW_FEATURE_T_PADDING_PX = 80;

/** Figma `row - feature` horizontal padding → `spaces/semantic/m`. */
export const ROW_FEATURE_H_PADDING_PX = 16;
export const ROW_BUTTON_FIGMA_NODE_ID = '6117:7564';

/** Figma `row - button` top padding → `spaces/semantic/xl`. */
export const ROW_BUTTON_T_PADDING_PX = 40;

export const ROW_NEWSLETTER_FIGMA_NODE_ID = '6046:4541';
export const ROW_CAROUSEL_FIGMA_NODE_ID = '6047:4726';

/** Figma `row - carousel` → `card - HBR` segment per card (left → right). */
export const ROW_CAROUSEL_CARD_SEGMENTS: readonly CardSegment[] = [
  'crimson',
  'vivid-violet',
  'magenta',
  'san-marine',
  'green',
];

export const ROW_FOOTER_FIGMA_NODE_ID = '6106:3092';

/** Figma `footer` row top padding → `spaces/semantic/xxxl`. */
export const ROW_FOOTER_T_PADDING_PX = 160;

/** Horizontal inset when `hPaddings=true` (`spaces/semantic/xl`). */
export { LAYOUT_H_PADDING_PX as ROW_H_PADDING_PX } from '../shared/types';

export const ROW_BUTTON_DEFAULT_TEXT = 'Больше идей!';

/** Playground row-type slots (swap + Figma row subtypes). */
export const ROW_TYPE_HEADLINE = 'row-headline';
export const ROW_TYPE_CARDS = 'row-cards';
export const ROW_TYPE_FEATURE = 'row-feature';
export const ROW_TYPE_BUTTON = 'row-button';
export const ROW_TYPE_NEWSLETTER = 'row-newsletter';
export const ROW_TYPE_CAROUSEL = 'row-carousel';
export const ROW_TYPE_FOOTER = 'footer';

export const ROW_TYPES = [
  ROW_TYPE_HEADLINE,
  ROW_TYPE_CARDS,
  ROW_TYPE_FEATURE,
  ROW_TYPE_BUTTON,
  ROW_TYPE_NEWSLETTER,
  ROW_TYPE_CAROUSEL,
  ROW_TYPE_FOOTER,
] as const;

export type RowType = (typeof ROW_TYPES)[number];

/** Inner slot for `row - headline` → headlines section. */
export const ROW_HEADLINE_INNER_SWAP = 'headline-swap';
export const ROW_HEADLINE_INNER_SECTION = 'section-headline';

export const ROW_HEADLINE_INNER_SLOTS = [
  ROW_HEADLINE_INNER_SWAP,
  ROW_HEADLINE_INNER_SECTION,
] as const;

export type RowHeadlineInnerSlot = (typeof ROW_HEADLINE_INNER_SLOTS)[number];

export type RowPlaygroundProps = {
  hPaddings?: boolean;
  cardsType?: RowCardsType;
  featureBackground?: RowFeatureBackground;
  buttonText?: string;
  headlineInnerSlot?: RowHeadlineInnerSlot;
  tPadding?: boolean;
  button?: boolean;
  headlineText?: string;
  headlineButtonText?: string;
};

export const ROW_TYPE_LABELS: Record<RowType, string> = {
  [ROW_TYPE_HEADLINE]: 'row - headline',
  [ROW_TYPE_CARDS]: 'row - cards',
  [ROW_TYPE_FEATURE]: 'row - feature',
  [ROW_TYPE_BUTTON]: 'row - button',
  [ROW_TYPE_NEWSLETTER]: 'row - newsletter',
  [ROW_TYPE_CAROUSEL]: 'row - carousel',
  [ROW_TYPE_FOOTER]: 'footer',
};

export function rowCardsCount(type: RowCardsType): number {
  switch (type) {
    case 'single':
      return 1;
    case 'double':
      return 2;
    case 'triple':
    case 'tripleTabs':
      return 3;
  }
}

/** Figma `row - cards` → `cardImage` variant per card index. */
export function rowCardsImageVariant(type: RowCardsType, index: number): CardImageVariant {
  switch (type) {
    case 'double':
      return index === 0 ? '4:5' : '4:3';
    case 'triple':
    case 'tripleTabs':
      if (index === 0) return '1:1';
      if (index === 1) return '4:5';
      return '4:3';
    default:
      return '4:5';
  }
}

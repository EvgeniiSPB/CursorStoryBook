/** Figma `04---templates` file key. */
export const LAYOUTS_FIGMA_FILE_KEY = 'v38i2xdV8rVi9YHFzD0qqx';

/** Content width inside layout templates (Figma artboard). */
export const LAYOUT_CONTENT_WIDTH_PX = 1600;

/** Horizontal padding on the white showcase board (`x/base/1600`). */
export const LAYOUT_BOARD_PADDING_PX = 64;

export const LAYOUT_BOARD_OUTER_WIDTH_PX =
  LAYOUT_CONTENT_WIDTH_PX + 2 * LAYOUT_BOARD_PADDING_PX;

/** Figma page frames in `04---templates`. */
export const LAYOUT_BLOCKS_FIGMA_NODE_ID = '6114:4554';
export const LAYOUT_SECTIONS_FIGMA_NODE_ID = '6114:4008';
export const LAYOUT_SECTION_FIGMA_NODE_ID = '6113:2696';
export const LAYOUT_ROW_FIGMA_NODE_ID = '6034:2680';
export const LAYOUT_HEADLINES_FIGMA_NODE_ID = '6027:2659';
export const LAYOUT_TITLE_GROUPS_FIGMA_NODE_ID = '6069:2934';

/** Figma `!change this` symbols used as swap references. */
export const LAYOUT_SWAP_ROW_FIGMA_NODE_ID = '6034:2681';
export const LAYOUT_SWAP_HEADLINE_FIGMA_NODE_ID = '6034:2679';
/** Figma `!change this` on `titleGroups` page — pink `titleGroup` bound (6070:4444). */
export const LAYOUT_SWAP_TITLE_GROUP_FIGMA_NODE_ID = '6070:4444';

export type LayoutGap = '---' | 'tiny' | 'small' | 'medium';
export type LayoutRows = 1 | 2 | 3 | 4 | 5;
export type LayoutSectionsCount = 1 | 2 | 3;

export const LAYOUT_GAPS: readonly LayoutGap[] = ['---', 'tiny', 'small', 'medium'];
export const LAYOUT_ROWS: readonly LayoutRows[] = [1, 2, 3, 4, 5];
export const LAYOUT_SECTIONS_COUNTS: readonly LayoutSectionsCount[] = [1, 2, 3];

export type RowHeadlineHPaddings = boolean;
export type RowCardsType = 'single' | 'double' | 'triple' | 'tripleTabs';
export type RowFeatureBackground = 'fill' | 'image';
export type TitleGroupNewsType = 'summary' | 'cards' | 'video';

export const ROW_CARDS_TYPES: readonly RowCardsType[] = [
  'single',
  'double',
  'triple',
  'tripleTabs',
];

export const ROW_FEATURE_BACKGROUNDS: readonly RowFeatureBackground[] = ['fill', 'image'];

export const TITLE_GROUP_NEWS_TYPES: readonly TitleGroupNewsType[] = [
  'summary',
  'cards',
  'video',
];

/** Generic swap row height in Figma (`!change this`). */
export const LAYOUT_SWAP_ROW_HEIGHT_PX = 52;

/** Figma row `hPaddings=true` → `spaces/semantic/xl`. */
export const LAYOUT_H_PADDING_PX = 40;

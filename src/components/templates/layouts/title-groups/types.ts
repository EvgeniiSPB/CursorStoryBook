import type { TitleGroupNewsType } from '../shared/types';

/** Figma `titleGroups` page frame (6069:2934). */
export const TITLE_GROUPS_FIGMA_NODE_ID = '6069:2934';

/** Figma `!change this` swap reference on the titleGroups page. */
export const TITLE_GROUP_SWAP_FIGMA_NODE_ID = '6070:4444';

export const TITLE_GROUP_TOPIC_FIGMA_NODE_ID = '6006:2128';

/** Figma `titleGroup - topic` frame size (6006:2128). */
export const TITLE_GROUP_TOPIC_WIDTH_PX = 1600;
export const TITLE_GROUP_TOPIC_HEIGHT_PX = 444;

export const TITLE_GROUP_NEWS_FIGMA_NODE_IDS: Record<TitleGroupNewsType, string> = {
  summary: '6070:4445',
  cards: '6076:4862',
  video: '6077:5206',
};

/** Figma `titleGroup - news` variant set frame (6076:4861). */
export const TITLE_GROUP_NEWS_SET_FIGMA_NODE_ID = '6076:4861';

export const TITLE_GROUP_SLOT_TOPIC = 'titleGroup-topic';
export const TITLE_GROUP_SLOT_NEWS = 'titleGroup-news';

export const TITLE_GROUP_SLOTS = [TITLE_GROUP_SLOT_TOPIC, TITLE_GROUP_SLOT_NEWS] as const;

export type TitleGroupSlot = (typeof TITLE_GROUP_SLOTS)[number];

export const TITLE_GROUP_SLOT_LABELS: Record<TitleGroupSlot, string> = {
  [TITLE_GROUP_SLOT_TOPIC]: 'titleGroup - topic',
  [TITLE_GROUP_SLOT_NEWS]: 'titleGroup - news',
};

export const TITLE_GROUP_DEFAULT_HEADLINE = 'Headline';
export const TITLE_GROUP_DEFAULT_DISPLAY = 'Display';
export const TITLE_GROUP_DEFAULT_SUBHEAD = 'Subhead';
export const TITLE_GROUP_DEFAULT_BADGE = '000';
export const TITLE_GROUP_DEFAULT_TAG_1 = 'Tag 1st level';
export const TITLE_GROUP_DEFAULT_TAG_2 = 'Tag 2nd level';
export const TITLE_GROUP_DEFAULT_AUTHOR = 'Author';
export const TITLE_GROUP_DEFAULT_DATE = 'Date';
export const TITLE_GROUP_DEFAULT_IMAGE_CAPTION = 'Caption / copyright';
export const TITLE_GROUP_DEFAULT_SHARE_LABEL = 'Поделиться:';

/** Figma `titleGroup - news` summary (`6070:4445`) fixed column widths. */
export const TITLE_GROUP_NEWS_SUMMARY_TEXT_WIDTH_PX = 752;
export const TITLE_GROUP_NEWS_SUMMARY_IMAGE_WIDTH_PX = 592;
export const TITLE_GROUP_NEWS_CARDS_IMAGE_WIDTH_PX = 752;

export function titleGroupNewsFigmaNodeId(type: TitleGroupNewsType): string {
  return TITLE_GROUP_NEWS_FIGMA_NODE_IDS[type];
}

export function titleGroupFigmaNodeId(slot: TitleGroupSlot, newsType?: TitleGroupNewsType): string {
  if (slot === TITLE_GROUP_SLOT_TOPIC) {
    return TITLE_GROUP_TOPIC_FIGMA_NODE_ID;
  }

  return titleGroupNewsFigmaNodeId(newsType ?? 'summary');
}

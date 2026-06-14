/** Figma `card / top` frame (4172:547). */
export const CARD_TOP_FIGMA_NODE_ID = '4172:547';

/** Figma `card / top` frame (4172:547) — outer board incl. padding. */
export const CARD_TOP_WRAPPER_WIDTH_PX = 1008;

/** Inner content width on the board (752 — widest block: subscriptionOn/Off). */
export const CARD_TOP_BOARD_WIDTH_PX = 752;

/** Vertical gap between blocks on the Figma board. */
export const CARD_TOP_BOARD_GAP_PX = 64;

/** Board padding on the Figma frame. */
export const CARD_TOP_BOARD_PADDING_PX = 128;

/** Figma light-zone block heights before gradient (5 × 72px). */
export const CARD_TOP_LIGHT_BLOCKS_HEIGHT_PX = 360;

/** Gaps between 5 light blocks (4 × 64px). */
export const CARD_TOP_LIGHT_GAPS_PX = 256;

/**
 * Figma gradient line on 4172:547 — ~18px into the 64px gap after baseMBadge1tag
 * (frame y≈877.5 at 54.984%; block ends y=860; event starts y=924).
 * Gallery has no `!change this` block — offset is measured from last light block end.
 */
export const CARD_TOP_BOARD_GRADIENT_GAP_OFFSET_PX = 18;

export const CARD_TOP_FIGMA_NODE_IDS = {
  baseM2tags: '4172:544',
  baseM1lvlTag: '4531:442',
  baseM2lvlTag: '4594:453',
  baseMBadge2tags: '4239:650',
  baseMBadge1tag: '4531:479',
  event: '4172:545',
  baseL: '4172:546',
  subscriptionOn: '4172:2889',
  subscriptionOff: '4172:2890',
} as const;

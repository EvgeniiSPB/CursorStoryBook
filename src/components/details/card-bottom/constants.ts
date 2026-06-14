/** Figma `card / bottom` frame (4206:375). */
export const CARD_BOTTOM_FIGMA_NODE_ID = '4206:375';

/** Figma `card / bottom` frame (4206:375) — outer board incl. padding. */
export const CARD_BOTTOM_WRAPPER_WIDTH_PX = 976;

/** Inner content width on the board (976 − 2×128). Widest block: `cardBottom - mainFeature`. */
export const CARD_BOTTOM_BOARD_WIDTH_PX = 720;

/** Vertical gap between blocks on the Figma board. */
export const CARD_BOTTOM_BOARD_GAP_PX = 64;

/** Board padding on the Figma frame. */
export const CARD_BOTTOM_BOARD_PADDING_PX = 128;

/** Figma block heights on board 4206:375 (light zone, before gradient). */
export const CARD_BOTTOM_BASE_PRIMARY_HEIGHT_PX = 72;
export const CARD_BOTTOM_HBR_HEIGHT_PX = 284;

/**
 * Figma gradient line on 4206:375 — 18px into the 64px gap after HBR
 * (frame y: 682; HBR ends at 664; mainFeature starts at 728).
 */
export const CARD_BOTTOM_BOARD_GRADIENT_GAP_OFFSET_PX = 18;

export const CARD_BOTTOM_FIGMA_NODE_IDS = {
  basePrimary: '4182:3252',
  HBR: '4190:2781',
  mainFeature: '4182:3233',
  baseConstantInverted: '4190:312',
  button: '4190:2780',
  subscriptionOn: '4190:2716',
  subscriptionNonActiveoff: '4190:2755',
} as const;

export const CARD_BOTTOM_BASE_TEXT =
  'Бывший CEO компании Zappos о том, как делать для клиентов всё возможное';

export const CARD_BOTTOM_MAIN_FEATURE_TEXT =
  'Как руководителю оценить эффективность выбранной стратегии и понять, позволит ли она обеспечить долгосрочный устойчивый рост, рассуждает доцент, руководитель Лаборатории блокчейна и финтеха Школы управления СКОЛКОВО';

export const CARD_BOTTOM_SUBSCRIPTION_TEXT =
  'Экспертный обзор самых актуальных бизнес-идей, технологий и управленческих практик от редакции «Больших идей». Все, что необходимо знать CEO и тем, кто хочет им стать, чтобы быстро и качественно принимать лучшие решения для бизнеса и команды.';

export const CARD_BOTTOM_HBR_DESCRIPTION =
  'Практический опыт управления компаниями от\u00a0крупнейших предпринимателей современности';

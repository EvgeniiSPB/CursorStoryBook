/** Figma `2:1 Fixed Aspect Ratio Spacer` (245:62). */
export const FIXED_ASPECT_RATIO_SPACER_FIGMA_NODE_ID = '245:62';

/** Default width on Figma board */
export const FIXED_ASPECT_RATIO_SPACER_WIDTH_PX = 64;

/** Figma bound height (245:62) */
export const FIXED_ASPECT_RATIO_SPACER_HEIGHT_PX = 32;

/** 2:1 — height is half of width */
export function fixedAspectRatioSpacerHeightForWidth(widthPx: number): number {
  return widthPx / 2;
}

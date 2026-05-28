import type { ImageContainerOrientation } from '../image-container/types';

export type ImageContainerFixedAspectRatioToken =
  | '1:1'
  | '4:3 | 3:4'
  | '5:4 | 4:5'
  | '16:9 | 9:16';

export type ImageContainerFixedAspectRatioVariant = {
  aspectRatio: ImageContainerFixedAspectRatioToken;
  orientation: ImageContainerOrientation;
};

/** Figma `image - container (fixed aspect ratio)` (246:4103). */
export const IMAGE_CONTAINER_FIXED_ASPECT_RATIO_FIGMA_NODE_ID = '246:4103';
export const IMAGE_CONTAINER_FIXED_ASPECT_RATIO_BOARD_WIDTH_PX = 704;

export const IMAGE_CONTAINER_FIXED_ASPECT_RATIO_WIDTH_PX = 64;

export const IMAGE_CONTAINER_FIXED_ASPECT_RATIO_PLAYGROUND_PADDING_PX = 128;

/** Largest bound height on board (16:9 portrait ≈ 114px) */
export const IMAGE_CONTAINER_FIXED_ASPECT_RATIO_LARGEST_BOUND_HEIGHT_PX = 114;

export const IMAGE_CONTAINER_FIXED_ASPECT_RATIO_PLAYGROUND_SECTION_WIDTH_PX =
  IMAGE_CONTAINER_FIXED_ASPECT_RATIO_WIDTH_PX +
  IMAGE_CONTAINER_FIXED_ASPECT_RATIO_PLAYGROUND_PADDING_PX * 2;

export const IMAGE_CONTAINER_FIXED_ASPECT_RATIO_PLAYGROUND_SECTION_HEIGHT_PX =
  IMAGE_CONTAINER_FIXED_ASPECT_RATIO_LARGEST_BOUND_HEIGHT_PX +
  IMAGE_CONTAINER_FIXED_ASPECT_RATIO_PLAYGROUND_PADDING_PX * 2;

/** Figma board order: landscape row, then portrait row */
export const IMAGE_CONTAINER_FIXED_ASPECT_RATIO_VARIANTS: readonly ImageContainerFixedAspectRatioVariant[] =
  [
    { aspectRatio: '1:1', orientation: 'landscape' },
    { aspectRatio: '4:3 | 3:4', orientation: 'landscape' },
    { aspectRatio: '5:4 | 4:5', orientation: 'landscape' },
    { aspectRatio: '16:9 | 9:16', orientation: 'landscape' },
    { aspectRatio: '1:1', orientation: 'portrait' },
    { aspectRatio: '4:3 | 3:4', orientation: 'portrait' },
    { aspectRatio: '5:4 | 4:5', orientation: 'portrait' },
    { aspectRatio: '16:9 | 9:16', orientation: 'portrait' },
  ];

/** CSS `aspect-ratio` width / height for fixed 64px-wide bound */
export function imageContainerFixedAspectRatioToCss(
  aspectRatio: ImageContainerFixedAspectRatioToken,
  orientation: ImageContainerOrientation,
): string {
  switch (aspectRatio) {
    case '1:1':
      return '1 / 1';
    case '4:3 | 3:4':
      return orientation === 'landscape' ? '4 / 3' : '3 / 4';
    case '5:4 | 4:5':
      return orientation === 'landscape' ? '5 / 4' : '4 / 5';
    case '16:9 | 9:16':
      return orientation === 'landscape' ? '16 / 9' : '9 / 16';
    default:
      return '1 / 1';
  }
}

export function imageContainerFixedAspectRatioVariantKey(
  variant: ImageContainerFixedAspectRatioVariant,
): string {
  return `${variant.aspectRatio}-${variant.orientation}`;
}

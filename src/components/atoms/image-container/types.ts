export type ImageContainerOrientation = 'landscape' | 'portrait';

export type ImageContainerVariant = {
  orientation: ImageContainerOrientation;
};

/** Figma `image - container` component set (243:57). */
export const IMAGE_CONTAINER_FIGMA_NODE_ID = '243:57';
export const IMAGE_CONTAINER_BOARD_WIDTH_PX = 416;

/** Figma bound (243:56 / 243:55): 160×160 */
export const IMAGE_CONTAINER_SIZE_PX = 160;

export const IMAGE_CONTAINER_PLAYGROUND_PADDING_PX = 128;

export const IMAGE_CONTAINER_LARGEST_BOUND_SIZE_PX = IMAGE_CONTAINER_SIZE_PX;

export const IMAGE_CONTAINER_PLAYGROUND_SECTION_SIZE_PX =
  IMAGE_CONTAINER_LARGEST_BOUND_SIZE_PX + IMAGE_CONTAINER_PLAYGROUND_PADDING_PX * 2;

/** Figma Desktop MCP asset hash (sample placeholder fill) */
export const IMAGE_CONTAINER_FIGMA_SAMPLE_IMAGE_HASH = '9d22bc4f87f35cace49c30360e2d21a950251c04';

export const IMAGE_CONTAINER_FIGMA_SAMPLE_IMAGE_URL = `http://localhost:3845/assets/${IMAGE_CONTAINER_FIGMA_SAMPLE_IMAGE_HASH}.png`;

/** Figma board: landscape (top), portrait (bottom) */
export const IMAGE_CONTAINER_VARIANTS: readonly ImageContainerVariant[] = [
  { orientation: 'landscape' },
  { orientation: 'portrait' },
];

export function imageContainerOrientationToFigmaFlags(orientation: ImageContainerOrientation): {
  portrait: boolean;
  landscape: boolean;
} {
  if (orientation === 'portrait') {
    return { portrait: true, landscape: false };
  }
  return { portrait: false, landscape: true };
}

export function imageContainerVariantKey(variant: ImageContainerVariant): string {
  return variant.orientation;
}

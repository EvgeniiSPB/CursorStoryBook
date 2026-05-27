export type AvatarType = 'image' | 'initials';

/** Figma `imageSize` on `avatar` (213:659) */
export type AvatarImageSize = '8x' | '9x' | '10x';

export type AvatarVariant = {
  type: AvatarType;
  imageSize: AvatarImageSize;
};

/**
 * Figma `avatar` (213:659).
 * Initials: brandConstant/primary fill, text/constantPrimary, special/oneSize (JetBrains Mono).
 */
export const AVATAR_FIGMA_NODE_ID = '213:659';
export const AVATAR_FIGMA_SPECIAL_FONT_FAMILY = 'JetBrains Mono';
export const AVATAR_FIGMA_FONT_MODE_SLUG = 'jetbrains-mono';
export const AVATAR_DEFAULT_INITIALS = 'ЕХ';

/** Figma Desktop MCP asset hash (run with Figma open to refresh PNG) */
export const AVATAR_FIGMA_SAMPLE_IMAGE_HASH = '4901038dd1f1407f7babd01dbfb5c5d01c4f1dfd';

export const AVATAR_FIGMA_SAMPLE_IMAGE_URL = `http://localhost:3845/assets/${AVATAR_FIGMA_SAMPLE_IMAGE_HASH}.png`;

/** Figma variant order (component set 213:659) */
export const AVATAR_VARIANTS: readonly AvatarVariant[] = [
  { type: 'image', imageSize: '8x' },
  { type: 'image', imageSize: '9x' },
  { type: 'image', imageSize: '10x' },
  { type: 'initials', imageSize: '8x' },
  { type: 'initials', imageSize: '9x' },
  { type: 'initials', imageSize: '10x' },
];

const SIZE_TOKEN: Record<AvatarImageSize, { cssVar: string; fallback: number }> = {
  '8x': { cssVar: '--x-base-700', fallback: 28 },
  '9x': { cssVar: '--x-base-800', fallback: 32 },
  '10x': { cssVar: '--x-base-900', fallback: 36 },
};

/** Unitless size token for `calc(var(--avatar-size) * 1px)` */
export function avatarImageSizeToCssVar(imageSize: AvatarImageSize): string {
  const { cssVar, fallback } = SIZE_TOKEN[imageSize];
  return `var(${cssVar}, ${fallback})`;
}

export function avatarImageSizeToPx(imageSize: AvatarImageSize): number {
  return SIZE_TOKEN[imageSize].fallback;
}

export function avatarVariantKey(variant: AvatarVariant): string {
  return `${variant.type}-${variant.imageSize}`;
}

/** Largest avatar bound (10x): 36×36 */
export const AVATAR_LARGEST_BOUND_SIZE_PX = 36;

export const AVATAR_PLAYGROUND_PADDING_PX = 128;

export const AVATAR_PLAYGROUND_SECTION_SIZE_PX =
  AVATAR_LARGEST_BOUND_SIZE_PX + AVATAR_PLAYGROUND_PADDING_PX * 2;

/** Figma board frame (213:659) */
export const AVATAR_BOARD_WIDTH_PX = 480;

export type ArticlePaddingSize = '---' | 'tiny' | 'small' | 'medium' | 'large';

/** Figma `cellConstructor` (component set 4301:4032). */
export const ARTICLE_FIGMA_NODE_ID = '4301:4032';
export const ARTICLE_WIDTH_PX = 1600;
export const ARTICLE_MIDDLE_WIDTH_PX = 752;

export const ARTICLE_PADDING_SIZES: readonly ArticlePaddingSize[] = [
  '---',
  'tiny',
  'small',
  'medium',
  'large',
];

/** Top padding (px) applied when `tPadding` is on, keyed by `paddingSize`. */
export const ARTICLE_TOP_PADDING_PX: Record<ArticlePaddingSize, number> = {
  '---': 0,
  tiny: 12, // spaces/semantic/s
  small: 24, // spaces/semantic/l
  medium: 40, // spaces/semantic/xl
  large: 80, // spaces/semantic/xxl
};

/**
 * Figma "Preferred instances" whitelists per slot. `leftCell` / `rightCell` /
 * `fullWidthCell` are constant; the active middle slot is chosen by `paddingSize`.
 */
export const ARTICLE_LEFT_BLOCKS = ['cell-respond-for'] as const;

export const ARTICLE_RIGHT_BLOCKS = [
  'incut-related',
  'incut-numbers',
  'incut-opinion',
  'incut-socials',
] as const;

export const ARTICLE_FULL_WIDTH_BLOCKS = [
  'text-headline',
  'text-quote',
  'image-double',
  'image-triple',
  'image-gallery',
] as const;

export const ARTICLE_MIDDLE_BLOCKS: Record<ArticlePaddingSize, readonly string[]> = {
  // paddingSize "---" is unconstrained — the middle accepts every center block.
  '---': [
    'text-paragraph',
    'text-title',
    'text-question',
    'text-answer',
    'text-initials',
    'text-listNumbered',
    'text-listBulleted',
    'text-authors',
    'image-single',
  ],
  tiny: ['text-listBulleted', 'text-listNumbered'],
  small: ['text-answer', 'text-initials', 'text-paragraph', 'text-question'],
  medium: ['image-single', 'text-paragraph', 'text-title'],
  large: ['text-authors', 'text-paragraph'],
};

export type ArticleVariant = {
  left: boolean;
  right: boolean;
  fullWidth: boolean;
  tPadding: boolean;
  paddingSize: ArticlePaddingSize;
};

function buildVariants(): ArticleVariant[] {
  const variants: ArticleVariant[] = [];
  for (const paddingSize of ARTICLE_PADDING_SIZES) {
    const tPadding = paddingSize !== '---';
    for (const left of [true, false]) {
      for (const right of [true, false]) {
        variants.push({ left, right, fullWidth: false, tPadding, paddingSize });
      }
    }
    variants.push({ left: false, right: false, fullWidth: true, tPadding, paddingSize });
  }
  return variants;
}

/** Figma `cellConstructor` 25-variant set. */
export const ARTICLE_VARIANTS: readonly ArticleVariant[] = buildVariants();

export function articleVariantKey(variant: ArticleVariant): string {
  return `l${variant.left}-r${variant.right}-f${variant.fullWidth}-t${variant.tPadding}-${variant.paddingSize}`;
}

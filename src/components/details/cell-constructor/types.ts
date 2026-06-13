export type CellConstructorPaddingSize = '---' | 'tiny' | 'small' | 'medium' | 'large';

/** Figma `cellConstructor` (component set 4301:4032). */
export const CELL_CONSTRUCTOR_FIGMA_NODE_ID = '4301:4032';
export const CELL_CONSTRUCTOR_WIDTH_PX = 1600;
export const CELL_CONSTRUCTOR_MIDDLE_WIDTH_PX = 752;

export const CELL_CONSTRUCTOR_PADDING_SIZES: readonly CellConstructorPaddingSize[] = [
  '---',
  'tiny',
  'small',
  'medium',
  'large',
];

/** Top padding (px) applied when `tPadding` is on, keyed by `paddingSize`. */
export const CELL_CONSTRUCTOR_TOP_PADDING_PX: Record<CellConstructorPaddingSize, number> = {
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
export const CELL_CONSTRUCTOR_LEFT_BLOCKS = ['cell-respond-for'] as const;

export const CELL_CONSTRUCTOR_RIGHT_BLOCKS = [
  'incut-related',
  'incut-numbers',
  'incut-opinion',
  'incut-socials',
] as const;

export const CELL_CONSTRUCTOR_FULL_WIDTH_BLOCKS = [
  'text-headline',
  'text-quote',
  'image-double',
  'image-triple',
  'image-gallery',
] as const;

export const CELL_CONSTRUCTOR_MIDDLE_BLOCKS: Record<
  CellConstructorPaddingSize,
  readonly string[]
> = {
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

export type CellConstructorVariant = {
  left: boolean;
  right: boolean;
  fullWidth: boolean;
  tPadding: boolean;
  paddingSize: CellConstructorPaddingSize;
};

function buildVariants(): CellConstructorVariant[] {
  const variants: CellConstructorVariant[] = [];
  for (const paddingSize of CELL_CONSTRUCTOR_PADDING_SIZES) {
    const tPadding = paddingSize !== '---';
    // 4 left/right combos (3-column layouts)
    for (const left of [true, false]) {
      for (const right of [true, false]) {
        variants.push({ left, right, fullWidth: false, tPadding, paddingSize });
      }
    }
    // fullWidth collapses the cell (no left/right)
    variants.push({ left: false, right: false, fullWidth: true, tPadding, paddingSize });
  }
  return variants;
}

/** Figma `cellConstructor` 25-variant set. */
export const CELL_CONSTRUCTOR_VARIANTS: readonly CellConstructorVariant[] = buildVariants();

export function cellConstructorVariantKey(variant: CellConstructorVariant): string {
  return `l${variant.left}-r${variant.right}-f${variant.fullWidth}-t${variant.tPadding}-${variant.paddingSize}`;
}

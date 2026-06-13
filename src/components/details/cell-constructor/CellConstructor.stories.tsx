import type { CSSProperties, ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { showcaseCanvas } from '../../../storybook/showcase-decorators';
import { TextParagraph } from '../../atoms/text-paragraph/TextParagraph';
import {
  TextTitle,
  TextQuestion,
  TextAnswer,
  TextInitials,
  TextListNumbered,
  TextListBulleted,
  TextAuthors,
  ImageSingle,
  DETAILS_PARAGRAPH_TEXT,
} from '../center';
import { CellRespondFor } from '../left';
import { IncutRelated, IncutNumbers, IncutOpinion, IncutSocials } from '../right';
import {
  TextHeadlineFull,
  TextQuote,
  ImageDouble,
  ImageTriple,
  ImageGallery,
} from '../full-width';
import { CellConstructor } from './CellConstructor';
import {
  CELL_CONSTRUCTOR_FIGMA_NODE_ID,
  CELL_CONSTRUCTOR_FULL_WIDTH_BLOCKS,
  CELL_CONSTRUCTOR_LEFT_BLOCKS,
  CELL_CONSTRUCTOR_MIDDLE_BLOCKS,
  CELL_CONSTRUCTOR_PADDING_SIZES,
  CELL_CONSTRUCTOR_RIGHT_BLOCKS,
  CELL_CONSTRUCTOR_TOP_PADDING_PX,
  CELL_CONSTRUCTOR_VARIANTS,
  CELL_CONSTRUCTOR_WIDTH_PX,
  cellConstructorVariantKey,
  type CellConstructorPaddingSize,
} from './types';

const SWAP = 'swap';

/** name -> rendered block (used by the slot pickers). */
const BLOCK_RENDERERS: Record<string, () => ReactNode> = {
  'cell-respond-for': () => <CellRespondFor />,
  'incut-related': () => <IncutRelated />,
  'incut-numbers': () => <IncutNumbers />,
  'incut-opinion': () => <IncutOpinion />,
  'incut-socials': () => <IncutSocials />,
  'text-headline': () => <TextHeadlineFull />,
  'text-quote': () => <TextQuote />,
  'image-double': () => <ImageDouble />,
  'image-triple': () => <ImageTriple />,
  'image-gallery': () => <ImageGallery />,
  'text-title': () => <TextTitle />,
  'text-question': () => <TextQuestion />,
  'text-answer': () => <TextAnswer />,
  'text-initials': () => <TextInitials />,
  'text-listNumbered': () => <TextListNumbered />,
  'text-listBulleted': () => <TextListBulleted />,
  'text-authors': () => <TextAuthors />,
  'image-single': () => <ImageSingle />,
  'text-paragraph': () => (
    <div className="details-paragraph-wide">
      <TextParagraph typography="bodyL" fontWeight="regular" text={DETAILS_PARAGRAPH_TEXT} />
    </div>
  ),
};

const MIDDLE_SLOT_PROP: Record<CellConstructorPaddingSize, string> = {
  '---': 'middleCell',
  tiny: 'middleTiny',
  small: 'middleSmall',
  medium: 'middleMedium',
  large: 'middleLarge',
};

type MiddleArgKey =
  | 'middleCellBlock'
  | 'middleTinyBlock'
  | 'middleSmallBlock'
  | 'middleMediumBlock'
  | 'middleLargeBlock';

/** Which picker arg drives the middle slot for a given paddingSize. */
const MIDDLE_ARG: Record<CellConstructorPaddingSize, MiddleArgKey> = {
  '---': 'middleCellBlock',
  tiny: 'middleTinyBlock',
  small: 'middleSmallBlock',
  medium: 'middleMediumBlock',
  large: 'middleLargeBlock',
};

// Horizontal scroll lives on the padded board card (its 64px padding absorbs the
// scrollbar) so it doesn't force overflow-y:auto and a spurious vertical scrollbar.
const boardScrollStyle: CSSProperties = {
  overflowX: 'auto',
  maxWidth: '100%',
};

const boardStyle: CSSProperties = {
  width: CELL_CONSTRUCTOR_WIDTH_PX,
};

function renderBlock(name: string): ReactNode {
  return name === SWAP ? undefined : BLOCK_RENDERERS[name]?.();
}

/**
 * Storybook-only padding-top visualization (Figma dev-mode style): a hatched band
 * over the shell's top padding region with a pixel-value pill (e.g. `80px`). Inset
 * 40px left/right to align with the columns (static/1000 side padding).
 */
function PaddingTopRuler({ px }: { px: number }) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        top: 0,
        left: 40,
        right: 40,
        height: px,
        backgroundImage:
          'repeating-linear-gradient(-45deg, rgba(13,153,255,0.18) 0 5px, transparent 5px 10px)',
        outline: '1px solid rgba(13,153,255,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    >
      <span
        style={{
          background: '#0d99ff',
          color: '#fff',
          fontSize: 11,
          lineHeight: '16px',
          padding: '0 6px',
          borderRadius: 4,
          whiteSpace: 'nowrap',
        }}
      >
        {px}px
      </span>
    </div>
  );
}

type PlaygroundArgs = {
  left: boolean;
  right: boolean;
  fullWidth: boolean;
  tPadding: boolean;
  paddingSize: CellConstructorPaddingSize;
  leftBlock: string;
  rightBlock: string;
  fullWidthBlock: string;
  middleCellBlock: string;
  middleTinyBlock: string;
  middleSmallBlock: string;
  middleMediumBlock: string;
  middleLargeBlock: string;
  showPaddingTop: boolean;
  // Raw component slot props — hidden from Controls (driven by the pickers above).
  leftCell?: ReactNode;
  rightCell?: ReactNode;
  fullWidthCell?: ReactNode;
  middleCell?: ReactNode;
  middleTiny?: ReactNode;
  middleSmall?: ReactNode;
  middleMedium?: ReactNode;
  middleLarge?: ReactNode;
};

const meta = {
  title: 'Constructors/cellConstructor/Cell Constructor',
  component: CellConstructor,
  tags: ['autodocs'],
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Figma \`cellConstructor\` (${CELL_CONSTRUCTOR_FIGMA_NODE_ID}) — article layout shell. \`paddingSize\` selects the active middle slot; its Figma whitelist drives the **middleBlock** picker. \`fullWidth\` collapses to a single cell.`,
      },
    },
  },
} satisfies Meta<typeof CellConstructor>;

export default meta;
type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  args: {
    left: true,
    right: true,
    fullWidth: false,
    tPadding: true,
    paddingSize: '---',
    leftBlock: SWAP,
    rightBlock: SWAP,
    fullWidthBlock: SWAP,
    middleCellBlock: SWAP,
    middleTinyBlock: SWAP,
    middleSmallBlock: SWAP,
    middleMediumBlock: SWAP,
    middleLargeBlock: SWAP,
    showPaddingTop: true,
  },
  argTypes: {
    // Raw ReactNode slot props are driven by the friendly pickers below.
    leftCell: { table: { disable: true } },
    rightCell: { table: { disable: true } },
    fullWidthCell: { table: { disable: true } },
    middleCell: { table: { disable: true } },
    middleTiny: { table: { disable: true } },
    middleSmall: { table: { disable: true } },
    middleMedium: { table: { disable: true } },
    middleLarge: { table: { disable: true } },

    paddingSize: { control: 'inline-radio', options: CELL_CONSTRUCTOR_PADDING_SIZES },

    showPaddingTop: {
      name: 'show padding-top ruler',
      control: 'boolean',
      if: { arg: 'tPadding', truthy: true },
    },

    // Slot pickers — shown only for the relevant variant (mirrors Figma).
    leftBlock: {
      name: 'leftCell',
      control: 'select',
      options: [...CELL_CONSTRUCTOR_LEFT_BLOCKS, SWAP],
      if: { arg: 'left', truthy: true },
    },
    rightBlock: {
      name: 'rightCell',
      control: 'select',
      options: [...CELL_CONSTRUCTOR_RIGHT_BLOCKS, SWAP],
      if: { arg: 'right', truthy: true },
    },
    fullWidthBlock: {
      name: 'fullWidthCell',
      control: 'select',
      options: [...CELL_CONSTRUCTOR_FULL_WIDTH_BLOCKS, SWAP],
      if: { arg: 'fullWidth', truthy: true },
    },
    middleCellBlock: {
      name: 'middleCell',
      control: 'select',
      options: [...CELL_CONSTRUCTOR_MIDDLE_BLOCKS['---'], SWAP],
      if: { arg: 'paddingSize', eq: '---' },
    },
    middleTinyBlock: {
      name: 'middleTiny',
      control: 'select',
      options: [...CELL_CONSTRUCTOR_MIDDLE_BLOCKS.tiny, SWAP],
      if: { arg: 'paddingSize', eq: 'tiny' },
    },
    middleSmallBlock: {
      name: 'middleSmall',
      control: 'select',
      options: [...CELL_CONSTRUCTOR_MIDDLE_BLOCKS.small, SWAP],
      if: { arg: 'paddingSize', eq: 'small' },
    },
    middleMediumBlock: {
      name: 'middleMedium',
      control: 'select',
      options: [...CELL_CONSTRUCTOR_MIDDLE_BLOCKS.medium, SWAP],
      if: { arg: 'paddingSize', eq: 'medium' },
    },
    middleLargeBlock: {
      name: 'middleLarge',
      control: 'select',
      options: [...CELL_CONSTRUCTOR_MIDDLE_BLOCKS.large, SWAP],
      if: { arg: 'paddingSize', eq: 'large' },
    },
  },
  render: (args) => {
    const middleSelected = args[MIDDLE_ARG[args.paddingSize]];
    const allowedMiddle = CELL_CONSTRUCTOR_MIDDLE_BLOCKS[args.paddingSize];
    const middleName =
      middleSelected !== SWAP && allowedMiddle.includes(middleSelected) ? middleSelected : SWAP;
    const middleProps = { [MIDDLE_SLOT_PROP[args.paddingSize]]: renderBlock(middleName) };

    const paddingPx = CELL_CONSTRUCTOR_TOP_PADDING_PX[args.paddingSize];
    const showRuler = args.showPaddingTop && args.tPadding && args.paddingSize !== '---';

    return (
      <div className="showcase-layout-section showcase-layout-section--board" style={boardScrollStyle}>
        <div style={boardStyle}>
          <div style={{ position: 'relative' }}>
            {showRuler && <PaddingTopRuler px={paddingPx} />}
            <CellConstructor
              left={args.left}
              right={args.right}
              fullWidth={args.fullWidth}
              tPadding={args.tPadding}
              paddingSize={args.paddingSize}
              leftCell={renderBlock(args.leftBlock)}
              rightCell={renderBlock(args.rightBlock)}
              fullWidthCell={renderBlock(args.fullWidthBlock)}
              {...middleProps}
            />
          </div>
        </div>
      </div>
    );
  },
};

const variantsBoardStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  width: CELL_CONSTRUCTOR_WIDTH_PX,
};

export const AllVariants: Story = {
  name: 'All variants',
  parameters: {
    docs: {
      description: {
        story: `All ${CELL_CONSTRUCTOR_VARIANTS.length} Figma variants (empty slots shown as the dashed swap placeholder).`,
      },
    },
  },
  render: () => (
    <div className="showcase-layout-section showcase-layout-section--board" style={boardScrollStyle}>
      <div style={variantsBoardStyle}>
        {CELL_CONSTRUCTOR_VARIANTS.map((variant) => (
          <div key={cellConstructorVariantKey(variant)} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <code style={{ fontSize: 12, color: '#6b6e73' }}>
              {cellConstructorVariantKey(variant)}
            </code>
            <CellConstructor
              left={variant.left}
              right={variant.right}
              fullWidth={variant.fullWidth}
              tPadding={variant.tPadding}
              paddingSize={variant.paddingSize}
            />
          </div>
        ))}
      </div>
    </div>
  ),
};

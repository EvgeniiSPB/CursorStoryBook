import type { CSSProperties, ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { showcaseCanvas } from '../../../storybook/showcase-decorators';
import { Shape } from '../../../shapes';
import { CardTop, type CardTopVariant } from '../card-top';
import { CardBottom, type CardBottomVariant } from '../card-bottom';
import { CardConstructor } from './CardConstructor';
import {
  CARD_BOTTOM_BLOCKS,
  CARD_CAPABILITIES,
  CARD_KINDS,
  CARD_RADII,
  CARD_ROWS,
  CARD_SHAPE_OPTIONS,
  CARD_SIZE_PX,
  CARD_STATES,
  CARD_THEMES,
  CARD_TOP_BLOCKS,
  CARD_VARIANTS,
  cardVariantKey,
  type CardKind,
  type CardRadius,
  type CardRows,
  type CardState,
  type CardTheme,
} from './types';

const SWAP = 'swap';

/* ---- Slot renderers (preferred instances → real blocks) ---- */

function renderTop(key: string): ReactNode {
  if (key === SWAP) return undefined;
  const variant = key.replace('cardTop-', '') as CardTopVariant;
  return <CardTop variant={variant} />;
}

function renderBottom(key: string): ReactNode {
  if (key === SWAP) return undefined;
  const variant = key.replace('cardBottom-', '') as CardBottomVariant;
  return <CardBottom variant={variant} />;
}

/** Background shape swatch — switchable like the Figma `shape` swap. */
function renderShape(
  card: CardKind,
  key: string,
  opts: { radius?: CardRadius; state?: CardState; theme?: CardTheme },
): ReactNode {
  if (key === SWAP) return undefined;
  const option = CARD_SHAPE_OPTIONS[card].find((o) => o.key === key);
  if (!option) return undefined;
  return (
    <Shape
      type={option.type}
      color={option.color}
      radius={opts.radius ?? 'x6'}
      state={opts.state ?? 'normal'}
      figmaTheme={card === 'subscriptionOn' ? opts.theme : card === 'HBR' ? 'light' : undefined}
    />
  );
}

/** Union of all shape swatch keys (validated per-card at render). */
const ALL_SHAPE_KEYS = Array.from(
  new Set(Object.values(CARD_SHAPE_OPTIONS).flatMap((opts) => opts.map((o) => o.key))),
);

type PlaygroundArgs = {
  card: CardKind;
  state: CardState;
  radius: CardRadius;
  rows: CardRows;
  theme: CardTheme;
  topBlock: string;
  bottomBlock: string;
  shapeBlock: string;
  // Raw slot props — hidden from Controls (driven by the pickers above).
  top?: ReactNode;
  bottomCell?: ReactNode;
  shape?: ReactNode;
};

const boardScrollStyle: CSSProperties = { overflowX: 'auto', maxWidth: '100%' };

const meta = {
  title: 'Constructors/cardConstructor/Card Constructor',
  component: CardConstructor,
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CardConstructor>;

export default meta;
type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  args: {
    card: 'baseM',
    state: 'normal',
    radius: 'x6',
    rows: 1,
    theme: 'light',
    topBlock: SWAP,
    bottomBlock: SWAP,
    shapeBlock: SWAP,
  },
  argTypes: {
    // Raw ReactNode slot props are driven by the pickers below.
    top: { table: { disable: true } },
    bottomCell: { table: { disable: true } },
    shape: { table: { disable: true } },

    card: { control: 'select', options: CARD_KINDS },
    state: { control: 'inline-radio', options: CARD_STATES },
    radius: {
      control: 'inline-radio',
      options: CARD_RADII,
      if: { arg: 'card', eq: 'baseLFilled' },
    },
    rows: { control: 'inline-radio', options: CARD_ROWS },
    theme: {
      control: 'inline-radio',
      options: CARD_THEMES,
      if: { arg: 'card', eq: 'subscriptionOn' },
    },

    topBlock: {
      name: 'top',
      control: 'select',
      options: [...CARD_TOP_BLOCKS, SWAP],
      if: { arg: 'card', eq: 'baseM' },
    },
    bottomBlock: {
      name: 'bottomCell',
      control: 'select',
      options: [...CARD_BOTTOM_BLOCKS, SWAP],
    },
    shapeBlock: {
      name: 'shape',
      control: 'select',
      options: [...ALL_SHAPE_KEYS, SWAP],
    },
  },
  render: (args) => {
    const caps = CARD_CAPABILITIES[args.card];
    const top = caps.top ? renderTop(args.topBlock) : undefined;
    const bottomCell = caps.bottomCell ? renderBottom(args.bottomBlock) : undefined;
    const shape = caps.shape
      ? renderShape(args.card, args.shapeBlock, {
          radius: args.radius,
          state: args.state,
          theme: args.theme,
        })
      : undefined;

    return (
      <div className="showcase-layout-section showcase-layout-section--board" style={boardScrollStyle}>
        <div style={{ width: CARD_SIZE_PX[args.card].width, maxWidth: '100%' }}>
          <CardConstructor
            card={args.card}
            state={args.state}
            radius={args.radius}
            rows={args.rows}
            theme={args.theme}
            top={top}
            bottomCell={bottomCell}
            shape={shape}
          />
        </div>
      </div>
    );
  },
};

const variantsBoardStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
};

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div className="showcase-layout-section showcase-layout-section--board" style={boardScrollStyle}>
      <div style={variantsBoardStyle}>
        {CARD_VARIANTS.map((variant) => (
          <div key={cardVariantKey(variant)} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <code style={{ fontSize: 12, color: '#6b6e73' }}>{cardVariantKey(variant)}</code>
            <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
              <div style={{ width: CARD_SIZE_PX[variant.card].width, maxWidth: '100%' }}>
                <CardConstructor
                  card={variant.card}
                  state={variant.state}
                  radius={variant.radius}
                  rows={variant.rows}
                  theme={variant.theme}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

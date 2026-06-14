import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { showcaseCanvas } from '../../../../storybook/showcase-decorators';
import {
  CARD_CAPABILITIES,
  CARD_KINDS,
  CARD_PLACEHOLDER_BOARD_PADDING_PX,
  CARD_PLACEHOLDER_BOARD_WIDTH_PX,
  CARD_PLACEHOLDER_FIGMA_NODE_ID,
  CARD_PLAYGROUND_ITEMS,
  CARD_RADII,
  CARD_ROWS,
  CARD_SIZE_PX,
  CARD_STATES,
  CARD_SWAP_SLOTS,
  CARD_THEMES,
  CARD_VARIANTS,
  cardVariantKey,
  resolveCardSwapSlot,
  type CardKind,
  type CardPlaygroundItem,
  type CardRadius,
  type CardRows,
  type CardState,
  type CardTheme,
} from '../types';
import { CardPlaceholder } from './CardPlaceholder';
import { CardShell } from './CardShell';
import { SWAP, renderBottom, renderShape, renderTop } from './slot-renderers';

const boardScrollStyle: CSSProperties = {
  overflowX: 'auto',
  maxWidth: '100%',
};

const playgroundBoardStyle: CSSProperties = {
  '--showcase-board-width': `${CARD_PLACEHOLDER_BOARD_WIDTH_PX}px`,
  '--showcase-board-padding': CARD_PLACEHOLDER_BOARD_PADDING_PX,
};

function isCardKind(item: CardPlaygroundItem): item is CardKind {
  return item !== 'swap';
}

type PlaygroundArgs = {
  card: CardPlaygroundItem;
  top?: string;
  [key: string]: unknown;
};

const VARIANT_CONTROLS = [
  { prop: 'state', options: CARD_STATES, defaultValue: 'normal' as CardState },
  { prop: 'radius', options: CARD_RADII, defaultValue: 'x6' as CardRadius },
  { prop: 'rows', options: CARD_ROWS, defaultValue: 1 as CardRows },
  { prop: 'theme', options: CARD_THEMES, defaultValue: 'light' as CardTheme },
] as const;

function variantArgKey(card: CardKind, prop: string): string {
  return `${prop}_${card}`;
}

function slotArgKey(card: CardKind, slot: 'bottomCell' | 'shape'): string {
  return `${slot}_${card}`;
}

function readVariantArg(args: PlaygroundArgs, card: CardKind, prop: string): string {
  const value = args[variantArgKey(card, prop)];
  return typeof value === 'string' || typeof value === 'number' ? String(value) : SWAP;
}

function readTopArg(args: PlaygroundArgs): string {
  return typeof args.top === 'string' ? args.top : SWAP;
}

function readSlotArg(args: PlaygroundArgs, card: CardKind, slot: 'bottomCell' | 'shape'): string {
  const value = args[slotArgKey(card, slot)];
  return typeof value === 'string' ? value : SWAP;
}

function buildPlaygroundArgTypes(): Meta<PlaygroundArgs>['argTypes'] {
  const argTypes: NonNullable<Meta<PlaygroundArgs>['argTypes']> = {
    card: { control: 'select', options: CARD_PLAYGROUND_ITEMS },
  };

  for (const card of CARD_KINDS) {
    const caps = CARD_CAPABILITIES[card];

    for (const { prop, options } of VARIANT_CONTROLS) {
      if (!caps[prop]) {
        continue;
      }

      argTypes[variantArgKey(card, prop)] = {
        name: prop,
        control: 'inline-radio',
        options: [...options],
        if: { arg: 'card', eq: card },
        table: { category: 'Variant' },
      };
    }

    for (const slot of CARD_SWAP_SLOTS[card]) {
      if (slot.name === 'top') {
        argTypes.top = {
          control: 'select',
          options: [...slot.preferred, SWAP],
          if: { arg: 'card', eq: 'baseM' },
        };
      }

      if (slot.name === 'bottomCell') {
        argTypes[slotArgKey(card, 'bottomCell')] = {
          name: 'bottomCell',
          control: 'inline-radio',
          options: [...slot.preferred, SWAP],
          if: { arg: 'card', eq: card },
        };
      }

      if (slot.name === 'shape') {
        argTypes[slotArgKey(card, 'shape')] = {
          name: 'shape',
          control: 'inline-radio',
          options: [...slot.preferred, SWAP],
          if: { arg: 'card', eq: card },
        };
      }
    }
  }

  return argTypes;
}

function buildPlaygroundDefaultArgs(): PlaygroundArgs {
  const args: PlaygroundArgs = { card: 'swap', top: SWAP };

  for (const card of CARD_KINDS) {
    const caps = CARD_CAPABILITIES[card];

    for (const { prop, defaultValue } of VARIANT_CONTROLS) {
      if (caps[prop]) {
        args[variantArgKey(card, prop)] = defaultValue;
      }
    }

    for (const slot of CARD_SWAP_SLOTS[card]) {
      if (slot.name === 'bottomCell') {
        args[slotArgKey(card, 'bottomCell')] = SWAP;
      }
      if (slot.name === 'shape') {
        args[slotArgKey(card, 'shape')] = SWAP;
      }
    }
  }

  return args;
}

const meta = {
  title: 'Constructors/Card/Constructor',
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<PlaygroundArgs>;

export default meta;
type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  args: buildPlaygroundDefaultArgs(),
  argTypes: buildPlaygroundArgTypes(),
  render: (args) => {
    if (!isCardKind(args.card)) {
      return (
        <div
          className="showcase-layout-section showcase-layout-section--board"
          style={{ ...boardScrollStyle, ...playgroundBoardStyle }}
        >
          <CardPlaceholder />
        </div>
      );
    }

    const card = args.card;
    const caps = CARD_CAPABILITIES[card];
    const topKey = caps.top ? resolveCardSwapSlot(card, 'top', readTopArg(args), SWAP) : SWAP;
    const bottomKey = caps.bottomCell
      ? resolveCardSwapSlot(card, 'bottomCell', readSlotArg(args, card, 'bottomCell'), SWAP)
      : SWAP;
    const shapeKey = caps.shape
      ? resolveCardSwapSlot(card, 'shape', readSlotArg(args, card, 'shape'), SWAP)
      : SWAP;

    return (
      <div
        className="showcase-layout-section showcase-layout-section--board"
        style={{ ...boardScrollStyle, ...playgroundBoardStyle }}
      >
        <CardShell
          card={card}
          state={caps.state ? (readVariantArg(args, card, 'state') as CardState) : undefined}
          radius={
            caps.radius ? (readVariantArg(args, card, 'radius') as CardRadius) : undefined
          }
          rows={
            caps.rows ? (Number(readVariantArg(args, card, 'rows')) as CardRows) : undefined
          }
          theme={caps.theme ? (readVariantArg(args, card, 'theme') as CardTheme) : undefined}
          top={caps.top ? renderTop(topKey) : undefined}
          bottomCell={caps.bottomCell ? renderBottom(bottomKey) : undefined}
          shape={
            caps.shape
              ? renderShape(
                  card,
                  shapeKey,
                  (readVariantArg(args, card, 'state') as CardState) || 'normal',
                  (readVariantArg(args, card, 'radius') as CardRadius) || 'x6',
                )
              : undefined
          }
        />
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
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: `All ${CARD_VARIANTS.length} Figma variants from card / placeholder (${CARD_PLACEHOLDER_FIGMA_NODE_ID}). Swappable slots show the dashed swap placeholder; no swap pickers.`,
      },
    },
  },
  render: () => (
    <div className="showcase-layout-section showcase-layout-section--board" style={boardScrollStyle}>
      <div style={variantsBoardStyle}>
        {CARD_VARIANTS.map((variant) => {
          const size = CARD_SIZE_PX[variant.card];

          return (
            <div
              key={cardVariantKey(variant)}
              style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
            >
              <code style={{ fontSize: 12, color: '#6b6e73' }}>{cardVariantKey(variant)}</code>
              <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
                <div style={{ width: size.width, minWidth: size.width }}>
                  <CardShell
                    card={variant.card}
                    state={variant.state}
                    radius={variant.radius}
                    rows={variant.rows}
                    theme={variant.theme}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ),
};

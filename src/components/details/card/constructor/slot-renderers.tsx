import type { CSSProperties, ReactNode } from 'react';
import { SwapPlaceholder } from '../../swap-placeholder';
import type { CardTopVariant } from '../../card-top/CardTop';
import type { CardBottomVariant } from '../../card-bottom/CardBottom';
import { CardTop } from '../../card-top/CardTop';
import { CardBottom } from '../../card-bottom/CardBottom';
import { Shape } from '../../../../shapes';
import type { CardRadius, CardShapeOption, CardState } from '../types';
import {
  CARD_BOTTOM_BLOCKS,
  CARD_DEFAULT_SHAPE_KEY,
  CARD_SHAPE_OPTIONS,
  CARD_TOP_BLOCKS,
  cardShapeRadius,
  type CardBottomBlock,
  type CardKind,
  type CardTopBlock,
} from '../types';

export const SWAP = 'swap';

const TOP_VARIANT: Record<CardTopBlock, CardTopVariant> = {
  'cardTop-baseM2tags': 'baseM2tags',
  'cardTop-baseM1lvlTag': 'baseM1lvlTag',
  'cardTop-baseM2lvlTag': 'baseM2lvlTag',
  'cardTop-baseMBadge1tag': 'baseMBadge1tag',
  'cardTop-baseMBadge2tags': 'baseMBadge2tags',
};

const BOTTOM_VARIANT: Record<CardBottomBlock, CardBottomVariant> = {
  'cardBottom-baseConstantInverted': 'baseConstantInverted',
  'cardBottom-button': 'button',
};

const shapeFillStyle: CSSProperties = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
};

function findShapeOption(card: CardKind, key: string): CardShapeOption | undefined {
  return CARD_SHAPE_OPTIONS[card].find((option) => option.key === key);
}

export function renderTop(key: string): ReactNode | undefined {
  if (key === SWAP || !CARD_TOP_BLOCKS.includes(key as CardTopBlock)) {
    return undefined;
  }
  return <CardTop variant={TOP_VARIANT[key as CardTopBlock]} />;
}

export function renderBottom(key: string): ReactNode | undefined {
  if (key === SWAP || !CARD_BOTTOM_BLOCKS.includes(key as CardBottomBlock)) {
    return undefined;
  }
  return <CardBottom variant={BOTTOM_VARIANT[key as CardBottomBlock]} />;
}

export function renderShape(
  card: CardKind,
  shapeKey: string,
  state: CardState,
  radius: CardRadius = cardShapeRadius(card),
): ReactNode | undefined {
  if (shapeKey === SWAP) {
    return undefined;
  }

  const option = findShapeOption(card, shapeKey);
  if (!option) {
    return undefined;
  }

  return (
    <Shape
      type={option.type}
      color={option.color}
      state={state}
      radius={radius}
      style={shapeFillStyle}
    />
  );
}

/** Figma default swatch for a card (e.g. baseLFilled → filled/brand normal). */
export function renderDefaultShape(
  card: CardKind,
  state: CardState = 'normal',
  radius: CardRadius = cardShapeRadius(card),
): ReactNode | undefined {
  const defaultKey = CARD_DEFAULT_SHAPE_KEY[card];
  if (!defaultKey) {
    return undefined;
  }
  return renderShape(card, defaultKey, state, radius);
}

/** Playground shape slot: swap placeholder or preferred/default Shape. */
export function resolveShapeSlot(
  card: CardKind,
  shapeKey: string,
  state: CardState,
  radius: CardRadius = cardShapeRadius(card),
): ReactNode {
  if (shapeKey === SWAP) {
    return <SwapPlaceholder />;
  }
  return renderShape(card, shapeKey, state, radius) ?? renderDefaultShape(card, state, radius);
}

export function shapePickerOptions(card: CardKind): readonly string[] {
  return CARD_SHAPE_OPTIONS[card].map((option) => option.key);
}

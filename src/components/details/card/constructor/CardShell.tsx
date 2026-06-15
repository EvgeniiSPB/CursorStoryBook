import type { HTMLAttributes, ReactNode } from 'react';
import {
  CardBaseLFilled,
  CardBaseLImage,
  CardBaseM,
  CardFirstScreen,
  CardHBR,
  CardSubscriptionOff,
  CardSubscriptionOn,
} from '../../cards';
import {
  CARD_DEFAULT_SEGMENT,
  type CardKind,
  type CardRadius,
  type CardRows,
  type CardSegment,
  type CardState,
  type CardTheme,
} from '../types';

export interface CardShellProps extends HTMLAttributes<HTMLDivElement> {
  card: CardKind;
  state?: CardState;
  radius?: CardRadius;
  rows?: CardRows;
  theme?: CardTheme;
  top?: ReactNode;
  bottomCell1?: ReactNode;
  bottomCell2?: ReactNode;
  shape?: ReactNode;
  segment?: CardSegment;
}

/** Dispatches to the card component for the given Figma `card - *` kind. */
export function CardShell({
  card,
  state = 'normal',
  radius = 'x6',
  rows = 1,
  theme = 'light',
  top,
  bottomCell1,
  bottomCell2,
  shape,
  segment,
  ...props
}: CardShellProps) {
  switch (card) {
    case 'baseM':
      return <CardBaseM top={top} {...props} />;
    case 'baseLFilled':
      return (
        <CardBaseLFilled
          state={state}
          radius={radius}
          rows={rows}
          shape={shape}
          bottomCell1={bottomCell1}
          bottomCell2={bottomCell2}
          {...props}
        />
      );
    case 'baseLImage':
      return (
        <CardBaseLImage
          rows={rows}
          bottomCell1={bottomCell1}
          bottomCell2={bottomCell2}
          {...props}
        />
      );
    case 'firstScreen':
      return <CardFirstScreen state={state} {...props} />;
    case 'subscriptionOn':
      return <CardSubscriptionOn state={state} {...props} />;
    case 'subscriptionOff':
      return <CardSubscriptionOff state={state} {...props} />;
    case 'HBR':
      return (
        <CardHBR
          state={state}
          segment={segment ?? CARD_DEFAULT_SEGMENT.HBR ?? 'crimson'}
          {...props}
        />
      );
    default: {
      const _exhaustive: never = card;
      return _exhaustive;
    }
  }
}

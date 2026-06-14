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
import type { CardKind, CardRadius, CardRows, CardState, CardTheme } from '../types';

export interface CardShellProps extends HTMLAttributes<HTMLDivElement> {
  card: CardKind;
  state?: CardState;
  radius?: CardRadius;
  rows?: CardRows;
  theme?: CardTheme;
  top?: ReactNode;
  bottomCell?: ReactNode;
  shape?: ReactNode;
}

/** Dispatches to the card component for the given Figma `card - *` kind. */
export function CardShell({
  card,
  state = 'normal',
  radius = 'x6',
  rows = 1,
  theme = 'light',
  top,
  bottomCell,
  shape,
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
          bottomCell={bottomCell}
          {...props}
        />
      );
    case 'baseLImage':
      return <CardBaseLImage rows={rows} bottomCell={bottomCell} {...props} />;
    case 'firstScreen':
      return <CardFirstScreen state={state} shape={shape} {...props} />;
    case 'subscriptionOn':
      return (
        <CardSubscriptionOn state={state} theme={theme} shape={shape} {...props} />
      );
    case 'subscriptionOff':
      return <CardSubscriptionOff state={state} shape={shape} {...props} />;
    case 'HBR':
      return <CardHBR state={state} shape={shape} {...props} />;
    default: {
      const _exhaustive: never = card;
      return _exhaustive;
    }
  }
}

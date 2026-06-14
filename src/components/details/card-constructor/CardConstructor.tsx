import type { HTMLAttributes, ReactNode } from 'react';
import {
  CardBaseLFilled,
  CardBaseLImage,
  CardBaseM,
  CardFirstScreen,
  CardHBR,
  CardSubscriptionOn,
} from '../cards';
import type { CardKind, CardRadius, CardRows, CardState, CardTheme } from './types';
import './card-constructor.css';

export interface CardConstructorProps extends HTMLAttributes<HTMLDivElement> {
  /** Which card to render. */
  card: CardKind;
  state?: CardState;
  radius?: CardRadius;
  rows?: CardRows;
  theme?: CardTheme;
  /** `top` slot (baseM). Empty → swap. */
  top?: ReactNode;
  /** `bottomSection` `cell 1` (baseLFilled, baseLImage). Empty → swap. */
  bottomCell?: ReactNode;
  /** Background `shape` swatch (colored cards). Empty → swap. */
  shape?: ReactNode;
}

/**
 * Figma `cardConstructor` — selects a card variant and forwards the swappable
 * slots (top / bottomCell / shape) and variant props. Empty slots fall through
 * to each card's `SwapPlaceholder` (Figma `!change this`).
 */
export function CardConstructor({
  card,
  state = 'normal',
  radius = 'x6',
  rows = 1,
  theme = 'light',
  top,
  bottomCell,
  shape,
  className,
  ...props
}: CardConstructorProps) {
  const classes = ['card-constructor', className].filter(Boolean).join(' ');

  let content: ReactNode;
  switch (card) {
    case 'baseM':
      content = <CardBaseM top={top} />;
      break;
    case 'baseLFilled':
      content = (
        <CardBaseLFilled state={state} radius={radius} rows={rows} shape={shape} bottomCell={bottomCell} />
      );
      break;
    case 'baseLImage':
      content = <CardBaseLImage rows={rows} bottomCell={bottomCell} />;
      break;
    case 'firstScreen':
      content = <CardFirstScreen state={state} shape={shape} />;
      break;
    case 'subscriptionOn':
      content = <CardSubscriptionOn state={state} theme={theme} shape={shape} />;
      break;
    case 'HBR':
      content = <CardHBR state={state} shape={shape} />;
      break;
    default:
      content = null;
  }

  return (
    <div className={classes} data-name="cardConstructor" data-card={card} {...props}>
      {content}
    </div>
  );
}

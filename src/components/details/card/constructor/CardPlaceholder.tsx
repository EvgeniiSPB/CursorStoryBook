import type { HTMLAttributes } from 'react';
import { TextCore } from '../../../atoms/text-core/TextCore';
import { CARD_SWAP_SYMBOL_FIGMA_NODE_ID } from '../types';
import './card-placeholder.css';

export interface CardPlaceholderProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
}

/** Figma `!card placeholder` (4258:799) — default swap stub in Constructor Playground. */
export function CardPlaceholder({ label = 'swap', className, ...props }: CardPlaceholderProps) {
  const classes = ['card-placeholder', className].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      data-name="!card placeholder"
      data-node-id={CARD_SWAP_SYMBOL_FIGMA_NODE_ID}
      {...props}
    >
      <div className="card-placeholder__bound" data-name="bound">
        <TextCore
          typography="bodyM"
          fontWeight="regular"
          text={label}
          className="card-placeholder__label"
        />
      </div>
    </div>
  );
}

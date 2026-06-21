import type { HTMLAttributes } from 'react';
import { TextCore } from '../../../atoms/text-core/TextCore';
import {
  LAYOUT_SWAP_HEADLINE_FIGMA_NODE_ID,
  LAYOUT_SWAP_ROW_FIGMA_NODE_ID,
} from './types';
import './layout-swap-placeholder.css';

export type LayoutSwapKind = 'swap' | 'headline';

const KIND_LABEL: Record<LayoutSwapKind, string> = {
  swap: 'swap',
  headline: 'headline',
};

const KIND_FIGMA_NODE: Record<LayoutSwapKind, string> = {
  swap: LAYOUT_SWAP_ROW_FIGMA_NODE_ID,
  headline: LAYOUT_SWAP_HEADLINE_FIGMA_NODE_ID,
};

export interface LayoutSwapPlaceholderProps extends HTMLAttributes<HTMLDivElement> {
  /** Typed swap bound — generic `swap` or orange `headline` from Figma layouts. */
  kind?: LayoutSwapKind;
  /** Override label; defaults from `kind`. */
  label?: string;
}

/**
 * Figma layout `!change this` — dashed bound for empty layout slots.
 * Typed variants match `04---templates` (grey swap, orange headline, …).
 */
export function LayoutSwapPlaceholder({
  kind = 'swap',
  label,
  className,
  ...props
}: LayoutSwapPlaceholderProps) {
  const resolvedLabel = label ?? KIND_LABEL[kind];
  const classes = [
    'layout-swap-placeholder',
    kind !== 'swap' ? `layout-swap-placeholder--${kind}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classes}
      data-name="!change this"
      data-figma-node={KIND_FIGMA_NODE[kind]}
      data-swap-kind={kind}
      {...props}
    >
      <TextCore
        typography="bodyM"
        fontWeight={kind === 'headline' ? 'medium' : 'regular'}
        text={resolvedLabel}
        className="layout-swap-placeholder__label"
      />
    </div>
  );
}

import type { HTMLAttributes } from 'react';
import { Footer } from '../../footer/Footer';
import { LayoutVerticalPaddingRuler } from '../shared/LayoutPaddingRuler';
import { ROW_FOOTER_FIGMA_NODE_ID, ROW_FOOTER_T_PADDING_PX } from './types';
import './rows.css';

export interface LayoutFooterProps extends HTMLAttributes<HTMLDivElement> {}

/** Figma layout `footer` row (6106:3092). */
export function LayoutFooter({ className, ...props }: LayoutFooterProps) {
  const classes = ['layout-row', 'layout-row--footer', className].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      data-name="footer"
      data-figma-node={ROW_FOOTER_FIGMA_NODE_ID}
      {...props}
    >
      <LayoutVerticalPaddingRuler px={ROW_FOOTER_T_PADDING_PX} />
      <Footer />
    </div>
  );
}

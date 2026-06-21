import type { HTMLAttributes } from 'react';
import { ButtonTextOnly } from '../../../buttons/button-text-only/ButtonTextOnly';
import { LayoutVerticalPaddingRuler } from '../shared/LayoutPaddingRuler';
import { ROW_BUTTON_DEFAULT_TEXT, ROW_BUTTON_FIGMA_NODE_ID, ROW_BUTTON_T_PADDING_PX } from './types';
import './rows.css';

export interface RowButtonProps extends HTMLAttributes<HTMLDivElement> {
  buttonText?: string;
}

/** Figma `row - button` (6117:7564). */
export function RowButton({
  buttonText = ROW_BUTTON_DEFAULT_TEXT,
  className,
  ...props
}: RowButtonProps) {
  const classes = ['layout-row', 'layout-row--button', className].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      data-name="row - button"
      data-figma-node={ROW_BUTTON_FIGMA_NODE_ID}
      {...props}
    >
      <LayoutVerticalPaddingRuler px={ROW_BUTTON_T_PADDING_PX} />
      <ButtonTextOnly type="primary" size="medium">
        {buttonText}
      </ButtonTextOnly>
    </div>
  );
}

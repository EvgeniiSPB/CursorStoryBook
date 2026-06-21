import type { HTMLAttributes } from 'react';
import { SectionHeadline } from '../headlines/SectionHeadline';
import { LayoutHPaddingRulers } from '../shared/LayoutPaddingRuler';
import { SectionHeadlinePaddingRuler } from '../headlines/SectionHeadlinePaddingRuler';
import {
  SECTION_HEADLINE_B_PADDING_PX,
  SECTION_HEADLINE_DEFAULT_BUTTON_TEXT,
  SECTION_HEADLINE_DEFAULT_HEADLINE_TEXT,
} from '../headlines/types';
import { LayoutSwapPlaceholder } from '../shared/LayoutSwapPlaceholder';
import {
  ROW_HEADLINE_FIGMA_NODE_ID,
  ROW_HEADLINE_INNER_SECTION,
  ROW_HEADLINE_INNER_SWAP,
  type RowHeadlineInnerSlot,
} from './types';
import './rows.css';

export interface RowHeadlineProps extends HTMLAttributes<HTMLDivElement> {
  hPaddings?: boolean;
  innerSlot?: RowHeadlineInnerSlot;
  tPadding?: boolean;
  button?: boolean;
  headlineText?: string;
  headlineButtonText?: string;
}

/** Figma `row - headline` (6036:2694). */
export function RowHeadline({
  hPaddings = true,
  innerSlot = ROW_HEADLINE_INNER_SWAP,
  tPadding = true,
  button = true,
  headlineText = SECTION_HEADLINE_DEFAULT_HEADLINE_TEXT,
  headlineButtonText = SECTION_HEADLINE_DEFAULT_BUTTON_TEXT,
  className,
  ...props
}: RowHeadlineProps) {
  const classes = [
    'layout-row',
    'layout-row--headline',
    hPaddings ? 'layout-row--h-paddings' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classes}
      data-name="row - headline"
      data-figma-node={ROW_HEADLINE_FIGMA_NODE_ID}
      data-h-paddings={hPaddings}
      {...props}
    >
      {hPaddings ? (
        <LayoutHPaddingRulers
          bottomInset={
            innerSlot === ROW_HEADLINE_INNER_SECTION ? SECTION_HEADLINE_B_PADDING_PX : 0
          }
        />
      ) : null}
      <div className="layout-row--headline__slot">
        {innerSlot === ROW_HEADLINE_INNER_SECTION ? (
          <div style={{ position: 'relative', width: '100%' }}>
            {tPadding ? <SectionHeadlinePaddingRuler /> : null}
            <SectionHeadline
              tPadding={tPadding}
              button={button}
              headlineText={headlineText}
              buttonText={headlineButtonText}
            />
          </div>
        ) : (
          <LayoutSwapPlaceholder kind="headline" />
        )}
      </div>
    </div>
  );
}

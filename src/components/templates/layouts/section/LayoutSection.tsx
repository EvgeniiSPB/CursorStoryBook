import type { HTMLAttributes, ReactNode } from 'react';
import { LayoutSwapRow, layoutSwapRowWidthStyle } from '../shared/LayoutSwapRow';
import type { LayoutGap, LayoutRows } from '../shared/types';
import './layout-section.css';

export type LayoutSectionProps = HTMLAttributes<HTMLDivElement> & {
  rows?: LayoutRows;
  gap?: LayoutGap;
  row1?: ReactNode;
  row2?: ReactNode;
  row3?: ReactNode;
  row4?: ReactNode;
  row5?: ReactNode;
};

const SECTION_ROW_KEYS = ['row1', 'row2', 'row3', 'row4', 'row5'] as const;

function renderRowSlot(content: ReactNode | undefined) {
  return (
    <div className="layout-section__row" style={layoutSwapRowWidthStyle}>
      {content ?? <LayoutSwapRow />}
    </div>
  );
}

/** Figma `section` (6113:2696) — vertical stack of layout rows with configurable gap. */
export function LayoutSection({
  rows = 1,
  gap = '---',
  row1,
  row2,
  row3,
  row4,
  row5,
  className,
  ...props
}: LayoutSectionProps) {
  const rowSlots = [row1, row2, row3, row4, row5].slice(0, rows);
  const classes = ['layout-section', className].filter(Boolean).join(' ');

  return (
    <div className={classes} data-rows={rows} data-gap={gap} {...props}>
      {rowSlots.map((slot, index) => (
        <div key={SECTION_ROW_KEYS[index]}>{renderRowSlot(slot)}</div>
      ))}
    </div>
  );
}

import type { HTMLAttributes } from 'react';
import { TextCore } from '../../atoms/text-core/TextCore';
import './swap-placeholder.css';

export interface SwapPlaceholderProps extends HTMLAttributes<HTMLDivElement> {
  /** Label shown inside the dashed bound; Figma default is `swap`. */
  label?: string;
}

/**
 * Figma `!change this` (e.g. 4266:3247) — dashed "swap" bound used for empty
 * cellConstructor slots. Real content is plugged in via the constructor's
 * slot props; this only renders when a slot is left empty.
 */
export function SwapPlaceholder({ label = 'swap', className, ...props }: SwapPlaceholderProps) {
  const classes = ['swap-placeholder', className].filter(Boolean).join(' ');

  return (
    <div className={classes} data-name="!change this" {...props}>
      <TextCore
        typography="bodyM"
        fontWeight="regular"
        text={label}
        className="swap-placeholder__label"
      />
    </div>
  );
}

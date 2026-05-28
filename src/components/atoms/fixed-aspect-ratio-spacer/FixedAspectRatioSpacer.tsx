import type { CSSProperties, HTMLAttributes } from 'react';
import {
  FIXED_ASPECT_RATIO_SPACER_WIDTH_PX,
  fixedAspectRatioSpacerHeightForWidth,
} from './types';
import './fixed-aspect-ratio-spacer.css';

export interface FixedAspectRatioSpacerProps extends HTMLAttributes<HTMLDivElement> {
  /** Figma default 64×32 (245:62). Height is always width ÷ 2. */
  widthPx?: number;
  className?: string;
}

export function FixedAspectRatioSpacer({
  widthPx = FIXED_ASPECT_RATIO_SPACER_WIDTH_PX,
  className,
  style,
  ...props
}: FixedAspectRatioSpacerProps) {
  const heightPx = fixedAspectRatioSpacerHeightForWidth(widthPx);

  const rootClasses = ['fixed-aspect-ratio-spacer', className].filter(Boolean).join(' ');

  const rootStyle = {
    '--fixed-aspect-ratio-spacer-width': widthPx,
    '--fixed-aspect-ratio-spacer-height': heightPx,
    ...style,
  } as CSSProperties;

  return (
    <div className={rootClasses} style={rootStyle} aria-hidden {...props}>
      <div className="fixed-aspect-ratio-spacer__row">
        <div className="fixed-aspect-ratio-spacer__rotate">
          <div className="fixed-aspect-ratio-spacer__line" />
        </div>
      </div>
    </div>
  );
}

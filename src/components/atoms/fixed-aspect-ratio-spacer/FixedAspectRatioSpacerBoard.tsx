import type { CSSProperties } from 'react';
import imageContainerSampleUrl from '../../../assets/image-container/image-container-sample.png';
import { FixedAspectRatioSpacer } from './FixedAspectRatioSpacer';
import {
  FIXED_ASPECT_RATIO_SPACER_HEIGHT_PX,
  FIXED_ASPECT_RATIO_SPACER_WIDTH_PX,
} from './types';
import './fixed-aspect-ratio-spacer-board.css';

/** Board: `image - container` shell (243:57) with spacer at Figma size 64×32 (245:62). */
export function FixedAspectRatioSpacerBoard() {
  return (
    <div className="image-container-showcase-section image-container-showcase-section--board fixed-aspect-ratio-spacer-board">
      <div
        className="fixed-aspect-ratio-spacer-board__preview"
        style={
          {
            '--fixed-aspect-ratio-spacer-width': FIXED_ASPECT_RATIO_SPACER_WIDTH_PX,
            '--fixed-aspect-ratio-spacer-height': FIXED_ASPECT_RATIO_SPACER_HEIGHT_PX,
          } as CSSProperties
        }
      >
        <img
          className="fixed-aspect-ratio-spacer-board__fill"
          src={imageContainerSampleUrl}
          alt=""
        />
        <FixedAspectRatioSpacer className="fixed-aspect-ratio-spacer-board__spacer" />
      </div>
    </div>
  );
}

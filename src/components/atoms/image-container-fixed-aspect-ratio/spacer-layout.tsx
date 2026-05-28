import { FixedAspectRatioSpacer } from '../fixed-aspect-ratio-spacer/FixedAspectRatioSpacer';
import type { ImageContainerFixedAspectRatioToken } from './types';
import type { ImageContainerOrientation } from '../image-container/types';

function SpacerRow({ count }: { count: number }) {
  return (
    <div className="image-container-fixed-aspect-ratio__spacer-row">
      {Array.from({ length: count }, (_, index) => (
        <FixedAspectRatioSpacer key={index} className="image-container-fixed-aspect-ratio__spacer-cell" />
      ))}
    </div>
  );
}

/**
 * Figma stacks `2:1 Fixed Aspect Ratio Spacer` instances to size the frame.
 * 1:1 uses two vertical spacers; wider ratios use repeated 4:1 / 16:1 rows (landscape)
 * or columns (portrait) per component set 246:4103.
 */
export function FixedAspectRatioSpacerLayout({
  aspectRatio,
  orientation,
}: {
  aspectRatio: ImageContainerFixedAspectRatioToken;
  orientation: ImageContainerOrientation;
}) {
  if (aspectRatio === '1:1') {
    return (
      <>
        <FixedAspectRatioSpacer className="image-container-fixed-aspect-ratio__spacer-stack-item" />
        <FixedAspectRatioSpacer className="image-container-fixed-aspect-ratio__spacer-stack-item" />
      </>
    );
  }

  if (aspectRatio === '4:3 | 3:4' && orientation === 'landscape') {
    return (
      <>
        <SpacerRow count={2} />
        <SpacerRow count={2} />
        <SpacerRow count={2} />
      </>
    );
  }

  if (aspectRatio === '5:4 | 4:5' && orientation === 'landscape') {
    return (
      <>
        <SpacerRow count={2} />
        <SpacerRow count={2} />
        <SpacerRow count={2} />
        <SpacerRow count={2} />
      </>
    );
  }

  if (aspectRatio === '16:9 | 9:16' && orientation === 'landscape') {
    return (
      <>
        <SpacerRow count={8} />
        <SpacerRow count={8} />
      </>
    );
  }

  if (aspectRatio === '4:3 | 3:4' && orientation === 'portrait') {
    return (
      <div className="image-container-fixed-aspect-ratio__spacer-columns">
        {Array.from({ length: 4 }, (_, column) => (
          <div key={column} className="image-container-fixed-aspect-ratio__spacer-column">
            <FixedAspectRatioSpacer className="image-container-fixed-aspect-ratio__spacer-stack-item" />
            <FixedAspectRatioSpacer className="image-container-fixed-aspect-ratio__spacer-stack-item" />
            <FixedAspectRatioSpacer className="image-container-fixed-aspect-ratio__spacer-stack-item" />
          </div>
        ))}
      </div>
    );
  }

  if (aspectRatio === '5:4 | 4:5' && orientation === 'portrait') {
    return (
      <div className="image-container-fixed-aspect-ratio__spacer-columns">
        {Array.from({ length: 5 }, (_, column) => (
          <div key={column} className="image-container-fixed-aspect-ratio__spacer-column">
            <FixedAspectRatioSpacer className="image-container-fixed-aspect-ratio__spacer-stack-item" />
            <FixedAspectRatioSpacer className="image-container-fixed-aspect-ratio__spacer-stack-item" />
            <FixedAspectRatioSpacer className="image-container-fixed-aspect-ratio__spacer-stack-item" />
            <FixedAspectRatioSpacer className="image-container-fixed-aspect-ratio__spacer-stack-item" />
          </div>
        ))}
      </div>
    );
  }

  if (aspectRatio === '16:9 | 9:16' && orientation === 'portrait') {
    return (
      <div className="image-container-fixed-aspect-ratio__spacer-columns">
        {Array.from({ length: 9 }, (_, column) => (
          <div key={column} className="image-container-fixed-aspect-ratio__spacer-column">
            <FixedAspectRatioSpacer className="image-container-fixed-aspect-ratio__spacer-stack-item" />
            <FixedAspectRatioSpacer className="image-container-fixed-aspect-ratio__spacer-stack-item" />
          </div>
        ))}
      </div>
    );
  }

  return null;
}

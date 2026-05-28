import type { CSSProperties, HTMLAttributes, ImgHTMLAttributes } from 'react';
import imageContainerSampleUrl from '../../../assets/image-container/image-container-sample.png';
import type { ImageContainerOrientation } from '../image-container/types';
import { FixedAspectRatioSpacerLayout } from './spacer-layout';
import {
  IMAGE_CONTAINER_FIXED_ASPECT_RATIO_WIDTH_PX,
  imageContainerFixedAspectRatioToCss,
  type ImageContainerFixedAspectRatioToken,
} from './types';
import './image-container-fixed-aspect-ratio.css';

export interface ImageContainerFixedAspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  aspectRatio?: ImageContainerFixedAspectRatioToken;
  orientation?: ImageContainerOrientation;
  src?: string;
  alt?: string;
  imgProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>;
  className?: string;
}

export function ImageContainerFixedAspectRatio({
  aspectRatio = '1:1',
  orientation = 'landscape',
  src = imageContainerSampleUrl,
  alt = '',
  imgProps,
  className,
  style,
  ...props
}: ImageContainerFixedAspectRatioProps) {
  const rootClasses = [
    'image-container-fixed-aspect-ratio',
    `image-container-fixed-aspect-ratio--${orientation}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const rootStyle = {
    '--image-container-fixed-aspect-ratio-width': IMAGE_CONTAINER_FIXED_ASPECT_RATIO_WIDTH_PX,
    '--image-container-fixed-aspect-ratio-ratio': imageContainerFixedAspectRatioToCss(
      aspectRatio,
      orientation,
    ),
    ...style,
  } as CSSProperties;

  return (
    <div className={rootClasses} style={rootStyle} {...props}>
      <div className="image-container-fixed-aspect-ratio__layout" aria-hidden>
        <FixedAspectRatioSpacerLayout aspectRatio={aspectRatio} orientation={orientation} />
      </div>
      <img className="image-container-fixed-aspect-ratio__fill" src={src} alt={alt} {...imgProps} />
      {orientation === 'landscape' ? (
        <>
          <span
            className="image-container-fixed-aspect-ratio__guide image-container-fixed-aspect-ratio__guide--left"
            aria-hidden
          />
          <span
            className="image-container-fixed-aspect-ratio__guide image-container-fixed-aspect-ratio__guide--right"
            aria-hidden
          />
        </>
      ) : (
        <>
          <span
            className="image-container-fixed-aspect-ratio__guide image-container-fixed-aspect-ratio__guide--top"
            aria-hidden
          />
          <span
            className="image-container-fixed-aspect-ratio__guide image-container-fixed-aspect-ratio__guide--bottom"
            aria-hidden
          />
        </>
      )}
    </div>
  );
}

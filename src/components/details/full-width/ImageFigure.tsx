import type { HTMLAttributes } from 'react';
import { ImageContainerFixedAspectRatio } from '../../atoms/image-container-fixed-aspect-ratio/ImageContainerFixedAspectRatio';
import type {
  ImageContainerFixedAspectRatioToken,
} from '../../atoms/image-container-fixed-aspect-ratio/types';
import type { ImageContainerOrientation } from '../../atoms/image-container/types';
import { TextCore } from '../../atoms/text-core/TextCore';
import './full-width-blocks.css';

export interface ImageFigureProps extends HTMLAttributes<HTMLDivElement> {
  aspectRatio?: ImageContainerFixedAspectRatioToken;
  orientation?: ImageContainerOrientation;
  caption?: string;
  copyright?: string;
  src?: string;
  alt?: string;
}

/** Shared figure (image + caption + copyright) used by image-double / image-triple. */
export function ImageFigure({
  aspectRatio = '4:3 | 3:4',
  orientation = 'landscape',
  caption = 'Caption',
  copyright = 'Copyright',
  src,
  alt = '',
  className,
  ...props
}: ImageFigureProps) {
  const classes = ['image-figure', className].filter(Boolean).join(' ');

  return (
    <div className={classes} data-name="image" {...props}>
      <ImageContainerFixedAspectRatio
        aspectRatio={aspectRatio}
        orientation={orientation}
        src={src}
        alt={alt}
      />
      <div className="image-figure__caption-copy">
        <TextCore typography="bodyXS" fontWeight="medium" text={caption} />
        <TextCore typography="bodyXS" fontWeight="regular" text={copyright} />
      </div>
    </div>
  );
}

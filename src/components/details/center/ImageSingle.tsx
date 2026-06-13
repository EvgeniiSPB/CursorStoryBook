import type { HTMLAttributes } from 'react';
import { ImageContainerFixedAspectRatio } from '../../atoms/image-container-fixed-aspect-ratio/ImageContainerFixedAspectRatio';
import { TextCore } from '../../atoms/text-core/TextCore';
import './center-blocks.css';

export interface ImageSingleProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  caption?: string;
  copyright?: string;
}

/** Figma `image - single` (4298:3227) — fixed 5:4|4:5 portrait image + caption + copyright. */
export function ImageSingle({
  src,
  alt = '',
  caption = 'Caption',
  copyright = 'Copyright',
  className,
  ...props
}: ImageSingleProps) {
  const classes = ['details-center-block', 'image-single', className].filter(Boolean).join(' ');

  return (
    <div className={classes} data-name="image - single" {...props}>
      <ImageContainerFixedAspectRatio
        aspectRatio="5:4 | 4:5"
        orientation="portrait"
        src={src}
        alt={alt}
        className="image-single__image"
      />
      <div className="image-single__caption-copy">
        <TextCore typography="bodyXS" fontWeight="medium" text={caption} />
        <TextCore typography="bodyXS" fontWeight="regular" text={copyright} />
      </div>
    </div>
  );
}

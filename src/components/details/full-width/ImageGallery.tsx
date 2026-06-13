import type { HTMLAttributes } from 'react';
import { ImageContainerFixedAspectRatio } from '../../atoms/image-container-fixed-aspect-ratio/ImageContainerFixedAspectRatio';
import { TextCore } from '../../atoms/text-core/TextCore';
import './full-width-blocks.css';

export interface ImageGalleryProps extends HTMLAttributes<HTMLDivElement> {
  counter?: string;
  caption?: string;
  copyright?: string;
}

/**
 * Figma `image - gallery` (4301:4017) — three 752px columns centered and clipped:
 * landscape side, center portrait with counter/caption, square side.
 */
export function ImageGallery({
  counter = '12 (18)',
  caption = 'Caption',
  copyright = 'Copyright',
  className,
  ...props
}: ImageGalleryProps) {
  const classes = ['details-full-block', 'image-gallery', className].filter(Boolean).join(' ');

  return (
    <div className={classes} data-name="image - gallery" {...props}>
      <ImageContainerFixedAspectRatio
        aspectRatio="4:3 | 3:4"
        orientation="landscape"
        className="image-gallery__side"
      />
      <div className="image-gallery__center" data-name="image">
        <ImageContainerFixedAspectRatio aspectRatio="5:4 | 4:5" orientation="portrait" />
        <div className="image-gallery__cap-row" data-name="counter + caption + copy">
          <div className="image-gallery__counter" data-name="counter">
            <TextCore typography="special" text={counter} />
          </div>
          <div className="image-gallery__cap">
            <TextCore typography="bodyXS" fontWeight="medium" text={caption} />
            <TextCore typography="bodyXS" fontWeight="regular" text={copyright} />
          </div>
        </div>
      </div>
      <ImageContainerFixedAspectRatio
        aspectRatio="1:1"
        orientation="landscape"
        className="image-gallery__side"
      />
    </div>
  );
}

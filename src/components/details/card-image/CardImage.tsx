import type { HTMLAttributes } from 'react';
import { ImageContainerFixedAspectRatio } from '../../atoms/image-container-fixed-aspect-ratio/ImageContainerFixedAspectRatio';
import type { ImageContainerFixedAspectRatioToken } from '../../atoms/image-container-fixed-aspect-ratio/types';
import type { ImageContainerOrientation } from '../../atoms/image-container/types';
import { CARD_IMAGE_FIGMA_NODE_IDS } from './constants';
import './card-image.css';

export type CardImageVariant = '1:1' | '4:3' | '4:5';

export const CARD_IMAGE_VARIANTS: readonly CardImageVariant[] = ['1:1', '4:3', '4:5'];

const VARIANT_CONFIG: Record<
  CardImageVariant,
  { aspectRatio: ImageContainerFixedAspectRatioToken; orientation: ImageContainerOrientation }
> = {
  '1:1': { aspectRatio: '1:1', orientation: 'landscape' },
  '4:3': { aspectRatio: '4:3 | 3:4', orientation: 'landscape' },
  '4:5': { aspectRatio: '5:4 | 4:5', orientation: 'portrait' },
};

export interface CardImageProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardImageVariant;
  src?: string;
  alt?: string;
}

/** Figma `cardImage - *` — fixed-width image block for card layouts. */
export function CardImage({
  variant = '1:1',
  src,
  alt = '',
  className,
  ...props
}: CardImageProps) {
  const { aspectRatio, orientation } = VARIANT_CONFIG[variant];
  const classes = ['card-image', `card-image--${variant.replace(':', '-')}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classes}
      data-name={`cardImage - ${variant}`}
      data-node-id={CARD_IMAGE_FIGMA_NODE_IDS[variant]}
      {...props}
    >
      <ImageContainerFixedAspectRatio
        aspectRatio={aspectRatio}
        orientation={orientation}
        src={src}
        alt={alt}
        className="card-image__media"
      />
    </div>
  );
}

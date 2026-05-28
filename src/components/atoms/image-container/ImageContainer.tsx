import type { CSSProperties, HTMLAttributes, ImgHTMLAttributes } from 'react';
import imageContainerSampleUrl from '../../../assets/image-container/image-container-sample.png';
import {
  IMAGE_CONTAINER_SIZE_PX,
  imageContainerOrientationToFigmaFlags,
  type ImageContainerOrientation,
} from './types';
import './image-container.css';

export interface ImageContainerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: ImageContainerOrientation;
  /** Figma `portrait` / `landscape` booleans — prefer `orientation` unless mirroring Figma API. */
  portrait?: boolean;
  landscape?: boolean;
  src?: string;
  alt?: string;
  imgProps?: Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>;
  className?: string;
}

function resolveOrientation(
  orientation: ImageContainerOrientation | undefined,
  portrait: boolean | undefined,
  landscape: boolean | undefined,
): ImageContainerOrientation {
  if (orientation) return orientation;
  if (portrait && !landscape) return 'portrait';
  if (landscape && !portrait) return 'landscape';
  return 'landscape';
}

export function ImageContainer({
  orientation: orientationProp,
  portrait,
  landscape,
  src = imageContainerSampleUrl,
  alt = '',
  imgProps,
  className,
  style,
  ...props
}: ImageContainerProps) {
  const orientation = resolveOrientation(orientationProp, portrait, landscape);
  const flags = imageContainerOrientationToFigmaFlags(orientation);

  const rootClasses = [
    'image-container',
    `image-container--${orientation}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const rootStyle = {
    '--image-container-size': IMAGE_CONTAINER_SIZE_PX,
    ...style,
  } as CSSProperties;

  return (
    <div
      className={rootClasses}
      style={rootStyle}
      data-portrait={flags.portrait}
      data-landscape={flags.landscape}
      {...props}
    >
      <img className="image-container__fill" src={src} alt={alt} {...imgProps} />
      {orientation === 'landscape' ? (
        <>
          <span className="image-container__guide image-container__guide--left" aria-hidden />
          <span className="image-container__guide image-container__guide--right" aria-hidden />
        </>
      ) : (
        <>
          <span className="image-container__guide image-container__guide--top" aria-hidden />
          <span className="image-container__guide image-container__guide--bottom" aria-hidden />
        </>
      )}
    </div>
  );
}

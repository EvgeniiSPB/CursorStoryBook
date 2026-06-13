import type { HTMLAttributes } from 'react';
import { ImageFigure } from './ImageFigure';
import './full-width-blocks.css';

export type ImageDoubleProps = HTMLAttributes<HTMLDivElement>;

/** Figma `image - double` (4299:3405) — two equal figures (portrait + landscape). */
export function ImageDouble({ className, ...props }: ImageDoubleProps) {
  const classes = ['details-full-block', 'image-double', className].filter(Boolean).join(' ');

  return (
    <div className={classes} data-name="image - double" {...props}>
      <ImageFigure aspectRatio="5:4 | 4:5" orientation="portrait" />
      <ImageFigure aspectRatio="4:3 | 3:4" orientation="landscape" />
    </div>
  );
}

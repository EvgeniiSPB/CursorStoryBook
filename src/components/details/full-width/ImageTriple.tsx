import type { HTMLAttributes } from 'react';
import { ImageFigure } from './ImageFigure';
import './full-width-blocks.css';

export type ImageTripleProps = HTMLAttributes<HTMLDivElement>;

/** Figma `image - triple` (4299:3548) — three equal figures (portrait, portrait, landscape). */
export function ImageTriple({ className, ...props }: ImageTripleProps) {
  const classes = ['details-full-block', 'image-triple', className].filter(Boolean).join(' ');

  return (
    <div className={classes} data-name="image - triple" {...props}>
      <ImageFigure aspectRatio="5:4 | 4:5" orientation="portrait" />
      <ImageFigure aspectRatio="5:4 | 4:5" orientation="portrait" />
      <ImageFigure aspectRatio="4:3 | 3:4" orientation="landscape" />
    </div>
  );
}

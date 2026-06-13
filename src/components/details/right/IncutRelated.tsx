import type { HTMLAttributes } from 'react';
import { ImageContainerFixedAspectRatio } from '../../atoms/image-container-fixed-aspect-ratio/ImageContainerFixedAspectRatio';
import { TextCore } from '../../atoms/text-core/TextCore';
import { TextHeadline } from '../../atoms/text-headline/TextHeadline';
import { DividerHorizontal } from '../../atoms/divider-horizontal/DividerHorizontal';
import './right-blocks.css';

export interface IncutRelatedProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  headline?: string;
  author?: string;
  src?: string;
  alt?: string;
}

/** Figma `incut - related` (4286:5402) — "read also" card: title + divider + image + headline + author. */
export function IncutRelated({
  title = 'Читайте также',
  headline = 'Headline',
  author = 'Author',
  src,
  alt = '',
  className,
  ...props
}: IncutRelatedProps) {
  const classes = ['incut', 'incut--related', className].filter(Boolean).join(' ');

  return (
    <div className={classes} data-name="incut - related" {...props}>
      <div className="incut__inner">
        <div className="incut-related__title">
          <TextCore typography="bodyM" fontWeight="regular" text={title} />
          <DividerHorizontal />
        </div>
        <div className="incut-related__content">
          <ImageContainerFixedAspectRatio
            aspectRatio="4:3 | 3:4"
            orientation="landscape"
            src={src}
            alt={alt}
          />
          <TextHeadline typography="headlineXS" fontWeight="medium" text={headline} />
          <TextCore typography="bodyXS" fontWeight="regular" text={author} />
        </div>
      </div>
    </div>
  );
}

import type { HTMLAttributes } from 'react';
import { ImageContainerFixedAspectRatio } from '../../atoms/image-container-fixed-aspect-ratio/ImageContainerFixedAspectRatio';
import { TextCore } from '../../atoms/text-core/TextCore';
import './right-blocks.css';

export interface IncutOpinionProps extends HTMLAttributes<HTMLDivElement> {
  author?: string;
  text?: string;
  src?: string;
  alt?: string;
}

/** Figma `incut - opinion` (4288:5725) — rounded portrait + author name + quote text. */
export function IncutOpinion({
  author = 'Author',
  text = 'Благодаря креативной экономике у множества молодых людей появился шанс отказаться от традиционного карьерного пути и монетизировать свои таланты с помощью соцсетей.',
  src,
  alt = '',
  className,
  ...props
}: IncutOpinionProps) {
  const classes = ['incut', 'incut--opinion', className].filter(Boolean).join(' ');

  return (
    <div className={classes} data-name="incut - opinion" {...props}>
      <div className="incut__inner">
        <ImageContainerFixedAspectRatio
          aspectRatio="5:4 | 4:5"
          orientation="portrait"
          src={src}
          alt={alt}
          className="incut-opinion__avatar"
        />
        <TextCore typography="bodyM" fontWeight="medium" text={author} />
        <TextCore typography="bodyS" fontWeight="regular" text={text} />
      </div>
    </div>
  );
}

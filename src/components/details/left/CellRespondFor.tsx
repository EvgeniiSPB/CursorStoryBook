import type { HTMLAttributes } from 'react';
import { ImageContainerFixedAspectRatio } from '../../atoms/image-container-fixed-aspect-ratio/ImageContainerFixedAspectRatio';
import { TextCore } from '../../atoms/text-core/TextCore';
import './left-blocks.css';

export interface CellRespondForProps extends HTMLAttributes<HTMLDivElement> {
  /** Secondary role label (Figma `Отвечает`). */
  label?: string;
  /** Primary name (Figma `Value`). */
  name?: string;
  src?: string;
  alt?: string;
}

/**
 * Figma `cell - responfFor` (4298:3228) — left column: rounded portrait avatar
 * + role label + name. (Figma layer name keeps the original `responfFor` typo.)
 */
export function CellRespondFor({
  label = 'Отвечает',
  name = 'Value',
  src,
  alt = '',
  className,
  ...props
}: CellRespondForProps) {
  const classes = ['details-left-block', 'cell-respond-for', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} data-name="cell - responfFor" {...props}>
      <ImageContainerFixedAspectRatio
        aspectRatio="5:4 | 4:5"
        orientation="portrait"
        src={src}
        alt={alt}
        className="cell-respond-for__avatar"
      />
      <div className="cell-respond-for__text">
        <TextCore
          typography="bodyXS"
          fontWeight="regular"
          text={label}
          className="cell-respond-for__role"
        />
        <TextCore typography="bodyM" fontWeight="regular" text={name} />
      </div>
    </div>
  );
}

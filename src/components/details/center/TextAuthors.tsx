import type { HTMLAttributes } from 'react';
import { TextCore } from '../../atoms/text-core/TextCore';
import { DividerHorizontal } from '../../atoms/divider-horizontal/DividerHorizontal';
import './center-blocks.css';

export interface TextAuthorsAuthor {
  /** Bold name part (Oceanic Text Medium). */
  name: string;
  /** Trailing description (Oceanic Grotesk regular); include leading space if needed. */
  description: string;
}

export interface TextAuthorsProps extends HTMLAttributes<HTMLDivElement> {
  heading?: string;
  authors?: TextAuthorsAuthor[];
}

const DEFAULT_AUTHORS: TextAuthorsAuthor[] = [
  {
    name: 'Керри Морведж',
    description:
      ' (Carey K. Morewedge) — профессор маркетинга и почетный научный сотрудник Бостонского университета.',
  },
  { name: 'Author', description: ' (full name) — description.' },
  { name: 'Author', description: ' (full name) — description.' },
];

/** Figma `text - authors` (4280:4643) — heading + divider + list of author lines. */
export function TextAuthors({
  heading = 'Авторы',
  authors = DEFAULT_AUTHORS,
  className,
  ...props
}: TextAuthorsProps) {
  const classes = ['details-center-block', 'text-authors', className].filter(Boolean).join(' ');

  return (
    <div className={classes} data-name="text - authors" {...props}>
      <div className="text-authors__header">
        <TextCore
          typography="bodyM"
          fontWeight="regular"
          text={heading}
          className="text-authors__heading"
        />
        <DividerHorizontal className="text-authors__divider" />
      </div>
      <div className="text-authors__ul">
        {authors.map((author, index) => (
          <p className="text-authors__line" key={index}>
            <span className="text-authors__name">{author.name}</span>
            <span>{author.description}</span>
          </p>
        ))}
      </div>
    </div>
  );
}

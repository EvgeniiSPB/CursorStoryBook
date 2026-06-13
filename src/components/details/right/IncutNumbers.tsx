import type { HTMLAttributes } from 'react';
import { TextCore } from '../../atoms/text-core/TextCore';
import { TextDisplay } from '../../atoms/text-display/TextDisplay';
import './right-blocks.css';

export interface IncutNumbersProps extends HTMLAttributes<HTMLDivElement> {
  /** Large display figure (Figma `0000`). */
  value?: string;
  text?: string;
}

/** Figma `incut - numbers` (4288:5578) — big displayM figure + supporting bodyS text. */
export function IncutNumbers({
  value = '0000',
  text = 'Благодаря креативной экономике у множества молодых людей появился шанс отказаться от традиционного карьерного пути и монетизировать свои таланты с помощью соцсетей.',
  className,
  ...props
}: IncutNumbersProps) {
  const classes = ['incut', 'incut--numbers', className].filter(Boolean).join(' ');

  return (
    <div className={classes} data-name="incut - numbers" {...props}>
      <div className="incut__inner">
        <TextDisplay typography="displayM" fontWeight="medium" text={value} />
        <TextCore typography="bodyS" fontWeight="regular" text={text} />
      </div>
    </div>
  );
}

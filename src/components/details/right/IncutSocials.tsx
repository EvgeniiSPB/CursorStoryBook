import type { HTMLAttributes } from 'react';
import { TextCore } from '../../atoms/text-core/TextCore';
import { ButtonSocial } from '../../buttons/button-social/ButtonSocial';
import './right-blocks.css';

export interface IncutSocialsProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  /** Social button labels (Figma defaults: tg, vk, X). */
  socials?: string[];
}

/** Figma `incut - socials` (4288:7590) — "share" label + row of social buttons. */
export function IncutSocials({
  label = 'Поделиться:',
  socials = ['tg', 'vk', 'X'],
  className,
  ...props
}: IncutSocialsProps) {
  const classes = ['incut', 'incut--socials', className].filter(Boolean).join(' ');

  return (
    <div className={classes} data-name="incut - socials" {...props}>
      <div className="incut__inner">
        <TextCore
          typography="bodyXS"
          fontWeight="regular"
          text={label}
          className="incut-socials__label"
        />
        <div className="incut-socials__buttons">
          {socials.map((social, index) => (
            <ButtonSocial key={index}>{social}</ButtonSocial>
          ))}
        </div>
      </div>
    </div>
  );
}

import type { HTMLAttributes } from 'react';
import { TextHeadline } from '../../../atoms/text-headline/TextHeadline';
import { DividerHorizontal } from '../../../atoms/divider-horizontal/DividerHorizontal';
import { ButtonTextOnly } from '../../../buttons/button-text-only/ButtonTextOnly';
import {
  SECTION_HEADLINE_DEFAULT_BUTTON_TEXT,
  SECTION_HEADLINE_DEFAULT_HEADLINE_TEXT,
  SECTION_HEADLINE_FIGMA_NODE_ID,
} from './types';
import './section-headline.css';

export interface SectionHeadlineProps extends HTMLAttributes<HTMLDivElement> {
  tPadding?: boolean;
  button?: boolean;
  headlineText?: string;
  buttonText?: string;
}

/**
 * Figma `section - headline` (6027:2649) — layout headline row with optional
 * outlined button and full-width divider below.
 */
export function SectionHeadline({
  tPadding = true,
  button = true,
  headlineText = SECTION_HEADLINE_DEFAULT_HEADLINE_TEXT,
  buttonText = SECTION_HEADLINE_DEFAULT_BUTTON_TEXT,
  className,
  ...props
}: SectionHeadlineProps) {
  const classes = [
    'section-headline',
    tPadding ? 'section-headline--t-padding' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={classes}
      data-name="section - headline"
      data-figma-node={SECTION_HEADLINE_FIGMA_NODE_ID}
      data-t-padding={tPadding}
      {...props}
    >
      <div className="section-headline__row">
        <div className="section-headline__headline">
          <TextHeadline typography="headlineXL" fontWeight="regular" text={headlineText} />
        </div>
        {button ? (
          <ButtonTextOnly
            type="primary"
            size="medium"
            fillHug
            className="section-headline__button"
          >
            {buttonText}
          </ButtonTextOnly>
        ) : null}
      </div>
      <DividerHorizontal type="thin" className="section-headline__divider" />
    </div>
  );
}

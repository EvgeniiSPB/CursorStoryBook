import type { HTMLAttributes } from 'react';
import { TextCore } from '../../atoms/text-core/TextCore';
import { Logo } from '../logo/Logo';
import {
  FOOTER_BOTTOM_FIGMA_NODE_ID,
  FOOTER_CONTACT_LINKS,
  FOOTER_CONTENT_FIGMA_NODE_ID,
  FOOTER_COPYRIGHT,
  FOOTER_CREDIT,
  FOOTER_FIGMA_NODE_ID,
  FOOTER_JOURNAL_LINKS,
  FOOTER_PANEL_FIGMA_NODE_ID,
  FOOTER_PRIMARY_LINKS,
  FOOTER_PRIVACY,
  FOOTER_SOCIAL_LINKS,
} from './types';
import './footer.css';

export interface FooterProps extends HTMLAttributes<HTMLElement> {}

function FooterLinkList({ items }: { items: readonly string[] }) {
  return (
    <>
      {items.map((item) => (
        <TextCore key={item} typography="bodyM" fontWeight="regular" text={item} className="footer__link" />
      ))}
    </>
  );
}

function FooterColumn({
  heading,
  items,
}: {
  heading: string;
  items: readonly string[];
}) {
  return (
    <div className="footer__col">
      <TextCore typography="bodyXS" fontWeight="regular" text={heading} className="footer__heading" />
      <div className="footer__links">
        <FooterLinkList items={items} />
      </div>
    </div>
  );
}

/** Figma `footer` (6106:3092) — dark panel, logo, nav columns, legal row. */
export function Footer({ className, ...props }: FooterProps) {
  const classes = ['footer', className].filter(Boolean).join(' ');

  return (
    <footer className={classes} data-name="footer" data-figma-node={FOOTER_FIGMA_NODE_ID} {...props}>
      <div className="footer__panel" data-figma-node={FOOTER_PANEL_FIGMA_NODE_ID}>
        <Logo layout="footer" tone="constantInverted" className="footer__logo" />
        <div className="footer__content" data-figma-node={FOOTER_CONTENT_FIGMA_NODE_ID}>
          <div className="footer__grid">
            <div className="footer__col footer__col--primary" data-figma-node="6106:2847">
              <FooterLinkList items={FOOTER_PRIMARY_LINKS} />
            </div>
            <FooterColumn heading="Журнал" items={FOOTER_JOURNAL_LINKS} />
            <FooterColumn heading="Мы в соцсетях" items={FOOTER_SOCIAL_LINKS} />
            <FooterColumn heading="Связь с редакцией" items={FOOTER_CONTACT_LINKS} />

            <div className="footer__bottom" data-figma-node={FOOTER_BOTTOM_FIGMA_NODE_ID}>
              <div className="footer__bottom-copy" data-figma-node="6106:3079">
                <TextCore
                  typography="bodyXS"
                  fontWeight="regular"
                  text={FOOTER_COPYRIGHT}
                  className="footer__link"
                />
              </div>
              <div className="footer__bottom-privacy" data-figma-node="6106:3086">
                <TextCore
                  typography="bodyXS"
                  fontWeight="regular"
                  text={FOOTER_PRIVACY}
                  className="footer__link"
                />
              </div>
              <div className="footer__bottom-credit" data-figma-node="6106:3089">
                <TextCore
                  typography="bodyXS"
                  fontWeight="regular"
                  text={FOOTER_CREDIT}
                  className="footer__link footer__link--right"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import type { HTMLAttributes } from 'react';
import { ButtonSocial } from '../../../buttons/button-social/ButtonSocial';
import { DividerHorizontal } from '../../../atoms/divider-horizontal/DividerHorizontal';
import { TextCore } from '../../../atoms/text-core/TextCore';
import { TextDisplay } from '../../../atoms/text-display/TextDisplay';
import { TOKEN_DEFAULT_FONT_MODE_SLUG } from '../../../../tokens/font-mode-options';
import { Tag } from '../../../Tags/Tag';
import {
  TITLE_GROUP_DEFAULT_AUTHOR,
  TITLE_GROUP_DEFAULT_DATE,
  TITLE_GROUP_DEFAULT_DISPLAY,
  TITLE_GROUP_DEFAULT_SHARE_LABEL,
  TITLE_GROUP_DEFAULT_SUBHEAD,
  TITLE_GROUP_DEFAULT_TAG_1,
  TITLE_GROUP_DEFAULT_TAG_2,
} from './types';

export type TitleGroupNewsTopProps = HTMLAttributes<HTMLDivElement> & {
  displayText?: string;
  subheadText?: string;
  shareLabel?: string;
};

export function TitleGroupNewsTop({
  displayText = TITLE_GROUP_DEFAULT_DISPLAY,
  subheadText = TITLE_GROUP_DEFAULT_SUBHEAD,
  shareLabel = TITLE_GROUP_DEFAULT_SHARE_LABEL,
  className,
  ...props
}: TitleGroupNewsTopProps) {
  const classes = ['title-group-news__top', className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      <TextDisplay
        typography="displayL"
        fontWeight="medium"
        text={displayText}
        className="title-group-news__display"
      />
      <div className="title-group-news__subhead-row">
        <div className="title-group-news__subhead-spacer" aria-hidden />
        <div
          className="title-group-news__subhead"
          data-font-mode={TOKEN_DEFAULT_FONT_MODE_SLUG}
        >
          <TextCore typography="bodyXL" fontWeight="regular" text={subheadText} />
        </div>
        <div className="title-group-news__socials">
          <TextCore
            typography="bodyXS"
            fontWeight="regular"
            text={shareLabel}
            className="title-group-news__share-label"
          />
          <div className="title-group-news__social-buttons">
            <ButtonSocial type="tertiary">tg</ButtonSocial>
            <ButtonSocial type="tertiary">vk</ButtonSocial>
            <ButtonSocial type="tertiary">X</ButtonSocial>
          </div>
        </div>
      </div>
    </div>
  );
}

export type TitleGroupNewsMetaProps = HTMLAttributes<HTMLDivElement> & {
  tag1?: string;
  tag2?: string;
  author?: string;
  date?: string;
};

export function TitleGroupNewsMeta({
  tag1 = TITLE_GROUP_DEFAULT_TAG_1,
  tag2 = TITLE_GROUP_DEFAULT_TAG_2,
  author = TITLE_GROUP_DEFAULT_AUTHOR,
  date = TITLE_GROUP_DEFAULT_DATE,
  className,
  ...props
}: TitleGroupNewsMetaProps) {
  const classes = ['title-group-news__meta', className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      <DividerHorizontal type="thin" className="title-group-news__divider" />
      <div className="title-group-news__meta-grid">
        <div className="title-group-news__tags">
          <Tag variant="brand" topic="1stLvl">
            {tag1}
          </Tag>
          <Tag variant="brand" topic="2ndLvl">
            {tag2}
          </Tag>
        </div>
        <div className="title-group-news__authors">
          <TextCore typography="bodyM" fontWeight="regular" text={author} />
          <TextCore typography="bodyM" fontWeight="regular" text={author} />
          <TextCore typography="bodyM" fontWeight="regular" text={author} />
          <TextCore typography="bodyM" fontWeight="regular" text={date} />
        </div>
      </div>
    </div>
  );
}

import type { CSSProperties, HTMLAttributes } from 'react';
import { TextCore } from '../../../atoms/text-core/TextCore';
import { TextHeadline } from '../../../atoms/text-headline/TextHeadline';
import { DividerHorizontal } from '../../../atoms/divider-horizontal/DividerHorizontal';
import { ImageContainerFixedAspectRatio } from '../../../atoms/image-container-fixed-aspect-ratio/ImageContainerFixedAspectRatio';
import { IncutRelated } from '../../../details/right/IncutRelated';
import type { TitleGroupNewsType } from '../shared/types';
import { TitleGroupNewsMeta, TitleGroupNewsTop } from './TitleGroupNewsParts';
import {
  TITLE_GROUP_DEFAULT_IMAGE_CAPTION,
  TITLE_GROUP_NEWS_CARDS_IMAGE_WIDTH_PX,
  TITLE_GROUP_NEWS_SUMMARY_IMAGE_WIDTH_PX,
  TITLE_GROUP_NEWS_SUMMARY_TEXT_WIDTH_PX,
  titleGroupNewsFigmaNodeId,
} from './types';
import type { TitleGroupNewsMetaProps, TitleGroupNewsTopProps } from './TitleGroupNewsParts';
import './title-groups.css';

export type TitleGroupNewsProps = HTMLAttributes<HTMLDivElement> &
  TitleGroupNewsTopProps &
  TitleGroupNewsMetaProps & {
    type?: TitleGroupNewsType;
    imageCaption?: string;
  };

const SUMMARY_ITEMS = [
  {
    title: 'Выжимка',
    label: 'Большая идея',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ',
    kind: 'text' as const,
  },
  {
    title: null,
    label: 'Цитата',
    body: '«Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation»',
    kind: 'text' as const,
  },
  {
    title: null,
    label: 'Цифра',
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ',
    kind: 'number' as const,
  },
];

function TitleGroupNewsSummary() {
  return (
    <div className="title-group-news__summary">
      <DividerHorizontal type="thin" className="title-group-news__divider" />
      <div className="title-group-news__summary-list">
        {SUMMARY_ITEMS.map((item, index) => (
          <div
            key={index}
            className={[
              'title-group-news__summary-item',
              item.title ? 'title-group-news__summary-item--lead' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            <div className="title-group-news__summary-title">
              {item.title ? (
                <>
                  <TextCore typography="bodyM" fontWeight="medium" text={item.title} />
                  <div className="title-group-news__summary-label-wrap">
                    <TextCore
                      typography="bodyXS"
                      fontWeight="regular"
                      text={item.label}
                      className="title-group-news__summary-label"
                    />
                  </div>
                </>
              ) : (
                <TextCore
                  typography="bodyXS"
                  fontWeight="regular"
                  text={item.label}
                  className="title-group-news__summary-label"
                />
              )}
            </div>
            <div className="title-group-news__summary-body">
              {item.kind === 'number' ? (
                <>
                  <TextHeadline
                    typography="headlineM"
                    fontWeight="medium"
                    text="$0000"
                    className="title-group-news__summary-number"
                  />
                  <TextCore typography="bodyM" fontWeight="regular" text={item.body} />
                </>
              ) : (
                <TextCore typography="bodyM" fontWeight="regular" text={item.body} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TitleGroupNewsImage({
  type,
  imageCaption = TITLE_GROUP_DEFAULT_IMAGE_CAPTION,
}: Pick<TitleGroupNewsProps, 'type' | 'imageCaption'>) {
  if (type === 'video') {
    return (
      <ImageContainerFixedAspectRatio
        aspectRatio="16:9 | 9:16"
        orientation="landscape"
        className="title-group-news__video"
        style={{ '--image-container-fixed-aspect-ratio-width': 1136 } as CSSProperties}
      />
    );
  }

  const imageWidthPx =
    type === 'cards' ? TITLE_GROUP_NEWS_CARDS_IMAGE_WIDTH_PX : TITLE_GROUP_NEWS_SUMMARY_IMAGE_WIDTH_PX;

  return (
    <div className="title-group-news__image-block">
      <ImageContainerFixedAspectRatio
        aspectRatio="5:4 | 4:5"
        orientation="portrait"
        className="title-group-news__image"
        style={{ '--image-container-fixed-aspect-ratio-width': imageWidthPx } as CSSProperties}
      />
      <TextCore typography="bodyXS" fontWeight="regular" text={imageCaption} />
    </div>
  );
}

/** Figma `titleGroup - news` (`6070:4445`, `6076:4862`, `6077:5206`). */
export function TitleGroupNews({
  type = 'summary',
  displayText,
  subheadText,
  shareLabel,
  tag1,
  tag2,
  author,
  date,
  imageCaption,
  className,
  ...props
}: TitleGroupNewsProps) {
  const classes = ['title-group', 'title-group--news', className].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      data-name="titleGroup - news"
      data-type={type}
      data-figma-node={titleGroupNewsFigmaNodeId(type)}
      style={
        {
          '--title-group-news-summary-text-width': TITLE_GROUP_NEWS_SUMMARY_TEXT_WIDTH_PX,
          '--title-group-news-summary-image-width': TITLE_GROUP_NEWS_SUMMARY_IMAGE_WIDTH_PX,
          '--title-group-news-cards-image-width': TITLE_GROUP_NEWS_CARDS_IMAGE_WIDTH_PX,
        } as CSSProperties
      }
      {...props}
    >
      <TitleGroupNewsTop displayText={displayText} subheadText={subheadText} shareLabel={shareLabel} />

      <div className="title-group-news__bottom">
        {type === 'summary' ? (
          <div className="title-group-news__text-column">
            <TitleGroupNewsMeta tag1={tag1} tag2={tag2} author={author} date={date} />
            <TitleGroupNewsSummary />
          </div>
        ) : (
          <TitleGroupNewsMeta tag1={tag1} tag2={tag2} author={author} date={date} />
        )}

        <TitleGroupNewsImage type={type} imageCaption={imageCaption} />

        {type === 'cards' ? (
          <div className="title-group-news__cards">
            <IncutRelated className="title-group-news__related" />
            <IncutRelated className="title-group-news__related" />
          </div>
        ) : null}
      </div>
    </div>
  );
}

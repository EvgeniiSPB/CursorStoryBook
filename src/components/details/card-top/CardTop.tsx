import type { HTMLAttributes } from 'react';
import { Tag, TagGroup } from '../../Tags';
import { BadgeText, BadgeDigits } from '../../Badges';
import { TextHeadline } from '../../atoms/text-headline/TextHeadline';
import { CARD_TOP_FIGMA_NODE_IDS } from './constants';
import './card-top.css';

export type CardTopVariant =
  | 'baseM2tags'
  | 'baseM1lvlTag'
  | 'baseM2lvlTag'
  | 'baseMBadge2tags'
  | 'baseMBadge1tag'
  | 'event'
  | 'baseL'
  | 'subscriptionOn'
  | 'subscriptionOff';

export const CARD_TOP_VARIANTS: readonly CardTopVariant[] = [
  'baseM2tags',
  'baseM1lvlTag',
  'baseM2lvlTag',
  'baseMBadge2tags',
  'baseMBadge1tag',
  'event',
  'baseL',
  'subscriptionOn',
  'subscriptionOff',
];

export interface CardTopProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardTopVariant;
  headline?: string;
  date?: string;
  tagLabel?: string;
  badgeLabel?: string;
}

function HeadlineL({
  text = 'Headline',
  className,
}: {
  text?: string;
  className?: string;
}) {
  return (
    <TextHeadline
      typography="headlineL"
      fontWeight="regular"
      text={text}
      className={['card-top__headline-l', 'card-top__tone-primary', className]
        .filter(Boolean)
        .join(' ')}
    />
  );
}

function HeadlineXL({
  text = 'Headline',
  className,
  inverted = false,
}: {
  text?: string;
  className?: string;
  inverted?: boolean;
}) {
  return (
    <TextHeadline
      typography="headlineXL"
      fontWeight="regular"
      text={text}
      className={[
        'card-top__headline-xl',
        inverted ? 'card-top__tone-inverted' : 'card-top__tone-primary',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  );
}

/** Figma `cardTop - *` — top blocks for card layouts. */
export function CardTop({
  variant = 'baseM2tags',
  headline = 'Headline',
  date = 'Date',
  tagLabel = 'Value',
  badgeLabel = 'Value',
  className,
  ...props
}: CardTopProps) {
  const classes = ['card-top', `card-top--${variant}`, className].filter(Boolean).join(' ');
  const figmaName = `cardTop - ${variant}`;

  let content;
  switch (variant) {
    case 'baseM2tags':
      content = (
        <>
          <TagGroup firstLabel={tagLabel} secondLabel={tagLabel} />
          <HeadlineL text={headline} />
        </>
      );
      break;
    case 'baseM1lvlTag':
      content = (
        <>
          <Tag topic="1stLvl">{tagLabel}</Tag>
          <HeadlineL text={headline} />
        </>
      );
      break;
    case 'baseM2lvlTag':
      content = (
        <>
          <Tag topic="2ndLvl">{tagLabel}</Tag>
          <HeadlineL text={headline} />
        </>
      );
      break;
    case 'baseMBadge2tags':
      content = (
        <>
          <div className="card-top__meta">
            <TagGroup
              className="card-top__meta-tags"
              firstLabel={tagLabel}
              secondLabel={tagLabel}
            />
            <BadgeText type="outlined" icon={false}>
              {badgeLabel}
            </BadgeText>
          </div>
          <HeadlineL text={headline} />
        </>
      );
      break;
    case 'baseMBadge1tag':
      content = (
        <>
          <div className="card-top__meta">
            <Tag className="card-top__meta-tags">{tagLabel}</Tag>
            <BadgeText type="outlined" icon={false}>
              {badgeLabel}
            </BadgeText>
          </div>
          <HeadlineL text={headline} />
        </>
      );
      break;
    case 'event':
      content = (
        <>
          <div className="card-top__event-row">
            <TextHeadline
              typography="headlineXL"
              fontWeight="regular"
              text={date}
              className="card-top__date card-top__tone-inverted"
            />
            <BadgeDigits type="outlinedConstantInverted" />
          </div>
          <HeadlineXL text={headline} inverted />
        </>
      );
      break;
    case 'baseL':
      content = (
        <>
          <TagGroup variant="brandConstantInverted" firstLabel={tagLabel} secondLabel={tagLabel} />
          <HeadlineXL text={headline} inverted />
        </>
      );
      break;
    case 'subscriptionOn':
      content = (
        <>
          <div className="card-top__subscription-text">
            <TextHeadline
              typography="headlineS"
              fontWeight="regular"
              text={headline}
              className="card-top__subscription-headline card-top__tone-inverted"
            />
            <TextHeadline
              typography="headlineS"
              fontWeight="regular"
              text={headline}
              className="card-top__subscription-headline card-top__subscription-headline--secondary card-top__tone-inverted"
            />
          </div>
          <BadgeText type="brand" icon={false}>
            {badgeLabel}
          </BadgeText>
        </>
      );
      break;
    case 'subscriptionOff':
      content = (
        <>
          <div className="card-top__subscription-text">
            <TextHeadline
              typography="headlineS"
              fontWeight="regular"
              text={headline}
              className="card-top__subscription-headline card-top__tone-inverted"
            />
            <TextHeadline
              typography="headlineS"
              fontWeight="regular"
              text={headline}
              className="card-top__subscription-headline card-top__subscription-headline--secondary card-top__tone-inverted"
            />
          </div>
          <BadgeText type="filled" icon={false}>
            {badgeLabel}
          </BadgeText>
        </>
      );
      break;
    default:
      content = null;
  }

  return (
    <div
      className={classes}
      data-name={figmaName}
      data-node-id={CARD_TOP_FIGMA_NODE_IDS[variant]}
      {...props}
    >
      {content}
    </div>
  );
}

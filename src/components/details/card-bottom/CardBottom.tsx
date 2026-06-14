import type { HTMLAttributes } from 'react';
import { TextCore } from '../../atoms/text-core/TextCore';
import { TextHeadline } from '../../atoms/text-headline/TextHeadline';
import { ButtonTextIcon } from '../../buttons/button-text-icon';
import { ButtonIconOnly } from '../../buttons/button-icon-only';
import { TabFeatureDigit } from '../../Tabs/TabFeatureDigit';
import {
  CARD_BOTTOM_BASE_TEXT,
  CARD_BOTTOM_FIGMA_NODE_IDS,
  CARD_BOTTOM_HBR_DESCRIPTION,
  CARD_BOTTOM_MAIN_FEATURE_TEXT,
  CARD_BOTTOM_SUBSCRIPTION_TEXT,
} from './constants';
import './card-bottom.css';

export type CardBottomVariant =
  | 'basePrimary'
  | 'HBR'
  | 'mainFeature'
  | 'baseConstantInverted'
  | 'button'
  | 'subscriptionOn'
  | 'subscriptionNonActiveoff';

export const CARD_BOTTOM_VARIANTS: readonly CardBottomVariant[] = [
  'basePrimary',
  'HBR',
  'mainFeature',
  'baseConstantInverted',
  'button',
  'subscriptionOn',
  'subscriptionNonActiveoff',
];

/** Preferred swap instances for card `bottomSection` `cell 1`. */
export const CARD_BOTTOM_SWAP_VARIANTS: readonly CardBottomVariant[] = [
  'baseConstantInverted',
  'button',
];

export interface CardBottomProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardBottomVariant;
  text?: string;
  author?: string;
  date?: string;
  label?: string;
  headline?: string;
  buttonLabel?: string;
}

function AuthorsDate({
  author = 'Author',
  date = 'Date',
  className,
}: {
  author?: string;
  date?: string;
  className?: string;
}) {
  return (
    <div className={['card-bottom__authors-date', className].filter(Boolean).join(' ')}>
      <TextCore typography="bodyS" fontWeight="medium" text={author} />
      <TextCore typography="bodyS" fontWeight="regular" text={date} />
    </div>
  );
}

function BaseMeta({
  text = CARD_BOTTOM_BASE_TEXT,
  author,
  date,
  inverted = false,
}: {
  text?: string;
  author?: string;
  date?: string;
  inverted?: boolean;
}) {
  const toneClass = inverted ? 'card-bottom__tone-inverted' : 'card-bottom__tone-primary';

  return (
    <>
      <TextCore
        typography="bodyM"
        fontWeight="regular"
        text={text}
        className={['card-bottom__paragraph', toneClass].filter(Boolean).join(' ')}
      />
      <AuthorsDate author={author} date={date} className={toneClass} />
    </>
  );
}

/** Figma `cardBottom - *` — bottom blocks for card layouts. */
export function CardBottom({
  variant = 'basePrimary',
  text,
  author,
  date,
  label = 'label',
  headline = 'Headline',
  buttonLabel = 'Зарегистрироваться',
  className,
  ...props
}: CardBottomProps) {
  const classes = ['card-bottom', `card-bottom--${variant}`, className].filter(Boolean).join(' ');
  const figmaName = `cardBottom - ${variant}`;

  let content;
  switch (variant) {
    case 'basePrimary':
      content = <BaseMeta text={text ?? CARD_BOTTOM_BASE_TEXT} author={author} date={date} />;
      break;
    case 'baseConstantInverted':
      content = (
        <BaseMeta
          text={text ?? CARD_BOTTOM_BASE_TEXT}
          author={author}
          date={date}
          inverted
        />
      );
      break;
    case 'button':
      content = (
        <ButtonTextIcon type="secondaryConstantInverted" size="tiny">
          {buttonLabel}
        </ButtonTextIcon>
      );
      break;
    case 'HBR':
      content = (
        <>
          <div className="card-bottom__hbr-head">
            <TextCore typography="special" fontWeight="medium" text={label} className="card-bottom__hbr-label" />
            <TextHeadline
              typography="headlineS"
              fontWeight="regular"
              text={headline}
              className="card-bottom__hbr-headline"
            />
          </div>
          <div className="card-bottom__hbr-description">
            <TextCore
              typography="bodyXS"
              fontWeight="regular"
              text={text ?? CARD_BOTTOM_HBR_DESCRIPTION}
            />
          </div>
        </>
      );
      break;
    case 'mainFeature':
      content = (
        <>
          <div className="card-bottom__tabs">
            <TabFeatureDigit active state="active">
              1
            </TabFeatureDigit>
            <TabFeatureDigit>2</TabFeatureDigit>
            <TabFeatureDigit>3</TabFeatureDigit>
          </div>
          <div className="card-bottom__info">
            <TextCore
              typography="bodyM"
              fontWeight="regular"
              text={text ?? CARD_BOTTOM_MAIN_FEATURE_TEXT}
              className="card-bottom__paragraph card-bottom__tone-inverted"
            />
            <div className="card-bottom__info-meta">
              <TextCore
                typography="bodyS"
                fontWeight="medium"
                text={author ?? 'Author'}
                className="card-bottom__tone-inverted"
              />
              <TextCore
                typography="bodyS"
                fontWeight="regular"
                text={date ?? 'Date'}
                className="card-bottom__tone-inverted"
              />
            </div>
          </div>
        </>
      );
      break;
    case 'subscriptionOn':
      content = (
        <>
          <TextCore
            typography="bodyM"
            fontWeight="regular"
            text={text ?? CARD_BOTTOM_SUBSCRIPTION_TEXT}
            className="card-bottom__paragraph card-bottom__tone-inverted card-bottom__subscription-text"
          />
          <ButtonIconOnly
            type="secondaryBrand"
            size="small"
            icon="check"
            brandSegment={false}
            aria-label="Подписка активна"
          />
        </>
      );
      break;
    case 'subscriptionNonActiveoff':
      content = (
        <>
          <TextCore
            typography="bodyM"
            fontWeight="regular"
            text={text ?? CARD_BOTTOM_SUBSCRIPTION_TEXT}
            className="card-bottom__paragraph card-bottom__tone-inverted card-bottom__subscription-text"
          />
          <ButtonIconOnly
            type="secondary"
            size="small"
            icon="plus"
            aria-label="Добавить подписку"
          />
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
      data-node-id={CARD_BOTTOM_FIGMA_NODE_IDS[variant]}
      {...props}
    >
      {content}
    </div>
  );
}

import type { HTMLAttributes } from 'react';
import { TONNED_SEGMENT } from '../../../Badges/decorators';
import { BadgeDigits } from '../../../Badges/digits/BadgeDigits';
import { DividerHorizontal } from '../../../atoms/divider-horizontal/DividerHorizontal';
import { TextCore } from '../../../atoms/text-core/TextCore';
import { TextDisplay } from '../../../atoms/text-display/TextDisplay';
import { TOKEN_DEFAULT_FONT_MODE_SLUG } from '../../../../tokens/font-mode-options';
import { TabsGroupRow } from '../../../Tabs/TabsGroupRow';
import type { TabsGroupRowItems } from '../../../Tabs/types';
import {
  TITLE_GROUP_DEFAULT_BADGE,
  TITLE_GROUP_DEFAULT_HEADLINE,
  TITLE_GROUP_DEFAULT_SUBHEAD,
  TITLE_GROUP_TOPIC_FIGMA_NODE_ID,
} from './types';
import './title-groups.css';

export type TitleGroupTopicProps = HTMLAttributes<HTMLDivElement> & {
  headlineText?: string;
  badgeLabel?: string;
  subheadText?: string;
  tabItems?: TabsGroupRowItems;
};

/** Figma `titleGroup - topic` (6006:2128). */
export function TitleGroupTopic({
  headlineText = TITLE_GROUP_DEFAULT_HEADLINE,
  badgeLabel = TITLE_GROUP_DEFAULT_BADGE,
  subheadText = TITLE_GROUP_DEFAULT_SUBHEAD,
  tabItems = 5,
  className,
  ...props
}: TitleGroupTopicProps) {
  const classes = ['title-group', 'title-group--topic', className].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      data-name="titleGroup - topic"
      data-figma-node={TITLE_GROUP_TOPIC_FIGMA_NODE_ID}
      data-segment={TONNED_SEGMENT}
      {...props}
    >
      <div className="title-group-topic__top">
        <div className="title-group-topic__headline-row">
          <TextDisplay typography="displayL" fontWeight="regular" text={headlineText} />
          <BadgeDigits type="tonned" characters="3" data-segment={TONNED_SEGMENT}>
            {badgeLabel}
          </BadgeDigits>
        </div>
        <div className="title-group-topic__subhead" data-font-mode={TOKEN_DEFAULT_FONT_MODE_SLUG}>
          <TextCore typography="bodyXL" fontWeight="regular" text={subheadText} />
        </div>
      </div>
      <div className="title-group-topic__bottom">
        <TabsGroupRow items={tabItems} />
        <DividerHorizontal type="thin" className="title-group-topic__divider" />
      </div>
    </div>
  );
}

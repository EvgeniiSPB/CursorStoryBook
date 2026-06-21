import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { TONNED_SEGMENT } from '../../../Badges/decorators';
import { FIGMA_BODY_FONT_MODE_SLUG } from '../../../../tokens/font-mode-options';
import { layoutSwapRowWidthStyle } from '../shared/LayoutSwapRow';
import {
  LAYOUT_BOARD_PADDING_PX,
  LAYOUT_CONTENT_WIDTH_PX,
  LAYOUTS_FIGMA_FILE_KEY,
  TITLE_GROUP_NEWS_TYPES,
} from '../shared/types';
import { SWAP, layoutSlotOptions, resolveLayoutSlot } from '../shared/slot-renderers';
import '../shared/layouts-showcase.css';
import { TitleGroupNews } from './TitleGroupNews';
import { TitleGroupTopic } from './TitleGroupTopic';
import {
  TITLE_GROUP_DEFAULT_BADGE,
  TITLE_GROUP_DEFAULT_HEADLINE,
  TITLE_GROUP_DEFAULT_SUBHEAD,
  TITLE_GROUP_SLOT_LABELS,
  TITLE_GROUP_SLOT_NEWS,
  TITLE_GROUP_SLOT_TOPIC,
  TITLE_GROUP_SLOTS,
  TITLE_GROUPS_FIGMA_NODE_ID,
  titleGroupFigmaNodeId,
} from './types';
import './title-groups.css';

const showcaseCanvas: Decorator = (Story) => (
  <div
    className="layouts-showcase-canvas layouts-showcase-canvas--title-groups"
    data-font-mode={FIGMA_BODY_FONT_MODE_SLUG}
  >
    <Story />
  </div>
);

const boardStyle = {
  '--layouts-board-width': LAYOUT_CONTENT_WIDTH_PX,
  '--layouts-board-padding': LAYOUT_BOARD_PADDING_PX,
} as CSSProperties;

const figmaDesignUrl = (nodeId: string) =>
  `https://www.figma.com/design/${LAYOUTS_FIGMA_FILE_KEY}/04---templates?node-id=${nodeId.replace(':', '-')}&m=dev`;

const slotLabels: Record<string, string> = {
  [SWAP]: 'swap',
  ...TITLE_GROUP_SLOT_LABELS,
};

type PlaygroundArgs = {
  slot: string;
  newsType: (typeof TITLE_GROUP_NEWS_TYPES)[number];
  headlineText: string;
  subheadText: string;
  badgeLabel: string;
  tabItems: 2 | 3 | 4 | 5 | 6;
};

const meta = {
  title: 'Templates/Layouts/Title Groups',
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
    docs: { disable: true },
    globals: {
      segment: TONNED_SEGMENT,
    },
    design: {
      type: 'figma',
      url: figmaDesignUrl(TITLE_GROUPS_FIGMA_NODE_ID),
    },
  },
} satisfies Meta<PlaygroundArgs>;

export default meta;
type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  parameters: {
    controls: { sort: 'none' },
    design: {
      type: 'figma',
      url: figmaDesignUrl(TITLE_GROUPS_FIGMA_NODE_ID),
    },
  },
  args: {
    slot: SWAP,
    newsType: 'summary',
    headlineText: TITLE_GROUP_DEFAULT_HEADLINE,
    subheadText: TITLE_GROUP_DEFAULT_SUBHEAD,
    badgeLabel: TITLE_GROUP_DEFAULT_BADGE,
    tabItems: 5,
  },
  argTypes: {
    slot: {
      name: 'slot',
      control: {
        type: 'select',
        labels: slotLabels,
      },
      options: layoutSlotOptions(TITLE_GROUP_SLOTS),
    },
    newsType: {
      name: 'type',
      control: {
        type: 'select',
        labels: {
          summary: 'summary',
          cards: 'cards',
          video: 'video',
        },
      },
      options: [...TITLE_GROUP_NEWS_TYPES],
      if: { arg: 'slot', eq: TITLE_GROUP_SLOT_NEWS },
      table: { category: 'News' },
    },
    headlineText: {
      name: 'headline',
      control: 'text',
      if: { arg: 'slot', eq: TITLE_GROUP_SLOT_TOPIC },
      table: { category: 'Topic' },
    },
    subheadText: {
      name: 'subhead',
      control: 'text',
      if: { arg: 'slot', eq: TITLE_GROUP_SLOT_TOPIC },
      table: { category: 'Topic' },
    },
    badgeLabel: {
      name: 'badge',
      control: 'text',
      if: { arg: 'slot', eq: TITLE_GROUP_SLOT_TOPIC },
      table: { category: 'Topic' },
    },
    tabItems: {
      name: 'tab items',
      control: 'select',
      options: [2, 3, 4, 5, 6],
      if: { arg: 'slot', eq: TITLE_GROUP_SLOT_TOPIC },
      table: { category: 'Topic' },
    },
  },
  render: (args) => {
    const figmaNode =
      args.slot === SWAP
        ? TITLE_GROUPS_FIGMA_NODE_ID
        : titleGroupFigmaNodeId(
            args.slot as (typeof TITLE_GROUP_SLOTS)[number],
            args.newsType,
          );

    const content = resolveLayoutSlot(args.slot, 'titleGroup', {
      [TITLE_GROUP_SLOT_TOPIC]: () => (
        <TitleGroupTopic
          headlineText={args.headlineText}
          badgeLabel={args.badgeLabel}
          subheadText={args.subheadText}
          tabItems={args.tabItems}
        />
      ),
      [TITLE_GROUP_SLOT_NEWS]: () => (
        <TitleGroupNews type={args.newsType} />
      ),
    });

    return (
      <div
        className="layouts-showcase-section layouts-showcase-section--board layouts-showcase-section--title-groups"
        style={boardStyle}
        data-figma-node={figmaNode}
        data-segment={args.slot !== SWAP ? TONNED_SEGMENT : undefined}
      >
        <div className="layout-swap-row" style={layoutSwapRowWidthStyle}>
          {content}
        </div>
      </div>
    );
  },
};

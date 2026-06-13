import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { showcaseCanvas } from '../../storybook/showcase-decorators';
import { SHOWCASE_PLAYGROUND_PADDING_PX } from '../../storybook/showcase-constants';
import { tabItemSegmentDecorator } from './decorators';
import { TabsGroupRow, tabsGroupRowPropsFromVariant } from './TabsGroupRow';
import {
  TAB_ITEM_SEGMENT,
  TABS_GROUP_ROW_BOARD_HEIGHT_PX,
  TABS_GROUP_ROW_BOARD_WIDTH_PX,
  TABS_GROUP_ROW_FIGMA_NODE_ID,
  TABS_GROUP_ROW_PLAYGROUND_BOUND_H_PX,
  TABS_GROUP_ROW_PLAYGROUND_BOUND_W_PX,
  TABS_GROUP_ROW_VARIANTS,
  tabsGroupRowVariantKey,
  type TabsGroupRowItems,
} from './types';
import './tabs-showcase.css';
import './tabs-group-row-board.css';

const itemCounts: TabsGroupRowItems[] = [2, 3, 4, 5, 6];

const playgroundSectionStyle = {
  '--showcase-playground-bound-w': `${TABS_GROUP_ROW_PLAYGROUND_BOUND_W_PX}px`,
  '--showcase-playground-bound-h': `${TABS_GROUP_ROW_PLAYGROUND_BOUND_H_PX}px`,
  '--showcase-playground-padding': `${SHOWCASE_PLAYGROUND_PADDING_PX}px`,
} as CSSProperties;

const tabsGroupRowBoardStyle = {
  '--tabs-group-row-board-width': TABS_GROUP_ROW_BOARD_WIDTH_PX,
  '--tabs-group-row-board-height': TABS_GROUP_ROW_BOARD_HEIGHT_PX,
} as CSSProperties;

const playgroundSection: Decorator = (Story) => (
  <div
    className="showcase-layout-section showcase-layout-section--playground"
    style={playgroundSectionStyle}
    data-segment={TAB_ITEM_SEGMENT}
  >
    <div className="showcase-layout-playground">
      <Story />
    </div>
  </div>
);

const meta = {
  title: 'Components/Tabs/Tabs Group Row',
  component: TabsGroupRow,
  tags: ['autodocs'],
  decorators: [showcaseCanvas, tabItemSegmentDecorator],
  parameters: {
    layout: 'fullscreen',
    globals: {
      segment: TAB_ITEM_SEGMENT,
    },
    docs: {
      description: {
        component: `Figma \`tabsGroupRow\` (${TABS_GROUP_ROW_FIGMA_NODE_ID}): **5** variants on board **${TABS_GROUP_ROW_BOARD_WIDTH_PX}×${TABS_GROUP_ROW_BOARD_HEIGHT_PX}**; axis **items** (2–6); each tab — text + tonned counter, \`paddingSize=small\` (**segment ${TAB_ITEM_SEGMENT}** pinned).`,
      },
    },
  },
  argTypes: {
    items: { control: 'select', options: itemCounts },
    tabLabel: { control: 'text' },
    counter: { control: 'text' },
    activeIndex: {
      control: { type: 'number', min: 0, max: 5, step: 1 },
    },
  },
  args: {
    items: 6,
    tabLabel: 'Value',
    counter: '00',
    activeIndex: null,
  },
} satisfies Meta<typeof TabsGroupRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [playgroundSection],
};

export const AllVariants: Story = {
  name: 'All variants',
  parameters: {
    docs: {
      description: {
        story: `Reference board **${TABS_GROUP_ROW_BOARD_WIDTH_PX}×${TABS_GROUP_ROW_BOARD_HEIGHT_PX}** — segment **${TAB_ITEM_SEGMENT}** pinned (Figma \`${TABS_GROUP_ROW_FIGMA_NODE_ID}\`); five rows \`items=2…6\` at Figma x/y.`,
      },
    },
  },
  render: () => (
    <div
      className="showcase-layout-section showcase-layout-section--board"
      data-segment={TAB_ITEM_SEGMENT}
    >
      <div className="tabs-group-row-board" style={tabsGroupRowBoardStyle}>
        <div className="tabs-group-row-board__variants">
          {TABS_GROUP_ROW_VARIANTS.map((variant) => (
            <TabsGroupRow
              key={tabsGroupRowVariantKey(variant)}
              {...tabsGroupRowPropsFromVariant(variant)}
              className="tabs-group-row-board__variant"
              style={{ left: variant.figmaX, top: variant.figmaY }}
            />
          ))}
        </div>
      </div>
    </div>
  ),
};

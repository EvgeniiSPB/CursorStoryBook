import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { showcaseCanvas } from '../../storybook/showcase-decorators';
import { SHOWCASE_PLAYGROUND_PADDING_PX } from '../../storybook/showcase-constants';
import { tabItemSegmentDecorator } from './decorators';
import { TabsGroupColumn, tabsGroupColumnPropsFromVariant } from './TabsGroupColumn';
import {
  TAB_ITEM_SEGMENT,
  TABS_GROUP_COLUMN_BOARD_HEIGHT_PX,
  TABS_GROUP_COLUMN_BOARD_WIDTH_PX,
  TABS_GROUP_COLUMN_FIGMA_NODE_ID,
  TABS_GROUP_COLUMN_PLAYGROUND_BOUND_H_PX,
  TABS_GROUP_COLUMN_PLAYGROUND_BOUND_W_PX,
  TABS_GROUP_COLUMN_VARIANTS,
  tabsGroupColumnVariantKey,
  type TabsGroupColumnItems,
} from './types';
import './tabs-showcase.css';
import './tabs-group-column-board.css';

const itemCounts: TabsGroupColumnItems[] = [2, 3, 4, 5, 6];

const playgroundSectionStyle = {
  '--showcase-playground-bound-w': `${TABS_GROUP_COLUMN_PLAYGROUND_BOUND_W_PX}px`,
  '--showcase-playground-bound-h': `${TABS_GROUP_COLUMN_PLAYGROUND_BOUND_H_PX}px`,
  '--showcase-playground-padding': `${SHOWCASE_PLAYGROUND_PADDING_PX}px`,
} as CSSProperties;

const tabsGroupColumnBoardStyle = {
  '--tabs-group-column-board-width': TABS_GROUP_COLUMN_BOARD_WIDTH_PX,
  '--tabs-group-column-board-height': TABS_GROUP_COLUMN_BOARD_HEIGHT_PX,
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
  title: 'Components/Tabs/Tabs Group Column',
  component: TabsGroupColumn,
  tags: ['autodocs'],
  decorators: [showcaseCanvas, tabItemSegmentDecorator],
  parameters: {
    layout: 'fullscreen',
    globals: {
      segment: TAB_ITEM_SEGMENT,
    },
    docs: {
      description: {
        component: `Figma \`tabsGroupColumn\` (${TABS_GROUP_COLUMN_FIGMA_NODE_ID}): **5** variants on board **${TABS_GROUP_COLUMN_BOARD_WIDTH_PX}×${TABS_GROUP_COLUMN_BOARD_HEIGHT_PX}**; axis **items** (2–6); header **Related** + divider; each tab — text + tonned counter, \`paddingSize=tiny\` (**segment ${TAB_ITEM_SEGMENT}** pinned).`,
      },
    },
  },
  argTypes: {
    items: { control: 'select', options: itemCounts },
    title: { control: 'text' },
    tabLabel: { control: 'text' },
    counter: { control: 'text' },
    activeIndex: { table: { disable: true } },
  },
  args: {
    items: 6,
    title: 'Related',
    tabLabel: 'Value',
    counter: '00',
    activeIndex: null,
  },
} satisfies Meta<typeof TabsGroupColumn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [playgroundSection],
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { TabsGroupColumn } from '@/components/Tabs/TabsGroupColumn';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div data-segment="metallic" style={{ padding: 24 }}>`,
          `      <TabsGroupColumn`,
          `        items={6}`,
          `        title="Related"`,
          `        tabLabel="Value"`,
          `        counter="00"`,
          `      />`,
          `    </div>`,
          `  );`,
          `};`,
          ``,
          `const root = document.getElementById('root');`,
          `if (root) createRoot(root).render(<App />);`,
        ].join('\n'),
      },
    },
  },
};

export const AllVariants: Story = {
  name: 'All variants',
  parameters: {
    docs: {
      description: {
        story: `Reference board **${TABS_GROUP_COLUMN_BOARD_WIDTH_PX}×${TABS_GROUP_COLUMN_BOARD_HEIGHT_PX}** — segment **${TAB_ITEM_SEGMENT}** pinned (Figma \`${TABS_GROUP_COLUMN_FIGMA_NODE_ID}\`); five columns \`items=2…6\` at Figma x/y.`,
      },
    },
  },
  render: () => (
    <div
      className="showcase-layout-section showcase-layout-section--board"
      data-segment={TAB_ITEM_SEGMENT}
    >
      <div className="tabs-group-column-board" style={tabsGroupColumnBoardStyle}>
        <div className="tabs-group-column-board__variants">
          {TABS_GROUP_COLUMN_VARIANTS.map((variant) => (
            <TabsGroupColumn
              key={tabsGroupColumnVariantKey(variant)}
              {...tabsGroupColumnPropsFromVariant(variant)}
              className="tabs-group-column-board__variant"
              style={{ left: variant.figmaX, top: variant.figmaY }}
            />
          ))}
        </div>
      </div>
    </div>
  ),
};

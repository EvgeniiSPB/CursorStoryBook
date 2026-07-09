import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { PaddingRulerFrame } from '../../storybook/PaddingRulerFrame';
import { showcaseCanvas } from '../../storybook/showcase-decorators';
import { SHOWCASE_PLAYGROUND_PADDING_PX } from '../../storybook/showcase-constants';
import { tabItemSegmentDecorator } from './decorators';
import { TabItem, tabItemPropsFromVariant } from './TabItem';
import {
  TAB_ITEM_BOARD_HEIGHT_PX,
  TAB_ITEM_BOARD_WIDTH_PX,
  TAB_ITEM_FIGMA_NODE_ID,
  TAB_ITEM_PLAYGROUND_BOUND_H_PX,
  TAB_ITEM_PLAYGROUND_BOUND_W_PX,
  TAB_ITEM_SEGMENT,
  TAB_ITEM_STATES,
  TAB_ITEM_VARIANTS,
  tabItemVariantKey,
  type TabItemState,
} from './types';
import './tabs-showcase.css';
import './tab-item-board.css';

const states: TabItemState[] = [...TAB_ITEM_STATES];

const playgroundSectionStyle = {
  '--showcase-playground-bound-w': `${TAB_ITEM_PLAYGROUND_BOUND_W_PX}px`,
  '--showcase-playground-bound-h': `${TAB_ITEM_PLAYGROUND_BOUND_H_PX}px`,
  '--showcase-playground-padding': `${SHOWCASE_PLAYGROUND_PADDING_PX}px`,
} as CSSProperties;

const tabItemBoardStyle = {
  '--tab-item-board-width': TAB_ITEM_BOARD_WIDTH_PX,
  '--tab-item-board-height': TAB_ITEM_BOARD_HEIGHT_PX,
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
  title: 'Components/Tabs/Tab Item',
  component: TabItem,
  tags: ['autodocs'],
  decorators: [showcaseCanvas, tabItemSegmentDecorator],
  parameters: {
    layout: 'fullscreen',
    globals: {
      segment: TAB_ITEM_SEGMENT,
    },
    docs: {
      description: {
        component: `Figma \`tabItem\` (${TAB_ITEM_FIGMA_NODE_ID}): **48** variants on board **${TAB_ITEM_BOARD_WIDTH_PX}×${TAB_ITEM_BOARD_HEIGHT_PX}**; оси **active / icon / counter / paddingSize / state**; tonned counter (**segment ${TAB_ITEM_SEGMENT}** pinned).`,
      },
    },
  },
  argTypes: {
    active: { control: 'boolean' },
    showIcon: { control: 'boolean' },
    showCounter: { control: 'boolean' },
    counter: { control: 'text' },
    paddingSize: { control: 'select', options: ['tiny', 'small'] },
    state: { control: 'select', options: states },
    children: { control: 'text', name: 'value' },
  },
  args: {
    children: 'Value',
    active: false,
    showIcon: true,
    showCounter: true,
    counter: '00',
    paddingSize: 'small',
  },
} satisfies Meta<typeof TabItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [playgroundSection],
  render: (args) => (
    <PaddingRulerFrame>
      <TabItem {...args} />
    </PaddingRulerFrame>
  ),
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { TabItem } from '@/components/Tabs/TabItem';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div data-segment="metallic" style={{ padding: 24 }}>`,
          `      <TabItem showIcon showCounter counter="00">Value</TabItem>`,
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
        story: `Reference board **${TAB_ITEM_BOARD_WIDTH_PX}×${TAB_ITEM_BOARD_HEIGHT_PX}** — segment **${TAB_ITEM_SEGMENT}** pinned (Figma \`${TAB_ITEM_FIGMA_NODE_ID}\`); top half \`paddingSize=tiny\`, bottom \`small\`; left half \`active=false\`, right \`active=true\`; four content columns per half (text / icon+text / text+counter / icon+text+counter).`,
      },
    },
  },
  render: () => (
    <div
      className="showcase-layout-section showcase-layout-section--board"
      data-segment={TAB_ITEM_SEGMENT}
    >
      <div className="tab-item-board" style={tabItemBoardStyle}>
        <div className="tab-item-board__variants">
          {TAB_ITEM_VARIANTS.map((variant) => (
            <TabItem
              key={tabItemVariantKey(variant)}
              {...tabItemPropsFromVariant(variant)}
              className={[
                'tab-item-board__variant',
                variant.state === 'normal' ? undefined : 'tabs-showcase__row--static',
              ]
                .filter(Boolean)
                .join(' ')}
              style={{ left: variant.figmaX, top: variant.figmaY }}
            />
          ))}
        </div>
      </div>
    </div>
  ),
};

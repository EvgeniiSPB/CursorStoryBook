import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { FIGMA_BODY_FONT_MODE_SLUG } from '../../../../tokens/font-mode-options';
import { layoutSwapRowWidthStyle } from '../shared/LayoutSwapRow';
import { SWAP, layoutSlotOptions } from '../shared/slot-renderers';
import {
  LAYOUT_BOARD_PADDING_PX,
  LAYOUT_CONTENT_WIDTH_PX,
  LAYOUTS_FIGMA_FILE_KEY,
  ROW_CARDS_TYPES,
  ROW_FEATURE_BACKGROUNDS,
} from '../shared/types';
import '../shared/layouts-showcase.css';
import {
  ROW_HEADLINE_INNER_SECTION,
  ROW_HEADLINE_INNER_SLOTS,
  ROW_HEADLINE_INNER_SWAP,
  ROW_TYPE_BUTTON,
  ROW_TYPE_CARDS,
  ROW_TYPE_FEATURE,
  ROW_TYPE_FOOTER,
  ROW_TYPE_HEADLINE,
  ROW_TYPE_LABELS,
  ROW_TYPE_NEWSLETTER,
  ROW_TYPES,
  ROW_BUTTON_DEFAULT_TEXT,
  ROW_FOOTER_FIGMA_NODE_ID,
  ROW_FIGMA_NODE_ID,
  rowCardsFigmaNodeId,
  rowCardsHasHPaddings,
  rowFeatureFigmaNodeId,
} from './types';
import { renderLayoutRow } from './renderLayoutRow';
import { LayoutSwapRow } from '../shared/LayoutSwapRow';
import './rows.css';
import {
  SECTION_HEADLINE_DEFAULT_BUTTON_TEXT,
  SECTION_HEADLINE_DEFAULT_HEADLINE_TEXT,
} from '../headlines/types';

const showcaseCanvas: Decorator = (Story) => (
  <div className="layouts-showcase-canvas" data-font-mode={FIGMA_BODY_FONT_MODE_SLUG}>
    <Story />
  </div>
);

const boardStyle = {
  '--layouts-board-width': LAYOUT_CONTENT_WIDTH_PX,
  '--layouts-board-padding': LAYOUT_BOARD_PADDING_PX,
} as CSSProperties;

const rowSlotLabels: Record<string, string> = {
  [SWAP]: 'swap',
  ...ROW_TYPE_LABELS,
};

const figmaDesignUrl = (nodeId: string) =>
  `https://www.figma.com/design/${LAYOUTS_FIGMA_FILE_KEY}/04---templates?node-id=${nodeId.replace(':', '-')}`;

type PlaygroundArgs = {
  row: string;
  hPaddings: boolean;
  hPaddingsNewsletter: boolean;
  hPaddingsCards: boolean;
  cardsType: (typeof ROW_CARDS_TYPES)[number];
  featureBackground: (typeof ROW_FEATURE_BACKGROUNDS)[number];
  buttonText: string;
  headlineInnerSlot: (typeof ROW_HEADLINE_INNER_SLOTS)[number];
  tPadding: boolean;
  button: boolean;
  headlineText: string;
  headlineButtonText: string;
};

function readHPaddings(args: PlaygroundArgs): boolean {
  if (args.row === ROW_TYPE_HEADLINE) {
    return args.hPaddings;
  }
  if (args.row === ROW_TYPE_NEWSLETTER) {
    return args.hPaddingsNewsletter;
  }
  if (args.row === ROW_TYPE_CARDS && rowCardsHasHPaddings(args.cardsType)) {
    return args.hPaddingsCards;
  }
  return true;
}

function resolveRowFigmaNodeId(args: PlaygroundArgs): string {
  if (args.row === ROW_TYPE_CARDS) {
    return rowCardsFigmaNodeId(args.cardsType, readHPaddings(args));
  }
  if (args.row === ROW_TYPE_FEATURE) {
    return rowFeatureFigmaNodeId(args.featureBackground);
  }
  if (args.row === ROW_TYPE_FOOTER) {
    return ROW_FOOTER_FIGMA_NODE_ID;
  }
  return ROW_FIGMA_NODE_ID;
}

function resolveRowStyle(args: PlaygroundArgs): CSSProperties {
  if (args.row === ROW_TYPE_CARDS && args.cardsType === 'single') {
    return {
      width: '100%',
      maxWidth: '100%',
    };
  }
  return layoutSwapRowWidthStyle;
}

const meta = {
  title: 'Templates/Layouts/Row',
  component: LayoutSwapRow,
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
    docs: { disable: true },
    design: {
      type: 'figma',
      url: figmaDesignUrl(ROW_FIGMA_NODE_ID),
    },
  },
} satisfies Meta<typeof LayoutSwapRow>;

export default meta;
type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { LayoutSwapRow } from '@/components/templates/layouts/shared/LayoutSwapRow';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div style={{ padding: 24 }}>`,
          `      <LayoutSwapRow />`,
          `    </div>`,
          `  );`,
          `};`,
          ``,
          `const root = document.getElementById('root');`,
          `if (root) createRoot(root).render(<App />);`,
        ].join('\n'),
      },
    },
    design: {
      type: 'figma',
      url: figmaDesignUrl(ROW_FIGMA_NODE_ID),
    },
  },
  args: {
    row: SWAP,
    hPaddings: true,
    hPaddingsNewsletter: true,
    hPaddingsCards: true,
    cardsType: 'double',
    featureBackground: 'fill',
    buttonText: ROW_BUTTON_DEFAULT_TEXT,
    headlineInnerSlot: ROW_HEADLINE_INNER_SWAP,
    tPadding: true,
    button: true,
    headlineText: SECTION_HEADLINE_DEFAULT_HEADLINE_TEXT,
    headlineButtonText: SECTION_HEADLINE_DEFAULT_BUTTON_TEXT,
  },
  argTypes: {
    row: {
      name: 'row',
      control: {
        type: 'select',
        labels: rowSlotLabels,
      },
      options: layoutSlotOptions(ROW_TYPES),
    },
    hPaddings: {
      control: 'boolean',
      if: { arg: 'row', eq: ROW_TYPE_HEADLINE },
    },
    hPaddingsNewsletter: {
      name: 'hPaddings',
      control: 'boolean',
      if: { arg: 'row', eq: ROW_TYPE_NEWSLETTER },
    },
    hPaddingsCards: {
      name: 'hPaddings',
      control: 'boolean',
      if: { arg: 'row', eq: ROW_TYPE_CARDS },
    },
    headlineInnerSlot: {
      name: 'headline slot',
      control: {
        type: 'select',
        labels: {
          [ROW_HEADLINE_INNER_SWAP]: 'swap (headline)',
          [ROW_HEADLINE_INNER_SECTION]: 'section - headline',
        },
      },
      options: [...ROW_HEADLINE_INNER_SLOTS],
      if: { arg: 'row', eq: ROW_TYPE_HEADLINE },
    },
    tPadding: {
      control: 'boolean',
      if: { arg: 'row', eq: ROW_TYPE_HEADLINE },
    },
    button: {
      control: 'boolean',
      if: { arg: 'row', eq: ROW_TYPE_HEADLINE },
    },
    headlineText: {
      name: 'headline',
      control: 'text',
      if: { arg: 'row', eq: ROW_TYPE_HEADLINE },
    },
    headlineButtonText: {
      name: 'button label',
      control: 'text',
      if: { arg: 'row', eq: ROW_TYPE_HEADLINE },
    },
    cardsType: {
      name: 'type',
      control: 'select',
      options: [...ROW_CARDS_TYPES],
      if: { arg: 'row', eq: ROW_TYPE_CARDS },
    },
    featureBackground: {
      name: 'background',
      control: {
        type: 'select',
        labels: {
          fill: 'fill',
          image: 'image',
        },
      },
      options: [...ROW_FEATURE_BACKGROUNDS],
      if: { arg: 'row', eq: ROW_TYPE_FEATURE },
    },
    buttonText: {
      name: 'button label',
      control: 'text',
      if: { arg: 'row', eq: ROW_TYPE_BUTTON },
    },
  },
  render: (args) => (
    <div
      className="layouts-showcase-section layouts-showcase-section--board"
      style={boardStyle}
      data-figma-node={resolveRowFigmaNodeId(args)}
    >
      <div style={resolveRowStyle(args)}>
        {renderLayoutRow({ ...args, hPaddings: readHPaddings(args) })}
      </div>
    </div>
  ),
};

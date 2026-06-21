import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { useArgs, useEffect } from 'storybook/preview-api';
import { FIGMA_BODY_FONT_MODE_SLUG } from '../../../../tokens/font-mode-options';
import { layoutSwapRowWidthStyle } from '../shared/LayoutSwapRow';
import { SWAP, layoutSlotOptions } from '../shared/slot-renderers';
import {
  LAYOUT_BOARD_PADDING_PX,
  LAYOUT_CONTENT_WIDTH_PX,
  LAYOUT_GAPS,
  LAYOUT_ROWS,
  LAYOUTS_FIGMA_FILE_KEY,
  ROW_CARDS_TYPES,
  ROW_FEATURE_BACKGROUNDS,
  type LayoutGap,
  type LayoutRows,
  type RowCardsType,
  type RowFeatureBackground,
} from '../shared/types';
import '../shared/layouts-showcase.css';
import {
  ROW_HEADLINE_INNER_SECTION,
  ROW_HEADLINE_INNER_SLOTS,
  ROW_HEADLINE_INNER_SWAP,
  ROW_TYPE_BUTTON,
  ROW_TYPE_CARDS,
  ROW_TYPE_FEATURE,
  ROW_TYPE_HEADLINE,
  ROW_TYPE_LABELS,
  ROW_TYPE_NEWSLETTER,
  ROW_TYPES,
  ROW_BUTTON_DEFAULT_TEXT,
  rowCardsHasHPaddings,
  type RowHeadlineInnerSlot,
  type RowPlaygroundProps,
} from '../rows/types';
import { renderLayoutRow } from '../rows/renderLayoutRow';
import {
  SECTION_HEADLINE_DEFAULT_BUTTON_TEXT,
  SECTION_HEADLINE_DEFAULT_HEADLINE_TEXT,
} from '../headlines/types';
import { LayoutSection } from './LayoutSection';
import { SECTION_FIGMA_NODE_ID, sectionFigmaNodeId } from './types';
import './layout-section.css';

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

const ROW_SLOT_INDICES = [1, 2, 3, 4, 5] as const;
type RowSlotIndex = (typeof ROW_SLOT_INDICES)[number];

type RowSlotArgPrefix = `row${RowSlotIndex}`;

type RowSlotControlArgs = {
  [K in RowSlotArgPrefix as `${K}HPaddings`]: boolean;
} & {
  [K in RowSlotArgPrefix as `${K}HPaddingsNewsletter`]: boolean;
} & {
  [K in RowSlotArgPrefix as `${K}HPaddingsCards`]: boolean;
} & {
  [K in RowSlotArgPrefix as `${K}CardsType`]: RowCardsType;
} & {
  [K in RowSlotArgPrefix as `${K}FeatureBackground`]: RowFeatureBackground;
} & {
  [K in RowSlotArgPrefix as `${K}ButtonText`]: string;
} & {
  [K in RowSlotArgPrefix as `${K}HeadlineInnerSlot`]: RowHeadlineInnerSlot;
} & {
  [K in RowSlotArgPrefix as `${K}TPadding`]: boolean;
} & {
  [K in RowSlotArgPrefix as `${K}Button`]: boolean;
} & {
  [K in RowSlotArgPrefix as `${K}HeadlineText`]: string;
} & {
  [K in RowSlotArgPrefix as `${K}HeadlineButtonText`]: string;
};

type RowVisibilityType = 'Headline' | 'Cards' | 'Feature' | 'Button' | 'Newsletter';

type RowVisibilityFlags = {
  [K in RowSlotIndex as `__row${K}${RowVisibilityType}`]: boolean;
} & {
  [K in 2 | 3 | 4 | 5 as `__row${K}Active`]: boolean;
};

type PlaygroundArgs = {
  rows: LayoutRows;
  gap: LayoutGap;
  row1: string;
  row2: string;
  row3: string;
  row4: string;
  row5: string;
} & RowSlotControlArgs &
  RowVisibilityFlags;

function rowSlotKey(index: RowSlotIndex): RowSlotArgPrefix {
  return `row${index}`;
}

function defaultRowSlotControlArgs(index: RowSlotIndex): Partial<RowSlotControlArgs> {
  const prefix = rowSlotKey(index);

  return {
    [`${prefix}HPaddings`]: true,
    [`${prefix}HPaddingsNewsletter`]: true,
    [`${prefix}HPaddingsCards`]: true,
    [`${prefix}CardsType`]: 'double',
    [`${prefix}FeatureBackground`]: 'fill',
    [`${prefix}ButtonText`]: ROW_BUTTON_DEFAULT_TEXT,
    [`${prefix}HeadlineInnerSlot`]: ROW_HEADLINE_INNER_SWAP,
    [`${prefix}TPadding`]: true,
    [`${prefix}Button`]: true,
    [`${prefix}HeadlineText`]: SECTION_HEADLINE_DEFAULT_HEADLINE_TEXT,
    [`${prefix}HeadlineButtonText`]: SECTION_HEADLINE_DEFAULT_BUTTON_TEXT,
  } as Partial<RowSlotControlArgs>;
}

function readRowSlotProps(args: PlaygroundArgs, index: RowSlotIndex): RowPlaygroundProps {
  const prefix = rowSlotKey(index);
  const rowType = args[prefix];
  const cardsType = args[`${prefix}CardsType`];

  let hPaddings = true;
  if (rowType === ROW_TYPE_HEADLINE) {
    hPaddings = args[`${prefix}HPaddings`];
  } else if (rowType === ROW_TYPE_NEWSLETTER) {
    hPaddings = args[`${prefix}HPaddingsNewsletter`];
  } else if (rowType === ROW_TYPE_CARDS && rowCardsHasHPaddings(cardsType)) {
    hPaddings = args[`${prefix}HPaddingsCards`];
  }

  return {
    hPaddings,
    cardsType,
    featureBackground: args[`${prefix}FeatureBackground`],
    buttonText: args[`${prefix}ButtonText`],
    headlineInnerSlot: args[`${prefix}HeadlineInnerSlot`],
    tPadding: args[`${prefix}TPadding`],
    button: args[`${prefix}Button`],
    headlineText: args[`${prefix}HeadlineText`],
    headlineButtonText: args[`${prefix}HeadlineButtonText`],
  };
}

function renderSectionRow(args: PlaygroundArgs, index: RowSlotIndex) {
  const prefix = rowSlotKey(index);
  const rowType = args[prefix];
  const rowProps = readRowSlotProps(args, index);

  return (
    <div
      style={
        rowType === ROW_TYPE_CARDS && rowProps.cardsType === 'single'
          ? { width: '100%', maxWidth: '100%' }
          : layoutSwapRowWidthStyle
      }
    >
      {renderLayoutRow({
        row: rowType,
        ...rowProps,
      })}
    </div>
  );
}

function rowSlotArgType(name: string) {
  return {
    name,
    control: {
      type: 'select' as const,
      labels: rowSlotLabels,
    },
    options: layoutSlotOptions(ROW_TYPES),
  };
}

const ROW_VISIBILITY_TYPES: readonly RowVisibilityType[] = [
  'Headline',
  'Cards',
  'Feature',
  'Button',
  'Newsletter',
];

function rowVisibilityFlagKey(index: RowSlotIndex, kind: RowVisibilityType | 'Active') {
  return `__row${index}${kind}` as keyof RowVisibilityFlags;
}

function visibilityIf(index: RowSlotIndex, kind: RowVisibilityType | 'active') {
  if (kind === 'active') {
    if (index === 1) {
      return undefined;
    }

    return { arg: rowVisibilityFlagKey(index, 'Active'), truthy: true as const };
  }

  return { arg: rowVisibilityFlagKey(index, kind), truthy: true as const };
}

function computeRowVisibilityFlags(
  args: Pick<PlaygroundArgs, 'rows' | 'row1' | 'row2' | 'row3' | 'row4' | 'row5'>,
): RowVisibilityFlags {
  const flags = {} as RowVisibilityFlags;

  for (const index of ROW_SLOT_INDICES) {
    const rowType = args[rowSlotKey(index)];
    const active = args.rows >= index;

    if (index > 1) {
      flags[rowVisibilityFlagKey(index, 'Active')] = active;
    }

    flags[rowVisibilityFlagKey(index, 'Headline')] = active && rowType === ROW_TYPE_HEADLINE;
    flags[rowVisibilityFlagKey(index, 'Cards')] = active && rowType === ROW_TYPE_CARDS;
    flags[rowVisibilityFlagKey(index, 'Feature')] = active && rowType === ROW_TYPE_FEATURE;
    flags[rowVisibilityFlagKey(index, 'Button')] = active && rowType === ROW_TYPE_BUTTON;
    flags[rowVisibilityFlagKey(index, 'Newsletter')] = active && rowType === ROW_TYPE_NEWSLETTER;
  }

  return flags;
}

function buildRowVisibilityArgTypes() {
  const argTypes: Record<string, unknown> = {};

  for (const index of ROW_SLOT_INDICES) {
    for (const kind of ROW_VISIBILITY_TYPES) {
      argTypes[rowVisibilityFlagKey(index, kind)] = { table: { disable: true }, control: false };
    }

    if (index > 1) {
      argTypes[rowVisibilityFlagKey(index, 'Active')] = { table: { disable: true }, control: false };
    }
  }

  return argTypes;
}

function buildRowSlotArgTypes(index: RowSlotIndex) {
  const rowKey = rowSlotKey(index);
  const rowCategory = `Row ${index}`;
  const rowActiveIf = visibilityIf(index, 'active');

  return {
    [rowKey]: {
      ...rowSlotArgType(`row ${index}`),
      table: { category: rowCategory },
      ...(rowActiveIf ? { if: rowActiveIf } : {}),
    },
    [`${rowKey}HPaddings`]: {
      name: 'hPaddings',
      control: 'boolean' as const,
      if: visibilityIf(index, 'Headline'),
      table: { category: rowCategory },
    },
    [`${rowKey}HeadlineInnerSlot`]: {
      name: 'headline slot',
      control: {
        type: 'select' as const,
        labels: {
          [ROW_HEADLINE_INNER_SWAP]: 'swap (headline)',
          [ROW_HEADLINE_INNER_SECTION]: 'section - headline',
        },
      },
      options: [...ROW_HEADLINE_INNER_SLOTS],
      if: visibilityIf(index, 'Headline'),
      table: { category: rowCategory },
    },
    [`${rowKey}TPadding`]: {
      name: 'tPadding',
      control: 'boolean' as const,
      if: visibilityIf(index, 'Headline'),
      table: { category: rowCategory },
    },
    [`${rowKey}Button`]: {
      name: 'button',
      control: 'boolean' as const,
      if: visibilityIf(index, 'Headline'),
      table: { category: rowCategory },
    },
    [`${rowKey}HeadlineText`]: {
      name: 'headline',
      control: 'text' as const,
      if: visibilityIf(index, 'Headline'),
      table: { category: rowCategory },
    },
    [`${rowKey}HeadlineButtonText`]: {
      name: 'button label',
      control: 'text' as const,
      if: visibilityIf(index, 'Headline'),
      table: { category: rowCategory },
    },
    [`${rowKey}CardsType`]: {
      name: 'type',
      control: 'select' as const,
      options: [...ROW_CARDS_TYPES],
      if: visibilityIf(index, 'Cards'),
      table: { category: rowCategory },
    },
    [`${rowKey}HPaddingsCards`]: {
      name: 'hPaddings',
      control: 'boolean' as const,
      if: visibilityIf(index, 'Cards'),
      table: { category: rowCategory },
    },
    [`${rowKey}FeatureBackground`]: {
      name: 'background',
      control: {
        type: 'select' as const,
        labels: { fill: 'fill', image: 'image' },
      },
      options: [...ROW_FEATURE_BACKGROUNDS],
      if: visibilityIf(index, 'Feature'),
      table: { category: rowCategory },
    },
    [`${rowKey}ButtonText`]: {
      name: 'button label',
      control: 'text' as const,
      if: visibilityIf(index, 'Button'),
      table: { category: rowCategory },
    },
    [`${rowKey}HPaddingsNewsletter`]: {
      name: 'hPaddings',
      control: 'boolean' as const,
      if: visibilityIf(index, 'Newsletter'),
      table: { category: rowCategory },
    },
  };
}

function buildPlaygroundArgTypes() {
  const argTypes: Record<string, unknown> = {
    rows: { control: 'select', options: [...LAYOUT_ROWS], table: { category: 'Section' } },
    gap: { control: 'select', options: [...LAYOUT_GAPS], table: { category: 'Section' } },
    ...buildRowVisibilityArgTypes(),
  };

  for (const index of ROW_SLOT_INDICES) {
    Object.assign(argTypes, buildRowSlotArgTypes(index));
  }

  return argTypes;
}

function buildPlaygroundDefaultArgs(): PlaygroundArgs {
  const args: Record<string, unknown> = {
    rows: 2,
    gap: 'medium',
  };

  for (const index of ROW_SLOT_INDICES) {
    args[rowSlotKey(index)] = SWAP;
    Object.assign(args, defaultRowSlotControlArgs(index));
  }

  const rowArgs = args as Pick<PlaygroundArgs, 'rows' | 'row1' | 'row2' | 'row3' | 'row4' | 'row5'>;

  return {
    ...args,
    ...computeRowVisibilityFlags(rowArgs),
  } as PlaygroundArgs;
}

const playgroundArgTypes = buildPlaygroundArgTypes();
const playgroundDefaultArgs = buildPlaygroundDefaultArgs();

const meta = {
  title: 'Templates/Layouts/Section',
  component: LayoutSection,
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
    docs: { disable: true },
    design: {
      type: 'figma',
      url: figmaDesignUrl(SECTION_FIGMA_NODE_ID),
    },
  },
} satisfies Meta<typeof LayoutSection>;

export default meta;
type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  args: playgroundDefaultArgs,
  argTypes: playgroundArgTypes as Story['argTypes'],
  parameters: {
    design: {
      type: 'figma',
      url: figmaDesignUrl(SECTION_FIGMA_NODE_ID),
    },
  },
  render: (args) => {
    const [, updateArgs] = useArgs<PlaygroundArgs>();

    useEffect(() => {
      const next = computeRowVisibilityFlags(args);
      const changed = (Object.keys(next) as (keyof RowVisibilityFlags)[]).some(
        (key) => args[key] !== next[key],
      );

      if (changed) {
        updateArgs(next);
      }
    }, [args.rows, args.row1, args.row2, args.row3, args.row4, args.row5]);

    const rowProps = {
      row1: renderSectionRow(args, 1),
      row2: renderSectionRow(args, 2),
      row3: renderSectionRow(args, 3),
      row4: renderSectionRow(args, 4),
      row5: renderSectionRow(args, 5),
    };

    return (
      <div
        className="layouts-showcase-section layouts-showcase-section--board"
        style={boardStyle}
        data-figma-node={sectionFigmaNodeId(args.rows, args.gap)}
      >
        <LayoutSection rows={args.rows} gap={args.gap} {...rowProps} />
      </div>
    );
  },
};

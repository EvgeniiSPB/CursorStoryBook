export type TabItemState = 'normal' | 'hover' | 'click';

export type TabItemPadding = 'tiny' | 'small';

/** Figma `tabItem` component set (4151:379). */
export const TAB_ITEM_FIGMA_NODE_ID = '4151:379';

export const TAB_ITEM_BOARD_WIDTH_PX = 1056;
export const TAB_ITEM_BOARD_HEIGHT_PX = 752;

/** Figma symbol bound — icon + counter + paddingSize=small (109×52). */
export const TAB_ITEM_PLAYGROUND_BOUND_W_PX = 109;
export const TAB_ITEM_PLAYGROUND_BOUND_H_PX = 52;

/** Figma `4151:379`: tonned counter → `brandConstant/8` = `#2f5e74` @ 8% under segment **metallic**. */
export const TAB_ITEM_SEGMENT = 'metallic' as const;

export type TabItemVariant = {
  active: boolean;
  showIcon: boolean;
  showCounter: boolean;
  paddingSize: TabItemPadding;
  state: TabItemState;
  figmaX: number;
  figmaY: number;
};

export const TAB_ITEM_STATES: readonly TabItemState[] = ['normal', 'hover', 'click'];

const TAB_ITEM_CONTENT_COLUMNS = [
  { showIcon: false, showCounter: false, offX: 100, onX: 560 },
  { showIcon: true, showCounter: false, offX: 173, onX: 633 },
  { showIcon: false, showCounter: true, offX: 274, onX: 734 },
  { showIcon: true, showCounter: true, offX: 387, onX: 847 },
] as const;

const TAB_ITEM_PADDING_SIZES: readonly TabItemPadding[] = ['tiny', 'small'];

const TAB_ITEM_STATE_Y: Record<TabItemPadding, Record<TabItemState, number>> = {
  tiny: { normal: 100, hover: 184, click: 268 },
  small: { normal: 432, hover: 516, click: 600 },
};

function buildTabItemVariants(): TabItemVariant[] {
  const variants: TabItemVariant[] = [];

  for (const paddingSize of TAB_ITEM_PADDING_SIZES) {
    for (const { showIcon, showCounter, offX, onX } of TAB_ITEM_CONTENT_COLUMNS) {
      for (const active of [false, true] as const) {
        for (const state of TAB_ITEM_STATES) {
          variants.push({
            active,
            showIcon,
            showCounter,
            paddingSize,
            state,
            figmaX: active ? onX : offX,
            figmaY: TAB_ITEM_STATE_Y[paddingSize][state],
          });
        }
      }
    }
  }

  return variants;
}

/** All 48 Figma symbols on board 4151:379. */
export const TAB_ITEM_VARIANTS: readonly TabItemVariant[] = buildTabItemVariants();

export function tabItemVariantKey(variant: TabItemVariant): string {
  return [
    variant.active ? 'on' : 'off',
    variant.showIcon ? 'icon' : 'no-icon',
    variant.showCounter ? 'counter' : 'no-counter',
    variant.paddingSize,
    variant.state,
  ].join('-');
}

export type TabsGroupRowItems = 2 | 3 | 4 | 5 | 6;

/** Figma `tabsGroupRow` component set (4151:894). */
export const TABS_GROUP_ROW_FIGMA_NODE_ID = '4151:894';

export const TABS_GROUP_ROW_BOARD_WIDTH_PX = 786;
export const TABS_GROUP_ROW_BOARD_HEIGHT_PX = 588;

/** Figma symbol bound — items=6 (586×52). */
export const TABS_GROUP_ROW_PLAYGROUND_BOUND_W_PX = 586;
export const TABS_GROUP_ROW_PLAYGROUND_BOUND_H_PX = 52;

export type TabsGroupRowVariant = {
  items: TabsGroupRowItems;
  figmaX: number;
  figmaY: number;
};

/** Five Figma symbols on board 4151:894. */
export const TABS_GROUP_ROW_VARIANTS: readonly TabsGroupRowVariant[] = [
  { items: 2, figmaX: 100, figmaY: 100 },
  { items: 3, figmaX: 100, figmaY: 184 },
  { items: 4, figmaX: 100, figmaY: 268 },
  { items: 5, figmaX: 100, figmaY: 352 },
  { items: 6, figmaX: 100, figmaY: 436 },
];

export function tabsGroupRowVariantKey(variant: TabsGroupRowVariant): string {
  return `items-${variant.items}`;
}

export type TabsGroupColumnItems = TabsGroupRowItems;

/** Figma `tabsGroupColumn` component set (4322:4871). */
export const TABS_GROUP_COLUMN_FIGMA_NODE_ID = '4322:4871';

export const TABS_GROUP_COLUMN_BOARD_WIDTH_PX = 544;
export const TABS_GROUP_COLUMN_BOARD_HEIGHT_PX = 1168;

/** Figma column width and symbol bound — items=6 (344×240). */
export const TABS_GROUP_COLUMN_WIDTH_PX = 344;
export const TABS_GROUP_COLUMN_PLAYGROUND_BOUND_W_PX = TABS_GROUP_COLUMN_WIDTH_PX;
export const TABS_GROUP_COLUMN_PLAYGROUND_BOUND_H_PX = 240;

export type TabsGroupColumnVariant = {
  items: TabsGroupColumnItems;
  figmaX: number;
  figmaY: number;
};

/** Five Figma symbols on board 4322:4871. */
export const TABS_GROUP_COLUMN_VARIANTS: readonly TabsGroupColumnVariant[] = [
  { items: 2, figmaX: 100, figmaY: 100 },
  { items: 3, figmaX: 100, figmaY: 228 },
  { items: 4, figmaX: 100, figmaY: 392 },
  { items: 5, figmaX: 100, figmaY: 592 },
  { items: 6, figmaX: 100, figmaY: 828 },
];

export function tabsGroupColumnVariantKey(variant: TabsGroupColumnVariant): string {
  return `items-${variant.items}`;
}

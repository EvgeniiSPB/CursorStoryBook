import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from './Icon';
import type { IconName20, IconName28 } from './types';
import {
  getIconFigmaColor,
  ICON_COLOR_VARS,
  ICON_TONE_VARS,
  type IconColor,
  type IconTone,
} from './types';
import './icon-showcase.css';

/** Figma page 20px — row order (node 5:189, 5:190) */
const ICONS_20_ROW_1: IconName20[] = [
  'bookmark',
  'search',
  'menu',
  'profile',
  'plus',
  'minus',
  'close',
  'arrow-right',
  'arrow-left',
  'arrow-up',
  'arrow-up-right',
  'content',
];

const ICONS_20_ROW_2: IconName20[] = [
  'kebab',
  'lock',
  'placeholder',
  'video',
  'audio',
  'check',
  'shield',
];

/** Figma page 28px — row order (node 13:256) */
const ICONS_28_ROW: IconName28[] = [
  'plus',
  'check',
  'close',
  'arrow-right',
  'arrow-left',
];

const meta = {
  title: 'Icons/Icon',
  component: Icon,
  decorators: [
    (Story) => (
      <div className="icon-showcase-canvas">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    name: { control: 'text' },
    size: { control: 'radio', options: [20, 28] },
    color: {
      control: 'select',
      options: Object.keys(ICON_COLOR_VARS) as IconColor[],
    },
    tone: {
      control: 'select',
      options: [undefined, ...(Object.keys(ICON_TONE_VARS) as IconTone[])],
    },
    inset: { control: 'boolean' },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllIcons20: Story = {
  name: 'All / 20px',
  render: () => (
    <div className="icon-showcase">
      <IconShowcaseRow size={20} names={ICONS_20_ROW_1} />
      <IconShowcaseRow size={20} names={ICONS_20_ROW_2} />
    </div>
  ),
};

export const AllIcons28: Story = {
  name: 'All / 28px',
  render: () => (
    <div className="icon-showcase">
      <IconShowcaseRow size={28} names={ICONS_28_ROW} />
    </div>
  ),
};

function IconShowcaseRow({
  names,
  size,
}: {
  names: readonly (IconName20 | IconName28)[];
  size: 20 | 28;
}) {
  return (
    <div className="icon-showcase__row" role="list">
      {names.map((name) => (
        <div key={name} className="icon-showcase__cell" role="listitem">
          <Icon name={name} size={size} color={getIconFigmaColor(name)} />
        </div>
      ))}
    </div>
  );
}

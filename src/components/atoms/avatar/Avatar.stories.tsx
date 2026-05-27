import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';
import {
  AVATAR_DEFAULT_INITIALS,
  AVATAR_FIGMA_FONT_MODE_SLUG,
  AVATAR_FIGMA_NODE_ID,
  AVATAR_FIGMA_SPECIAL_FONT_FAMILY,
  AVATAR_LARGEST_BOUND_SIZE_PX,
  AVATAR_PLAYGROUND_PADDING_PX,
  AVATAR_VARIANTS,
  avatarVariantKey,
  type AvatarImageSize,
  type AvatarType,
} from './types';
import './avatar-showcase.css';

const showcaseCanvas: Decorator = (Story) => (
  <div className="avatar-showcase-canvas" data-font-mode={AVATAR_FIGMA_FONT_MODE_SLUG}>
    <Story />
  </div>
);

const playgroundSectionStyle = {
  '--avatar-playground-bound-size': `${AVATAR_LARGEST_BOUND_SIZE_PX}px`,
  '--avatar-playground-padding': `${AVATAR_PLAYGROUND_PADDING_PX}px`,
} as CSSProperties;

const playgroundSection: Decorator = (Story) => (
  <div
    className="avatar-showcase-section avatar-showcase-section--playground"
    style={playgroundSectionStyle}
  >
    <div className="avatar-showcase-playground">
      <Story />
    </div>
  </div>
);

const typeOptions: AvatarType[] = ['image', 'initials'];
const imageSizeOptions: AvatarImageSize[] = ['8x', '9x', '10x'];

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Figma \`avatar\` (${AVATAR_FIGMA_NODE_ID}): image or initials; sizes **8x / 9x / 10x** (28–36px). Initials use **${AVATAR_FIGMA_SPECIAL_FONT_FAMILY}** special/oneSize on **brandConstant/primary**. Image fill: **cover**, anchored to **top** edge.`,
      },
    },
  },
  argTypes: {
    type: { control: 'select', options: typeOptions },
    imageSize: { control: 'select', options: imageSizeOptions },
    initials: { control: 'text' },
    src: { control: 'text' },
    alt: { control: 'text' },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [playgroundSection],
  args: {
    type: 'image',
    imageSize: '10x',
    initials: AVATAR_DEFAULT_INITIALS,
    alt: 'Avatar',
  },
};

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div className="avatar-showcase-section avatar-showcase-section--board">
      <div className="avatar-showcase">
        {AVATAR_VARIANTS.map((variant) => (
          <Avatar
            key={avatarVariantKey(variant)}
            type={variant.type}
            imageSize={variant.imageSize}
          />
        ))}
      </div>
    </div>
  ),
};

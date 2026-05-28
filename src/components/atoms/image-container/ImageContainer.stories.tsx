import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { ImageContainer } from './ImageContainer';
import {
  IMAGE_CONTAINER_FIGMA_NODE_ID,
  IMAGE_CONTAINER_LARGEST_BOUND_SIZE_PX,
  IMAGE_CONTAINER_PLAYGROUND_PADDING_PX,
  IMAGE_CONTAINER_VARIANTS,
  imageContainerVariantKey,
  type ImageContainerOrientation,
} from './types';
import './image-container-showcase.css';

const showcaseCanvas: Decorator = (Story) => (
  <div className="image-container-showcase-canvas">
    <Story />
  </div>
);

const playgroundSectionStyle = {
  '--image-container-playground-bound-size': `${IMAGE_CONTAINER_LARGEST_BOUND_SIZE_PX}px`,
  '--image-container-playground-padding': `${IMAGE_CONTAINER_PLAYGROUND_PADDING_PX}px`,
} as CSSProperties;

const playgroundSection: Decorator = (Story) => (
  <div
    className="image-container-showcase-section image-container-showcase-section--playground"
    style={playgroundSectionStyle}
  >
    <div className="image-container-showcase-playground">
      <Story />
    </div>
  </div>
);

const orientationOptions: ImageContainerOrientation[] = ['landscape', 'portrait'];

const meta = {
  title: 'Atoms/Image Container',
  component: ImageContainer,
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Figma \`image - container\` (${IMAGE_CONTAINER_FIGMA_NODE_ID}): **160×160** placeholder with crop guides — **landscape** (left/right) or **portrait** (top/bottom).`,
      },
    },
  },
  argTypes: {
    orientation: { control: 'select', options: orientationOptions },
    portrait: { control: 'boolean' },
    landscape: { control: 'boolean' },
    src: { control: 'text' },
    alt: { control: 'text' },
  },
} satisfies Meta<typeof ImageContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [playgroundSection],
  args: {
    orientation: 'landscape',
    alt: 'Image container',
  },
};

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div className="image-container-showcase-section image-container-showcase-section--board">
      <div className="image-container-showcase">
        {IMAGE_CONTAINER_VARIANTS.map((variant) => (
          <ImageContainer
            key={imageContainerVariantKey(variant)}
            orientation={variant.orientation}
          />
        ))}
      </div>
    </div>
  ),
};

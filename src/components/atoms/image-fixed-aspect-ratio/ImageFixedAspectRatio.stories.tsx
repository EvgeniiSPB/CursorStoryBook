import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { FixedAspectRatioSpacerBoard } from '../fixed-aspect-ratio-spacer/FixedAspectRatioSpacerBoard';
import { FIXED_ASPECT_RATIO_SPACER_FIGMA_NODE_ID } from '../fixed-aspect-ratio-spacer/types';
import { ImageContainerFixedAspectRatio } from '../image-container-fixed-aspect-ratio/ImageContainerFixedAspectRatio';
import {
  IMAGE_CONTAINER_FIXED_ASPECT_RATIO_FIGMA_NODE_ID,
  IMAGE_CONTAINER_FIXED_ASPECT_RATIO_LARGEST_BOUND_HEIGHT_PX,
  IMAGE_CONTAINER_FIXED_ASPECT_RATIO_PLAYGROUND_PADDING_PX,
  IMAGE_CONTAINER_FIXED_ASPECT_RATIO_VARIANTS,
  IMAGE_CONTAINER_FIXED_ASPECT_RATIO_WIDTH_PX,
  imageContainerFixedAspectRatioVariantKey,
} from '../image-container-fixed-aspect-ratio/types';
import type { ImageContainerFixedAspectRatioToken } from '../image-container-fixed-aspect-ratio/types';
import type { ImageContainerOrientation } from '../image-container/types';
import './image-fixed-aspect-ratio-showcase.css';

const showcaseCanvas: Decorator = (Story) => (
  <div className="image-fixed-aspect-ratio-showcase-canvas">
    <Story />
  </div>
);

const containerPlaygroundStyle = {
  padding: `${IMAGE_CONTAINER_FIXED_ASPECT_RATIO_PLAYGROUND_PADDING_PX}px`,
  width: `${IMAGE_CONTAINER_FIXED_ASPECT_RATIO_WIDTH_PX + IMAGE_CONTAINER_FIXED_ASPECT_RATIO_PLAYGROUND_PADDING_PX * 2}px`,
  height: `${IMAGE_CONTAINER_FIXED_ASPECT_RATIO_LARGEST_BOUND_HEIGHT_PX + IMAGE_CONTAINER_FIXED_ASPECT_RATIO_PLAYGROUND_PADDING_PX * 2}px`,
} as CSSProperties;

const aspectRatioOptions: ImageContainerFixedAspectRatioToken[] = [
  '1:1',
  '4:3 | 3:4',
  '5:4 | 4:5',
  '16:9 | 9:16',
];

const orientationOptions: ImageContainerOrientation[] = ['landscape', 'portrait'];

const meta = {
  title: 'Atoms/Image Fixed Aspect Ratio',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Figma atoms for fixed-ratio image frames: **2:1 Fixed Aspect Ratio Spacer** (${FIXED_ASPECT_RATIO_SPACER_FIGMA_NODE_ID}) and **image - container (fixed aspect ratio)** (${IMAGE_CONTAINER_FIXED_ASPECT_RATIO_FIGMA_NODE_ID}), which composes spacers into ratio variants.`,
      },
    },
  },
  decorators: [showcaseCanvas],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const SpacerBoard: Story = {
  name: '2:1 Fixed Aspect Ratio Spacer / Board',
  render: () => <FixedAspectRatioSpacerBoard />,
};

export const ContainerPlayground: Story = {
  name: 'Image Container (fixed aspect ratio) / Playground',
  render: (args) => (
    <div
      className="image-fixed-aspect-ratio-showcase-section image-fixed-aspect-ratio-showcase-section--playground"
      style={containerPlaygroundStyle}
    >
      <div className="image-fixed-aspect-ratio-showcase-playground">
        <ImageContainerFixedAspectRatio
          aspectRatio={args.aspectRatio}
          orientation={args.orientation}
        />
      </div>
    </div>
  ),
  argTypes: {
    aspectRatio: { control: 'select', options: aspectRatioOptions },
    orientation: { control: 'select', options: orientationOptions },
  },
  args: {
    aspectRatio: '1:1',
    orientation: 'landscape',
  },
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { ImageContainerFixedAspectRatio } from '@/components/atoms/image-container-fixed-aspect-ratio/ImageContainerFixedAspectRatio';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div style={{ padding: 24 }}>`,
          `      <ImageContainerFixedAspectRatio aspectRatio="1:1" orientation="landscape" />`,
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

export const ContainerAllVariants: Story = {
  name: 'Image Container (fixed aspect ratio) / All variants',
  render: () => (
    <div className="image-fixed-aspect-ratio-showcase-section image-fixed-aspect-ratio-showcase-section--board image-fixed-aspect-ratio-showcase-section--board-container">
      <div className="image-container-fixed-aspect-ratio-showcase">
        {IMAGE_CONTAINER_FIXED_ASPECT_RATIO_VARIANTS.map((variant) => (
          <ImageContainerFixedAspectRatio
            key={imageContainerFixedAspectRatioVariantKey(variant)}
            aspectRatio={variant.aspectRatio}
            orientation={variant.orientation}
          />
        ))}
      </div>
    </div>
  ),
};


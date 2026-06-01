import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { ShapeBoardScope, shapeShowcaseCanvas } from './decorators';
import { Shape } from './Shape';
import { ShapeBoard } from './ShapeBoard';
import {
  SHAPE_FIGMA_PAGE_NODE_ID,
  SHAPE_PLAYGROUND_PADDING_PX,
  SHAPE_RADII,
  SHAPE_SIZE_PX,
  shapeBoardTitle,
  type ShapeColorRole,
  type ShapeRadius,
  type ShapeState,
  type ShapeType,
} from './types';
import './shape-showcase.css';

const showcaseCanvas: Decorator = shapeShowcaseCanvas;

const playgroundSectionStyle = {
  '--shape-playground-bound-size': `${SHAPE_SIZE_PX}px`,
  '--shape-playground-padding': `${SHAPE_PLAYGROUND_PADDING_PX}px`,
  '--shape-size': SHAPE_SIZE_PX,
} as CSSProperties;

const playgroundSection: Decorator = (Story, { args }) => {
  const color = (args.color ?? 'primary') as ShapeColorRole;
  const type = (args.type ?? 'filled') as ShapeType;

  return (
    <ShapeBoardScope
      color={color}
      type={type}
      className="shape-showcase-section shape-showcase-section--playground"
      style={playgroundSectionStyle}
    >
      <div className="shape-showcase-playground">
        <Story />
      </div>
    </ShapeBoardScope>
  );
};

const boardSection: Decorator = (Story, context) => {
  const type = (context.args?.type ?? context.parameters.shapeType) as ShapeType | undefined;
  const color = (context.args?.color ?? context.parameters.shapeColor) as ShapeColorRole | undefined;

  if (color === undefined || type === undefined) {
    return <Story />;
  }

  return (
    <ShapeBoardScope
      color={color}
      type={type}
      className="shape-showcase-section shape-showcase-section--board"
      style={{ '--shape-size': SHAPE_SIZE_PX } as CSSProperties}
    >
      <Story />
    </ShapeBoardScope>
  );
};

const typeOptions: ShapeType[] = ['filled', 'outlined', 'tonned'];
const radiusOptions: ShapeRadius[] = [...SHAPE_RADII];
const stateOptions: ShapeState[] = ['normal', 'hover', 'click'];

const meta = {
  title: 'Shapes/Shape',
  component: Shape,
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Figma \`shapes\` page (${SHAPE_FIGMA_PAGE_NODE_ID}): **64×64** primitives. Boards pin Figma **mode: light / dark** via \`data-theme\` (not Storybook Theme toolbar). **primaryInverted** + **constant** → \`dark\` + segment **metallic** for tonned (\`314:1633\`). On dark boards, \`primaryInverted\` fills use \`primary/*\` tokens (white).`,
      },
    },
  },
  argTypes: {
    type: { control: 'select', options: typeOptions },
    color: {
      control: 'select',
      options: ['primary', 'primaryInverted', 'constant', 'constantInverted', 'brand', 'success', 'warning', 'info'],
    },
    radius: { control: 'select', options: radiusOptions },
    state: { control: 'select', options: [undefined, ...stateOptions] },
    interactive: { control: 'boolean' },
    meta: { control: 'boolean' },
  },
} satisfies Meta<typeof Shape>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [playgroundSection],
  args: {
    type: 'filled',
    color: 'primary',
    radius: 'x0',
    state: 'normal',
    interactive: false,
    meta: false,
  },
};

export const MetaRadius: Story = {
  name: 'Meta / Radius',
  args: {
    type: 'filled',
    color: 'primary',
    radius: 'x0',
    meta: true,
  },
  render: () => (
    <ShapeBoardScope
      color="primary"
      className="shape-showcase-section shape-showcase-section--meta"
      style={{ '--shape-size': SHAPE_SIZE_PX } as CSSProperties}
    >
      <div className="shape-showcase-meta">
        {SHAPE_RADII.map((radius) => (
          <Shape key={radius} type="filled" color="primary" radius={radius} meta state="normal" figmaTheme="light" />
        ))}
      </div>
    </ShapeBoardScope>
  ),
};

function createBoardStory(type: ShapeType, color: ShapeColorRole): Story {
  return {
    name: shapeBoardTitle(type, color),
    args: { type, color, radius: 'x0', state: 'normal' },
    parameters: { shapeType: type, shapeColor: color, layout: 'fullscreen' },
    decorators: [boardSection],
    render: () => <ShapeBoard type={type} color={color} />,
  };
}

// Filled boards
export const FilledPrimary = createBoardStory('filled', 'primary');
export const FilledPrimaryInverted = createBoardStory('filled', 'primaryInverted');
export const FilledConstant = createBoardStory('filled', 'constant');
export const FilledConstantInverted = createBoardStory('filled', 'constantInverted');
export const FilledBrand = createBoardStory('filled', 'brand');
export const FilledSuccess = createBoardStory('filled', 'success');
export const FilledWarning = createBoardStory('filled', 'warning');
export const FilledInfo = createBoardStory('filled', 'info');

// Outlined boards
export const OutlinedPrimary = createBoardStory('outlined', 'primary');
export const OutlinedPrimaryInverted = createBoardStory('outlined', 'primaryInverted');
export const OutlinedConstant = createBoardStory('outlined', 'constant');
export const OutlinedConstantInverted = createBoardStory('outlined', 'constantInverted');
export const OutlinedBrand = createBoardStory('outlined', 'brand');
export const OutlinedSuccess = createBoardStory('outlined', 'success');
export const OutlinedWarning = createBoardStory('outlined', 'warning');

// Tonned boards
export const TonnedPrimary = createBoardStory('tonned', 'primary');
export const TonnedPrimaryInverted = createBoardStory('tonned', 'primaryInverted');

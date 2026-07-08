import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { FIGMA_BODY_FONT_MODE_SLUG } from '../../tokens/font-mode-options';
import { InputOutlined } from './InputOutlined';
import {
  INPUT_OUTLINED_FIGMA_NODE_ID,
  INPUT_OUTLINED_PLAYGROUND_BOUND_HEIGHT_PX,
  INPUT_OUTLINED_PLAYGROUND_BOUND_WIDTH_PX,
  INPUT_OUTLINED_PLAYGROUND_PADDING_PX,
  INPUT_OUTLINED_VARIANTS,
  inputOutlinedVariantKey,
  type InputOutlinedState,
} from './types';
import './input-outlined-showcase.css';

const showcaseCanvas: Decorator = (Story) => (
  <div
    className="input-outlined-showcase-canvas"
    data-font-mode={FIGMA_BODY_FONT_MODE_SLUG}
  >
    <Story />
  </div>
);

const playgroundSectionStyle = {
  '--input-outlined-playground-bound-w': `${INPUT_OUTLINED_PLAYGROUND_BOUND_WIDTH_PX}px`,
  '--input-outlined-playground-bound-h': `${INPUT_OUTLINED_PLAYGROUND_BOUND_HEIGHT_PX}px`,
  '--input-outlined-playground-padding': `${INPUT_OUTLINED_PLAYGROUND_PADDING_PX}px`,
  '--input-outlined-width': `${INPUT_OUTLINED_PLAYGROUND_BOUND_WIDTH_PX}px`,
} as CSSProperties;

const playgroundSection: Decorator = (Story) => (
  <div
    className="input-outlined-showcase-section input-outlined-showcase-section--playground"
    style={playgroundSectionStyle}
  >
    <div className="input-outlined-showcase-playground">
      <Story />
    </div>
  </div>
);

const states: InputOutlinedState[] = ['normal', 'hover', 'click'];

const meta = {
  title: 'Components/Input/InputOutlined',
  component: InputOutlined,
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Figma \`input - outlined\` (${INPUT_OUTLINED_FIGMA_NODE_ID}): **500×56** underlined field; floating **bodyXS** label + **bodyM** value; **input/** border & text tokens; states **normal / hover / click** and **disabled**.`,
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    placeholder: { control: 'boolean' },
    active: { control: 'boolean' },
    filled: { control: 'boolean' },
    disabled: { control: 'boolean' },
    state: { control: 'select', options: states },
  },
  args: {
    label: 'Label',
    value: 'Value',
    placeholder: false,
    active: false,
    filled: false,
    disabled: false,
  },
} satisfies Meta<typeof InputOutlined>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [playgroundSection],
  args: {
    placeholder: false,
    active: false,
    filled: false,
    disabled: false,
  },
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { InputOutlined } from '@/components/input/InputOutlined';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div style={{ padding: 24 }}>`,
          `      <InputOutlined label="Label" value="Value" />`,
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
  render: () => (
    <div className="input-outlined-showcase-section input-outlined-showcase-section--board">
      <div className="input-outlined-showcase">
        {INPUT_OUTLINED_VARIANTS.map((variant) => (
          <InputOutlined
            key={inputOutlinedVariantKey(variant)}
            placeholder={variant.placeholder}
            active={variant.active}
            filled={variant.filled}
            disabled={variant.disabled}
            state={variant.state}
          />
        ))}
      </div>
    </div>
  ),
};

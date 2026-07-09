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
  type InputOutlinedVariant,
} from './types';
import './input-outlined-showcase.css';

// Figma `input - outlined` has exactly 7 valid states. Booleans (placeholder /
// active / filled / disabled) + state (normal / hover / click) are not
// independent — most combinations aren't defined. Expose a single named
// selector matching the Figma variant grid via a tiny wrapper component so
// `variant` is a real prop Storybook picks up — args on unknown keys can be
// dropped by argTypes filtering, which is what caused the panel to appear to
// do nothing on placeholder / hover / click.
type PlaygroundVariant =
  | 'placeholder'
  | 'placeholder / hover'
  | 'placeholder / click'
  | 'active'
  | 'filled'
  | 'placeholder / disabled'
  | 'filled / disabled';

const PLAYGROUND_VARIANTS: readonly PlaygroundVariant[] = [
  'placeholder',
  'placeholder / hover',
  'placeholder / click',
  'active',
  'filled',
  'placeholder / disabled',
  'filled / disabled',
];

const PLAYGROUND_PROPS: Record<PlaygroundVariant, InputOutlinedVariant> = {
  'placeholder':            { placeholder: true,  active: false, filled: false, disabled: false, state: 'normal' },
  'placeholder / hover':    { placeholder: true,  active: false, filled: false, disabled: false, state: 'hover'  },
  'placeholder / click':    { placeholder: true,  active: false, filled: false, disabled: false, state: 'click'  },
  'active':                 { placeholder: false, active: true,  filled: false, disabled: false, state: 'normal' },
  'filled':                 { placeholder: false, active: false, filled: true,  disabled: false, state: 'normal' },
  'placeholder / disabled': { placeholder: true,  active: false, filled: false, disabled: true,  state: 'normal' },
  'filled / disabled':      { placeholder: false, active: false, filled: false, disabled: true,  state: 'normal' },
};

interface InputOutlinedPlaygroundProps {
  variant: PlaygroundVariant;
  label: string;
  value: string;
}

function InputOutlinedPlayground({
  variant,
  label,
  value,
}: InputOutlinedPlaygroundProps) {
  const props = PLAYGROUND_PROPS[variant];
  return <InputOutlined {...props} label={label} value={value} />;
}

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

const meta = {
  title: 'Components/Input/InputOutlined',
  component: InputOutlinedPlayground,
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
    variant: { control: 'select', options: PLAYGROUND_VARIANTS },
  },
  args: {
    label: 'Label',
    value: 'Value',
    variant: 'placeholder',
  },
} satisfies Meta<typeof InputOutlinedPlayground>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [playgroundSection],
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

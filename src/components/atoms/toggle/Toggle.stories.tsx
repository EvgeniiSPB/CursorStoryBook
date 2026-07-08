import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { Toggle } from './Toggle';
import {
  TOGGLE_FIGMA_NODE_ID,
  TOGGLE_LARGEST_BOUND_SIZE_PX,
  TOGGLE_PLAYGROUND_PADDING_PX,
  TOGGLE_VARIANTS,
  toggleVariantKey,
  type ToggleTypography,
  type ToggleType,
} from './types';
import './toggle-showcase.css';

const showcaseCanvas: Decorator = (Story) => (
  <div className="toggle-showcase-canvas">
    <Story />
  </div>
);

const playgroundSectionStyle = {
  '--toggle-playground-bound-size': `${TOGGLE_LARGEST_BOUND_SIZE_PX}px`,
  '--toggle-playground-padding': `${TOGGLE_PLAYGROUND_PADDING_PX}px`,
} as CSSProperties;

const playgroundSection: Decorator = (Story) => (
  <div
    className="toggle-showcase-section toggle-showcase-section--playground"
    style={playgroundSectionStyle}
  >
    <div className="toggle-showcase-playground">
      <Story />
    </div>
  </div>
);

const typeOptions: ToggleType[] = ['checkBox'];
const typographyOptions: ToggleTypography[] = ['bodyS', 'bodyM'];

const meta = {
  title: 'Atoms/Toggle',
  component: Toggle,
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Figma \`toggle\` (${TOGGLE_FIGMA_NODE_ID}): checkbox bound to **bodyS** (16px) or **bodyM** (20px) line-height; off state uses **userChoice/off/border**; on state **checkbox/body** with white checkmark.`,
      },
    },
  },
  argTypes: {
    type: { control: 'select', options: typeOptions },
    typography: { control: 'select', options: typographyOptions },
    active: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [playgroundSection],
  args: {
    type: 'checkBox',
    typography: 'bodyM',
    active: false,
  },
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { Toggle } from '@/components/atoms/toggle/Toggle';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div style={{ padding: 24 }}>`,
          `      <Toggle type="checkBox" typography="bodyM" active={false} />`,
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
    <div className="toggle-showcase-section toggle-showcase-section--board">
      <div className="toggle-showcase">
        {TOGGLE_VARIANTS.map((variant) => (
          <Toggle
            key={toggleVariantKey(variant)}
            type={variant.type}
            typography={variant.typography}
            active={variant.active}
          />
        ))}
      </div>
    </div>
  ),
};

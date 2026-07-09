import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { showcaseCanvas } from '../../storybook/showcase-decorators';
import { CheckboxToggle } from './CheckboxToggle';
import {
  CHECKBOX_TOGGLE_BOARD_PADDING_PX,
  CHECKBOX_TOGGLE_BOARD_WIDTH_PX,
  CHECKBOX_TOGGLE_FIGMA_NODE_ID,
  CHECKBOX_TOGGLE_PLAYGROUND_BOUND_PX,
  CHECKBOX_TOGGLE_PLAYGROUND_PADDING_PX,
  CHECKBOX_TOGGLE_VARIANTS,
  type CheckboxItemState,
} from './types';
import './checkbox-toggle-showcase.css';

const states: CheckboxItemState[] = ['normal', 'hover', 'click'];

const figmaColumns: { active: boolean }[] = [{ active: false }, { active: true }];

const playgroundSectionStyle = {
  '--showcase-playground-bound-w': `${CHECKBOX_TOGGLE_PLAYGROUND_BOUND_PX}px`,
  '--showcase-playground-bound-h': `${CHECKBOX_TOGGLE_PLAYGROUND_BOUND_PX}px`,
  '--showcase-playground-padding': `${CHECKBOX_TOGGLE_PLAYGROUND_PADDING_PX}px`,
} as CSSProperties;

const boardSectionStyle = {
  '--showcase-board-width': `${CHECKBOX_TOGGLE_BOARD_WIDTH_PX}px`,
  '--showcase-board-padding': CHECKBOX_TOGGLE_BOARD_PADDING_PX,
} as CSSProperties;

const meta = {
  title: 'Components/Checkboxes/CheckboxToggle',
  component: CheckboxToggle,
  tags: ['autodocs'],
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `Figma \`checkboxToggle\` (${CHECKBOX_TOGGLE_FIGMA_NODE_ID}): **20×20** control; **userChoice** on/off tokens; states **normal / hover / click**; off hover/click show preview checkmark.`,
      },
    },
  },
  argTypes: {
    active: { control: 'boolean' },
    disabled: { control: 'boolean' },
    state: { control: 'select', options: states },
  },
  args: {
    active: false,
    disabled: false,
    state: 'normal',
  },
  // Wrap in the playground surface (light — checkbox has no inverted variant)
  // so all non-showcase stories share the same container. AllVariants
  // overrides `render`.
  render: (args) => (
    <div
      className={[
        'showcase-layout-section',
        'showcase-layout-section--playground',
        'showcase-layout-section--playground-surface-light',
      ].join(' ')}
      style={playgroundSectionStyle}
    >
      <div className="showcase-layout-playground">
        <CheckboxToggle {...args} />
      </div>
    </div>
  ),
} satisfies Meta<typeof CheckboxToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    active: false,
    disabled: false,
  },
};

const toggleSnippet = (jsxProps: string) => [
  `import { createRoot } from 'react-dom/client';`,
  `import { CheckboxToggle } from '@/components/checkboxes/CheckboxToggle';`,
  ``,
  `const App = () => {`,
  `  return (`,
  `    <div style={{ padding: 24 }}>`,
  `      <CheckboxToggle ${jsxProps} />`,
  `    </div>`,
  `  );`,
  `};`,
  ``,
  `const root = document.getElementById('root');`,
  `if (root) createRoot(root).render(<App />);`,
].join('\n');

export const OffNormal: Story = {
  name: 'Off / normal',
  args: { active: false, disabled: false, state: 'normal' },
  parameters: { docs: { source: { code: toggleSnippet('active={false}') } } },
};

export const OnNormal: Story = {
  name: 'On / normal',
  args: { active: true, disabled: false, state: 'normal' },
  parameters: { docs: { source: { code: toggleSnippet('active') } } },
};

export const OffHover: Story = {
  name: 'Off / hover',
  args: { active: false, disabled: false, state: 'hover' },
  parameters: { docs: { source: { code: toggleSnippet('active={false} state="hover"') } } },
};

export const OnHover: Story = {
  name: 'On / hover',
  args: { active: true, disabled: false, state: 'hover' },
  parameters: { docs: { source: { code: toggleSnippet('active state="hover"') } } },
};

export const OffClick: Story = {
  name: 'Off / click',
  args: { active: false, disabled: false, state: 'click' },
  parameters: { docs: { source: { code: toggleSnippet('active={false} state="click"') } } },
};

export const OnClick: Story = {
  name: 'On / click',
  args: { active: true, disabled: false, state: 'click' },
  parameters: { docs: { source: { code: toggleSnippet('active state="click"') } } },
};

export const OffDisabled: Story = {
  name: 'Off / disabled',
  args: { active: false, disabled: true, state: 'normal' },
  parameters: { docs: { source: { code: toggleSnippet('active={false} disabled') } } },
};

export const OnDisabled: Story = {
  name: 'On / disabled',
  args: { active: true, disabled: true, state: 'normal' },
  parameters: { docs: { source: { code: toggleSnippet('active disabled') } } },
};

export const AllVariants: Story = {
  name: 'All variants',
  render: () => (
    <div
      className="showcase-layout-section showcase-layout-section--board"
      style={boardSectionStyle}
    >
      <div className="checkbox-toggle-showcase">
        {figmaColumns.map(({ active }) => (
          <div key={active ? 'on' : 'off'} className="checkbox-toggle-showcase__column">
            {CHECKBOX_TOGGLE_VARIANTS.filter((v) => v.active === active).map((variant) => (
              <CheckboxToggle
                key={`${variant.active}-${variant.disabled}-${variant.state}`}
                active={variant.active}
                disabled={variant.disabled}
                state={variant.state === 'normal' ? undefined : variant.state}
                className="checkbox-toggle-showcase__row--static"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  ),
};


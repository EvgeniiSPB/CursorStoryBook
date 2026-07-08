import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { showcaseCanvas } from '../../../storybook/showcase-decorators';
import { SHOWCASE_PLAYGROUND_PADDING_PX } from '../../../storybook/showcase-constants';
import { BadgeText, type BadgeTextProps, type BadgeTextType } from './BadgeText';
import { tonnedSegmentDecorator, TONNED_SEGMENT } from '../decorators';
import '../badge-showcase.css';

const types: BadgeTextType[] = ['filled', 'outlined', 'brand', 'tonned'];

const BADGE_TEXT_PLAYGROUND_BOUND_W_PX = 72;
const BADGE_TEXT_PLAYGROUND_BOUND_H_PX = 24;

const playgroundSectionStyle = {
  '--showcase-playground-bound-w': `${BADGE_TEXT_PLAYGROUND_BOUND_W_PX}px`,
  '--showcase-playground-bound-h': `${BADGE_TEXT_PLAYGROUND_BOUND_H_PX}px`,
  '--showcase-playground-padding': `${SHOWCASE_PLAYGROUND_PADDING_PX}px`,
} as CSSProperties;

const playgroundSection: Decorator = (Story) => (
  <div
    className="showcase-layout-section showcase-layout-section--playground"
    style={playgroundSectionStyle}
  >
    <div className="showcase-layout-playground">
      <Story />
    </div>
  </div>
);

const meta = {
  title: 'Components/Badges/Text',
  component: BadgeText,
  tags: ['autodocs'],
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    type: {
      control: 'select',
      options: types,
    },
    icon: { control: 'boolean' },
    children: { control: 'text', name: 'value' },
  },
  args: {
    children: 'Value',
    type: 'filled',
    icon: true,
  },
  render: (args: BadgeTextProps) => (
    <div {...(args.type === 'tonned' ? { 'data-segment': TONNED_SEGMENT } : {})}>
      <BadgeText {...args} />
    </div>
  ),
} satisfies Meta<typeof BadgeText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  decorators: [playgroundSection],
};

export const Filled: Story = {
  args: { type: 'filled', icon: false },
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { BadgeText } from '@/components/Badges/text/BadgeText';`,
          `import '@/components/Badges/badges-shared.css';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div style={{ padding: 24 }}>`,
          `      <BadgeText type="filled">Value</BadgeText>`,
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

export const FilledWithIcon: Story = {
  name: 'Filled / with icon',
  args: { type: 'filled', icon: true },
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { BadgeText } from '@/components/Badges/text/BadgeText';`,
          `import '@/components/Badges/badges-shared.css';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div style={{ padding: 24 }}>`,
          `      <BadgeText type="filled" icon>Value</BadgeText>`,
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

export const Outlined: Story = {
  args: { type: 'outlined', icon: false },
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { BadgeText } from '@/components/Badges/text/BadgeText';`,
          `import '@/components/Badges/badges-shared.css';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div style={{ padding: 24 }}>`,
          `      <BadgeText type="outlined">Value</BadgeText>`,
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

export const OutlinedWithIcon: Story = {
  name: 'Outlined / with icon',
  args: { type: 'outlined', icon: true },
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { BadgeText } from '@/components/Badges/text/BadgeText';`,
          `import '@/components/Badges/badges-shared.css';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div style={{ padding: 24 }}>`,
          `      <BadgeText type="outlined" icon>Value</BadgeText>`,
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

export const Brand: Story = {
  args: { type: 'brand', icon: false },
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { BadgeText } from '@/components/Badges/text/BadgeText';`,
          `import '@/components/Badges/badges-shared.css';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div style={{ padding: 24 }}>`,
          `      <BadgeText type="brand">Value</BadgeText>`,
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

export const BrandWithIcon: Story = {
  name: 'Brand / with icon',
  args: { type: 'brand', icon: true },
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { BadgeText } from '@/components/Badges/text/BadgeText';`,
          `import '@/components/Badges/badges-shared.css';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div style={{ padding: 24 }}>`,
          `      <BadgeText type="brand" icon>Value</BadgeText>`,
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

export const Tonned: Story = {
  args: { type: 'tonned', icon: false },
  decorators: [tonnedSegmentDecorator],
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { BadgeText } from '@/components/Badges/text/BadgeText';`,
          `import '@/components/Badges/badges-shared.css';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div data-segment="metallic" style={{ padding: 24 }}>`,
          `      <BadgeText type="tonned">Value</BadgeText>`,
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

export const TonnedWithIcon: Story = {
  name: 'Tonned / with icon',
  args: { type: 'tonned', icon: true },
  decorators: [tonnedSegmentDecorator],
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { BadgeText } from '@/components/Badges/text/BadgeText';`,
          `import '@/components/Badges/badges-shared.css';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div data-segment="metallic" style={{ padding: 24 }}>`,
          `      <BadgeText type="tonned" icon>Value</BadgeText>`,
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
    <div className="showcase-layout-section showcase-layout-section--board">
      <div className="badge-showcase">
        {types.map((type) => (
          <div
            key={type}
            className="badge-showcase__column"
            {...(type === 'tonned' ? { 'data-segment': TONNED_SEGMENT } : {})}
          >
            <BadgeText type={type} icon />
            <BadgeText type={type} icon={false} />
          </div>
        ))}
      </div>
    </div>
  ),
};

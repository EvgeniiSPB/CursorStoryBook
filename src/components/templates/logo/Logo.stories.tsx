import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { FIGMA_BODY_FONT_MODE_SLUG } from '../../../tokens/font-mode-options';
import { Logo } from './Logo';
import { LOGO_WIDTH_PX } from './types';
import './logo-showcase.css';

const showcaseCanvas: Decorator = (Story) => (
  <div className="logo-showcase-canvas" data-font-mode={FIGMA_BODY_FONT_MODE_SLUG}>
    <Story />
  </div>
);

const templateSectionStyle = {
  '--logo-width': `${LOGO_WIDTH_PX}px`,
} as CSSProperties;

const meta = {
  title: 'Templates/Logo',
  component: Logo,
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Template: Story = {
  render: () => (
    <div
      className="logo-showcase-section logo-showcase-section--template"
      style={templateSectionStyle}
    >
      <Logo />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { Logo } from '@/components/templates/logo/Logo';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div style={{ padding: 24 }}>`,
          `      <Logo />`,
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

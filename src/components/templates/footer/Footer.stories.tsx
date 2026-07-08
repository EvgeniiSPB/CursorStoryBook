import type { CSSProperties } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { FIGMA_BODY_FONT_MODE_SLUG } from '../../../tokens/font-mode-options';
import { Footer } from './Footer';
import { FOOTER_WIDTH_PX } from './types';
import '../logo/logo.css';
import './footer.css';

const showcaseCanvas: Decorator = (Story) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      minHeight: '100vh',
      padding: 64,
      boxSizing: 'border-box',
      background: '#1e1e1e',
    }}
    data-font-mode={FIGMA_BODY_FONT_MODE_SLUG}
  >
    <Story />
  </div>
);

const boardStyle = {
  width: FOOTER_WIDTH_PX,
  maxWidth: '100%',
} as CSSProperties;

const meta = {
  title: 'Templates/Footer',
  component: Footer,
  decorators: [showcaseCanvas],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Template: Story = {
  render: () => (
    <div style={boardStyle}>
      <Footer />
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: [
          `import { createRoot } from 'react-dom/client';`,
          `import { Footer } from '@/components/templates/footer/Footer';`,
          ``,
          `const App = () => {`,
          `  return (`,
          `    <div style={{ padding: 24, background: '#1e1e1e' }}>`,
          `      <Footer />`,
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

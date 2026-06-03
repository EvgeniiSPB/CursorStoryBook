import type { Decorator } from '@storybook/react-vite';
import { FIGMA_BODY_FONT_MODE_SLUG } from '../tokens/font-mode-options';
import './showcase-layout.css';

/** Dark canvas + Figma body font mode (Oceanic Grotesk). */
export const showcaseCanvas: Decorator = (Story) => (
  <div className="showcase-layout-canvas" data-font-mode={FIGMA_BODY_FONT_MODE_SLUG}>
    <Story />
  </div>
);

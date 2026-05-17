import type { Decorator } from '@storybook/react-vite';
import './tabs-shared.css';

export const tabsCanvasDecorator: Decorator = (Story) => (
  <div className="tabs-canvas">
    <Story />
  </div>
);

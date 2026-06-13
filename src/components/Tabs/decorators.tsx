import type { Decorator } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { TAB_ITEM_SEGMENT } from './types';

/** Figma `4151:379` pins segment **metallic** for tonned counter badge. */
export function TabItemSegmentScope({ children }: { children: ReactNode }) {
  return <div data-segment={TAB_ITEM_SEGMENT}>{children}</div>;
}

export const tabItemSegmentDecorator: Decorator = (Story) => (
  <div data-segment={TAB_ITEM_SEGMENT}>
    <Story />
  </div>
);

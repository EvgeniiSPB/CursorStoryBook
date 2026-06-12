import type { Decorator } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { BUTTON_SOCIAL_SEGMENT } from './types';

/** Figma `4089:7750` pins segment **metallic** for tonned body. */
export function ButtonSocialSegmentScope({ children }: { children: ReactNode }) {
  return <div data-segment={BUTTON_SOCIAL_SEGMENT}>{children}</div>;
}

export const buttonSocialSegmentDecorator: Decorator = (Story) => (
  <div data-segment={BUTTON_SOCIAL_SEGMENT}>
    <Story />
  </div>
);

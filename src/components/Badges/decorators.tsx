import type { Decorator } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import './badges-shared.css';

/** Tonned в макете на segment metallic */
export const TONNED_SEGMENT = 'metallic';

export function TonnedSegmentScope({
  useTonnedSegment,
  children,
}: {
  useTonnedSegment: boolean;
  children: ReactNode;
}) {
  if (useTonnedSegment) {
    return <div data-segment={TONNED_SEGMENT}>{children}</div>;
  }
  return <>{children}</>;
}

export const badgeCanvasDecorator: Decorator = (Story) => (
  <div className="badge-canvas">
    <Story />
  </div>
);

export const tonnedSegmentDecorator: Decorator = (Story) => (
  <div data-segment={TONNED_SEGMENT}>
    <Story />
  </div>
);

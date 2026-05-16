import type { Preview } from '@storybook/react-vite';
import { SEGMENT_OPTIONS } from '../src/tokens/segment-options';
import '../src/styles/global.css';

const segmentToolbarItems = SEGMENT_OPTIONS.map(({ slug, title }) => ({
  value: slug,
  title: title.charAt(0).toUpperCase() + title.slice(1),
}));

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Цветовая тема (light/dark — dark после отдельной сборки токенов)',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow' as const,
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
    segment: {
      description: `Сегмент бренда (${SEGMENT_OPTIONS.length} палитр из 07 - segment)`,
      toolbar: {
        title: 'Segment',
        icon: 'paintbrush',
        items: segmentToolbarItems,
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
    segment: 'crimson',
  },
  decorators: [
    (Story, { globals }) => (
      <div
        data-theme={globals.theme}
        data-segment={globals.segment}
        style={{
          minHeight: '100vh',
          padding: 'var(--spaces-static-400, 16px)',
          backgroundColor: 'var(--black-and-white-white, #ffffff)',
          color: 'var(--text-primary, var(--primary-primary, #1d2126))',
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;

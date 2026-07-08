import type { Preview } from '@storybook/react-vite';
import {
  DEFAULT_FONT_MODE_SLUG,
  FIGMA_BODY_FONT_MODE_SLUG,
  FONT_MODE_OPTIONS,
} from '../src/tokens/font-mode-options';
import {
  DEFAULT_LINE_HEIGHT_MODE_SLUG,
  LINE_HEIGHT_MODE_OPTIONS,
} from '../src/tokens/line-height-mode-options';
import { SEGMENT_OPTIONS } from '../src/tokens/segment-options';
import { CodeOnlyDocs } from '../src/storybook/CodeOnlyDocs';
import '../src/styles/global.css';
// Preload PP Neue Montreal so left-sidebar atoms render with the correct typography from the very first frame.
import '../src/components/templates/left-side-bar/left-side-bar-fonts.css';

const segmentToolbarItems = SEGMENT_OPTIONS.map(({ slug, title }) => ({
  value: slug,
  title: title.charAt(0).toUpperCase() + title.slice(1),
}));

const fontModeToolbarItems = FONT_MODE_OPTIONS.map(({ slug, title }) => ({
  value: slug,
  title,
}));

const lineHeightModeToolbarItems = LINE_HEIGHT_MODE_OPTIONS.map(({ slug, title }) => ({
  value: slug,
  title: title.charAt(0).toUpperCase() + title.slice(1),
}));

const preview: Preview = {
  tags: ['autodocs'],
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
    fontMode: {
      description: `Семейство шрифтов (${FONT_MODE_OPTIONS.length} modes из 03 - typography). По умолчанию ${FIGMA_BODY_FONT_MODE_SLUG} — body в Components и text - core.`,
      toolbar: {
        title: 'Font',
        icon: 'paragraph',
        items: fontModeToolbarItems,
        dynamicTitle: true,
      },
    },
    lineHeightMode: {
      description: `Межстрочный интервал (${LINE_HEIGHT_MODE_OPTIONS.length} modes из 02 - lineHeights)`,
      toolbar: {
        title: 'Line height',
        icon: 'grow',
        items: lineHeightModeToolbarItems,
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
    segment: 'crimson',
    fontMode: DEFAULT_FONT_MODE_SLUG,
    lineHeightMode: DEFAULT_LINE_HEIGHT_MODE_SLUG,
  },
  decorators: [
    (Story, { globals }) => (
      <div
        data-theme={globals.theme}
        data-segment={globals.segment}
        data-font-mode={globals.fontMode}
        data-line-height-mode={globals.lineHeightMode}
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
    docs: {
      page: CodeOnlyDocs,
    },
    options: {
      // Force the blank welcome story to sort first so Storybook's default
      // landing picks an empty canvas, not the alphabetically-first real
      // component's Docs page.
      storySort: {
        order: ['0Welcome', '*'],
      },
    },
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

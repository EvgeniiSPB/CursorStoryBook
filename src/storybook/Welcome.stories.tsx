import type { Meta, StoryObj } from '@storybook/react-vite';
import { showcaseCanvas } from './showcase-decorators';

// Blank landing story. Title starts with a digit so it sorts ASCII-first
// across the whole index and Storybook auto-selects it on a fresh visit.
// Hidden from the custom LeftSideBar via HIDDEN_TITLE_PREFIXES (= "0Welcome")
// in section-config.ts.

const meta = {
  title: '0Welcome',
  parameters: {
    layout: 'fullscreen',
    docs: { disable: true },
  },
  tags: ['!autodocs'],
  // Reuse the shared dark canvas decorator (#1e1e1e) so the empty landing
  // matches the visual treatment of every component story.
  decorators: [showcaseCanvas],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Blank: Story = {
  render: () => <></>,
};

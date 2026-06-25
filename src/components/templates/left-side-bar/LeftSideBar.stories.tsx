import { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { LeftSideBar } from './LeftSideBar';
import { ASSETS_SECTION, COMPONENTS_SECTION } from './mock-data';
import { buildSidebarFromIndex } from './build-sidebar';
import { SECTION_CONFIGS } from './section-config';
import { SAMPLE_INDEX } from './sample-index';

const meta = {
  title: 'Templates/LeftSideBar',
  component: LeftSideBar,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof LeftSideBar>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Pilot — sections built from hand-written mock data (legacy snapshot).
 * Kept for visual reference; the `FromIndex` story below uses the actual converter.
 */
export const ComponentsPilot: Story = {
  args: {
    sections: [COMPONENTS_SECTION, ASSETS_SECTION],
    defaultOpenItemIds: ['badges'],
  },
  render: (args) => {
    const [activeId, setActiveId] = useState<string | undefined>(undefined);
    return <LeftSideBar {...args} activeId={activeId} onSelect={setActiveId} />;
  },
};

/**
 * All groups collapsed — initial visual of the section heading + 1st-lvl rows.
 */
export const ComponentsCollapsed: Story = {
  args: {
    sections: [COMPONENTS_SECTION, ASSETS_SECTION],
  },
  render: (args) => {
    const [activeId, setActiveId] = useState<string | undefined>(undefined);
    return <LeftSideBar {...args} activeId={activeId} onSelect={setActiveId} />;
  },
};

/**
 * Mirrors the screenshot of the legacy sidebar — Badges expanded, BadgeGroup + Digits open,
 * `Digits / Docs` selected.
 */
export const ComponentsWithActive: Story = {
  args: {
    sections: [COMPONENTS_SECTION, ASSETS_SECTION],
    defaultOpenItemIds: [
      'badges',
      'components-badges-badge-group',
      'components-badges-digits',
    ],
  },
  render: (args) => {
    const [activeId, setActiveId] = useState<string | undefined>(
      'components-badges-digits--docs',
    );
    return <LeftSideBar {...args} activeId={activeId} onSelect={setActiveId} />;
  },
};

/**
 * **Phase 2.0 — converter demo.**
 * Sections produced by `buildSidebarFromIndex(SAMPLE_INDEX, SECTION_CONFIGS)`.
 * `SAMPLE_INDEX` mirrors the real `api.getIndex()` shape (Storybook-sanitized story IDs),
 * `SECTION_CONFIGS` carries hard-coded heading metadata (label, badge, count, flatLayout).
 *
 * Phase 2.1 will swap `SAMPLE_INDEX` for the live `api.getIndex()` call inside `.storybook/manager.tsx`.
 */
export const FromIndex: Story = {
  args: {
    // overridden by render — args here only satisfy strict mode
    sections: [],
    defaultOpenItemIds: ['components-badges'],
  },
  render: (args) => {
    const sections = useMemo(
      () => buildSidebarFromIndex(SAMPLE_INDEX, SECTION_CONFIGS),
      [],
    );
    const [activeId, setActiveId] = useState<string | undefined>(undefined);
    return (
      <LeftSideBar
        {...args}
        sections={sections}
        activeId={activeId}
        onSelect={setActiveId}
      />
    );
  },
};

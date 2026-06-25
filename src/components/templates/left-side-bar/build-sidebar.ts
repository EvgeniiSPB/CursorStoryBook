import type {
  SidebarLeafItem,
  SidebarLvl1Item,
  SidebarLvl2Item,
  SidebarSection,
} from './types';
import type { SidebarSectionConfig } from './section-config';

/** Minimal subset of Storybook's `api.getIndex()` shape that the converter needs.
 *  Real Storybook entries carry many more fields — we only consume `id/title/name/type`. */
export interface StoryIndexEntry {
  id: string;
  title: string;
  name: string;
  type: 'story' | 'docs';
}

export interface StoryIndex {
  entries: Record<string, StoryIndexEntry>;
}

/** Convert a Storybook story index into the sidebar's `SidebarSection[]` data model
 *  using a static section config (labels, badge counts, flat-layout flags).
 *  `excludeTitlePrefixes` skips any entry whose title equals or starts with
 *  `${prefix}/` — used to hide stories like the sidebar's own demo from itself. */
export function buildSidebarFromIndex(
  index: StoryIndex,
  configs: readonly SidebarSectionConfig[],
  excludeTitlePrefixes: readonly string[] = [],
): SidebarSection[] {
  const isExcluded = (title: string) =>
    excludeTitlePrefixes.some(
      (prefix) => title === prefix || title.startsWith(`${prefix}/`),
    );

  // Bucket entries by their first title segment.
  const bySection = new Map<string, StoryIndexEntry[]>();
  for (const entry of Object.values(index.entries)) {
    if (isExcluded(entry.title)) continue;
    const segment = entry.title.split('/')[0];
    if (!segment) continue;
    const bucket = bySection.get(segment) ?? [];
    bucket.push(entry);
    bySection.set(segment, bucket);
  }

  const sortedConfigs = [...configs].sort((a, b) => a.order - b.order);

  const sections: SidebarSection[] = [];
  for (const config of sortedConfigs) {
    const entries = bySection.get(config.titleSegment);
    if (!entries || entries.length === 0) continue;

    sections.push({
      id: slug(config.titleSegment),
      heading: {
        label: config.label,
        count: config.count,
        badge: config.badge,
      },
      items: config.flatLayout
        ? buildFlatItems(entries, config.titleSegment)
        : buildGroupedItems(entries, config.titleSegment),
    });
  }

  return sections;
}

/* --------------------------------------------------------------------------
 * helpers
 * ------------------------------------------------------------------------ */

/** Storybook-compatible sanitize from `@storybook/csf` — lowercase + special-chars → dash.
 *  Does NOT split camelCase, so `BadgeGroup` → `badgegroup` (matches real Storybook IDs). */
function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/[\s\-/\\.,_=+!@#$%^&*()|?;:'"<>{}\[\]’–—]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function leafLabel(entry: StoryIndexEntry): string {
  return entry.type === 'docs' ? 'Docs' : entry.name;
}

/** Place docs first, then preserve declared story order. */
function sortLeaves(entries: StoryIndexEntry[]): StoryIndexEntry[] {
  return [...entries].sort((a, b) => {
    if (a.type === 'docs' && b.type !== 'docs') return -1;
    if (b.type === 'docs' && a.type !== 'docs') return 1;
    return 0;
  });
}

/** Standard 3-level layout: section → lvl1 (component group) → lvl2 (component) → leaf (story).
 *
 *  Per-1st-lvl auto-flat: if every entry under a 1st-lvl row has only 2 title
 *  segments (e.g. `Atoms/Avatar`, `Templates/Footer`), there is no real 2nd-lvl
 *  grouping to make and we'd otherwise render a redundant "Avatar > Avatar" row.
 *  Such 1st-lvls render leaves directly (same layout as the Icons exception). */
function buildGroupedItems(
  entries: StoryIndexEntry[],
  sectionSegment: string,
): SidebarLvl1Item[] {
  const byLvl1 = new Map<string, StoryIndexEntry[]>();
  for (const entry of entries) {
    const segments = entry.title.split('/');
    const lvl1 = segments[1] ?? '_';
    const bucket = byLvl1.get(lvl1) ?? [];
    bucket.push(entry);
    byLvl1.set(lvl1, bucket);
  }

  const items: SidebarLvl1Item[] = [];
  for (const [lvl1Label, lvl1Entries] of byLvl1) {
    const hasLvl2Segment = lvl1Entries.some(
      (e) => e.title.split('/').length >= 3,
    );

    if (!hasLvl2Segment) {
      const leaves: SidebarLeafItem[] = sortLeaves(lvl1Entries).map((e) => ({
        id: e.id,
        label: leafLabel(e),
      }));
      items.push({
        id: `${slug(sectionSegment)}-${slug(lvl1Label)}`,
        label: lvl1Label,
        layout: 'flat',
        children: leaves,
      });
      continue;
    }

    const byLvl2 = new Map<string, StoryIndexEntry[]>();
    for (const entry of lvl1Entries) {
      const segments = entry.title.split('/');
      const lvl2 = segments[2] ?? lvl1Label;
      const bucket = byLvl2.get(lvl2) ?? [];
      bucket.push(entry);
      byLvl2.set(lvl2, bucket);
    }

    const children: SidebarLvl2Item[] = [];
    for (const [lvl2Label, lvl2Entries] of byLvl2) {
      const leaves: SidebarLeafItem[] = sortLeaves(lvl2Entries).map((e) => ({
        id: e.id,
        label: leafLabel(e),
      }));
      children.push({
        id: `${slug(sectionSegment)}-${slug(lvl1Label)}-${slug(lvl2Label)}`,
        label: lvl2Label,
        children: leaves,
      });
    }

    items.push({
      id: `${slug(sectionSegment)}-${slug(lvl1Label)}`,
      label: lvl1Label,
      children,
    });
  }

  return items;
}

/** Flat layout (Assets/Icons exception): section → lvl1 → leaves directly, no lvl2. */
function buildFlatItems(
  entries: StoryIndexEntry[],
  sectionSegment: string,
): SidebarLvl1Item[] {
  const byLvl1 = new Map<string, StoryIndexEntry[]>();
  for (const entry of entries) {
    const segments = entry.title.split('/');
    const lvl1 = segments[1] ?? '_';
    const bucket = byLvl1.get(lvl1) ?? [];
    bucket.push(entry);
    byLvl1.set(lvl1, bucket);
  }

  const items: SidebarLvl1Item[] = [];
  for (const [lvl1Label, lvl1Entries] of byLvl1) {
    const leaves: SidebarLeafItem[] = sortLeaves(lvl1Entries).map((e) => ({
      id: e.id,
      label: leafLabel(e),
    }));
    items.push({
      id: `${slug(sectionSegment)}-${slug(lvl1Label)}`,
      label: lvl1Label,
      layout: 'flat',
      children: leaves,
    });
  }

  return items;
}

import type { DropdownHeadingBadge } from './types';

/**
 * Static config that maps a Storybook story-title root segment to a sidebar section.
 * `count` and `badge` are hard-coded from Figma per heading.
 * `flatLayout` collapses the 2nd-lvl nesting for sections like Icons (Figma exception).
 */
export interface SidebarSectionConfig {
  /** First title segment to match (case-sensitive). E.g. for `Components/Badges/Text` → `Components`. */
  titleSegment: string;
  /** Display label in `DropdownHeading`. */
  label: string;
  /** Hard-coded badge count from Figma — not derived from real story count. */
  count: number;
  badge: DropdownHeadingBadge;
  /** If true, every 1st-lvl row in this section opens directly to leaves (Figma Assets/Icons exception). */
  flatLayout?: boolean;
  /** Display order in the sidebar (ascending). */
  order: number;
}

export const SECTION_CONFIGS: readonly SidebarSectionConfig[] = [
  {
    titleSegment: 'Components',
    label: 'Components',
    count: 705,
    badge: 'crimson',
    order: 1,
  },
  {
    titleSegment: 'Icons',
    label: 'Assets',
    count: 24,
    badge: 'crimson',
    flatLayout: true,
    order: 2,
  },
];

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

/**
 * Counts and labels are hard-coded from the Figma `left side bar` (node 6517:31188);
 * badges are crimson across the board. The `titleSegment` matches the first segment
 * of each Storybook story `title`, e.g. `Atoms/Avatar` → `Atoms`.
 *
 * Stories under title roots not listed here (e.g. `Example/...`) are hidden from
 * the custom sidebar — they're not part of the design system.
 */
/**
 * Story titles whose entries are filtered out before grouping into the sidebar.
 * Match is case-sensitive on the full title or by `${prefix}/` start so a single
 * entry like `Templates/LeftSideBar` removes both the row itself and the meta
 * docs entry under it.
 *
 * Used to hide the LeftSideBar's own demo stories from the production sidebar —
 * they're for the design system's authors, not its users.
 */
export const HIDDEN_TITLE_PREFIXES: readonly string[] = [
  'Templates/LeftSideBar',
];

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
  {
    titleSegment: 'Atoms',
    label: 'Atoms',
    count: 257,
    badge: 'crimson',
    order: 3,
  },
  {
    titleSegment: 'Constructors',
    label: 'Constructors',
    count: 97,
    badge: 'crimson',
    order: 4,
  },
  {
    titleSegment: 'Templates',
    label: 'Templates',
    count: 54,
    badge: 'crimson',
    order: 5,
  },
  {
    titleSegment: 'Shapes',
    label: 'Shapes',
    count: 153,
    badge: 'crimson',
    order: 6,
  },
];

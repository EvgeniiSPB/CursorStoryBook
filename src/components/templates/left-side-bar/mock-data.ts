import type { SidebarSection } from './types';

/**
 * "Assets" section (Figma node `6517:31202`) — exception to the standard 3-level nesting.
 * Single 1st-lvl row "Icons" opens directly to 3rd-lvl leaves (no 2nd-lvl wrapper).
 * Source: `src/components/Icon/Icon.stories.tsx` (title "Icons/Icon", 2 exports + Docs).
 * Count `24` is hard-coded from the Figma badge (not derived from real icon count).
 */
export const ASSETS_SECTION: SidebarSection = {
  id: 'assets',
  heading: {
    label: 'Assets',
    count: 24,
    badge: 'crimson',
  },
  items: [
    {
      id: 'icons',
      label: 'Icons',
      layout: 'flat',
      children: [
        { id: 'icons-icon--docs', label: 'Docs' },
        { id: 'icons-icon--all-icons-20', label: 'All / 20px' },
        { id: 'icons-icon--all-icons-28', label: 'All / 28px' },
      ],
    },
  ],
};

/**
 * Pilot mock data for the LeftSideBar composer - section "Components".
 * IDs match Storybook's auto-generated story IDs (paramCase of title path + "--" + paramCase of export name).
 * Labels mirror what Storybook shows in its default sidebar (uses `name:` override when set).
 *
 * Source files counted: 17 (3 × Badges, 4 × Tabs, 2 × Tags, 5 × Buttons, 2 × Checkboxes, 1 × Input).
 * Each component contributes a `Docs` leaf (Storybook auto-generated) on top of its exports.
 * Total 3rd-lvl variants in this section: 81.
 */

export const COMPONENTS_SECTION: SidebarSection = {
  id: 'components',
  heading: {
    // Per Figma node 6520:95012 - `Components` heading uses the crimson badge
    // variant with the hard-coded value from the design (705).
    label: 'Components',
    count: 705,
    badge: 'crimson',
  },
  items: [
    {
      id: 'badges',
      label: 'Badges',
      children: [
        {
          id: 'components-badges-badge-group',
          label: 'BadgeGroup',
          children: [
            { id: 'components-badges-badge-group--docs', label: 'Docs' },
            { id: 'components-badges-badge-group--playground', label: 'Playground' },
            { id: 'components-badges-badge-group--digits-two', label: 'digits=2' },
            { id: 'components-badges-badge-group--digits-three', label: 'digits=3' },
            { id: 'components-badges-badge-group--all-variants', label: 'All variants' },
          ],
        },
        {
          id: 'components-badges-digits',
          label: 'Digits',
          children: [
            { id: 'components-badges-digits--docs', label: 'Docs' },
            { id: 'components-badges-digits--playground', label: 'Playground' },
            { id: 'components-badges-digits--outlined-one-two', label: 'Outlined / 1-2 chars' },
            { id: 'components-badges-digits--outlined-three', label: 'Outlined / 3 chars' },
            {
              id: 'components-badges-digits--outlined-constant-inverted-one-two',
              label: 'Outlined constant inverted / 1-2 chars',
            },
            {
              id: 'components-badges-digits--outlined-constant-inverted-three',
              label: 'Outlined constant inverted / 3 chars',
            },
            { id: 'components-badges-digits--tonned-one-two', label: 'Tonned / 1-2 chars' },
            { id: 'components-badges-digits--tonned-three', label: 'Tonned / 3 chars' },
            { id: 'components-badges-digits--all-variants', label: 'All variants' },
          ],
        },
        {
          id: 'components-badges-text',
          label: 'Text',
          children: [
            { id: 'components-badges-text--docs', label: 'Docs' },
            { id: 'components-badges-text--playground', label: 'Playground' },
            { id: 'components-badges-text--filled', label: 'Filled' },
            { id: 'components-badges-text--filled-with-icon', label: 'Filled / with icon' },
            { id: 'components-badges-text--outlined', label: 'Outlined' },
            { id: 'components-badges-text--outlined-with-icon', label: 'Outlined / with icon' },
            { id: 'components-badges-text--brand', label: 'Brand' },
            { id: 'components-badges-text--brand-with-icon', label: 'Brand / with icon' },
            { id: 'components-badges-text--tonned', label: 'Tonned' },
            { id: 'components-badges-text--tonned-with-icon', label: 'Tonned / with icon' },
            { id: 'components-badges-text--all-variants', label: 'All variants' },
          ],
        },
      ],
    },
    {
      id: 'tabs',
      label: 'Tabs',
      children: [
        {
          id: 'components-tabs-tab-feature-digit',
          label: 'Tab Feature Digit',
          children: [
            { id: 'components-tabs-tab-feature-digit--docs', label: 'Docs' },
            { id: 'components-tabs-tab-feature-digit--playground', label: 'Playground' },
            { id: 'components-tabs-tab-feature-digit--all-variants', label: 'All variants' },
          ],
        },
        {
          id: 'components-tabs-tab-item',
          label: 'Tab Item',
          children: [
            { id: 'components-tabs-tab-item--docs', label: 'Docs' },
            { id: 'components-tabs-tab-item--playground', label: 'Playground' },
            { id: 'components-tabs-tab-item--all-variants', label: 'All variants' },
          ],
        },
        {
          id: 'components-tabs-tabs-group-column',
          label: 'Tabs Group Column',
          children: [
            { id: 'components-tabs-tabs-group-column--docs', label: 'Docs' },
            { id: 'components-tabs-tabs-group-column--playground', label: 'Playground' },
            { id: 'components-tabs-tabs-group-column--all-variants', label: 'All variants' },
          ],
        },
        {
          id: 'components-tabs-tabs-group-row',
          label: 'Tabs Group Row',
          children: [
            { id: 'components-tabs-tabs-group-row--docs', label: 'Docs' },
            { id: 'components-tabs-tabs-group-row--playground', label: 'Playground' },
            { id: 'components-tabs-tabs-group-row--all-variants', label: 'All variants' },
          ],
        },
      ],
    },
    {
      id: 'tags',
      label: 'Tags',
      children: [
        {
          id: 'components-tags-tag',
          label: 'Tag',
          children: [
            { id: 'components-tags-tag--docs', label: 'Docs' },
            { id: 'components-tags-tag--playground', label: 'Playground' },
            { id: 'components-tags-tag--all-variants', label: 'All variants' },
          ],
        },
        {
          id: 'components-tags-tag-group',
          label: 'TagGroup',
          children: [
            { id: 'components-tags-tag-group--docs', label: 'Docs' },
            { id: 'components-tags-tag-group--playground', label: 'Playground' },
            { id: 'components-tags-tag-group--all-variants', label: 'All variants' },
          ],
        },
      ],
    },
    {
      id: 'buttons',
      label: 'Buttons',
      children: [
        {
          id: 'components-buttons-button-icon-only',
          label: 'Button Icon Only',
          children: [
            { id: 'components-buttons-button-icon-only--docs', label: 'Docs' },
            { id: 'components-buttons-button-icon-only--playground', label: 'Playground' },
            { id: 'components-buttons-button-icon-only--all-variants', label: 'All variants' },
          ],
        },
        {
          id: 'components-buttons-button-social',
          label: 'Button Social',
          children: [
            { id: 'components-buttons-button-social--docs', label: 'Docs' },
            { id: 'components-buttons-button-social--playground', label: 'Playground' },
            { id: 'components-buttons-button-social--all-variants', label: 'All variants' },
          ],
        },
        {
          id: 'components-buttons-button-text',
          label: 'Button Text',
          children: [
            { id: 'components-buttons-button-text--docs', label: 'Docs' },
            { id: 'components-buttons-button-text--playground', label: 'Playground' },
            { id: 'components-buttons-button-text--all-variants', label: 'All variants' },
          ],
        },
        {
          id: 'components-buttons-button-text-icon',
          label: 'Button Text Icon',
          children: [
            { id: 'components-buttons-button-text-icon--docs', label: 'Docs' },
            { id: 'components-buttons-button-text-icon--playground', label: 'Playground' },
            { id: 'components-buttons-button-text-icon--all-variants', label: 'All variants' },
          ],
        },
        {
          id: 'components-buttons-button-text-only',
          label: 'Button Text Only',
          children: [
            { id: 'components-buttons-button-text-only--docs', label: 'Docs' },
            { id: 'components-buttons-button-text-only--playground', label: 'Playground' },
            { id: 'components-buttons-button-text-only--all-variants', label: 'All variants' },
          ],
        },
      ],
    },
    {
      id: 'checkboxes',
      label: 'Checkboxes',
      children: [
        {
          id: 'components-checkboxes-checkbox-item',
          label: 'CheckboxItem',
          children: [
            { id: 'components-checkboxes-checkbox-item--docs', label: 'Docs' },
            { id: 'components-checkboxes-checkbox-item--playground', label: 'Playground' },
            { id: 'components-checkboxes-checkbox-item--unchecked', label: 'Unchecked' },
            { id: 'components-checkboxes-checkbox-item--checked', label: 'Checked' },
            { id: 'components-checkboxes-checkbox-item--disabled-unchecked', label: 'Disabled / unchecked' },
            { id: 'components-checkboxes-checkbox-item--disabled-checked', label: 'Disabled / checked' },
            { id: 'components-checkboxes-checkbox-item--all-variants', label: 'All variants' },
            { id: 'components-checkboxes-checkbox-item--interactive', label: 'Interactive (hover / click)' },
          ],
        },
        {
          id: 'components-checkboxes-checkbox-toggle',
          label: 'CheckboxToggle',
          children: [
            { id: 'components-checkboxes-checkbox-toggle--docs', label: 'Docs' },
            { id: 'components-checkboxes-checkbox-toggle--playground', label: 'Playground' },
            { id: 'components-checkboxes-checkbox-toggle--off-normal', label: 'Off / normal' },
            { id: 'components-checkboxes-checkbox-toggle--on-normal', label: 'On / normal' },
            { id: 'components-checkboxes-checkbox-toggle--off-hover', label: 'Off / hover' },
            { id: 'components-checkboxes-checkbox-toggle--on-hover', label: 'On / hover' },
            { id: 'components-checkboxes-checkbox-toggle--off-click', label: 'Off / click' },
            { id: 'components-checkboxes-checkbox-toggle--on-click', label: 'On / click' },
            { id: 'components-checkboxes-checkbox-toggle--off-disabled', label: 'Off / disabled' },
            { id: 'components-checkboxes-checkbox-toggle--on-disabled', label: 'On / disabled' },
            { id: 'components-checkboxes-checkbox-toggle--all-variants', label: 'All variants' },
            { id: 'components-checkboxes-checkbox-toggle--interactive', label: 'Interactive (hover / click)' },
          ],
        },
      ],
    },
    {
      id: 'input',
      label: 'Input',
      children: [
        {
          id: 'components-input-input-outlined',
          label: 'InputOutlined',
          children: [
            { id: 'components-input-input-outlined--docs', label: 'Docs' },
            { id: 'components-input-input-outlined--playground', label: 'Playground' },
            { id: 'components-input-input-outlined--all-variants', label: 'All variants' },
          ],
        },
      ],
    },
  ],
};

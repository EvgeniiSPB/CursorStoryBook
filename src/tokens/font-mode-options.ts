import fontModesManifest from '../styles/generated/typography-modes/font-modes.json';

export type FontModeOption = {
  slug: string;
  title: string;
};

export const FONT_MODE_OPTIONS: FontModeOption[] = fontModesManifest;

/** Figma `03 - typography` default for built tokens (`:root`). */
export const TOKEN_DEFAULT_FONT_MODE_SLUG = 'oceanic-text';

/**
 * Body copy in Components / `text - core` (fontFamilies/body).
 * Storybook Font toolbar should start here to match Figma.
 */
export const FIGMA_BODY_FONT_MODE_SLUG = 'oceanic-grotesk';

/** Initial Storybook toolbar value (see `.storybook/preview.tsx`). */
export const DEFAULT_FONT_MODE_SLUG = FIGMA_BODY_FONT_MODE_SLUG;

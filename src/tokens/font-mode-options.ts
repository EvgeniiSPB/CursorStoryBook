import fontModesManifest from '../styles/generated/typography-modes/font-modes.json';

export type FontModeOption = {
  slug: string;
  title: string;
};

export const FONT_MODE_OPTIONS: FontModeOption[] = fontModesManifest;

export const DEFAULT_FONT_MODE_SLUG = 'oceanic-text';

import lineHeightModesManifest from '../styles/generated/line-height-modes/line-height-modes.json';

export type LineHeightModeOption = {
  slug: string;
  title: string;
};

export const LINE_HEIGHT_MODE_OPTIONS: LineHeightModeOption[] =
  lineHeightModesManifest;

export const DEFAULT_LINE_HEIGHT_MODE_SLUG = 'tight';

/** Figma `text - paragraph` (171:839) */
export const TEXT_PARAGRAPH_LINE_HEIGHT_MODE_SLUG = 'wide';

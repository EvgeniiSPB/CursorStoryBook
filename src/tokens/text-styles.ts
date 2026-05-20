import textStylesManifest from '../styles/generated/text-styles/text-styles.json';

export type TextStyleRole = 'display' | 'headline' | 'body' | 'special';
export type TextStyleWeight = 'regular' | 'medium';

export type TextStyleManifestEntry = (typeof textStylesManifest.styles)[number];

export const TEXT_STYLES_MANIFEST = textStylesManifest;

/** CSS class for a Figma composite text style, e.g. display/XS/regular → text-style--display-xs-regular */
export function textStyleClassName(
  role: TextStyleRole,
  size: string,
  weight: TextStyleWeight,
): string {
  return `text-style--${role}-${size}-${weight}`;
}

/** displayXS → xs, bodyL → l, special → one-size */
export function atomTypographyToTextStyleSize(
  typography: string,
  role: TextStyleRole,
): string {
  if (typography === 'special') return 'one-size';

  const prefix =
    role === 'display' ? 'display' : role === 'headline' ? 'headline' : 'body';
  if (!typography.startsWith(prefix)) {
    throw new Error(`Typography "${typography}" does not match role "${role}"`);
  }
  return typography.slice(prefix.length).toLowerCase();
}

export function atomTypographyToTextStyleClass(
  role: TextStyleRole,
  typography: string,
  weight: TextStyleWeight,
): string {
  const size = atomTypographyToTextStyleSize(typography, role);
  return textStyleClassName(role, size, weight);
}

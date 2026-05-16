import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';

let registered = false;

export function setupStyleDictionary() {
  if (registered) return StyleDictionary;
  registered = true;

  register(StyleDictionary);

  StyleDictionary.registerTransform({
    name: 'figma/dtcg-color/css',
    type: 'value',
    transitive: true,
    filter: (token) => {
      const value = token.$value ?? token.value;
      return (
        (token.$type ?? token.type) === 'color' &&
        value &&
        typeof value === 'object' &&
        Array.isArray(value.components)
      );
    },
    transform: (token) => {
      const { components, alpha = 1 } = token.$value ?? token.value;
      const [r, g, b] = components.map((c) => Math.round(Number(c) * 255));
      return `rgba(${r}, ${g}, ${b}, ${Number(alpha)})`;
    },
  });

  StyleDictionary.registerTransformGroup({
    name: 'tokens-studio-figma',
    transforms: [
      'ts/descriptionToComment',
      'ts/resolveMath',
      'ts/size/px',
      'ts/opacity',
      'ts/size/lineheight',
      'ts/typography/fontWeight',
      'ts/color/modifiers',
      'figma/dtcg-color/css',
      'ts/color/css/hexrgba',
      'ts/size/css/letterspacing',
      'ts/shadow/innerShadow',
      'name/kebab',
    ],
  });

  return StyleDictionary;
}

export const baseTokenSources = [
  '00 - xBase/4 px.tokens.json',
  '02 - lineHeights/tight.tokens.json',
  '03 - typography/Oceanic Grotesk.tokens.json',
  '04 - paragraphIndent/false.tokens.json',
  '06 - semantic/light.tokens.json',
  'Mode 1.tokens.json',
  'Mode 1.tokens-1.json',
  'Mode 1.tokens-2.json',
];

export const segmentDir = '07 - segment';

/** Slug for data-segment / CSS file name (e.g. "vivid violet" → "vivid-violet") */
export function segmentNameToSlug(name) {
  return name.trim().toLowerCase().replace(/\s+/g, '-');
}

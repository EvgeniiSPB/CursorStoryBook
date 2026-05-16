import { baseTokenSources, setupStyleDictionary } from './style-dictionary.shared.mjs';

setupStyleDictionary();

export default {
  source: baseTokenSources,
  preprocessors: ['tokens-studio'],
  platforms: {
    css: {
      transformGroup: 'tokens-studio-figma',
      buildPath: 'src/styles/generated/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
        },
      ],
    },
  },
};

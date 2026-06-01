import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setupStyleDictionary } from '../style-dictionary.shared.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'src/styles/generated');

function wrapThemeCss(css, selector) {
  const match = css.match(/:root\s*\{([\s\S]*)\}\s*$/);
  if (!match) {
    throw new Error(`Unexpected CSS structure for selector "${selector}"`);
  }
  return `/**\n * Do not edit directly.\n */\n${selector} {${match[1]}}\n`;
}

function isSemanticColorToken(token) {
  if ((token.$type ?? token.type) !== 'color') return false;
  const top = token.path?.[0];
  if (!top || top.startsWith('$')) return false;
  return true;
}

async function buildSemanticTheme(StyleDictionary, { sourceFile, selector, destination }) {
  const sd = new StyleDictionary({
    source: [path.join(root, '06 - semantic', sourceFile)],
    preprocessors: ['tokens-studio'],
    platforms: {
      css: {
        transformGroup: 'tokens-studio-figma',
        buildPath: 'src/styles/generated/',
        files: [
          {
            destination,
            format: 'css/variables',
            filter: isSemanticColorToken,
          },
        ],
      },
    },
  });

  await sd.buildAllPlatforms();

  const cssPath = path.join(outDir, destination);
  const raw = await readFile(cssPath, 'utf8');
  await writeFile(cssPath, wrapThemeCss(raw, selector));
}

async function writeIndex() {
  const content = `/* Auto-generated semantic theme overrides */
@import './semantic-light.css';
@import './semantic-dark.css';
`;
  await writeFile(path.join(outDir, 'semantic-themes/index.css'), content);
}

async function main() {
  const StyleDictionary = setupStyleDictionary();
  await mkdir(path.join(outDir, 'semantic-themes'), { recursive: true });

  await buildSemanticTheme(StyleDictionary, {
    sourceFile: 'light.tokens.json',
    selector: ':root,\n[data-theme="light"]',
    destination: 'semantic-themes/semantic-light.css',
  });
  console.log('  theme: light → semantic-themes/semantic-light.css');

  await buildSemanticTheme(StyleDictionary, {
    sourceFile: 'dark.tokens.json',
    selector: '[data-theme="dark"]',
    destination: 'semantic-themes/semantic-dark.css',
  });
  console.log('  theme: dark → semantic-themes/semantic-dark.css');

  await writeIndex();
  console.log('Built semantic theme CSS in src/styles/generated/semantic-themes/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

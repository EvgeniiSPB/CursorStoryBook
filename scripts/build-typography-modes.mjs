import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  defaultFontModeSlug,
  segmentNameToSlug,
  setupStyleDictionary,
  typographyDir,
} from '../style-dictionary.shared.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'src/styles/generated/typography-modes');

async function getFontModes() {
  const dir = path.join(root, typographyDir);
  const files = (await readdir(dir)).filter((f) => f.endsWith('.tokens.json'));
  const modes = [];

  for (const file of files) {
    const content = await readFile(path.join(dir, file), 'utf8');
    const json = JSON.parse(content);
    const modeName = json.$extensions?.['com.figma.modeName'];
    const slug = segmentNameToSlug(modeName ?? file.replace(/\.tokens\.json$/, ''));
    modes.push({ file, slug, title: modeName ?? slug });
  }

  return modes.sort((a, b) => a.title.localeCompare(b.title));
}

function wrapFontModeCss(css, slug, isDefault) {
  const match = css.match(/:root\s*\{([\s\S]*)\}\s*$/);
  if (!match) {
    throw new Error(`Unexpected CSS structure for font mode "${slug}"`);
  }
  const selector = isDefault
    ? `:root,\n[data-font-mode="${slug}"]`
    : `[data-font-mode="${slug}"]`;
  return `/**\n * Font mode: ${slug}\n * Do not edit directly.\n */\n${selector} {${match[1]}}\n`;
}

async function buildFontMode(StyleDictionary, { file, slug, isDefault }) {
  const sd = new StyleDictionary({
    source: [path.join(typographyDir, file)],
    preprocessors: ['tokens-studio'],
    platforms: {
      css: {
        transformGroup: 'tokens-studio-figma',
        buildPath: 'src/styles/generated/typography-modes/',
        files: [
          {
            destination: `${slug}.css`,
            format: 'css/variables',
            filter: (token) => token.path[0] === 'fontFamilies',
          },
        ],
      },
    },
  });

  await sd.buildAllPlatforms();

  const cssPath = path.join(outDir, `${slug}.css`);
  const raw = await readFile(cssPath, 'utf8');
  await writeFile(cssPath, wrapFontModeCss(raw, slug, isDefault));
}

async function writeIndex(modes) {
  const imports = modes.map((m) => `@import './${m.slug}.css';`).join('\n');
  await writeFile(
    path.join(outDir, 'index.css'),
    `/* Auto-generated typography font-family modes */\n${imports}\n`,
  );

  await writeFile(
    path.join(outDir, 'font-modes.json'),
    JSON.stringify(
      modes.map(({ slug, title }) => ({ slug, title })),
      null,
      2,
    ),
  );
}

async function main() {
  const StyleDictionary = setupStyleDictionary();
  await mkdir(outDir, { recursive: true });

  const modes = await getFontModes();

  for (const mode of modes) {
    await buildFontMode(StyleDictionary, {
      ...mode,
      isDefault: mode.slug === defaultFontModeSlug,
    });
    console.log(`  font mode: ${mode.title} → ${mode.slug}.css`);
  }

  await writeIndex(modes);
  console.log(`Built ${modes.length} font mode files in src/styles/generated/typography-modes/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

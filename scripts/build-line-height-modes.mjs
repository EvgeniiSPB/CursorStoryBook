import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  defaultLineHeightModeSlug,
  defaultTypographyModeFile,
  lineHeightsDir,
  segmentNameToSlug,
  setupStyleDictionary,
} from '../style-dictionary.shared.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'src/styles/generated/line-height-modes');

/** Resolves typography `lineHeights/body/*` aliases against each mode file */
const lineHeightBuildSources = (modeFile) => [
  '00 - xBase/4 px.tokens.json',
  path.join(lineHeightsDir, modeFile),
  defaultTypographyModeFile,
];

async function getLineHeightModes() {
  const dir = path.join(root, lineHeightsDir);
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

function wrapLineHeightModeCss(css, slug, isDefault) {
  const match = css.match(/:root\s*\{([\s\S]*)\}\s*$/);
  if (!match) {
    throw new Error(`Unexpected CSS structure for line-height mode "${slug}"`);
  }
  const selector = isDefault
    ? `:root,\n[data-line-height-mode="${slug}"]`
    : `[data-line-height-mode="${slug}"]`;
  return `/**\n * Line-height mode: ${slug}\n * Do not edit directly.\n */\n${selector} {${match[1]}}\n`;
}

async function buildLineHeightMode(StyleDictionary, { file, slug, isDefault }) {
  const sd = new StyleDictionary({
    source: lineHeightBuildSources(file),
    preprocessors: ['tokens-studio'],
    platforms: {
      css: {
        transformGroup: 'tokens-studio-figma',
        buildPath: 'src/styles/generated/line-height-modes/',
        files: [
          {
            destination: `${slug}.css`,
            format: 'css/variables',
            filter: (token) => token.path[0] === 'lineHeights',
          },
        ],
      },
    },
  });

  await sd.buildAllPlatforms();

  const cssPath = path.join(outDir, `${slug}.css`);
  let raw = await readFile(cssPath, 'utf8');
  raw = bridgeSemanticBodyLineHeights(raw, slug);
  await writeFile(cssPath, wrapLineHeightModeCss(raw, slug, isDefault));
}

/** Typography tokens hard-code body/L px; Figma resolves via lineHeights/base/400 per mode */
function bridgeSemanticBodyLineHeights(css, slug) {
  const bodyLBridge =
    slug === 'wide'
      ? '  --line-heights-body-l: var(--line-heights-base-400, 24);\n'
      : '  --line-heights-body-l: var(--line-heights-base-400, 20);\n';

  return css.replace(
    /  --line-heights-body-l: \d+;\n/,
    bodyLBridge,
  );
}

async function writeIndex(modes) {
  const imports = modes.map((m) => `@import './${m.slug}.css';`).join('\n');
  await writeFile(
    path.join(outDir, 'index.css'),
    `/* Auto-generated line-height modes */\n${imports}\n`,
  );

  await writeFile(
    path.join(outDir, 'line-height-modes.json'),
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

  const modes = await getLineHeightModes();

  for (const mode of modes) {
    await buildLineHeightMode(StyleDictionary, {
      ...mode,
      isDefault: mode.slug === defaultLineHeightModeSlug,
    });
    console.log(`  line-height mode: ${mode.title} → ${mode.slug}.css`);
  }

  await writeIndex(modes);
  console.log(`Built ${modes.length} line-height mode files in src/styles/generated/line-height-modes/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

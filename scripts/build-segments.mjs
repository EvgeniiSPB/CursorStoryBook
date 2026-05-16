import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  segmentDir,
  segmentNameToSlug,
  setupStyleDictionary,
} from '../style-dictionary.shared.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'src/styles/generated/segments');

async function getSegmentSlugs() {
  const dir = path.join(root, segmentDir);
  const files = (await readdir(dir)).filter((f) => f.endsWith('.tokens.json'));
  const segments = [];

  for (const file of files) {
    const content = await readFile(path.join(dir, file), 'utf8');
    const json = JSON.parse(content);
    const modeName = json.$extensions?.['com.figma.modeName'];
    const slug = segmentNameToSlug(modeName ?? file.replace(/\.tokens\.json$/, ''));
    segments.push({ file, slug, title: modeName ?? slug });
  }

  return segments.sort((a, b) => a.title.localeCompare(b.title));
}

function wrapSegmentCss(css, slug, isDefault) {
  const match = css.match(/:root\s*\{([\s\S]*)\}\s*$/);
  if (!match) {
    throw new Error(`Unexpected CSS structure for segment "${slug}"`);
  }
  const selector = isDefault
    ? `:root,\n[data-segment="${slug}"]`
    : `[data-segment="${slug}"]`;
  return `/**\n * Segment: ${slug}\n * Do not edit directly.\n */\n${selector} {${match[1]}}\n`;
}

async function buildSegment(StyleDictionary, { file, slug, isDefault }) {
  const sd = new StyleDictionary({
    source: [path.join(segmentDir, file)],
    preprocessors: ['tokens-studio'],
    platforms: {
      css: {
        transformGroup: 'tokens-studio-figma',
        buildPath: 'src/styles/generated/segments/',
        files: [
          {
            destination: `${slug}.css`,
            format: 'css/variables',
            filter: (token) => token.path[0] === 'segment',
          },
        ],
      },
    },
  });

  await sd.buildAllPlatforms();

  const cssPath = path.join(outDir, `${slug}.css`);
  const raw = await readFile(cssPath, 'utf8');
  await writeFile(cssPath, wrapSegmentCss(raw, slug, isDefault));
}

async function writeIndex(segments) {
  const imports = segments.map((s) => `@import './${s.slug}.css';`).join('\n');
  await writeFile(
    path.join(outDir, 'index.css'),
    `/* Auto-generated segment overrides */\n${imports}\n`,
  );

  await writeFile(
    path.join(outDir, 'segments.json'),
    JSON.stringify(
      segments.map(({ slug, title }) => ({ slug, title })),
      null,
      2,
    ),
  );
}

async function main() {
  const StyleDictionary = setupStyleDictionary();
  await mkdir(outDir, { recursive: true });

  const segments = await getSegmentSlugs();
  const defaultSlug = 'crimson';

  for (const segment of segments) {
    await buildSegment(StyleDictionary, {
      ...segment,
      isDefault: segment.slug === defaultSlug,
    });
    console.log(`  segment: ${segment.title} → ${segment.slug}.css`);
  }

  await writeIndex(segments);
  console.log(`Built ${segments.length} segment files in src/styles/generated/segments/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

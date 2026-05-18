/**
 * Downloads icon SVGs from Figma Desktop MCP asset server and normalizes to currentColor.
 * Requires Figma Desktop open with the icon file.
 */
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const BASE = 'http://localhost:3845/assets';
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'src', 'assets', 'icons');

/** @type {Record<string, { hash: string; size: 20 | 28 }>} */
const ICONS = {
  'arrow-right': { hash: '0dcab97eddd69b63c6f9855556deb7e8143a97ca', size: 20 },
  'arrow-left': { hash: '97a79f5dcd157a3302129b7b4f10f583c5daf8a4', size: 20 },
  'arrow-up': { hash: '2cba0c7ac3ad6d4dbd8330aa3383861a8f5c646d', size: 20 },
  'arrow-up-right': { hash: '14442067b9fd3439a7212f3acffd762129f23dda', size: 20 },
  bookmark: { hash: '688fc764dab31884f80020458fc021ea50b66ea0', size: 20 },
  search: { hash: 'cb2cf95e3679b3fccbac8777e1305ee7bd050707', size: 20 },
  menu: { hash: 'a62a5edda0673de7a37c22bb11d8a7ef3dee2105', size: 20 },
  profile: { hash: '2762e49904875a73cf54d0cb63d24219e9959da4', size: 20 },
  plus: { hash: '58b08b960961a3425c292fc3dc5173d9814f7311', size: 20 },
  minus: { hash: '27536dde5d65b1cd3cbf572c1a1cf1a58a2b407f', size: 20 },
  close: { hash: '61f047a8d751a9133e0a82fb562d43b383eae83d', size: 20 },
  content: { hash: 'a983b5138aae8966fbe090d0f303b7a06d229890', size: 20 },
  kebab: { hash: 'bf44084e9feebffcddcbe7bb2bab8af601e09077', size: 20 },
  lock: { hash: 'cd26a5ae3124a48f75696b3a571309d756fbaa9d', size: 20 },
  video: { hash: '9edd3f8d94beed89be324731f62a7746b983150b', size: 20 },
  audio: { hash: '7a661a176e75a9ecc5f28c3010f2cd8c446f0341', size: 20 },
  check: { hash: '2e461fa47b8a276cfa56f5fe117e1234cf30cf89', size: 20 },
  shield: { hash: 'b135815c1d55f76c234fb0b7b7080fc895ebe1cb', size: 20 },
  // 28px — separate Figma components (ic_28_*)
  '28/arrow-right': { hash: '3f9b351e4596913e4a884cdd86cd120ffdcdbf3f', size: 28 },
  '28/arrow-left': { hash: '87f2c3a5d4633f3a5542b53e6b93a45d7bdaa7fc', size: 28 },
  '28/close': { hash: '19448281fea936df410b61fc8f8144650243aaab', size: 28 },
  '28/check': { hash: '9b8b2dc628b76586e79bfb5a7fbc9a3f88b06637', size: 28 },
  '28/plus': { hash: '33248966204b8a5f8abc2cdb78e4cb122748fc7f', size: 28 },
};

function normalizeSvg(svg) {
  return svg
    .replace(/fill="var\([^)]+\)"/g, 'fill="currentColor"')
    .replace(/stroke="var\([^)]+\)"/g, 'stroke="currentColor"')
    .replace(/fill="#[0-9A-Fa-f]{3,8}"/g, 'fill="currentColor"')
    .replace(/stroke="#[0-9A-Fa-f]{3,8}"/g, 'stroke="currentColor"')
    .replace(/fill="black"/g, 'fill="currentColor"')
    .replace(/stroke="black"/g, 'stroke="currentColor"')
    .replace(/\s+id="[^"]*"/g, '')
    .replace(/preserveAspectRatio="none"\s*/g, '')
    .replace(/overflow="visible"\s*/g, '')
    .replace(/style="display: block;"\s*/g, '');
}

/** ic_28_arrow-left in Figma is ic_28_arrow-right with scaleX(-1) */
function flipHorizontal(svg) {
  const viewBoxMatch = svg.match(/viewBox="([^"]+)"/);
  if (!viewBoxMatch) return svg;
  const [, , , w] = viewBoxMatch[1].split(/\s+/);
  const width = w;
  const inner = svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
  return svg.replace(
    /<svg([^>]*)>/,
    `<svg$1>`,
  ).replace(
    /(<svg[^>]*>)([\s\S]*)(<\/svg>)/,
    `$1\n  <g transform="scale(-1 1) translate(-${width} 0)">\n    ${inner.trim()}\n  </g>\n$3`,
  );
}

async function main() {
  for (const [name, { hash, size }] of Object.entries(ICONS)) {
    const fileName = name.includes('/') ? name.split('/')[1] : name;
    const dir = name.includes('/') ? '28' : String(size);
    const outDir = path.join(ROOT, dir);
    await mkdir(outDir, { recursive: true });

    const url = `${BASE}/${hash}.svg`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to fetch ${url}: ${res.status}`);
    }
    const raw = await res.text();
    let normalized = normalizeSvg(raw);
    if (name === '28/arrow-left') {
      normalized = flipHorizontal(normalized);
    }
    const outPath = path.join(outDir, `${fileName}.svg`);
    await writeFile(outPath, normalized, 'utf8');
    console.log(`✔ ${outPath}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

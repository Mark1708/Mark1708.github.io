import { access, readFile } from 'node:fs/promises';

const NAVBAR_PATH = new URL('../src/components/nav/Navbar.astro', import.meta.url);
const DIST_ROOT = new URL('../dist/', import.meta.url);
const ROUTE_MATRIX = Object.freeze([
  ['index.html', '/#experience'],
  ['projects/index.html', '/projects'],
  ['projects/confx/index.html', '/projects'],
  ['articles/index.html', '/articles'],
  ['articles/hse-storing-retrieving-data/index.html', '/articles'],
  ['ru/index.html', '/ru/#experience'],
  ['ru/projects/index.html', '/ru/projects'],
  ['ru/projects/confx/index.html', '/ru/projects'],
  ['ru/articles/index.html', '/ru/articles'],
  ['ru/articles/hse-storing-retrieving-data/index.html', '/ru/articles'],
]);

function extractBlock(source, selector) {
  const selectorIndex = source.indexOf(selector);
  if (selectorIndex < 0) return '';
  const openIndex = source.indexOf('{', selectorIndex + selector.length);
  if (openIndex < 0) return '';
  let depth = 0;
  for (let index = openIndex; index < source.length; index += 1) {
    if (source[index] === '{') depth += 1;
    if (source[index] === '}') depth -= 1;
    if (depth === 0) return source.slice(openIndex + 1, index);
  }
  return '';
}

function getCurrentPrimaryLinks(html) {
  const navigation = html.match(/<div class="navbar__links"[^>]*>([\s\S]*?)<\/div>/)?.[1] ?? '';
  return [...navigation.matchAll(/<a\s+([^>]*aria-current="page"[^>]*)>/g)]
    .map((match) => match[1].match(/href="([^"]+)"/)?.[1])
    .filter(Boolean);
}

async function checkBuiltRouteMatrix(failures) {
  try {
    await access(new URL('index.html', DIST_ROOT));
  } catch (error) {
    if (error.code === 'ENOENT') return;
    throw error;
  }

  for (const [filePath, expectedHref] of ROUTE_MATRIX) {
    const html = await readFile(new URL(filePath, DIST_ROOT), 'utf8');
    const currentLinks = getCurrentPrimaryLinks(html);
    if (currentLinks.length !== 1 || currentLinks[0] !== expectedHref) {
      failures.push(`${filePath}: expected one current primary link ${expectedHref}, received ${currentLinks.join(', ') || 'none'}`);
    }
  }
}

const source = await readFile(NAVBAR_PATH, 'utf8');
const frontmatterEnd = source.indexOf('---', 3);
const frontmatter = source.slice(0, frontmatterEnd + 3);
const clientScript = source.match(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/)?.[1] ?? '';
const currentCue = extractBlock(source, ".navbar__link[aria-current='page']")
  || extractBlock(source, '.navbar__link[aria-current="page"]');
const failures = [];

if (!/Astro\.url\.pathname/.test(frontmatter)) {
  failures.push('Navbar current state must derive from Astro.url.pathname in server frontmatter');
}
if (!/<a[^>]*class=["']navbar__link["'][^>]*aria-current=/.test(source)) {
  failures.push('Primary navbar links are missing conditional aria-current="page"');
}
if (!currentCue) {
  failures.push('Navbar is missing an aria-current selector for the visible current-page cue');
} else if (!/(?:text-decoration|font-weight|border|outline)\s*:/.test(currentCue)) {
  failures.push('Navbar current-page cue must include a non-color underline, weight, border, or outline');
}
if (/(?:window\.)?location\.pathname/.test(clientScript)) {
  failures.push('Navbar route detection must not be added to the client script');
}
await checkBuiltRouteMatrix(failures);

if (failures.length > 0) {
  console.error(`Navbar current-page contract check failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.info('Navbar current-page contract check passed for server routing, aria-current, and non-color cue.');
}

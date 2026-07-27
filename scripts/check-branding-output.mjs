import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST_DIR = new URL('../dist/', import.meta.url);
const DIST_DIR_PATH = fileURLToPath(DIST_DIR);
const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

async function collectFiles(directory, extension) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nestedFiles = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? collectFiles(path, extension) : [path];
  }));

  return nestedFiles.flat().filter((path) => path.endsWith(extension));
}

function hasAttribute(tag, name, value) {
  return new RegExp(`\\b${name}=["']${value}["']`).test(tag);
}

function hasClass(tag, className) {
  const classes = tag.match(/\bclass=["']([^"']+)["']/)?.[1]?.split(/\s+/) ?? [];
  return classes.includes(className);
}

function findTag(html, tagName, className) {
  return [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, 'g'))]
    .map((match) => match[0])
    .find((tag) => hasClass(tag, className));
}

function getMetaContent(html, attribute, name) {
  const pattern = new RegExp(`<meta[^>]+${attribute}=["']${name}["'][^>]+content=["']([^"']+)["']`, 'i');
  return html.match(pattern)?.[1];
}

function getJsonLd(html, page) {
  const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  return scripts.flatMap((match, index) => {
    try {
      return [JSON.parse(match[1])];
    } catch (error) {
      failures.push(`${page}: JSON-LD script ${index + 1} is invalid: ${error.message}`);
      return [];
    }
  });
}

function checkSchemas(html, page) {
  const schemas = getJsonLd(html, page);
  const types = schemas.map((schema) => schema['@type']);
  const person = schemas.find((schema) => schema['@type'] === 'Person');
  const website = schemas.find((schema) => schema['@type'] === 'WebSite');
  const imageObjects = schemas.filter((schema) => schema['@type'] === 'ImageObject');
  const imageObject = imageObjects[0];

  assert(types.includes('Person'), `${page}: Person schema missing`);
  assert(types.includes('WebSite'), `${page}: WebSite schema missing`);
  assert(types.includes('BreadcrumbList'), `${page}: BreadcrumbList schema missing`);
  assert(!JSON.stringify(schemas).includes('"@type":"Organization"'), `${page}: Organization schema must remain absent`);
  assert(person?.image === 'https://mark1708.ru/profile.jpg', `${page}: Person.image changed`);
  assert(person?.name === 'Mark Gurianov' && !person.creator, `${page}: Mark Person authorship changed`);
  assert(website && !website.author && !website.creator, `${page}: WebSite authorship changed`);
  assert(imageObjects.length === 1, `${page}: expected exactly one brand ImageObject`);
  assert(imageObject?.['@id'] === 'https://mark1708.ru/#brand-logo', `${page}: ImageObject @id incorrect`);
  assert(imageObject?.name === 'Mark Gurianov logo', `${page}: ImageObject name incorrect`);
  assert(imageObject?.contentUrl === 'https://mark1708.ru/brand/mark-gurianov-logo-horizontal.svg', `${page}: ImageObject contentUrl incorrect`);
  assert(imageObject?.encodingFormat === 'image/svg+xml', `${page}: ImageObject encodingFormat incorrect`);
  assert(imageObject?.creditText === 'Logo design by kovalév art — Evgeny Kovalev / Евгений Ковалев', `${page}: ImageObject creditText incorrect`);
  assert(imageObject?.creator?.['@type'] === 'Person', `${page}: ImageObject creator type incorrect`);
  assert(imageObject?.creator?.name === 'Evgeny Kovalev', `${page}: ImageObject creator name incorrect`);
  assert(imageObject?.creator?.alternateName === 'Евгений Ковалев', `${page}: ImageObject creator alternateName incorrect`);
  assert(imageObject?.creator?.url === 'https://link.me/kovalev', `${page}: ImageObject creator URL incorrect`);
}

function checkSeo(html, page, isRu) {
  const expectedAlt = isRu ? 'Портрет Марка Гурьянова' : 'Portrait of Mark Gurianov';
  assert(getMetaContent(html, 'property', 'og:image:width') === '1496', `${page}: incorrect og:image:width`);
  assert(getMetaContent(html, 'property', 'og:image:height') === '1496', `${page}: incorrect og:image:height`);
  assert(getMetaContent(html, 'property', 'og:image:alt') === expectedAlt, `${page}: incorrect og:image:alt`);
  assert(getMetaContent(html, 'name', 'twitter:image:alt') === expectedAlt, `${page}: incorrect twitter:image:alt`);
  assert(/<link rel="canonical" href="https:\/\/mark1708\.ru[^" ]*">/.test(html), `${page}: canonical link missing`);
  for (const lang of ['en', 'ru', 'x-default']) {
    assert(new RegExp(`<link rel="alternate" hreflang="${lang}" href="https://mark1708\\.ru`).test(html), `${page}: ${lang} hreflang missing`);
  }
}

function checkBrandMarkup(html, page, isRu) {
  const navbarMark = findTag(html, 'span', 'navbar__logo-mark');
  const wordmark = findTag(html, 'span', 'site-footer__wordmark');
  const wordmarkLabel = isRu
    ? 'kovalév art — дизайнер логотипа Евгений Ковалев'
    : 'kovalév art — logo designer Evgeny Kovalev';

  assert(navbarMark && hasAttribute(navbarMark, 'aria-hidden', 'true'), `${page}: accessible navbar mask missing`);
  assert(wordmark && hasAttribute(wordmark, 'role', 'img'), `${page}: semantic designer wordmark role missing`);
  assert(wordmark && hasAttribute(wordmark, 'aria-label', wordmarkLabel), `${page}: localized designer wordmark label missing`);
  assert(wordmark && !hasAttribute(wordmark, 'aria-hidden', 'true'), `${page}: semantic designer wordmark must not be hidden`);
  assert(!/<p\b[^>]*class=["'][^"']*site-footer__designer-name/.test(html), `${page}: visible designer-name paragraph must be absent`);
  assert(!/<p\b[^>]*>(Evgeny Kovalev|Евгений Ковалев)<\/p>/.test(html), `${page}: standalone visible designer name must be absent`);
}

function checkRegularPage(html, page) {
  const isRu = page.startsWith('ru/');
  const credit = isRu ? 'Дизайн логотипа — kovalév art' : 'Logo design by kovalév art';

  assert((html.match(/<footer class="site-footer"[^>]*>/g) ?? []).length === 1, `${page}: expected exactly one global footer`);
  assert(html.includes(credit), `${page}: exact localized designer credit missing`);
  assert(/<a[^>]+href="https:\/\/link\.me\/kovalev"[^>]+target="_blank"[^>]+rel="noopener"/.test(html), `${page}: designer link contract missing`);
  assert(!/<a[^>]+href="https:\/\/link\.me\/kovalev"[^>]+rel="[^"]*(noreferrer|nofollow)/.test(html), `${page}: forbidden designer link rel value`);
  checkBrandMarkup(html, page, isRu);
  checkSeo(html, page, isRu);
  checkSchemas(html, page);
}

const htmlFiles = await collectFiles(DIST_DIR_PATH, '.html');
assert(htmlFiles.length > 0, 'dist: no generated HTML files found; run npm run build first');

for (const file of htmlFiles) {
  const page = relative(DIST_DIR_PATH, file);
  const html = await readFile(file, 'utf8');
  const isResume = page === 'resume/index.html' || page === 'ru/resume/index.html';

  if (isResume) {
    assert(!html.includes('site-footer'), `${page}: standalone resume must not contain global footer`);
    continue;
  }

  checkRegularPage(html, page);
}

const favicon = await readFile(new URL('favicon.svg', DIST_DIR), 'utf8');
assert(/viewBox="0 0 30 30"/.test(favicon), 'favicon: square 30x30 viewBox missing');
assert(/<g\s+transform="translate\(1\.5 0\)">/.test(favicon), 'favicon: stacked logo must be centered horizontally');
assert(favicon.includes('M26.0613 19.3182H4.7461'), 'favicon: stacked-logo geometry missing');
assert(favicon.includes('oklch(68% 0.18 260)'), 'favicon: dark-theme accent changed');
assert(favicon.includes('oklch(45% 0.18 260)'), 'favicon: light-theme accent changed');
assert(/@media\s*\(prefers-color-scheme:\s*light\)/.test(favicon), 'favicon: light-theme preference missing');
assert(!/<text\b/.test(favicon), 'favicon: text monogram must be removed');

const cssFiles = await collectFiles(DIST_DIR_PATH, '.css');
const css = (await Promise.all(cssFiles.map((file) => readFile(file, 'utf8')))).join('\n');
assert(/navbar__logo-mark[^}]*background-color:var\(--color-accent\)/.test(css), 'navbar mask: exact accent token missing');
assert(/navbar__logo-mark[^}]*-webkit-mask-image:url\(["']?\/brand\/mark-gurianov-logo-horizontal\.svg["']?\)/.test(css), 'navbar mask: WebKit asset mask missing');
assert(/navbar__logo-mark[^}]*mask-image:url\(["']?\/brand\/mark-gurianov-logo-horizontal\.svg["']?\)/.test(css), 'navbar mask: asset mask missing');
assert(/site-footer__wordmark[^}]*width:80px/.test(css), 'designer mask: exact 80px width missing');
assert(/site-footer__wordmark[^}]*background-color:color-mix\(in oklch,var\(--color-accent\) 55%,var\(--color-text-muted\)\)/.test(css), 'designer mask: muted accent mix missing');
assert(/site-footer__wordmark[^}]*-webkit-mask-image:url\(["']?\/brand\/kovalev-art-wordmark\.svg["']?\)/.test(css), 'designer mask: WebKit asset mask missing');
assert(/site-footer__wordmark[^}]*mask-image:url\(["']?\/brand\/kovalev-art-wordmark\.svg["']?\)/.test(css), 'designer mask: asset mask missing');
assert(!/filter:invert\(/.test(css), 'branding masks: fragile color filters must be absent');
assert(!css.includes('site-footer__designer-name'), 'designer name: obsolete visible-name CSS must be absent');

if (failures.length > 0) {
  console.error(`Branding output check failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.info(`Branding output check passed for ${htmlFiles.length} HTML files and favicon.svg.`);
}

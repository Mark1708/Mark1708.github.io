import { createHash } from 'node:crypto';
import { access, readFile } from 'node:fs/promises';

const PATHS = Object.freeze({
  template: new URL('./social-card.html', import.meta.url),
  generator: new URL('./generate-social-cards.mjs', import.meta.url),
  base: new URL('../src/layouts/Base.astro', import.meta.url),
  favicon: new URL('../public/favicon.svg', import.meta.url),
  enPng: new URL('../public/images/social/og-en.png', import.meta.url),
  ruPng: new URL('../public/images/social/og-ru.png', import.meta.url),
});
const MANIFEST_PATHS = Object.freeze([
  new URL('../public/images/social/manifest.json', import.meta.url),
  new URL('../public/images/social/social-cards.manifest.json', import.meta.url),
  new URL('../public/images/social/.manifest.json', import.meta.url),
]);
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const REPO_ROOT = new URL('../', import.meta.url);

function assertContract(condition, message, failures) {
  if (!condition) failures.push(message);
}

async function checkPng(path, locale, failures) {
  const png = await readFile(path);
  assertContract(png.length >= 24, `${locale}: PNG header is incomplete`, failures);
  if (png.length < 24) return;
  assertContract(png.subarray(0, 8).equals(PNG_SIGNATURE), `${locale}: invalid PNG signature`, failures);
  assertContract(png.toString('ascii', 12, 16) === 'IHDR', `${locale}: missing PNG IHDR`, failures);
  assertContract(png.readUInt32BE(16) === 1200, `${locale}: width must be 1200`, failures);
  assertContract(png.readUInt32BE(20) === 630, `${locale}: height must be 630`, failures);
}

async function readManifest() {
  for (const path of MANIFEST_PATHS) {
    try {
      await access(path);
      return { path, source: await readFile(path, 'utf8') };
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }
  return null;
}

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

async function calculateSourceHash(inputs) {
  const normalizedInputs = [...inputs].sort();
  const sourceParts = await Promise.all(normalizedInputs.map(async (input) => {
    if (typeof input !== 'string' || input.startsWith('/') || input.split('/').includes('..')) {
      throw new Error(`Freshness manifest contains unsafe input path: ${String(input)}`);
    }
    const content = (await readFile(new URL(input, REPO_ROOT), 'utf8')).replace(/\r\n?/g, '\n');
    return `${input}\0${content}\0`;
  }));
  return sha256(sourceParts.join(''));
}

const [template, generator, base, favicon] = await Promise.all([
  readFile(PATHS.template, 'utf8'),
  readFile(PATHS.generator, 'utf8'),
  readFile(PATHS.base, 'utf8'),
  readFile(PATHS.favicon, 'utf8'),
]);
const failures = [];

for (const locale of ['en', 'ru']) {
  assertContract(new RegExp(`${locale}:\\s*Object\\.freeze\\(`).test(template), `template: missing ${locale.toUpperCase()} COPY marker`, failures);
  assertContract(new RegExp(`["']${locale}["']`).test(generator), `generator: missing ${locale.toUpperCase()} locale`, failures);
  assertContract(base.includes(`/images/social/og-${locale}.png`) || /og-\$\{isRu\s*\?\s*["']ru["']\s*:\s*["']en["']\}\.png/.test(base), `Base: missing ${locale.toUpperCase()} social image path`, failures);
}
assertContract(/--color-accent\s*:/.test(template), 'template: missing primary accent token authority', failures);
assertContract(!/--color-(?:primary|brand|highlight)\s*:/.test(template), 'template: multiple primary accent authorities found', failures);
assertContract(/mark-gurianov-logo-horizontal\.svg/.test(template), 'template: logo reference is missing', failures);

const templateAccent = template.match(/--color-accent\s*:\s*([^;]+);/)?.[1]?.trim();
const faviconAccent = favicon.match(/\.mark\s*\{\s*fill:\s*([^;]+);/)?.[1]?.trim();
assertContract(Boolean(templateAccent && faviconAccent && templateAccent === faviconAccent), 'favicon: default accent must match social template accent source', failures);

await Promise.all([
  checkPng(PATHS.enPng, 'EN', failures),
  checkPng(PATHS.ruPng, 'RU', failures),
]);

assertContract(/og:image:type["']\s+content=["']image\/png/.test(base), 'Base: missing OG PNG type metadata', failures);
assertContract(/og:image:width["']\s+content=["']1200/.test(base), 'Base: missing OG width metadata', failures);
assertContract(/og:image:height["']\s+content=["']630/.test(base), 'Base: missing OG height metadata', failures);
assertContract(/twitter:card["']\s+content=["']summary_large_image/.test(base), 'Base: missing Twitter large-image card metadata', failures);
assertContract(/twitter:image["']\s+content=\{socialImageUrl\}/.test(base), 'Base: missing localized Twitter image metadata', failures);
assertContract(/twitter:image:alt["']\s+content=\{socialImageAlt\}/.test(base), 'Base: missing localized Twitter alt metadata', failures);
assertContract(base.includes('Техническое портфолио Марка Гурьянова') && base.includes('Mark Gurianov technical portfolio'), 'Base: missing localized social alt copy', failures);

const manifest = await readManifest();
const hasCheckContract = /--check/.test(generator) && /createHash|node:crypto/.test(generator) && /manifest/i.test(generator);
if (manifest) {
  const parsed = JSON.parse(manifest.source);
  const sourceHash = parsed.sourceHash ?? parsed.source_hash;
  assertContract(typeof sourceHash === 'string' && /^[\da-f]{64}$/i.test(sourceHash), 'freshness manifest: missing SHA-256 source hash', failures);
  assertContract(Array.isArray(parsed.inputs) && parsed.inputs.length > 0, 'freshness manifest: missing normalized source inputs', failures);
  if (typeof sourceHash === 'string' && Array.isArray(parsed.inputs) && parsed.inputs.length > 0) {
    assertContract(sourceHash === await calculateSourceHash(parsed.inputs), 'freshness manifest: source hash is stale', failures);
  }
  for (const [fileName, path] of [['og-en.png', PATHS.enPng], ['og-ru.png', PATHS.ruPng]]) {
    const expectedHash = parsed.outputs?.[fileName];
    assertContract(typeof expectedHash === 'string' && /^[\da-f]{64}$/i.test(expectedHash), `freshness manifest: missing ${fileName} output hash`, failures);
    if (typeof expectedHash === 'string') {
      assertContract(expectedHash === sha256(await readFile(path)), `freshness manifest: ${fileName} output hash is stale`, failures);
    }
  }
} else {
  assertContract(hasCheckContract, 'freshness: missing deterministic source-hash manifest or non-rendering generator --check contract', failures);
}

if (failures.length > 0) {
  console.error(`Social source contract check failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.info('Social source contract check passed for locales, metadata, PNG structure, favicon, and freshness.');
}

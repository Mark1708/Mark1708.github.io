import { readFile } from 'node:fs/promises';

const TOKENS_PATH = new URL('../src/styles/tokens.css', import.meta.url);

const REQUIRED_ROLES = Object.freeze([
  'primary',
  'on-primary',
  'primary-hover',
  'primary-subtle',
  'link',
  'link-hover',
  'focus-ring',
  'surface-hover',
  'border-strong',
]);
const RETAINED_ROLES = Object.freeze([
  'bg',
  'surface',
  'surface-2',
  'border',
  'text',
  'text-muted',
  'accent-glow',
  'kw',
  'cn',
  'st',
]);

function extractBlock(source, startIndex) {
  const openIndex = source.indexOf('{', startIndex);
  if (openIndex < 0) return '';
  let depth = 0;
  for (let index = openIndex; index < source.length; index += 1) {
    if (source[index] === '{') depth += 1;
    if (source[index] === '}') depth -= 1;
    if (depth === 0) return source.slice(openIndex + 1, index);
  }
  return '';
}

function findBlock(source, pattern, context) {
  const match = pattern.exec(source);
  if (!match) throw new Error(`Unable to find ${context} color scope`);
  return extractBlock(source, match.index);
}

function parseDeclarations(block) {
  return new Map(
    [...block.matchAll(/--([\w-]+)\s*:\s*([^;]+);/g)]
      .map((match) => [match[1], match[2].trim()]),
  );
}

function resolveAlias(name, declarations, path = []) {
  if (path.includes(name)) return { cycle: [...path, name], target: name };
  const value = declarations.get(name);
  const alias = value?.match(/^var\(--([\w-]+)\)$/)?.[1];
  if (!alias) return { cycle: null, target: name };
  return resolveAlias(alias, declarations, [...path, name]);
}

function checkScope(name, declarations, failures) {
  for (const role of REQUIRED_ROLES) {
    if (!declarations.has(`color-${role}`)) failures.push(`${name}: missing --color-${role}`);
  }

  const accentResolution = resolveAlias('color-accent', declarations);
  if (!declarations.has('color-accent')) failures.push(`${name}: missing --color-accent compatibility alias`);
  else if (accentResolution.cycle) failures.push(`${name}: alias cycle ${accentResolution.cycle.join(' -> ')}`);
  else if (accentResolution.target !== 'color-primary') {
    failures.push(`${name}: --color-accent must resolve to --color-primary`);
  }

  for (const variable of declarations.keys()) {
    const resolution = resolveAlias(variable, declarations);
    if (resolution.cycle) failures.push(`${name}: alias cycle ${resolution.cycle.join(' -> ')}`);
  }
}

const tokensSource = await readFile(TOKENS_PATH, 'utf8');
const lightMedia = findBlock(tokensSource, /@media\s*\(prefers-color-scheme:\s*light\)/, 'system light');
const scopes = Object.freeze([
  ['tokens dark', parseDeclarations(findBlock(tokensSource, /:root\s*,\s*\[data-theme=["']dark["']\]\s*\{/, 'default dark'))],
  ['tokens explicit light', parseDeclarations(findBlock(tokensSource, /\[data-theme=["']light["']\]\s*\{/, 'explicit light'))],
  ['tokens system light', parseDeclarations(findBlock(lightMedia, /:root:not\(\[data-theme\]\)\s*\{/, 'system light root'))],
]);
const failures = [];

for (const [name, declarations] of scopes) checkScope(name, declarations, failures);
for (const role of RETAINED_ROLES) {
  if (!scopes[0][1].has(`color-${role}`)) failures.push(`tokens dark: retained --color-${role} is missing`);
}

if (failures.length > 0) {
  console.error(`Semantic color contract check failed (${failures.length}):`);
  for (const failure of [...new Set(failures)]) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.info('Semantic color contract check passed for dark, light, and explicit theme scopes.');
}

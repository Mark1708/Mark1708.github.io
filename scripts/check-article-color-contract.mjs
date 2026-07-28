import { readFile } from 'node:fs/promises';

const ARTICLE_PATH = new URL('../src/components/pages/ArticleDetailContent.astro', import.meta.url);
const COLOR_LITERAL = /#[\da-f]{3,8}\b|(?:rgba?|hsla?|oklch|oklab|lab|lch)\([^)]*\)/gi;
const TARGETS = Object.freeze([
  ['question callout', '[data-callout="question"]'],
  ['insight callout', '[data-callout="insight"]'],
  ['inline code', ':global(code)'],
  ['preformatted code', ':global(pre)'],
  ['preformatted code text', ':global(pre code)'],
  ['scrollbar', '::-webkit-scrollbar'],
  ['TOC track', '.article-detail__toc-track'],
  ['TOC dot', '.article-detail__toc-dot'],
  ['active TOC state', '.article-detail__toc-item--active'],
]);

function extractBlock(source, openIndex) {
  let depth = 0;
  for (let index = openIndex; index < source.length; index += 1) {
    if (source[index] === '{') depth += 1;
    if (source[index] === '}') depth -= 1;
    if (depth === 0) return source.slice(openIndex + 1, index);
  }
  return '';
}

function findBlocks(source, selector) {
  const blocks = [];
  let offset = 0;
  while (offset < source.length) {
    const selectorIndex = source.indexOf(selector, offset);
    if (selectorIndex < 0) break;
    const openIndex = source.indexOf('{', selectorIndex + selector.length);
    if (openIndex < 0) break;
    blocks.push(extractBlock(source, openIndex));
    offset = openIndex + 1;
  }
  return blocks;
}

const source = await readFile(ARTICLE_PATH, 'utf8');
const styleStart = source.lastIndexOf('<style>');
const styleEnd = source.lastIndexOf('</style>');
if (styleStart < 0 || styleEnd <= styleStart) throw new Error('ArticleDetailContent style block is missing');
const styleSource = source.slice(styleStart, styleEnd);
const failures = TARGETS.flatMap(([area, selector]) => {
  const blocks = findBlocks(styleSource, selector);
  if (blocks.length === 0) return [`${area}: selector ${selector} is missing`];
  return blocks.flatMap((block) => [...block.matchAll(COLOR_LITERAL)]
    .map((match) => `${area}: replace literal ${match[0]} in ${selector}`));
});

if (failures.length > 0) {
  console.error(`Article color contract check failed (${failures.length}):`);
  for (const failure of [...new Set(failures)]) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.info('Article color contract check passed for targeted callout, code, scrollbar, and TOC areas.');
}

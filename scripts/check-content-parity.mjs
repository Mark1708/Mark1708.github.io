#!/usr/bin/env node

import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import matter from 'gray-matter';

const ROOT_DIR = join(import.meta.dirname, '..');
const CONTENT_DIR = join(ROOT_DIR, 'src', 'content');
const WARN_ONLY = process.argv.includes('--warn-only') || !process.argv.includes('--strict');

const ARTICLE_PARAGRAPH_DELTA = 4;
const ARTICLE_BLOCK_DELTA = 6;
const PROJECT_PARAGRAPH_DELTA = 0;
const PROJECT_BLOCK_DELTA = 1;

const PAIRED_PROJECT_ARRAYS = [
  ['features', 'featuresRu'],
  ['decisions', 'decisionsRu'],
  ['tradeoffs', 'tradeoffsRu'],
  ['role', 'roleRu'],
  ['futureImprovements', 'futureImprovementsRu'],
];

function getMessage(error) {
  return error instanceof Error ? error.message : String(error);
}

async function readMarkdownFiles(collection) {
  const dir = join(CONTENT_DIR, collection);
  const entries = await readdir(dir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => join(dir, entry.name))
    .sort();
}

async function parseMarkdown(filePath) {
  const raw = await readFile(filePath, 'utf-8');
  return matter(raw);
}

function stripCodeFences(markdown) {
  const lines = markdown.split('\n');
  let inFence = false;

  return lines
    .filter((line) => {
      if (/^\s*(```|~~~)/.test(line)) {
        inFence = !inFence;
        return false;
      }

      return !inFence;
    })
    .join('\n');
}

function splitBlocks(markdown) {
  return stripCodeFences(markdown)
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .filter((block) => !/^(-{3,}|_{3,}|\*{3,})$/.test(block));
}

function countParagraphs(markdown) {
  return splitBlocks(markdown).filter((block) => {
    const firstLine = block.split('\n')[0].trim();
    return !/^(#{1,6}\s+|>|[-*+]\s+|\d+\.\s+|!\[)/.test(firstLine);
  }).length;
}

function countListItems(markdown) {
  return stripCodeFences(markdown)
    .split('\n')
    .filter((line) => /^\s*(?:[-*+] |\d+\.\s+)/.test(line)).length;
}

function countCodeFences(markdown) {
  return markdown
    .split('\n')
    .filter((line) => /^\s*(```|~~~)/.test(line)).length / 2;
}

function getUnclosedFenceIssue(markdown) {
  const fenceLines = markdown
    .split('\n')
    .filter((line) => /^\s*(```|~~~)/.test(line)).length;

  return fenceLines % 2 === 0 ? null : 'contains an unclosed code fence';
}

function getHeadingLevels(markdown) {
  return stripCodeFences(markdown)
    .split('\n')
    .map((line) => line.match(/^(#{1,6})\s+/)?.[1].length)
    .filter((level) => typeof level === 'number');
}

function summarizeMarkdown(markdown) {
  return {
    blocks: splitBlocks(markdown).length,
    codeFences: countCodeFences(markdown),
    headingLevels: getHeadingLevels(markdown),
    listItems: countListItems(markdown),
    paragraphs: countParagraphs(markdown),
    unclosedFenceIssue: getUnclosedFenceIssue(markdown),
  };
}

function formatPath(filePath) {
  return relative(ROOT_DIR, filePath);
}

function createIssue(filePath, message) {
  return `${formatPath(filePath)}: ${message}`;
}

function sequenceEquals(left, right) {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function addDeltaIssue(issues, filePath, label, left, right, maxDelta) {
  const delta = Math.abs(left - right);
  if (delta > maxDelta) {
    issues.push(createIssue(filePath, `${label} differ: markdown=${left}, localized=${right}, delta=${delta}`));
  }
}

function checkArticle(filePath, parsed) {
  const issues = [];
  const bodyEn = typeof parsed.data.bodyEn === 'string' ? parsed.data.bodyEn : '';
  const ru = summarizeMarkdown(parsed.content);
  const en = summarizeMarkdown(bodyEn);

  if (!parsed.content.trim()) issues.push(createIssue(filePath, 'markdown Russian body is empty'));
  if (!bodyEn.trim()) issues.push(createIssue(filePath, 'frontmatter bodyEn is empty or missing'));
  if (ru.unclosedFenceIssue) issues.push(createIssue(filePath, `markdown body ${ru.unclosedFenceIssue}`));
  if (en.unclosedFenceIssue) issues.push(createIssue(filePath, `bodyEn ${en.unclosedFenceIssue}`));

  if (!sequenceEquals(ru.headingLevels, en.headingLevels)) {
    issues.push(createIssue(filePath, `heading levels differ: markdown=[${ru.headingLevels.join(',')}], bodyEn=[${en.headingLevels.join(',')}]`));
  }

  if (ru.codeFences !== en.codeFences) {
    issues.push(createIssue(filePath, `code fence counts differ: markdown=${ru.codeFences}, bodyEn=${en.codeFences}`));
  }

  if (ru.listItems !== en.listItems) {
    issues.push(createIssue(filePath, `list item counts differ: markdown=${ru.listItems}, bodyEn=${en.listItems}`));
  }

  addDeltaIssue(issues, filePath, 'paragraph counts', ru.paragraphs, en.paragraphs, ARTICLE_PARAGRAPH_DELTA);
  addDeltaIssue(issues, filePath, 'block counts', ru.blocks, en.blocks, ARTICLE_BLOCK_DELTA);

  return issues;
}

function checkArrayPair(filePath, data, leftKey, rightKey) {
  const left = data[leftKey];
  const right = data[rightKey];
  const hasPair = Array.isArray(left) || Array.isArray(right);

  if (!hasPair) return [];
  if (!Array.isArray(left)) return [createIssue(filePath, `${leftKey} is missing or not an array while ${rightKey} exists`)];
  if (!Array.isArray(right)) return [createIssue(filePath, `${rightKey} is missing or not an array while ${leftKey} exists`)];
  if (left.length === right.length) return [];

  return [createIssue(filePath, `${leftKey}/${rightKey} lengths differ: ${left.length}/${right.length}`)];
}

function checkProject(filePath, parsed) {
  const issues = [];
  const bodyRu = typeof parsed.data.bodyRu === 'string' ? parsed.data.bodyRu : '';
  const en = summarizeMarkdown(parsed.content);
  const ru = summarizeMarkdown(bodyRu);

  if (!parsed.content.trim()) issues.push(createIssue(filePath, 'markdown English body is empty'));
  if (!bodyRu.trim()) issues.push(createIssue(filePath, 'frontmatter bodyRu is empty or missing'));
  if (en.unclosedFenceIssue) issues.push(createIssue(filePath, `markdown body ${en.unclosedFenceIssue}`));
  if (ru.unclosedFenceIssue) issues.push(createIssue(filePath, `bodyRu ${ru.unclosedFenceIssue}`));

  addDeltaIssue(issues, filePath, 'paragraph counts', en.paragraphs, ru.paragraphs, PROJECT_PARAGRAPH_DELTA);
  addDeltaIssue(issues, filePath, 'block counts', en.blocks, ru.blocks, PROJECT_BLOCK_DELTA);

  return PAIRED_PROJECT_ARRAYS.reduce(
    (nextIssues, [leftKey, rightKey]) => nextIssues.concat(checkArrayPair(filePath, parsed.data, leftKey, rightKey)),
    issues,
  );
}

function checkExperience(filePath, parsed) {
  const issues = [];
  const descriptionRu = typeof parsed.data.descriptionRu === 'string' ? parsed.data.descriptionRu : '';

  if (!parsed.content.trim()) issues.push(createIssue(filePath, 'markdown English body is empty'));
  if (!descriptionRu.trim()) issues.push(createIssue(filePath, 'frontmatter descriptionRu is empty or missing'));

  return issues;
}

async function checkCollection(collection, checker) {
  const files = await readMarkdownFiles(collection);
  const issueGroups = await Promise.all(
    files.map(async (filePath) => checker(filePath, await parseMarkdown(filePath))),
  );

  return issueGroups.flat();
}

function printReport(issues) {
  if (issues.length === 0) {
    console.log('Content parity check passed: no issues found.');
    return;
  }

  const mode = WARN_ONLY ? 'WARN' : 'FAIL';
  console.warn(`Content parity check found ${issues.length} issue(s) [${mode}]:`);
  issues.forEach((issue) => {
    console.warn(`- ${issue}`);
  });

  if (WARN_ONLY) {
    console.warn('\nRun `node scripts/check-content-parity.mjs --strict` to make parity issues fail the command.');
  }
}

async function main() {
  const issueGroups = await Promise.all([
    checkCollection('articles', checkArticle),
    checkCollection('projects', checkProject),
    checkCollection('experience', checkExperience),
  ]);
  const issues = issueGroups.flat();

  printReport(issues);

  if (issues.length > 0 && !WARN_ONLY) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(`Fatal content parity check error: ${getMessage(error)}`);
  process.exit(1);
});

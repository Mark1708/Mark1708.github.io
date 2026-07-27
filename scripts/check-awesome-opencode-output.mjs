#!/usr/bin/env node

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

function hasClass(tag, className) {
  const classes = tag.match(/\bclass=["']([^"']+)["']/)?.[1]?.split(/\s+/) ?? [];
  return classes.includes(className);
}

function hasAttribute(tag, name, value) {
  return new RegExp(`\\b${name}=["']${value}["']`).test(tag);
}

function hasRel(tag, value) {
  const relValue = tag.match(/\brel=["']([^"']+)["']/)?.[1] ?? '';
  return relValue.split(/\s+/).includes(value);
}

function checkAwesomeOpencodeCTA(html, page, expectedLabel) {
  // Find all anchor tags with the correct href
  const anchorPattern = /<a\b[^>]*href=["']https:\/\/github\.com\/awesome-opencode\/awesome-opencode["'][^>]*>/g;
  const anchors = [...html.matchAll(anchorPattern)].map((m) => m[0]);

  // Assert exactly one anchor exists
  assert(anchors.length === 1, `${page}: expected exactly one awesome-opencode anchor, found ${anchors.length}`);

  if (anchors.length === 0) return; // No need to check further if no anchor

  const anchor = anchors[0];

  // Check class contains project-detail__github
  assert(hasClass(anchor, 'project-detail__github'), `${page}: anchor must have class 'project-detail__github'`);

  // Check target="_blank"
  assert(hasAttribute(anchor, 'target', '_blank'), `${page}: anchor must have target="_blank"`);

  // Check rel contains both noopener and noreferrer
  assert(hasRel(anchor, 'noopener'), `${page}: anchor must have rel="noopener"`);
  assert(hasRel(anchor, 'noreferrer'), `${page}: anchor must have rel="noreferrer"`);

  // Check visible label (text content)
  const labelMatch = anchor.match(/>([^<]+)</);
  const actualLabel = labelMatch?.[1]?.trim();
  assert(actualLabel === expectedLabel, `${page}: expected label "${expectedLabel}", got "${actualLabel}"`);
}

async function checkPage(path, expectedLabel) {
  const html = await readFile(path, 'utf8');
  const page = path.replace(/^.*\/dist\//, '');
  checkAwesomeOpencodeCTA(html, page, expectedLabel);
}

async function main() {
  const pages = [
    { path: new URL('../dist/projects/opencode-agents-sidebar/index.html', import.meta.url), label: 'View on awesome-opencode ↗' },
    { path: new URL('../dist/projects/opencode-usage-monitor/index.html', import.meta.url), label: 'View on awesome-opencode ↗' },
    { path: new URL('../dist/ru/projects/opencode-agents-sidebar/index.html', import.meta.url), label: 'Смотреть в awesome-opencode ↗' },
    { path: new URL('../dist/ru/projects/opencode-usage-monitor/index.html', import.meta.url), label: 'Смотреть в awesome-opencode ↗' },
  ];

  await Promise.all(pages.map(({ path, label }) => checkPage(fileURLToPath(path), label)));

  if (failures.length > 0) {
    console.error(`Awesome-opencode CTA check failed (${failures.length}):`);
    for (const failure of failures) console.error(`- ${failure}`);
    process.exitCode = 1;
  } else {
    console.info(`Awesome-opencode CTA check passed for ${pages.length} pages.`);
  }
}

main().catch((error) => {
  console.error(`Fatal error: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
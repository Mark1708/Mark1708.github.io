/**
 * Sync project data from GitHub repositories.
 *
 * Reads all markdown files in src/content/projects/, extracts the
 * githubUrl from frontmatter, fetches repository metadata via the
 * GitHub REST API, and updates the "stars" field.
 *
 * Usage:
 *   GITHUB_TOKEN=xxx node scripts/sync-projects.mjs
 *   GITHUB_TOKEN=xxx node scripts/sync-projects.mjs --dry-run
 */

import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';

const CONTENT_DIR = join(import.meta.dirname, '..', 'src', 'content', 'projects');
const GITHUB_API = 'https://api.github.com';
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');

async function fetchRepoData(owner, repo, token) {
  const url = `${GITHUB_API}/repos/${owner}/${repo}`;
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`GitHub API ${response.status} for ${owner}/${repo}: ${await response.text()}`);
  }

  return response.json();
}

async function fetchReadme(githubUrl, token) {
  const parsed = extractOwnerRepo(githubUrl);
  if (!parsed) return null;

  const url = `${GITHUB_API}/repos/${parsed.owner}/${parsed.repo}/readme`;
  const headers = {
    Accept: 'application/vnd.github.v3+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, { headers });
  if (!response.ok) return null;

  const data = await response.json();
  return Buffer.from(data.content, 'base64').toString('utf-8');
}

function extractOwnerRepo(githubUrl) {
  const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return null;
  return { owner: match[1], repo: match[2].replace(/\.git$/, '') };
}

async function main() {
  const token = process.env.GITHUB_TOKEN || null;
  const updateStars = process.env.UPDATE_STARS !== 'false';
  if (dryRun) {
    console.log('DRY RUN: no files will be written.');
  }

  const files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'));

  let updated = 0;
  let skipped = 0;

  for (const file of files) {
    try {
      const filePath = join(CONTENT_DIR, file);
      const raw = readFileSync(filePath, 'utf-8');
      const { data, content } = matter(raw);

      if (!data.githubUrl) {
        console.log(`SKIP ${file}: no githubUrl`);
        skipped += 1;
        continue;
      }

      const parsed = extractOwnerRepo(data.githubUrl);
      if (!parsed) {
        console.log(`SKIP ${file}: cannot parse githubUrl "${data.githubUrl}"`);
        skipped += 1;
        continue;
      }

      const repoData = await fetchRepoData(parsed.owner, parsed.repo, token);
      const readmeContent = await fetchReadme(data.githubUrl, token);

      const updatedData = { ...data };

      if (updateStars) {
        updatedData.stars = repoData.stargazers_count;
      }

      const nextContent = readmeContent ?? content;
      const output = `${matter.stringify('', updatedData).trim()}\n\n${nextContent.trim()}\n`;

      if (dryRun) {
        const readmeStatus = readmeContent ? 'README fetched' : 'README unchanged';
        console.log(`DRY  ${file}: would write stars=${repoData.stargazers_count}, ${readmeStatus}`);
      } else {
        writeFileSync(filePath, output, 'utf-8');
        console.log(`OK   ${file}: stars=${repoData.stargazers_count}`);
      }

      updated += 1;
    } catch (error) {
      console.warn(`WARN ${file}: ${error.message}`);
    }
  }

  console.log(`\nDone: ${updated} updated, ${skipped} skipped, ${files.length} total`);

  if (updated === 0) {
    console.log('No changes detected.');
  }
}

main().catch((error) => {
  console.error('Fatal:', error);
  process.exit(1);
}
);

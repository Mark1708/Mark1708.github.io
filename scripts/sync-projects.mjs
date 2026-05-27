/**
 * Sync project data from GitHub repositories.
 *
 * Reads all markdown files in src/content/projects/, extracts the
 * githubUrl from frontmatter, fetches repository metadata via the
 * GitHub REST API, and updates the "stars" field.
 *
 * Usage:
 *   GITHUB_TOKEN=xxx node scripts/sync-projects.mjs
 */

import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';

const CONTENT_DIR = join(import.meta.dirname, '..', 'src', 'content', 'projects');
const GITHUB_API = 'https://api.github.com';

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

function extractOwnerRepo(githubUrl) {
  const match = githubUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) return null;
  return { owner: match[1], repo: match[2].replace(/\.git$/, '') };
}

async function main() {
  const token = process.env.GITHUB_TOKEN || null;
  const updateStars = process.env.UPDATE_STARS !== 'false';

  const files = readdirSync(CONTENT_DIR).filter((f) => f.endsWith('.md'));

  let updated = 0;
  let skipped = 0;

  for (const file of files) {
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

    try {
      const repoData = await fetchRepoData(parsed.owner, parsed.repo, token);

      const updatedData = { ...data };

      if (updateStars) {
        updatedData.stars = repoData.stargazers_count;
      }

      const output = matter.stringify(content, updatedData);
      writeFileSync(filePath, output, 'utf-8');

      console.log(`OK   ${file}: stars=${repoData.stargazers_count}`);
      updated += 1;
    } catch (error) {
      console.error(`FAIL ${file}: ${error.message}`);
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

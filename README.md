х# Mark Gurianov — Portfolio & Resume

> Bilingual Astro portfolio and resume site for presenting backend engineering experience, skills, and selected projects.

![Astro](https://img.shields.io/badge/framework-Astro%206-111827?style=for-the-badge&labelColor=111827&color=5b5ef4)
![Deploy](https://img.shields.io/badge/deploy-GitHub%20Pages-111827?style=for-the-badge&labelColor=111827&color=5b5ef4)
![License](https://img.shields.io/badge/license-GPL--3.0-111827?style=for-the-badge&labelColor=111827&color=5b5ef4)

| Field | Value |
|---|---|
| Status | Active portfolio site |
| Type | Static frontend site / resume |
| Primary stack | Astro 6, TypeScript, CSS, Markdown content collections |
| Live preview | <https://mark1708.ru> |
| Quick verify | `npm ci && npm run build` |

## Summary

- Presents Mark Gurianov's backend/team lead profile, experience timeline, skills, project cards, and printable resume pages.
- Ships English and Russian routes through Astro i18n (`en`, `ru`) with the default English locale unprefixed.
- Uses static content files under `src/content/` and JSON data under `src/data/`.

## Stack

| Layer | Tool | Source |
|---|---|---|
| Framework | Astro `^6.1.8` | `package.json`, `astro.config.mjs` |
| Language / config | TypeScript with Astro strict config | `tsconfig.json` |
| Styling | Global CSS and design tokens | `src/styles/global.css`, `src/styles/tokens.css` |
| Content | Astro content collections, Markdown, JSON | `src/content.config.ts`, `src/content/`, `src/data/` |
| SEO / metadata | Canonical URLs, hreflang, Open Graph, Twitter Card, JSON-LD, sitemap integration | `src/layouts/Base.astro`, `astro.config.mjs` |
| Deployment | GitHub Pages via GitHub Actions | `.github/workflows/deploy.yml`, `astro.config.mjs` |

## Local development

Run commands from the repository root.

```sh
# install dependencies from package-lock.json
npm ci

# start Astro dev server
npm run dev

# build static site to dist/
npm run build

# preview the production build locally
npm run preview
```

Node.js `>=22.12.0` is declared in `package.json`.

## Routes / content structure

| Route | Description |
|---|---|
| `/` | English home page with hero, experience timeline, skills, and project cards |
| `/ru/` | Russian home page |
| `/resume/` | English printable resume page |
| `/ru/resume/` | Russian printable resume page |

## Project structure

```text
.
├── .github/workflows/deploy.yml  # GitHub Pages build/deploy workflow
├── astro.config.mjs              # Astro, React, sitemap, site URL, and i18n config
├── public/                       # Static assets served as-is
├── src/components/               # Astro UI components
├── src/content/                  # Markdown experience and project entries
├── src/data/                     # Skills and social/profile data
├── src/layouts/                  # Shared document layout and metadata
├── src/pages/                    # English and Russian pages
└── src/styles/                   # Global styles and CSS tokens
```

## Deployment

- Hosting target: GitHub Pages at <https://mark1708.ru>.
- Workflow: `.github/workflows/deploy.yml` runs on pushes to `master` and manual dispatch.
- Build pipeline: `npm ci`, `npm run build`, upload `dist/`, then `actions/deploy-pages@v4`.
- Astro site URL is configured as `https://mark1708.ru` in `astro.config.mjs`.

## Limitations / Security

- The site is static and uses public portfolio/resume content only.
- No backend service, database, authentication flow, analytics setup, or external API integration is configured in this repository.
- Automated tests, linting, and a standalone typecheck script are not currently defined in `package.json`.

## Status

Active personal portfolio repository. The supported local quality gate is the Astro production build.

## Links / License

- Live preview: <https://mark1708.ru>
- GitHub profile: <https://github.com/Mark1708>
- License: GPL-3.0, see [`LICENSE`](LICENSE)

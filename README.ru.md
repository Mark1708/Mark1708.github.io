# Mark Gurianov — портфолио и резюме

> Двуязычный сайт портфолио и резюме на Astro для представления backend-опыта, навыков и выбранных проектов.

![Astro](https://img.shields.io/badge/framework-Astro%206-111827?style=for-the-badge&labelColor=111827&color=5b5ef4)
![Deploy](https://img.shields.io/badge/deploy-GitHub%20Pages-111827?style=for-the-badge&labelColor=111827&color=5b5ef4)
![License](https://img.shields.io/badge/license-GPL--3.0-111827?style=for-the-badge&labelColor=111827&color=5b5ef4)

[English version](README.md)

| Поле | Значение |
|---|---|
| Статус | Активный сайт портфолио |
| Тип | Статический frontend-сайт / резюме |
| Основной стек | Astro 6, TypeScript, CSS, Markdown content collections |
| Онлайн-просмотр | <https://mark1708.ru> |
| Быстрая проверка | `npm ci && npm run build` |
| Уровень проверки | Выполнение проверено для build; scripts и deployment проверены по manifest |

## Сводка

- Показывает backend/team lead профиль Марка Гурьянова, карьерный таймлайн, навыки, карточки проектов и печатные страницы резюме.
- Публикует английские и русские маршруты через Astro i18n (`en`, `ru`); английская локаль по умолчанию идёт без префикса.
- Использует статические content-файлы в `src/content/` и JSON-данные в `src/data/`.

## Стек

| Слой | Инструмент | Источник |
|---|---|---|
| Framework | Astro `^6.1.8` | `package.json`, `astro.config.mjs` |
| Язык / конфигурация | TypeScript со строгой Astro-конфигурацией | `tsconfig.json` |
| Стили | Global CSS и design tokens | `src/styles/global.css`, `src/styles/tokens.css` |
| Контент | Astro content collections, Markdown, JSON | `src/content.config.ts`, `src/content/`, `src/data/` |
| SEO / metadata | Canonical URLs, hreflang, Open Graph, Twitter Card, JSON-LD, sitemap integration | `src/layouts/Base.astro`, `astro.config.mjs` |
| Deployment | GitHub Pages через GitHub Actions | `.github/workflows/deploy.yml`, `astro.config.mjs` |

## Локальная разработка

Команды запускаются из корня репозитория.

```sh
# установить зависимости из package-lock.json
npm ci

# запустить Astro dev server
npm run dev

# собрать статический сайт в dist/
npm run build

# локально посмотреть production build
npm run preview
```

Node.js `>=22.12.0` указан в `package.json`.

## Маршруты / структура контента

| Маршрут | Описание |
|---|---|
| `/` | Английская главная страница с hero-блоком, опытом, навыками, избранными проектами и CTA к публикациям |
| `/ru/` | Русская главная страница |
| `/projects/` | Английский каталог проектов |
| `/ru/projects/` | Русский каталог проектов |
| `/projects/[slug]/` | Английская детальная страница проекта / архитектурный кейс |
| `/ru/projects/[slug]/` | Русская детальная страница проекта / архитектурный кейс |
| `/articles/` | Английский каталог публикаций и статей |
| `/ru/articles/` | Русский каталог публикаций и статей |
| `/articles/[slug]/` | Английская детальная страница статьи |
| `/ru/articles/[slug]/` | Русская детальная страница статьи |
| `/resume/` | Английская печатная страница резюме |
| `/ru/resume/` | Русская печатная страница резюме |

## Работа с контентом

- Проекты лежат в `src/content/projects/*.md` и валидируются collection-схемой `projects` в `src/content.config.ts`.
- Статьи, лекции и материалы лежат в `src/content/articles/*.md` и используются каталогом публикаций и детальными страницами статей.
- Опыт работы лежит в `src/content/experience/*.md`; навыки и social/profile данные — в `src/data/`.
- Русские версии project-полей задаются через `*Ru`: `descriptionRu`, `summaryRu`, `featuresRu` и optional case-study поля вроде `problemRu` или `architectureRu`.
- Английские маршруты идут без префикса; русские — через `/ru/`. Общая locale-логика находится в `src/i18n/`.

## Структура проекта

```text
.
├── .github/workflows/deploy.yml  # GitHub Pages build/deploy workflow
├── astro.config.mjs              # Astro, React, sitemap, site URL и i18n config
├── public/                       # Static assets, отдаются как есть
├── src/components/               # Astro UI-компоненты
├── src/content/                  # Markdown-записи опыта и проектов
├── src/data/                     # Skills и social/profile данные
├── src/layouts/                  # Общий layout документа и metadata
├── src/pages/                    # Английские и русские страницы
└── src/styles/                   # Global styles и CSS tokens
```

## Проверка

| Проверка | Команда | Уровень проверки |
|---|---|---|
| Установка | `npm ci` | Проверено выполнением |
| Build | `npm run build` | Проверено выполнением |
| Dev server | `npm run dev` | Проверено по manifest |
| Preview server | `npm run preview` | Проверено по manifest |
| Tests | Не настроены в `package.json` | Недоступно |
| Lint/typecheck | Отдельного script для `lint` или `typecheck` в `package.json` нет | Недоступно |

## Deployment

- Цель хостинга: GitHub Pages на <https://mark1708.ru>.
- Workflow: `.github/workflows/deploy.yml` запускается при push в `master` и вручную через dispatch.
- Build pipeline: `npm ci`, `npm run build`, загрузка `dist/`, затем `actions/deploy-pages@v4`.
- Astro site URL настроен как `https://mark1708.ru` в `astro.config.mjs`.

## Ограничения / безопасность

- Сайт статический и использует только публичный контент портфолио/резюме.
- В репозитории нет backend-сервиса, базы данных, authentication flow, analytics setup или интеграции с внешними API.
- Automated tests, linting и отдельный typecheck script сейчас не определены в `package.json`.

## Статус

Активный персональный репозиторий портфолио. Поддерживаемый локальный quality gate — production build Astro.

## Ссылки / лицензия

- Онлайн-просмотр: <https://mark1708.ru>
- GitHub-профиль: <https://github.com/Mark1708>
- Лицензия: GPL-3.0, см. [`LICENSE`](LICENSE)

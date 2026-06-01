---
title: "confx"
description: "Chrome extension for extracting Confluence pages, Jira issues, and page trees to Markdown. Supports tree export with nested pages, block picker, content subscriptions, and rule-based formatting."
descriptionRu: "Chrome-расширение для извлечения страниц Confluence, задач Jira и деревьев страниц в Markdown. Поддерживает tree-экспорт с вложенными страницами, block picker, подписки на изменения и rule-based форматирование."
bodyRu: |
  Chrome-расширение для экспорта контента из Confluence и Jira в Markdown. Поддерживает три режима: отдельная страница (Page), всё пространство (Space) и дерево с вложенными страницами (Tree). Каждый режим предлагает выбор rule set для форматирования и пресеты вложений.

  Расширение включает block picker для точечного извлечения произвольных блоков со страницы, подписки на изменения контента и sidebar-интерфейс с тёмной темой. Сборка настроена на два браузера: Chrome (zip) и Yandex (crx), с автоматическим релизом через GitHub Actions при создании tag.

  Проект написан на TypeScript strict mode с Vite-сборкой, покрыт 319 тестами (Vitest) и включает CI/CD pipeline с typecheck, линтером, тестами и автоматической публикацией артефактов в GitHub Releases.
technologies: ["TypeScript", "Vite", "Chrome Extension API", "Vitest"]
githubUrl: "https://github.com/Mark1708/confx"
featured: false
order: 9
summary: "Chrome extension for Confluence and Jira content extraction to Markdown"
summaryRu: "Chrome-расширение для экспорта контента Confluence и Jira в Markdown"
demonstrates: "Chrome Extension API, content script injection, dual-browser build pipeline"
demonstratesRu: "Chrome Extension API, content script injection, dual-browser build pipeline"
problem: "Extract structured content from Confluence pages and Jira issues without copy-paste or manual formatting."
problemRu: "Извлекать структурированный контент из Confluence-страниц и Jira-задач без копирования и ручного форматирования."
architecture: "Content scripts inject into Confluence and Jira pages to extract structured data. A sidebar popup provides the UI for selecting export mode, rule set, and triggering extraction. Background service worker handles cross-tab coordination and file downloads. Vite builds separate bundles for Chrome and Yandex targets."
architectureRu: "Content scripts внедряются в страницы Confluence и Jira для извлечения структурированных данных. Sidebar popup предоставляет UI для выбора режима экспорта, rule set и запуска извлечения. Background service worker отвечает за координацию между вкладками и загрузку файлов. Vite собирает отдельные бандлы для Chrome и Yandex."
decisions:
  - "Use content script injection instead of external API calls to avoid authentication complexity and work with any Confluence/Jira instance."
  - "Build dual browser targets (Chrome zip + Yandex crx) from a single codebase through Vite configuration."
  - "Generate releases via GitHub Actions on tag push with SHA256 checksums for distribution integrity."
decisionsRu:
  - "Использовать content script injection вместо внешних API-вызовов, чтобы избежать сложности аутентификации и работать с любым экземпляром Confluence/Jira."
  - "Собирать два браузерных таргета (Chrome zip + Yandex crx) из одной кодовой базы через конфигурацию Vite."
  - "Генерировать релизы через GitHub Actions при push tag с SHA256 checksums для целостности дистрибутива."
features:
  - "Exports Confluence pages, Jira issues, and page trees to Markdown with rule-based formatting"
  - "Provides a block picker for extracting arbitrary content sections from any page"
  - "Ships dual browser builds for Chrome and Yandex with automated CI/CD releases"
featuresRu:
  - "Экспортирует страницы Confluence, задачи Jira и деревья страниц в Markdown с rule-based форматированием"
  - "Предоставляет block picker для извлечения произвольных секций контента с любой страницы"
  - "Поставляет сборки для Chrome и Yandex с автоматизированным CI/CD-релизом"
status: "active"
startDate: "2026-05"
image: "/images/projects/confx/preview.jpeg"
---

Chrome extension for extracting Confluence pages, Jira issues, and page trees to Markdown. Supports three export modes (Page, Space, Tree) with rule-based formatting presets and attachment handling.

The extension includes a block picker for extracting arbitrary content sections, content subscriptions for change tracking, and a dark-themed sidebar UI. Built with TypeScript strict mode, Vite, and 319 Vitest tests. Ships dual browser targets (Chrome and Yandex) with automated GitHub Actions releases on tag push.

---
title: "opencode-usage-monitor"
description: "OpenCode TUI sidebar plugin for API usage monitoring. Tracks OpenAI daily cost, tokens, and requests. Shows Z.AI and GLM quota status with two-level toggle and stale-data indicators."
descriptionRu: "TUI-сайдбар плагин для OpenCode — мониторинг использования API. Отслеживает ежедневные расходы OpenAI, токены и запросы. Показывает статус квот Z.AI и GLM с двухуровневым переключателем и индикаторами устаревания данных."
bodyRu: |
  Плагин боковой панели для OpenCode TUI, который отслеживает использование API у нескольких провайдеров. Он показывает ежедневные расходы OpenAI, потребление токенов и количество запросов прямо внутри TUI.

  Для Z.AI и GLM отображается состояние квот с двухуровневым переключателем детализации и индикаторами устаревших данных. Секреты маскируются перед выводом, поэтому информацию можно безопасно показывать в интерфейсе.
technologies: ["TypeScript", "Bun", "OpenCode Plugin API"]
githubUrl: "https://github.com/Mark1708/opencode-usage-monitor"
awesomeOpenCodeUrl: "https://github.com/awesome-opencode/awesome-opencode"
featured: false
order: 4
summary: "OpenCode sidebar for API cost and quota tracking"
summaryRu: "Сайдбар OpenCode для отслеживания API-расходов"
demonstrates: "API monitoring, quota management, secret redaction"
demonstratesRu: "Мониторинг API, управление квотами, редакция секретов"
features:
  - "Tracks OpenAI daily cost, token consumption, and request counts inside the TUI"
  - "Shows Z.AI and GLM quota status with a two-level detail toggle"
  - "Marks stale provider data and redacts secrets for safe display"
  - "Listed in the curated awesome-opencode plugin directory."
featuresRu:
  - "Отслеживает ежедневные расходы OpenAI, токены и запросы прямо в TUI"
  - "Показывает квоты Z.AI и GLM с двухуровневым переключателем детализации"
  - "Помечает устаревшие данные провайдеров и скрывает секреты для безопасного отображения"
  - "Проект включён в курируемый каталог плагинов awesome-opencode."
status: "active"
startDate: "2026-05"
image: "/images/projects/opencode-usage-monitor/preview.png"
---

A sidebar plugin for the OpenCode TUI that monitors API usage across multiple providers. It tracks OpenAI daily cost, token consumption, and request counts inside the TUI.

For Z.AI and GLM, it displays quota status with a two-level detail toggle and stale-data indicators. Secrets are redacted before display, so the information can be shown safely in the interface.

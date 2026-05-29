---
title: "opencode-agents-sidebar"
description: "OpenCode TUI sidebar plugin for managing OhMyOpenAgent agents. Lifecycle-based categories, collapsible sections, model info, aliases support, and theme integration."
descriptionRu: "TUI-сайдбар плагин для OpenCode — управление агентами OhMyOpenAgent. Категории по жизненному циклу, сворачиваемые секции, информация о моделях, поддержка алиасов и интеграция с темами."
bodyRu: |
  Плагин боковой панели для OpenCode TUI, который добавляет интерфейс управления агентами OhMyOpenAgent. Агенты сгруппированы по состояниям жизненного цикла: active, idle и stopped.

  Сайдбар поддерживает сворачиваемые секции, показывает информацию о моделях, работает с алиасами и интегрируется с системой тем OpenCode, чтобы выглядеть как нативная часть TUI.
technologies: ["TypeScript", "Bun", "SolidJS", "OpenCode Plugin API"]
githubUrl: "https://github.com/Mark1708/opencode-agents-sidebar"
featured: false
order: 3
summary: "OpenCode TUI sidebar for agent lifecycle control"
summaryRu: "TUI-сайдбар OpenCode для управления агентами"
demonstrates: "Developer tooling, CLI/TUI workflow, AI-assisted development"
demonstratesRu: "Developer tooling, CLI/TUI workflow, AI-assisted development"
problem: "Make multi-agent OpenCode workflows easier to inspect and operate from the terminal UI."
problemRu: "Сделать multi-agent OpenCode workflows проще для просмотра и управления прямо из terminal UI."
architecture: "The plugin integrates into OpenCode's TUI surface, groups agents by lifecycle state, and renders collapsible SolidJS sidebar sections with model and alias metadata."
architectureRu: "Плагин интегрируется в TUI OpenCode, группирует агентов по lifecycle state и рендерит сворачиваемые SolidJS-секции сайдбара с model и alias metadata."
decisions:
  - "Reuse the host theme system so the plugin feels native instead of external."
  - "Group by lifecycle state to support operational decisions during active agent runs."
decisionsRu:
  - "Переиспользовать theme system хоста, чтобы плагин ощущался нативным, а не внешним."
  - "Группировать по lifecycle state, чтобы помогать с operational decisions во время agent runs."
role:
  - "Designed and implemented the sidebar UX, grouping model, theme integration, and plugin behavior."
roleRu:
  - "Спроектировал и реализовал sidebar UX, модель группировки, theme integration и поведение plugin."
futureImprovements:
  - "Add keyboard-first batch actions for common agent operations."
  - "Expose more health and resource indicators without overcrowding the sidebar."
futureImprovementsRu:
  - "Добавить keyboard-first batch actions для частых операций с агентами."
  - "Показать больше health и resource indicators без перегрузки сайдбара."
features:
  - "Groups OhMyOpenAgent agents by lifecycle state: active, idle, and stopped"
  - "Adds collapsible sidebar sections with model metadata and alias support"
  - "Integrates with the OpenCode theme system for native TUI styling"
featuresRu:
  - "Группирует OhMyOpenAgent агентов по состояниям lifecycle: active, idle и stopped"
  - "Добавляет сворачиваемые секции сайдбара с model metadata и aliases"
  - "Интегрируется с системой тем OpenCode для нативного TUI-стиля"
status: "active"
startDate: "2026-05"
image: "/images/projects/opencode-agents-sidebar/preview.png"
---

A sidebar plugin for the OpenCode TUI that provides a management interface for OhMyOpenAgent agents. It organizes agents into lifecycle-based categories: active, idle, and stopped.

The sidebar supports collapsible sections, displays model information, works with aliases, and integrates with the OpenCode theme system so it feels like a native part of the TUI.

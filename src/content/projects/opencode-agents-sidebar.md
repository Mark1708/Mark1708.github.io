---
title: "opencode-agents-sidebar"
description: "OpenCode TUI sidebar plugin for browsing provider agents. Normalized AgentProvider boundary, collapsible categories, model info, aliases support, and theme integration."
descriptionRu: "TUI-сайдбар плагин для OpenCode — просмотр provider-агентов. Normalized AgentProvider boundary, сворачиваемые категории, информация о моделях, поддержка алиасов и интеграция с темами."
bodyRu: |
  Плагин боковой панели для OpenCode TUI, который показывает provider-агентов через normalized AgentProvider boundary. UI не завязан на OhMyOpenAgent как core model: существующий OmO файл используется только как temporary bootstrap source, а архитектура готова к native OpenCode provider.

  Сайдбар группирует агентов в нейтральные категории, поддерживает сворачиваемые секции, показывает provider/model/variant/fallback metadata, работает с алиасами и интегрируется с системой тем OpenCode, чтобы выглядеть как нативная часть TUI.
technologies: ["TypeScript", "Bun", "SolidJS", "OpenCode Plugin API"]
githubUrl: "https://github.com/Mark1708/opencode-agents-sidebar"
featured: false
order: 3
summary: "OpenCode TUI sidebar for provider agent browsing"
summaryRu: "TUI-сайдбар OpenCode для просмотра provider-агентов"
demonstrates: "Developer tooling, CLI/TUI workflow, AI-assisted development"
demonstratesRu: "Developer tooling, CLI/TUI workflow, AI-assisted development"
problem: "Make multi-agent OpenCode workflows easier to inspect and operate from the terminal UI."
problemRu: "Сделать multi-agent OpenCode workflows проще для просмотра и управления прямо из terminal UI."
architecture: "The plugin integrates into OpenCode's TUI surface through a normalized AgentProvider boundary. Bootstrap OhMyOpenAgent data and future native/custom providers feed the same SolidJS sidebar, which renders neutral categories with model and alias metadata."
architectureRu: "Плагин интегрируется в TUI OpenCode через normalized AgentProvider boundary. Bootstrap-данные OhMyOpenAgent и будущие native/custom providers питают один SolidJS sidebar, который рендерит нейтральные категории с model и alias metadata."
decisions:
  - "Reuse the host theme system so the plugin feels native instead of external."
  - "Use a provider boundary so the UI can stay source-agnostic as native OpenCode and custom providers are added."
decisionsRu:
  - "Переиспользовать theme system хоста, чтобы плагин ощущался нативным, а не внешним."
  - "Использовать provider boundary, чтобы UI оставался source-agnostic при добавлении native OpenCode и custom providers."
role:
  - "Designed and implemented the sidebar UX, grouping model, theme integration, and plugin behavior."
roleRu:
  - "Спроектировал и реализовал sidebar UX, модель группировки, theme integration и поведение plugin."
futureImprovements:
  - "Add a native OpenCode provider for built-in, global, project, and workspace agents."
  - "Expose more health and resource indicators without overcrowding the sidebar."
futureImprovementsRu:
  - "Добавить native OpenCode provider для built-in, global, project и workspace agents."
  - "Показать больше health и resource indicators без перегрузки сайдбара."
features:
  - "Displays provider agents through a normalized AgentProvider boundary"
  - "Adds collapsible sidebar sections with neutral categories, model metadata, and alias support"
  - "Integrates with the OpenCode theme system for native TUI styling"
featuresRu:
  - "Показывает provider-агентов через normalized AgentProvider boundary"
  - "Добавляет сворачиваемые секции сайдбара с нейтральными категориями, model metadata и aliases"
  - "Интегрируется с системой тем OpenCode для нативного TUI-стиля"
status: "active"
startDate: "2026-05"
image: "/images/projects/opencode-agents-sidebar/preview.png"
---

A sidebar plugin for the OpenCode TUI that provides a provider-agnostic browsing interface for agents and subagents. The current foundation uses OhMyOpenAgent metadata only as a temporary bootstrap source behind a normalized AgentProvider boundary.

The sidebar supports collapsible neutral categories, displays provider/model/variant/fallback information, works with aliases, and integrates with the OpenCode theme system so it feels like a native part of the TUI.

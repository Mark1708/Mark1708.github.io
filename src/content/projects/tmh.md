---
title: "tmh"
description: "Declarative tmux session manager in YAML — TUI dashboard, fuzzy picker, drift detection, dotfile sync, freeze/import/export. Single binary."
descriptionRu: "Декларативный менеджер tmux-сессий на YAML — TUI-дашборд, fuzzy-поиск, обнаружение дрифта, синхронизация dotfiles, freeze/import/export. Единственный бинарник."
bodyRu: |
  Декларативное управление tmux-сессиями через YAML-конфигурации. Инструмент включает TUI-дашборд с fuzzy-поиском сессий, обнаружение расхождений между описанным и запущенным состоянием, синхронизацию dotfiles и сценарии freeze, import и export.

  Проект написан на Go и поставляется как один статический бинарник, собранный через GoReleaser. Такой формат подходит для переносимой настройки рабочих окружений без сложной установки.
technologies: ["Go", "Bubble Tea", "Goreleaser"]
githubUrl: "https://github.com/Mark1708/tmh"
featured: true
order: 2
summary: "Declarative tmux sessions with YAML and TUI control"
summaryRu: "Декларативные tmux-сессии на YAML с TUI"
demonstrates: "TUI engineering, declarative config, drift detection"
demonstratesRu: "TUI-инженерия, декларативные конфиги, обнаружение drift"
features:
  - "Defines tmux sessions declaratively in YAML configuration files"
  - "Provides a Bubble Tea TUI dashboard with fuzzy session picker"
  - "Detects drift and supports dotfile sync plus freeze/import/export workflows"
featuresRu:
  - "Описывает tmux-сессии декларативно в YAML-конфигурациях"
  - "Предоставляет Bubble Tea TUI-дашборд с fuzzy-поиском сессий"
  - "Обнаруживает drift и поддерживает dotfile sync, freeze/import/export workflows"
status: "active"
startDate: "2026-05"
image: "/images/projects/tmh/preview.gif"
---

Declarative tmux session management powered by YAML configuration files. Features a TUI dashboard with fuzzy session picker, drift detection between declared and running sessions, dotfile sync, and freeze/import/export workflows. Built as a single static binary with GoReleaser.

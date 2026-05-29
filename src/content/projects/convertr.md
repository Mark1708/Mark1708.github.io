---
title: "convertr"
description: "Universal CLI file format converter supporting 50+ conversions across documents, images, audio, video, and data formats. Powered by pluggable backends: Pandoc, LibreOffice, FFmpeg, ImageMagick, jq, yq, and more."
descriptionRu: "Универсальный CLI-конвертер форматов с поддержкой 50+ преобразований — документы, изображения, аудио, видео, данные. Построен на подключаемых бэкендах: Pandoc, LibreOffice, FFmpeg, ImageMagick, jq, yq и другие."
bodyRu: |
  CLI-утилита на Go для конвертации файлов между форматами через лучший доступный локальный backend.

  Convertr выступает единым входом для рабочих процессов с документами, изображениями, аудио, видео и data formats. Конкретные преобразования передаются специализированным инструментам вроде Pandoc, FFmpeg, LibreOffice, ImageMagick, jq и yq, поэтому проект остается расширяемым и не пытается заново реализовать уже зрелые конвертеры.
technologies: ["Go", "Cobra", "GitHub Actions", "GoReleaser"]
githubUrl: "https://github.com/Mark1708/convertr"
featured: true
order: 1
summary: "Go CLI converter for 50+ file format workflows"
summaryRu: "Go CLI-конвертер для 50+ файловых форматов"
demonstrates: "CLI architecture, format routing, GoReleaser"
demonstratesRu: "Архитектура CLI, маршрутизация форматов, GoReleaser"
features:
  - "Routes conversions to local tools such as Pandoc, FFmpeg, LibreOffice, ImageMagick, jq, and yq"
  - "Supports document, image, audio, video, and data format pipelines from one CLI"
  - "Ships as a Go/Cobra command-line app with automated releases through GoReleaser"
featuresRu:
  - "Направляет конвертации в локальные инструменты: Pandoc, FFmpeg, LibreOffice, ImageMagick, jq и yq"
  - "Поддерживает документы, изображения, аудио, видео и data formats из одного CLI"
  - "Поставляется как Go/Cobra CLI с автоматизированными релизами через GoReleaser"
status: "active"
startDate: "2026-05"
image: "/images/projects/convertr/preview.png"
---

A Go-based CLI tool that routes between file formats using the best available local backend.

Convertr works as a single entry point for document, image, audio, video, and data-format workflows. Specific conversions are delegated to specialized tools such as Pandoc, FFmpeg, LibreOffice, ImageMagick, jq, and yq, so the project stays extensible without reimplementing mature converters.

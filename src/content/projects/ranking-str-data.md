---
title: "ranking-str-data"
description: "Local Java CLI for ranking Y-STR haplotypes against a selected base haplotype. It computes TMRCA-related research metrics and appends ranked results to a semicolon-separated CSV file."
descriptionRu: "Локальный Java CLI для ранжирования Y-STR гаплотипов относительно выбранного базового гаплотипа. Инструмент рассчитывает исследовательские метрики TMRCA и добавляет ранжированные результаты в CSV с разделителем точка с запятой."
technologies: ["Java", "Maven", "Apache Spark", "JCommander", "Log4j", "JUnit"]
githubUrl: "https://github.com/Mark1708/ranking-str-data"
featured: false
order: 12
summary: "Java research CLI for ranking Y-STR haplotype data"
summaryRu: "Java CLI для исследовательского ранжирования Y-STR данных"
features:
  - "Ranks Y-STR haplotypes against a uniquely selected base haplotype"
  - "Computes ASD, TMRCA, lambda, and Klyosov back-mutation correction metrics"
  - "Reads semicolon-separated CSV files through Spark and writes RankedData.csv next to the input"
featuresRu:
  - "Ранжирует Y-STR гаплотипы относительно уникально выбранного базового гаплотипа"
  - "Рассчитывает ASD, TMRCA, lambda и метрики коррекции обратных мутаций по Клёсову"
  - "Читает CSV с разделителем точка с запятой через Spark и сохраняет RankedData.csv рядом с исходным файлом"
status: "active"
startDate: "2024-05"
image: "/images/projects/ranking-str-data/preview.png"
---

Local Java CLI for ranking Y-STR haplotypes against a selected base haplotype and appending TMRCA-related research metrics to a semicolon-separated CSV file.

The project was built for a genetics research workflow. It reads Y-STR haplotype rows, compares each row with a uniquely selected base haplotype, computes research metrics, and writes a ranked CSV next to the input file.

The code implements a linear Y-STR TMRCA calculation based on the Klyosov method with back-mutation correction. This is a local research tool, not a clinical or diagnostic system.

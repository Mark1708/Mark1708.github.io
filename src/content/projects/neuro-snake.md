---
title: "neuro-snake"
description: "Brain-controlled Snake game using Arduino EEG hardware and Python. Demonstrates a playful BCI experiment with real-time signal processing, pygame controls, and generated activity reports."
descriptionRu: "Игра Snake, управляемая активностью мозга через Arduino EEG hardware и Python. Показывает игровой BCI experiment с real-time signal processing, pygame controls и generated activity reports."
bodyRu: |
  Учебный hardware/software эксперимент, который подключает Arduino Uno и EEG-модуль к игре Snake на Python. Проект считывает сигналы активности мозга через serial communication и обрабатывает их в реальном времени.

  После обработки сигнал сопоставляется с управлением Snake в pygame, а по завершении каждого экспериментального запуска формируется PDF-отчет об активности. Это игровой BCI-прототип для демонстрации связки Arduino, EEG и Python.
technologies: ["Python", "pygame", "Arduino", "EEG", "pySerial", "NumPy", "SciPy"]
githubUrl: "https://github.com/Mark1708/neuro-snake"
featured: false
order: 8
summary: "Brain-controlled Snake game with Arduino EEG input"
summaryRu: "Snake с управлением через Arduino EEG-сигнал"
features:
  - "Reads EEG activity from Arduino hardware over serial communication"
  - "Processes signals in Python and maps activity to pygame Snake controls"
  - "Generates a PDF activity report after each experimental run"
featuresRu:
  - "Считывает EEG-активность с Arduino hardware через serial communication"
  - "Обрабатывает сигналы на Python и маппит активность на pygame-управление Snake"
  - "Генерирует PDF-отчет об активности после каждого экспериментального запуска"
status: "archived"
startDate: "2023-05"
image: "/images/projects/neuro-snake/preview.gif"
---

An educational hardware/software experiment that connects an Arduino Uno and EEG unit to a Python Snake game. The project captures brain-activity signals over serial communication and processes them in real time.

After processing, the signal is mapped to pygame Snake controls, and each experimental run produces a PDF activity report. It's a playful BCI prototype for demonstrating the Arduino, EEG, and Python connection.

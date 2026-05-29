---
title: "spring-yoomoney-db-queue"
description: "PostgreSQL-backed queue performance benchmark for Spring Boot services. Compares schema variants, batching, and indexing choices to evaluate database-backed queue throughput under load."
descriptionRu: "Бенчмарк производительности PostgreSQL-backed очередей для Spring Boot. Сравнивает варианты схем, batching и indexing choices, чтобы оценить throughput БД-очереди под нагрузкой."
bodyRu: |
  Бенчмарк производительности очередей на базе PostgreSQL для Spring Boot приложений. Эксперимент сравнивает варианты схем, размеры батчей и настройки индексов по throughput и latency.

  Цель проекта в том, чтобы понять, когда database-backed queue остается практичным вариантом под нагрузкой и какие компромиссы возникают при выборе структуры таблиц, батчинга и стратегии индексирования.
technologies: ["Java", "Spring Boot", "PostgreSQL", "Docker", "db-queue"]
githubUrl: "https://github.com/Mark1708/spring-yoomoney-db-queue"
featured: true
order: 6
summary: "PostgreSQL queue benchmark for Spring Boot services"
summaryRu: "Бенчмарк PostgreSQL-очередей для Spring Boot"
demonstrates: "Payment-style queue integration, outbox / queue trade-offs, Spring Boot"
demonstratesRu: "Интеграцию очередей, outbox / queue подход, Spring Boot"
features:
  - "Benchmarks PostgreSQL-backed queue processing in Spring Boot applications"
  - "Compares schema variants, batch sizes, and indexing strategies under load"
  - "Measures throughput and latency to evaluate database queue trade-offs"
featuresRu:
  - "Бенчмаркает PostgreSQL-backed queue processing в Spring Boot приложениях"
  - "Сравнивает варианты схем, размеры батчей и стратегии индексирования под нагрузкой"
  - "Измеряет throughput и latency для оценки trade-offs БД-очередей"
status: "archived"
startDate: "2024-10"
image: "/images/projects/spring-yoomoney-db-queue/preview.png"
---

A performance benchmark for PostgreSQL-backed queue processing in Spring Boot applications. The experiment compares schema variants, batch sizes, and indexing choices by throughput and latency.

The goal is to understand when a database-backed queue remains a practical option under load and what trade-offs appear when choosing table structure, batching, and indexing strategy.

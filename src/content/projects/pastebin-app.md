---
title: "pastebin-app"
description: "Full-stack Pastebin demo with Spring Boot 3, React, Keycloak SSO, MinIO object storage, and Docker Compose. Shows REST API design, containerized infrastructure, and role-based access control in a sandbox setup."
descriptionRu: "Full-stack Pastebin demo на Spring Boot 3, React, Keycloak SSO, MinIO и Docker Compose. Показывает REST API design, контейнеризированную инфраструктуру и ролевой доступ в sandbox setup."
bodyRu: |
  Full-stack демо Pastebin на Spring Boot 3 REST API и React frontend. Для аутентификации используется Keycloak SSO, для объектного хранилища MinIO, а PostgreSQL отвечает за постоянное хранение данных.

  Проект сосредоточен на архитектуре и интеграционных точках в локальном Docker Compose окружении. Это sandbox для демонстрации REST API design, контейнеризированной инфраструктуры и role-based access control, а не production-hardened система.
technologies: ["Java", "Spring Boot", "React", "Keycloak", "Docker", "PostgreSQL", "MinIO"]
githubUrl: "https://github.com/Mark1708/pastebin-app"
featured: false
order: 5
summary: "Spring Boot and React Pastebin with SSO sandbox"
summaryRu: "Pastebin на Spring Boot и React с SSO sandbox"
demonstrates: "REST API design, authentication, roles, sandbox infrastructure"
demonstratesRu: "REST API, аутентификацию, роли, sandbox-инфраструктуру"
problem: "Show how a small full-stack product can combine authentication, object storage, persistence, and frontend delivery in one local system."
problemRu: "Показать, как небольшой full-stack продукт объединяет аутентификацию, объектное хранилище, постоянное хранение и frontend в одной локальной системе."
architecture: "React frontend talks to a Spring Boot REST API. Keycloak handles SSO and roles, PostgreSQL stores metadata, MinIO stores paste objects, and Docker Compose wires the local infrastructure."
architectureRu: "React frontend обращается к Spring Boot REST API. Keycloak отвечает за SSO и роли, PostgreSQL хранит метаданные, MinIO — объекты паст, а Docker Compose связывает локальную инфраструктуру."
decisions:
  - "Use Keycloak instead of a custom auth layer to demonstrate realistic SSO integration."
  - "Keep infrastructure local and reproducible through Docker Compose."
decisionsRu:
  - "Использовать Keycloak вместо самописной auth-логики, чтобы показать реалистичную SSO-интеграцию."
  - "Держать инфраструктуру локальной и воспроизводимой через Docker Compose."
role:
  - "Designed the backend API, auth flow, storage integration, and local infrastructure."
  - "Connected the React frontend to the Spring Boot service boundary."
roleRu:
  - "Спроектировал backend API, auth flow, интеграцию хранилища и локальную инфраструктуру."
  - "Связал React frontend с границей Spring Boot сервиса."
futureImprovements:
  - "Add broader integration test coverage and observability."
  - "Harden rate limits and storage lifecycle policies for production-like use."
futureImprovementsRu:
  - "Добавить более широкие integration tests и observability."
  - "Усилить rate limits и lifecycle policies хранилища для production-like сценариев."
features:
  - "Implements a Spring Boot 3 REST API with a React frontend"
  - "Uses Keycloak SSO and role-based access control for authentication flows"
  - "Runs PostgreSQL, MinIO, and app services in a local Docker Compose setup"
featuresRu:
  - "Реализует Spring Boot 3 REST API с React frontend"
  - "Использует Keycloak SSO и role-based access control для authentication flows"
  - "Запускает PostgreSQL, MinIO и приложения в локальном Docker Compose setup"
status: "archived"
startDate: "2024-09"
image: "/images/projects/pastebin-app/preview.png"
---

A full-stack Pastebin demo built with a Spring Boot 3 REST API and React frontend. It uses Keycloak SSO for authentication, MinIO for object storage, and PostgreSQL for persistence.

The project focuses on architecture and integration points in a local Docker Compose environment. It's a sandbox for demonstrating REST API design, containerized infrastructure, and role-based access control, not a production-hardened system.

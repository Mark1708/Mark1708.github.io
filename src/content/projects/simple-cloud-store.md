---
title: "simple-cloud-store"
description: "Full-stack cloud store sandbox with a React/Vite storefront and Java microservices behind a Vert.x gateway. The project compares Spring Boot, Quarkus, Vert.x, and React service styles in one store flow."
descriptionRu: "Full-stack sandbox интернет-магазина с React/Vite витриной и Java-микросервисами за Vert.x gateway. Проект сравнивает Spring Boot, Quarkus, Vert.x и React в едином сценарии магазина."
bodyRu: |
  Full-stack sandbox интернет-магазина с публичной витриной на React, Vite и TypeScript, а также тремя Java-микросервисами за Vert.x gateway.

  Это портфолио-демо для сравнения Spring Boot, Quarkus, Vert.x и React в одном пользовательском сценарии магазина. Текущий frontend находится в `web-react`, а backend-стек включает Catalog API, Inventory API, Gateway API/static edge и PostgreSQL.

  Gateway объединяет вызовы catalog и inventory для `/api/products`. Web service служит текущей публичной витриной и построен на React, Vite, TypeScript, PatternFly и Express.
technologies: ["Java", "Spring Boot", "Quarkus", "Vert.x", "React", "Vite", "PostgreSQL", "Docker"]
githubUrl: "https://github.com/Mark1708/simple-cloud-store"
featured: false
order: 13
summary: "Cloud store sandbox with React and Java microservices"
summaryRu: "Sandbox магазина на React и Java-микросервисах"
features:
  - "Combines a React 19 and Vite storefront with catalog, inventory, and gateway services"
  - "Uses Spring Boot for catalog, Quarkus for inventory, and Vert.x as the API/static edge"
  - "Runs the local stack with Docker Compose, PostgreSQL, gateway routing, and documented service checks"
featuresRu:
  - "Объединяет витрину на React 19 и Vite с сервисами catalog, inventory и gateway"
  - "Использует Spring Boot для catalog, Quarkus для inventory и Vert.x как API/static edge"
  - "Запускает локальный стек через Docker Compose с PostgreSQL, маршрутизацией gateway и документированными проверками сервисов"
status: "active"
startDate: "2024-09"
image: "/images/projects/simple-cloud-store/preview.png"
---

Full-stack cloud store sandbox with a public React/Vite/TypeScript storefront and three Java microservices behind a Vert.x gateway.

The project is a portfolio demo for comparing Spring Boot, Quarkus, Vert.x, and React service styles in one store flow. The current frontend is `web-react`, while the backend stack includes a Catalog API, an Inventory API, a Gateway API/static edge, and PostgreSQL.

Gateway combines catalog and inventory calls for `/api/products`. The web service is the current public frontend and is based on React, Vite, TypeScript, PatternFly, and Express.

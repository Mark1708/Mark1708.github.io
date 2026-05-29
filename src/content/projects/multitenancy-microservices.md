---
title: "multitenancy-microservices"
description: "Spring Boot microservices architecture demo for comparing multi-tenancy strategies. The project models tenant isolation with database-per-tenant, schema-per-tenant, and tenant-column approaches across separate services."
descriptionRu: "Архитектурный демо-проект на Spring Boot для сравнения стратегий мультитенантности в микросервисах. В отдельных сервисах показаны изоляция через базу на tenant, схему на tenant и tenant-колонку."
bodyRu: |
  Архитектурный демо-проект на Spring Boot для сравнения стратегий мультитенантности в микросервисной среде. В репозитории собраны четыре сервиса и локальная инфраструктура для tenant-aware backend design: `employee-service`, `organization-service`, `device-service` и `tenant-service`.

  Проект показывает несколько подходов к изоляции tenant-данных в одной системе, при этом границы сервисов остаются явными. Данные сотрудников используют модель database-per-tenant, данные организаций изолируются через schema-per-tenant, данные устройств хранятся с tenant-колонкой, а tenant service содержит общие метаданные арендаторов.
technologies: ["Java", "Spring Boot", "Spring Cloud", "PostgreSQL", "Consul", "Docker"]
githubUrl: "https://github.com/Mark1708/multitenancy-microservices"
featured: true
order: 11
summary: "Spring Boot microservices demo for tenant isolation patterns"
summaryRu: "Демо микросервисов Spring Boot с паттернами tenant isolation"
demonstrates: "Multi-tenancy trade-offs, service boundaries, tenant isolation"
demonstratesRu: "Компромиссы мультитенантности, границы сервисов, изоляция tenant"
problem: "Compare tenant isolation strategies in a microservice system where each service has different data ownership constraints."
problemRu: "Сравнить стратегии tenant isolation в микросервисной системе, где у каждого сервиса разные ограничения владения данными."
architecture: "Four Spring Boot services model employee, organization, device, and tenant registry boundaries. PostgreSQL demonstrates database-per-tenant, schema-per-tenant, and tenant-column isolation, with Consul and Docker Compose for local service discovery and infrastructure."
architectureRu: "Четыре Spring Boot сервиса моделируют границы employee, organization, device и tenant registry. PostgreSQL показывает изоляцию через database-per-tenant, schema-per-tenant и tenant-column, а Consul и Docker Compose отвечают за локальный service discovery и инфраструктуру."
decisions:
  - "Keep isolation strategies in separate services to make trade-offs visible and comparable."
  - "Use tenant headers and service boundaries instead of hiding multi-tenancy in one shared abstraction."
decisionsRu:
  - "Разнести стратегии изоляции по разным сервисам, чтобы trade-offs были видимыми и сравнимыми."
  - "Использовать tenant headers и service boundaries, а не прятать мультитенантность в одной общей абстракции."
tradeoffs:
  - "Database-per-tenant improves isolation but increases operational overhead."
  - "Tenant-column storage is simpler to operate but demands stricter query discipline."
tradeoffsRu:
  - "Database-per-tenant усиливает изоляцию, но увеличивает operational overhead."
  - "Tenant-column storage проще в эксплуатации, но требует строгой дисциплины запросов."
role:
  - "Designed the service boundaries, tenant isolation examples, local infrastructure, and validation flow."
roleRu:
  - "Спроектировал service boundaries, примеры tenant isolation, локальную инфраструктуру и validation flow."
futureImprovements:
  - "Add centralized observability for tenant-aware request tracing."
  - "Add security tests for tenant boundary violations."
futureImprovementsRu:
  - "Добавить centralized observability для tenant-aware request tracing."
  - "Добавить security tests на нарушения tenant boundaries."
features:
  - "Compares database-per-tenant, schema-per-tenant, and tenant-column isolation models"
  - "Splits employee, organization, device, and tenant registry responsibilities into separate services"
  - "Uses PostgreSQL, Consul, Docker Compose, Actuator, and tenant-header validation for local architecture testing"
featuresRu:
  - "Сравнивает модели изоляции: отдельная база, отдельная схема и tenant-колонка"
  - "Разделяет employee, organization, device и tenant registry по отдельным сервисам"
  - "Использует PostgreSQL, Consul, Docker Compose, Actuator и проверку tenant-заголовков для локального тестирования архитектуры"
status: "active"
startDate: "2024-06"
image: "/images/projects/multitenancy-microservices/preview.png"
---

Spring Boot backend architecture demo for comparing multi-tenancy strategies across microservices. The repository contains four services and local infrastructure for tenant-aware backend design: `employee-service`, `organization-service`, `device-service`, and `tenant-service`.

The project demonstrates several tenant data-isolation approaches in one system while keeping service boundaries explicit. Employee data uses a database-per-tenant model, organization data uses schema-per-tenant isolation, device data uses tenant-column isolation, and the tenant service stores shared tenant metadata.

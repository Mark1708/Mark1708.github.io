---
title: "multitenacy-microservices"
description: "Spring Boot microservices architecture demo for comparing multi-tenancy strategies. The project models tenant isolation with database-per-tenant, schema-per-tenant, and tenant-column approaches across separate services."
descriptionRu: "Архитектурный демо-проект на Spring Boot для сравнения стратегий мультитенантности в микросервисах. В отдельных сервисах показаны изоляция через базу на tenant, схему на tenant и tenant-колонку."
technologies: ["Java", "Spring Boot", "Spring Cloud", "PostgreSQL", "Consul", "Docker"]
githubUrl: "https://github.com/Mark1708/multitenacy-microservices"
featured: false
order: 11
summary: "Spring Boot microservices demo for tenant isolation patterns"
summaryRu: "Демо микросервисов Spring Boot с паттернами tenant isolation"
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
image: "/images/projects/multitenacy-microservices/preview.png"
---

Spring Boot backend architecture demo for comparing multi-tenancy strategies across microservices. The repository contains four services and local infrastructure for tenant-aware backend design: `employee-service`, `organization-service`, `device-service`, and `tenant-service`.

The project demonstrates several tenant data-isolation approaches in one system while keeping service boundaries explicit. Employee data uses a database-per-tenant model, organization data uses schema-per-tenant isolation, device data uses tenant-column isolation, and the tenant service stores shared tenant metadata.

The public repository path keeps the historical typo `multitenacy-microservices`, while the README and Gradle root project use the corrected `multitenancy-microservices` spelling.

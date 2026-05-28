---
title: "Хранение и получение данных: что управленцу нужно понимать до разговора с IT"
titleEn: "Storing and Retrieving Data: What a Manager Needs to Know Before Talking to IT"
description: "Расширенное сопровождение к лекции в ВШЭ о типах данных, СУБД, архитектурах хранения и роли данных в современном бизнесе"
descriptionEn: "An extended companion to an HSE University lecture on data types, DBMS, storage architectures and the role of data in modern business"
date: "2025-06-03"
sourceName: "HSE University"
sourceNameRu: "ВШЭ"
tags: ["Data Architecture", "Databases", "Data Engineering", "OLAP", "NoSQL"]
readingTime: "45 min"
files:
  - url: /files/hse-storing-retrieving-data.pdf
    label: "Presentation (PDF, 1.7 MB)"
    labelRu: "Презентация (PDF, 1.7 МБ)"
    format: PDF
  - url: /files/hse-storing-retrieving-data.pptx
    label: "Presentation (PPTX, 12 MB)"
    labelRu: "Презентация (PPTX, 12 МБ)"
    format: PPTX
bodyEn: |
  ## Overview

  This lecture introduces data as a business asset rather than a purely technical concern.
  It is aimed at managers, analysts and product leaders who need to speak the same language as engineers and architects.
  The central question is simple: how do companies store, retrieve, integrate and use data so that it supports decisions instead of becoming passive digital waste?

  The lecture starts with the idea often summarized as “data is the new oil”.
  Reports, BI dashboards and occasional AI experiments are not enough if the organization does not understand ownership, quality, context and responsibility for data.
  Data needs owners, standards and business goals.
  Without them, even expensive systems turn into isolated repositories with inconsistent metrics.

  ## Why managers need data literacy

  A manager does not have to become a database engineer.
  But they do need to understand how data appears, where it is stored, how it moves between systems and why different tools exist.
  This knowledge helps them ask better questions, define useful metrics, identify missing data and avoid treating every data problem as an IT-only responsibility.

  The key management shift is from “IT stores data for us” to “business domains own data products”.
  IT provides platforms and infrastructure, while business teams define meaning, quality expectations and decision-making value.

  ## Common barriers

  Organizations often underestimate the value of data because of several myths:

  - “It is too complex and expensive.” In practice, progress can start with an inventory of existing data, cleaning reference books and automating a few high-value reports.
  - “It is an IT task.” IT can build pipelines and storage, but the business knows what should be collected and how metrics should be interpreted.
  - “We already have everything.” Dashboards may exist while metrics are still calculated differently in each department.
  - “We just need to collect everything.” Without governance, large storage becomes a data swamp.
  - “We are not an IT company.” Forecasting, logistics, service quality and compliance all depend on data even in traditional industries.

  ## Historical evolution

  The lecture traces the evolution of data storage from relational theory to AI-era architectures.
  In the 1970s, Edgar Codd’s relational model introduced a rigorous way to organize data in tables.
  The 1980s brought commercial SQL systems such as Oracle and DB2.
  The 1990s added the internet, OLAP and data warehousing.

  In the 2000s, web-scale companies exposed the limits of traditional relational databases.
  Google, Amazon and Facebook pushed distributed storage, MapReduce, BigTable, Dynamo-style systems and eventually the NoSQL movement.
  From 2013 onward, cloud-native data platforms, managed services, Spark, Kafka, Airflow and Kubernetes reshaped the modern data stack.
  Since 2019, Data Lakehouse architectures and AI workloads have increased demand for real-time analytics and vector databases.

  ## Data types

  The lecture distinguishes three major data classes.

  Structured data has a fixed schema: tables, rows, columns and typed values.
  It is the foundation of accounting, CRM records, orders, finance, logistics, BI and operational reporting.
  Its strength is predictability and validation.

  Semi-structured data has internal logic but not a rigid table structure.
  Examples include JSON, XML, YAML, logs and event payloads.
  It is common in APIs, SaaS integrations, IoT messages and event-driven systems.
  It provides flexibility without losing machine readability.

  Unstructured data includes documents, text, images, audio, video, scans, presentations and conversations.
  It is harder to process, but it often contains the richest business context: complaints, contracts, internal knowledge and customer feedback.
  Modern OCR, NLP, embeddings and LLM-based tools make this category increasingly valuable.

  ## Data sources and integration

  Data comes from internal and external sources.
  Internal sources include CRM, ERP, accounting systems, HR platforms, project trackers, sensors, equipment and product events.
  External sources include payment providers, open datasets, partner APIs, traffic analytics, market data and public registers.

  Sources also differ by arrival pattern.
  Online sources produce real-time events such as clicks, telemetry or transactions.
  Offline sources provide periodic batches such as nightly exports or weekly reports.
  This distinction affects architecture: batch-oriented pipelines and real-time streams solve different problems.

  Integration is difficult because formats, identifiers, business rules, update frequency and access rights differ across systems.
  ETL extracts, transforms and then loads clean data.
  ELT extracts and loads raw data first, then transforms it inside a powerful storage layer.
  CDC captures only changes and is closer to real-time, but requires more careful setup.

  ## OLTP and OLAP

  OLTP systems handle operational transactions: orders, payments, customer registration, stock updates and other daily business events.
  They prioritize speed, consistency and reliability.
  They are the “cash register” or “nervous system” of the business.

  OLAP systems handle analytical workloads: historical comparison, aggregation, dashboards, forecasting and strategic analysis.
  They prioritize complex queries over large volumes of historical data.
  They are the “finance planning department” or “brain” of the business.

  Trying to use one database for both operational transactions and heavy analytics often causes slowdowns, inconsistent reports and architectural complexity.
  That is why modern architectures usually separate operational and analytical layers.

  ## DBMS types

  Relational SQL databases remain the default choice for well-structured data, transactional integrity and strict consistency.
  Examples include PostgreSQL, MySQL, Oracle and Microsoft SQL Server.

  NoSQL databases cover several specialized models:

  - Document databases such as MongoDB store flexible JSON-like documents.
  - Column-oriented databases such as ClickHouse and Redshift optimize analytical scans and aggregations.
  - Key-value stores such as Redis and DynamoDB provide very fast access by key and are often used for cache, sessions and temporary state.
  - Graph databases such as Neo4j model relationships directly and are useful for networks, routes, hierarchies and dependencies.
  - Vector databases such as Qdrant, Milvus, Pinecone and Weaviate support similarity search over embeddings.
  - In-memory databases such as Redis, Memcached, SAP HANA and Tarantool keep data in RAM for extremely low latency.

  NewSQL systems try to preserve SQL and transactional guarantees while adding distributed scalability and high availability.
  Examples include CockroachDB, Google Spanner, TiDB, YDB and VoltDB.

  The main conclusion is that there is no universal database.
  Architecture is usually a combination of tools selected for concrete business workloads.

  ## Storage architectures

  A Data Warehouse centralizes cleaned and structured data from many systems.
  It provides a “single version of truth” for management reporting, BI and KPI monitoring.
  Its drawbacks are inertia, batch latency and lower flexibility with diverse data.

  A Data Lake stores raw data cheaply and at scale.
  It can contain tables, logs, JSON, images, audio and documents.
  Its risk is becoming a data swamp if cataloging, governance and processing are missing.

  A Data Lakehouse combines the flexibility of a lake with governance and analytical structure closer to a warehouse.
  It reduces duplication and lets BI, analytics and ML workflows use one storage layer.

  Data Mesh is an organizational approach: business domains own their data as products.
  It requires common standards, discoverability, access control and accountability.
  It works best in large organizations where centralized data teams become a bottleneck.

  Data Fabric creates a unified logical access layer over distributed sources.
  It does not necessarily move all data into one place; instead, it connects existing systems through metadata, catalogs, APIs and access policies.

  ## Russian DBMS and import substitution

  The lecture also covers Russian and Russia-associated alternatives across database categories.
  For SQL workloads, examples include Postgres Pro, Jatoba, Tantor, Proxima DB, Red Database, Linter, Pangolin DB, Kvant-Hybrid, Arenadata Postgres and SoQoL.
  For analytical and NoSQL-related workloads, examples include ClickHouse, Qdrant, Tarantool and YDB.

  The point is not to migrate blindly.
  The point is to understand available options, certification constraints, operational risks and strategic independence requirements.

  ## Vector databases and AI

  Vector databases are crucial for modern AI systems because they store embeddings: numeric representations of text, images, audio or other complex objects.
  Instead of exact matching, they support similarity search.
  This allows systems to find documents that are close in meaning even when the words differ.

  This is the basis of many RAG systems.
  Corporate documents are split into chunks, embedded and stored in a vector database.
  When a user asks a question, the query is embedded too.
  The vector database retrieves the most semantically relevant chunks.
  The LLM then uses those chunks as context to generate a grounded answer.

  This makes AI useful for internal knowledge, support, policy search, document analysis and recommendation scenarios.
  Without clean data, reliable pipelines and controlled access, AI systems cannot produce trustworthy business value.

  ## Main conclusions

  Data is an asset, not a by-product.
  Storage is only the beginning: organizations must clean, transform, catalog and govern data.
  Architecture shapes decision speed, report quality and the ability to adapt.
  Import substitution is a strategic risk-management topic, not a slogan.
  AI depends on data architecture: models become useful when connected to relevant, secure and well-managed internal knowledge.

  Responsibility for data belongs not only to IT.
  It belongs to business, management and analytics as well.
  The organizations that learn to work with data deliberately will shape their future faster than those that merely store it.
---
# Хранение и получение данных: что управленцу нужно понимать до разговора с IT

Так получилось, что в прошлом году я читал онлайн-лекцию в ВШЭ на тему **«Хранение и получение данных»**. Это был в целом первый опыт так еще и для нетипичных для меня слушателей, так как это были не коллеги разработчики/архитекторов/дата-инженеров, а руководители разных функций крупных компаний.

То есть на людей, которые каждый день принимают решения, отвечают за процессы, бюджеты, команды, показатели, риски и развитие бизнеса, но при этом не обязаны знать, как писать SQL-запросы, настраивать шардирование базы данных или проектировать распределённое хранилище.

Именно поэтому задача была не в том, чтобы за три часа превратить управленцев в инженеров. Это невозможно, да и не нужно.

Задача была другая: объяснить, **как устроен мир данных на уровне, достаточном для осознанного управленческого разговора**.

Не на уровне «ой, это всё IT, пусть они сами разберутся».  
И не на уровне «давайте срочно внедрим AI, потому что все внедряют».  
А где-то посередине: чтобы руководитель понимал, какие данные есть в компании, откуда они берутся, куда текут, почему отчёты расходятся, зачем нужны хранилища, почему одна база данных не решает все задачи и почему искусственный интеллект без нормальных данных превращается в дорогую игрушку.

Эта статья — расширенное сопровождение к той лекции.

---

## Данные — это актив, а не инфраструктура
![Слайд: Данные как актив](/images/articles/hse-storing-retrieving-data/slide-05.png)

Давайте начнём с фразы, которую слышали почти все:

> Data is the new oil.  
> Данные — это новая нефть.

Эту фразу обычно приписывают Клайву Хамби. Её повторяли так часто, что она уже успела немного надоесть. Но проблема не во фразе. Проблема в том, что многие компании произносят её вслух, но продолжают относиться к данным как к чему-то второстепенному.

Как к побочному продукту работы систем.

Где-то в CRM лежат клиенты.  
Где-то в ERP — закупки и склад.  
Где-то в 1С — бухгалтерия.  
Где-то в Excel — «самая правильная версия отчёта».  
Где-то в почте — договорённости.  
Где-то в голове у руководителя отдела — настоящая логика расчёта KPI.

Формально данные есть. Фактически ими никто не управляет.

И вот здесь важно зафиксировать простую мысль:

**данные сами по себе ничего не стоят, если с ними нельзя работать.**

Нефть тоже не особенно полезна, если она просто лежит под землёй. Её нужно найти, добыть, очистить, транспортировать, переработать и превратить во что-то полезное. С данными примерно так же.

Если их просто хранить, они не дают бизнес-эффекта.  
Если в них бардак, они вредят.  
Если они противоречат друг другу, им перестают доверять.  
Если непонятно, кто за них отвечает, они быстро превращаются в цифровой мусор.

Поэтому правильнее говорить не «у нас есть данные», а задавать более неприятные вопросы:

Кто отвечает за эти данные?  
Кто понимает их смысл?  
Кто следит за качеством?  
Кто определяет, какие данные важны?  
Кто может объяснить, почему в двух отчётах разные цифры?  
Кто принимает решение, какие данные нужно начать собирать уже сейчас, чтобы через год не было поздно?

Если ответ — «никто», значит данные никому не принадлежат.

А если нет владельца, то нет ответственности.  
Если нет ответственности, нет качества.  
Если нет качества, нет доверия.  
Если нет доверия, данные перестают быть активом.

Они становятся шумом.

---

## Почему управленцу нужно в этом разбираться

Управленец, который не понимает принципов работы с данными, похож на водителя, который не знает, где взять топливо, куда его залить и зачем оно вообще нужно.

При этом от него всё равно ждут, что машина поедет.

Важно не путать роли. Руководителю не нужно становиться дата-инженером. Ему не нужно руками писать пайплайны, выбирать индексы в PostgreSQL или спорить о плюсах и минусах Kafka.

Но ему нужно понимать базовую механику:

как данные появляются;  
где они хранятся;  
почему они портятся;  
почему отчёты расходятся;  
чем операционная база отличается от аналитической;  
почему «собрать всё в одну базу» — не стратегия;  
какие вопросы нужно задавать IT, аналитикам и владельцам процессов.

Это не техническая роскошь. Это управленческая необходимость.

Потому что сегодня почти любое серьёзное бизнес-решение так или иначе опирается на данные:

запуск нового продукта;  
оптимизация запасов;  
оценка эффективности команды;  
управление клиентским опытом;  
автоматизация процесса;  
внедрение AI;  
переход на отечественное ПО;  
снижение операционных расходов;  
поиск точек роста.

Если данные плохие, то и решения будут плохими. Только выглядеть они будут убедительно, потому что их можно будет красиво показать на дашборде.

Красивый график не делает данные правильными.

---

## Как выглядит работа с данными «по старинке»

В компаниях, где нет системного подхода к данным, проблемы обычно повторяются. Меняются отрасли, масштабы, названия систем, но симптомы очень похожи.

Первый симптом — **расхождения в отчётности**.

Финансы показывают одну цифру. Продажи — другую. Операционный блок — третью. Потом начинается ручная сверка, созвоны, пересылка Excel-файлов, уточнение формул, поиск «правильной версии».

Второй симптом — **дублирование справочников**.

Один и тот же клиент в разных системах может называться по-разному. Где-то «ООО Ромашка», где-то «Ромашка ООО», где-то запись привязана к ИНН, где-то к внутреннему идентификатору, а где-то вообще к фамилии менеджера.

Пока нет единой логики идентификации, компания не видит реальную картину. Она видит набор фрагментов.

Третий симптом — **решения на основе догадок**.

Когда нет доверия к данным, руководители возвращаются к интуиции. Интуиция важна, но она не должна заменять фактуру. Особенно в крупной компании, где масштаб ошибок становится очень дорогим.

Четвёртый симптом — **дороговизна внедрения современных решений**.

Компания хочет BI, предиктивную аналитику, персонализацию, AI-ассистента, автоматическую обработку обращений. Но быстро выясняется, что данные разбросаны, плохо описаны, не очищены, не связаны и юридически не всегда понятно, кто имеет право их использовать.

В итоге современное решение можно внедрить только после долгой и болезненной подготовки. А иногда оказывается, что сначала нужно не AI внедрять, а справочники привести в порядок.

Пятый симптом — **долгий поиск информации**.

Люди тратят часы и дни не на анализ, а на подготовку данных. Найти файл. Проверить актуальность. Спросить у коллеги. Сверить формулу. Пересобрать таблицу. Уточнить, почему вчера было одно значение, а сегодня другое.

Это невидимая стоимость хаоса.

---

## Мифы, которые мешают компаниям работать с данными
![Слайд: Мифы и барьеры](/images/articles/hse-storing-retrieving-data/slide-07.png)

Есть несколько устойчивых мифов, из-за которых компании годами откладывают нормальную работу с данными.

### Миф 1. «Это сложно, дорого и долго»

Иногда действительно сложно. Иногда дорого. Иногда долго.

Но ошибка в том, что многие представляют работу с данными как огромный проект, где нужно сразу внедрить DWH, Data Lake, Data Mesh, машинное обучение, каталог данных, governance, MDM и ещё сверху корпоративного AI-ассистента.

На практике начинать можно сильно проще.

Например:

описать ключевые источники данных;  
понять, какие отчёты собираются вручную;  
выделить критичные справочники;  
назначить владельцев данных;  
автоматизировать 2–3 отчёта, которые каждый день съедают время;  
согласовать единые определения ключевых метрик.

Это уже работа с данными. И она уже даёт эффект.

### Миф 2. «Это задача IT»

Это один из самых опасных мифов.

IT может построить инфраструктуру.  
IT может настроить интеграции.  
IT может обеспечить хранение, доступность, безопасность и производительность.

Но IT не всегда знает, что именно означает показатель «активный клиент».  
IT не должно самостоятельно решать, какие данные важны для коммерческого блока.  
IT не может без бизнеса определить, какая логика расчёта KPI правильная.  
IT не обязано угадывать, какие данные понадобятся руководителю через полгода.

Если данные — это актив, то бизнес не может полностью делегировать ответственность за них технической функции.

Правильная модель выглядит иначе:

бизнес определяет смысл и ценность;  
аналитики помогают интерпретировать и моделировать;  
IT обеспечивает технологическую реализацию;  
управленцы создают культуру использования данных.

### Миф 3. «У нас всё уже есть»

Обычно под этим подразумевается: «У нас есть BI», «У нас есть CRM», «У нас есть база», «У нас есть отчёты».

Но наличие инструмента не означает зрелость работы с данными.

BI может быть установлен, но показатели в отделах всё равно считаются по-разному.  
CRM может использоваться, но менеджеры всё равно ведут «свои таблички».  
DWH может существовать, но никто не доверяет данным.  
Отчёты могут быть автоматизированы, но бизнес-логика в них устарела.

«У нас всё уже есть» — опасная фраза. После неё обычно выясняется, что есть инструменты, но нет управления.

### Миф 4. «Главное — собрать всё»

Нет.

Собрать всё — это не стратегия. Это складирование.

Если просто собрать все данные в одно место, не описать их, не назначить владельцев, не ввести правила качества, не определить сценарии использования, то получится не Data Lake, а data swamp — болото данных.

Там вроде бы всё есть, но найти ничего нельзя.  
А если нашёл, непонятно, можно ли этому доверять.

### Миф 5. «Мы не IT-компания, нам это не нужно»

Данные нужны не только банкам, маркетплейсам и BigTech.

Производство использует данные для планирования загрузки и обслуживания оборудования.  
Логистика — для маршрутов, сроков, складских запасов.  
HR — для анализа текучести и эффективности найма.  
Юридические функции — для работы с договорами, рисками, претензионной практикой.  
Клиентский сервис — для анализа обращений и качества обслуживания.

Если компания принимает решения, обслуживает клиентов, управляет ресурсами и отвечает за результат, значит данные ей нужны.

### Миф 6. «У нас и так всё работает»

Работает — пока рынок стабилен.  
Пока конкуренты не стали быстрее.  
Пока регулятор не изменил требования.  
Пока ключевой сотрудник с Excel-файлом не ушёл в отпуск.  
Пока не понадобилось внедрить AI.  
Пока не случился кризис.

Слабая работа с данными часто не видна в спокойное время. Она проявляется в момент изменения.

---

## Как меняется роль управленца
![Слайд: Как меняется роль управленца](/images/articles/hse-storing-retrieving-data/slide-08.png)

Современный управленец не должен быть просто потребителем отчётов.

Он должен быть участником процесса работы с данными.

Это не значит, что он должен руками строить витрины или проектировать архитектуру. Но он должен:

понимать, какие данные есть в зоне его ответственности;  
знать, откуда они берутся;  
понимать, как они используются;  
требовать данные как основу для решений;  
создавать культуру ответственности за качество;  
говорить с IT и аналитиками на одном языке.

Хороший управленческий вопрос сегодня звучит не так:

> Почему у нас нет красивого дашборда?

А так:

> Какие решения мы хотим принимать быстрее и точнее, какие данные для этого нужны, где они рождаются, кто за них отвечает и можем ли мы им доверять?

Вот это уже начало зрелого подхода.

---

## Немного истории: почему базы данных стали такими разными
![Слайд: Эволюция хранения данных 1970-1999](/images/articles/hse-storing-retrieving-data/slide-09.png)

Чтобы понимать современную архитектуру данных, полезно посмотреть, как мы сюда пришли.

В 1970-е годы Эдгар Кодд предложил реляционную модель данных. Это была фундаментальная идея: хранить данные в виде таблиц, строк, столбцов и связей. На этой логике выросли SQL, реляционные СУБД и большая часть корпоративных информационных систем.

В 1980-е реляционные базы стали коммерческим стандартом. Появились Oracle, IBM DB2, SQL был стандартизирован. Бизнес получил надёжный способ хранить операции: заказы, платежи, клиентов, остатки, документы.

В 1990-е пришёл интернет. Системы начали обслуживать больше пользователей, больше запросов, больше данных. Появились MySQL, PostgreSQL, развивались хранилища данных и OLAP-подходы.

![Слайд: Эволюция хранения данных 2000-2018](/images/articles/hse-storing-retrieving-data/slide-10.png)
В 2000-е крупные интернет-компании столкнулись с масштабами, для которых классические подходы уже не всегда подходили. Google, Amazon, Facebook и другие начали строить распределённые системы, MapReduce, BigTable, Dynamo-подходы. Так возникла почва для NoSQL.

С 2007 по 2012 год началась NoSQL-революция: MongoDB, Cassandra, Redis, CouchDB, HBase и другие решения стали ответом на новые типы данных, высокие нагрузки и требования горизонтального масштабирования.

Потом пришли облака. Данные стало проще хранить и обрабатывать в управляемых сервисах. Появились cloud-native хранилища, modern data stack, новые инструменты ELT.

![Слайд: Эволюция хранения данных 2019-2024](/images/articles/hse-storing-retrieving-data/slide-11.png)
С 2019 года активно развивается идея Lakehouse — попытка объединить гибкость Data Lake и структурность Data Warehouse. А после взрывного роста интереса к LLM и AI резко вырос спрос на векторные базы данных, RAG-архитектуры и поиск по смыслу.

Главный вывод из этой истории простой:

**каждая новая волна технологий появлялась не потому, что старые технологии стали плохими, а потому что менялись задачи.**

Не существует одной базы данных «на всё». Есть разные классы задач, и под них нужны разные решения.

---

## Типы данных: не все данные одинаковые
![Слайд: Типы данных](/images/articles/hse-storing-retrieving-data/slide-12.png)

Прежде чем говорить о базах данных и архитектурах, нужно разобраться с самими данными.

Принято выделять три больших типа:

структурированные;  
полуструктурированные;  
неструктурированные.

### Структурированные данные
![Слайд: Структурированные данные](/images/articles/hse-storing-retrieving-data/slide-13.png)

Структурированные данные — это самый привычный формат.

Представьте Excel-таблицу:

каждая строка — отдельная запись;  
каждый столбец — понятное поле;  
у каждого поля есть тип: дата, число, текст, статус, сумма.

Примеры:

таблица заказов;  
справочник клиентов;  
бухгалтерские проводки;  
складские остатки;  
платежи;  
графики смен.

Такие данные хорошо ложатся в реляционные базы. Их удобно проверять, анализировать, агрегировать, использовать в отчётности.

Главное преимущество структурированных данных — предсказуемость.

Если поле называется `order_date`, понятно, что там должна быть дата заказа. Если поле называется `amount`, там ожидается сумма. Если поле называется `status`, там должен быть статус из ограниченного набора значений.

Для управленческой отчётности это фундамент.

### Полуструктурированные данные
![Слайд: Полуструктурированные данные](/images/articles/hse-storing-retrieving-data/slide-14.png)

Полуструктурированные данные — это уже не строгая таблица, но ещё не полный хаос.

Обычно это JSON, XML, YAML, события, API-ответы, логи.

У них есть внутренняя структура, но она может быть гибкой. Один объект содержит одни поля, другой — другие. Вложенность может меняться. Данные могут приходить из внешнего сервиса, мобильного приложения, веб-системы, IoT-устройства.

Аналогия: если структурированные данные — это строгая анкета, где все поля обязательны, то полуструктурированные — анкета с блоками «по ситуации».

У одного клиента есть телефон и email.  
У другого — телефон, email, Telegram и история заказов.  
У третьего — только идентификатор из внешней системы.

Полуструктурированные данные очень важны для современных интеграций. Большая часть API и событийных систем работает именно так.

### Неструктурированные данные
![Слайд: Неструктурированные данные](/images/articles/hse-storing-retrieving-data/slide-15.png)

Неструктурированные данные — это тексты, письма, договоры, сканы, изображения, аудио, видео, презентации, обращения клиентов, переписки.

То есть всё то, что не укладывается в простую таблицу.

Раньше такие данные часто просто хранили как файлы. Они были важны для людей, но плохо доступны для машинной обработки.

Сегодня ситуация изменилась. С развитием машинного обучения, LLM, OCR, speech-to-text и векторного поиска неструктурированные данные стали источником огромной ценности.

Например:

можно анализировать обращения клиентов;  
искать похожие договоры;  
выявлять типовые причины жалоб;  
строить поиск по внутренним документам;  
создавать корпоративных ассистентов;  
извлекать смысл из переписки и текстов.

Но есть важный нюанс: неструктурированные данные требуют специальных методов обработки. Обычная таблица здесь не поможет.

---

## Источники данных: откуда всё берётся
![Слайд: Источники данных](/images/articles/hse-storing-retrieving-data/slide-16.png)

Данные не появляются из воздуха. Они рождаются в процессах.

Есть внутренние источники:

CRM;  
ERP;  
1С;  
кассовые системы;  
складской учёт;  
HR-системы;  
системы документооборота;  
системы управления задачами;  
почта;  
мессенджеры;  
продукты компании;  
внутренние сервисы;  
промышленное оборудование;  
датчики и устройства.

Есть внешние источники:

государственные реестры;  
открытые данные;  
партнёрские системы;  
поставщики;  
логистические операторы;  
платёжные сервисы;  
социальные сети;  
внешние API;  
публичные датасеты.

Есть ещё одна важная классификация: онлайн и офлайн.

**Онлайн-источники** дают данные почти в реальном времени: клики, события приложения, транзакции, телеметрия.

**Офлайн-источники** передают данные периодически: выгрузка из 1С раз в ночь, отчёт поставщика раз в неделю, Excel-файл от партнёра раз в месяц.

Для бизнеса это не техническая деталь. От типа источника зависит, насколько быстро можно принимать решения.

Если вы управляете складскими остатками, задержка в сутки может быть приемлемой.  
Если вы управляете антифродом в платежах, задержка в сутки превращает систему в музей.

---

## Почему «собрать всё в одно место» сложнее, чем кажется

На уровне идеи всё выглядит просто:

у нас есть данные в разных системах;  
давайте соберём их в одно хранилище;  
построим отчёты;  
начнём принимать решения.

В реальности начинается веселье.

### Разные форматы

Одна система отдаёт таблицы.  
Другая — JSON.  
Третья — XML.  
Четвёртая — PDF.  
Пятая — архив с файлами.  
Шестая — поток событий.

Прежде чем данные объединять, их нужно разобрать, привести к понятному виду и описать.

### Разные идентификаторы

Один и тот же клиент может иметь разные ID в CRM, ERP и бухгалтерии. Один товар может называться по-разному у склада, закупок и маркетинга.

Пока нет единой логики мастер-данных, компания не может уверенно сказать, что видит один и тот же объект.

### Разные правила учёта

В одной системе сумма хранится с НДС.  
В другой — без НДС.  
Где-то дата означает дату создания заказа.  
Где-то — дату оплаты.  
Где-то — дату отгрузки.

Формально поля похожи. По смыслу — разные.

Именно здесь рождаются отчёты, которые спорят друг с другом.

### Разная частота обновления

CRM обновляется постоянно.  
1С выгружается ночью.  
Партнёр присылает файл раз в неделю.  
Внешний API иногда недоступен.

Если это не учитывать, аналитика будет показывать странные результаты. Не потому что система сломалась, а потому что данные живут в разных ритмах.

### Права доступа и безопасность

Не все данные можно просто взять и переложить. Есть персональные данные, коммерческая тайна, регуляторные требования, внутренние политики безопасности.

Работа с данными — это не только про технологии. Это ещё и про ответственность.

---

## ETL, ELT и CDC: как данные двигаются между системами
![Слайд: ETL, ELT и CDC](/images/articles/hse-storing-retrieving-data/slide-17.png)

Чтобы данные из разных источников попали в хранилище, нужна интеграция.

Есть три подхода, которые руководителю стоит знать: ETL, ELT и CDC.

### ETL: Extract, Transform, Load

ETL означает:

Extract — извлечь данные;  
Transform — преобразовать;  
Load — загрузить.

То есть сначала данные забираются из источника, потом очищаются, нормализуются, приводятся к нужной структуре, и только после этого загружаются в хранилище.

Аналогия: бухгалтер сначала собирает первичные документы, проверяет их, исправляет ошибки, приводит к единому виду и только потом формирует итоговый отчёт.

Плюс ETL — контроль качества до загрузки.  
Минус — процесс может быть медленным и менее гибким.

ETL хорошо подходит для классической отчётности и ситуаций, где важна строгая подготовка данных.

### ELT: Extract, Load, Transform

ELT меняет порядок:

сначала извлекаем;  
потом загружаем как есть;  
а преобразуем уже внутри хранилища.

Аналогия: мы складываем все документы в большой архив, а потом внутри архива раскладываем, очищаем, группируем и анализируем.

ELT стал особенно популярен с развитием мощных облачных хранилищ и аналитических платформ. Они позволяют быстро загрузить много данных, а потом обрабатывать их уже внутри.

Плюс ELT — скорость и гибкость.  
Минус — нужно мощное и хорошо управляемое хранилище, иначе получится бардак.

### CDC: Change Data Capture

CDC — это подход, при котором система отслеживает изменения в источнике и передаёт только то, что изменилось.

Не нужно каждый раз выгружать всю таблицу клиентов. Достаточно передать новые записи, изменения и удаления.

Аналогия: вы не пересчитываете весь семейный бюджет с нуля после каждой покупки. Вы просто фиксируете новое изменение.

CDC полезен, когда данные нужны почти в реальном времени и когда нельзя перегружать источник постоянными полными выгрузками.

---

## OLTP и OLAP: почему одной базы обычно недостаточно
![Слайд: OLTP и OLAP](/images/articles/hse-storing-retrieving-data/slide-18.png)

Когда люди говорят «база данных», они часто представляют универсальное место, куда можно и записывать операции, и строить отчёты, и запускать аналитику.

Но в реальности есть два разных класса задач: OLTP и OLAP.

### OLTP: операционный пульс компании

OLTP — Online Transaction Processing.

Это системы, которые обслуживают ежедневные операции бизнеса:

создать заказ;  
провести оплату;  
списать товар;  
изменить статус заявки;  
зарегистрировать клиента;  
провести транзакцию.

OLTP-системы должны быть быстрыми, точными и надёжными.

Аналогия: касса в магазине. Покупатель пробивает товар, платит, получает чек. Система должна мгновенно списать остаток, зафиксировать оплату и не ошибиться.

Если деньги списались, а заказ не создался — это проблема.  
Если товар продался дважды, хотя на складе был один экземпляр — это проблема.  
Если касса зависла из-за аналитического отчёта — это совсем плохая история.

OLTP — это про текущее состояние бизнеса.

### OLAP: аналитический мозг компании

OLAP — Online Analytical Processing.

Это системы для анализа:

как менялись продажи по месяцам;  
какие регионы растут;  
какие товары чаще возвращают;  
как ведут себя клиенты;  
какие каналы эффективнее;  
где отклонение от плана.

OLAP работает с большими объёмами исторических данных. Здесь важны агрегации, сравнения, разрезы, тренды.

Аналогия: если OLTP — это касса, то OLAP — это финансово-аналитический отдел, который изучает результаты за период и помогает принимать стратегические решения.

OLTP отвечает на вопрос: **что происходит сейчас?**  
OLAP отвечает на вопросы: **почему это произошло, как менялось и что делать дальше?**

### Почему нельзя просто делать аналитику в рабочей базе

Технически иногда можно. Управленчески — часто опасно.

Если аналитик запускает тяжёлый запрос к операционной базе, он может замедлить работу системы, которая обслуживает клиентов, кассы, заказы или платежи.

Кроме того, OLTP постоянно изменяется. Пока вы строите отчёт, данные могут обновиться. В итоге цифры начинают «прыгать».

И наконец, у OLTP и OLAP разные требования к структуре хранения.

OLTP оптимизирован под запись и короткие операции.  
OLAP оптимизирован под чтение, агрегации и большие исторические выборки.

Пытаться сделать одну систему идеальной для всего — всё равно что устроить ревизию склада прямо на кассе в час пик.

---

## Типы СУБД: почему у нас получился «зоопарк»
![Слайд: Типы NoSQL СУБД](/images/articles/hse-storing-retrieving-data/slide-21.png)

СУБД — система управления базами данных. И здесь важно понять: разные типы баз появились не ради моды, а потому что данные и задачи стали разными.

### Реляционные СУБД

Это классика: PostgreSQL, MySQL, Oracle, Microsoft SQL Server.

Данные хранятся в таблицах. Есть строки, столбцы, связи, ограничения, транзакции, SQL.

Реляционная база — это как хорошо организованный архив:

у каждого документа своё место;  
всё описано заранее;  
связи понятны;  
ошибки контролируются;  
доступ к данным предсказуем.

Реляционные СУБД хороши, когда:

структура данных понятна заранее;  
важна целостность;  
нужны транзакции;  
есть связанные сущности: клиенты, заказы, платежи, договоры.

Для финансов, учёта, ERP, CRM, транзакционных систем SQL по-прежнему остаётся базовым и очень сильным выбором.

### Документные СУБД
![Слайд: Документные СУБД](/images/articles/hse-storing-retrieving-data/slide-22.png)

Документные базы хранят данные в виде документов, чаще всего JSON или BSON.

Пример: MongoDB, Couchbase, Firestore.

Они удобны, когда структура объекта может меняться. Например, карточка клиента, профиль пользователя, настройки, каталог товаров.

Аналогия: папка с анкетами. У одной анкеты пять полей, у другой десять, у третьей вложенная история взаимодействий. Не нужно заранее заставлять всех быть одинаковыми.

Документные базы дают гибкость, но хуже подходят для строгой финансовой отчётности, где нужна жёсткая схема и контроль.

### Колоночные СУБД
![Слайд: Колоночные СУБД](/images/articles/hse-storing-retrieving-data/slide-23.png)

Колоночные базы хранят данные по столбцам, а не по строкам.

Пример: ClickHouse, Amazon Redshift, Apache Druid, Apache Pinot, Vertica.

Это особенно полезно для аналитики. Если нужно посчитать сумму продаж по миллиарду строк, системе не обязательно читать всю строку целиком. Она может читать только нужный столбец — например, `amount`.

Аналогия: в огромной Excel-таблице вы работаете не со всем листом, а только с колонкой «Сумма».

Колоночные базы хороши для BI, отчётов, событийной аналитики, логов, мониторинга, продуктовой аналитики.

Но они не предназначены для классических транзакций уровня «создать заказ и гарантированно списать оплату».

### Key-Value хранилища
![Слайд: Key-Value хранилища](/images/articles/hse-storing-retrieving-data/slide-24.png)

Key-Value — самая простая модель: есть ключ и значение.

Пример: Redis, DynamoDB, Riak, RocksDB.

Аналогия: камера хранения. Знаете номер ячейки — быстро получили содержимое.

Такие базы хороши для кэша, сессий, токенов, счётчиков, временных данных, быстрых операций.

Но если вы хотите сложную аналитику, связи, фильтры и отчёты — это не их задача.

### Графовые СУБД
![Слайд: Графовые СУБД](/images/articles/hse-storing-retrieving-data/slide-25.png)

Графовые базы хранят не только объекты, но и связи между ними.

Пример: Neo4j, JanusGraph, ArangoDB, Amazon Neptune.

Узел — это объект: человек, компания, товар, счёт.  
Ребро — связь: купил, знает, владеет, связан, перевёл деньги, подписан.

Аналогия: карта метро. Важны не только станции, но и маршруты между ними.

Графовые базы хороши там, где связи важнее самих объектов:

социальные сети;  
рекомендации;  
антифрод;  
цепочки владения;  
маршруты;  
зависимости;  
иерархии.

Там, где реляционная база начинает страдать от множества JOIN, графовая может быть естественным решением.

### Векторные СУБД
![Слайд: Векторные СУБД](/images/articles/hse-storing-retrieving-data/slide-26.png)

Векторные базы хранят числовые представления объектов: текстов, изображений, аудио, профилей, документов.

Пример: Qdrant, Milvus, Pinecone, Weaviate, Faiss.

Их задача — искать не точное совпадение, а похожесть.

Обычный поиск ищет слова.  
Векторный поиск ищет смысл.

Например, запрос «как оформить командировку» может найти документ «регламент служебных поездок», даже если в нём нет точной фразы из запроса.

Векторные базы стали особенно важны с развитием LLM и RAG-архитектур.

### In-Memory СУБД
![Слайд: In-Memory СУБД](/images/articles/hse-storing-retrieving-data/slide-27.png)

In-Memory базы работают преимущественно в оперативной памяти.

Пример: Redis, Memcached, Tarantool, SAP HANA.

Они нужны там, где важна минимальная задержка.

Аналогия: одно дело — каждый раз идти в архив за папкой. Другое — держать нужные документы прямо на столе.

Такие решения полезны для кэша, высоконагруженных сервисов, real-time сценариев, быстрых профилей клиентов, телеком- и финансовых систем.

### NewSQL
![Слайд: NewSQL](/images/articles/hse-storing-retrieving-data/slide-28.png)

NewSQL — это попытка сохранить преимущества SQL и транзакций, но добавить масштабируемость распределённых систем.

Пример: Google Spanner, CockroachDB, TiDB, YDB.

NewSQL нужен там, где классическая SQL-база уже не справляется с масштабом, но бизнес не готов отказаться от строгих транзакций и понятной модели данных.

Это как классический автомобиль с современной начинкой: снаружи привычная логика SQL, внутри — распределённая архитектура.

---

## Архитектуры хранения данных

Тип СУБД — это ещё не архитектура. В реальности данные компании живут в разных системах, перемещаются между ними, очищаются, агрегируются, используются разными командами.

Поэтому нужно говорить об архитектурах хранения и управления данными.

### Data Warehouse: единая версия правды
![Слайд: Data Warehouse](/images/articles/hse-storing-retrieving-data/slide-29.png)

Data Warehouse, или DWH, — это централизованное хранилище данных для аналитики и отчётности.

Его задача — собрать данные из разных систем, очистить, согласовать и дать бизнесу единую версию правды.

Аналогия: сеть магазинов, где у каждого магазина своя касса и свои отчёты. DWH — это центральный офис, где данные приводятся к единому виду, проверяются и становятся основой для управленческой отчётности.

Плюсы DWH:

централизация;  
чистота данных;  
историчность;  
единые KPI;  
доверие к отчётности;  
удобная интеграция с BI.

Минусы:

сложность запуска;  
инерционность;  
задержка обновления;  
ограниченная гибкость при новых типах данных.

DWH хорошо подходит, когда компании нужна регулярная управленческая отчётность, согласованные показатели и контроль качества данных.

### Data Lake: сохраняем всё как есть
![Слайд: Data Lake](/images/articles/hse-storing-retrieving-data/slide-30.png)

Data Lake — это архитектура, где данные хранятся в сыром виде.

Туда можно складывать таблицы, JSON, логи, изображения, документы, аудио, видео, события.

Аналогия: если DWH — это оформленный архив с каталогами, то Data Lake — огромный склад, куда можно сложить всё «про запас».

Плюсы Data Lake:

гибкость;  
масштабируемость;  
поддержка любых форматов;  
низкая стоимость хранения;  
возможность сохранять данные до того, как понятно, как именно они пригодятся.

Минусы:

без управления превращается в болото;  
сложно найти нужные данные;  
нет единой версии правды;  
нужна инженерная дисциплина;  
качество данных не гарантировано.

Data Lake хорош, когда данных много, они разнотипные и заранее неизвестно, какие из них понадобятся.

### Data Lakehouse: попытка совместить порядок и гибкость
![Слайд: Data Lakehouse](/images/articles/hse-storing-retrieving-data/slide-31.png)

Lakehouse — это гибрид Data Lake и Data Warehouse.

Идея: хранить данные гибко, как в Data Lake, но добавить структуру, метаданные, транзакционность и удобство аналитики, как в DWH.

Аналогия: уже не просто склад, куда всё свалили, а современный логистический центр. Там можно хранить разные типы грузов, но есть учёт, зоны, правила, маршруты и система поиска.

Плюсы Lakehouse:

единая платформа;  
меньше дублирования;  
поддержка BI и ML;  
работа с разными типами данных;  
возможность быстрее переходить от данных к аналитике.

Минусы:

архитектура относительно новая;  
требует зрелой команды;  
миграция может быть сложной;  
нужна дисциплина в метаданных и процессах.

Lakehouse подходит компаниям, которые уже упёрлись в ограничения DWH или Data Lake и хотят объединить гибкость с управляемостью.

### Data Mesh: данные как продукт
![Слайд: Data Mesh](/images/articles/hse-storing-retrieving-data/slide-32.png)

Data Mesh — это больше организационный подход, чем конкретная технология.

Его идея: данные должны принадлежать бизнес-доменам. Команда, которая создаёт и понимает данные, должна отвечать за их качество, документацию и доступность.

Маркетинг отвечает за маркетинговые данные.  
Финансы — за финансовые.  
Логистика — за логистические.  
HR — за HR-данные.

Но при этом у всех есть общие стандарты: безопасность, доступ, качество, формат, SLA.

Аналогия: рынок вместо одного огромного централизованного склада. Каждый продавец отвечает за свой товар, но правила торговли общие.

Плюсы Data Mesh:

ответственность ближе к источнику;  
меньше узких мест в центральной команде;  
лучшее качество данных;  
масштабируемость для больших организаций.

Минусы:

нужна высокая зрелость;  
нужна культура ответственности;  
есть риск несогласованности;  
нужны стандарты и платформа самообслуживания.

Data Mesh подходит крупным организациям, где централизованная команда данных уже не справляется с количеством доменов и запросов.

### Data Fabric: единая ткань доступа
![Слайд: Data Fabric](/images/articles/hse-storing-retrieving-data/slide-33.png)

Data Fabric — это подход, при котором создаётся единый логический слой доступа к данным, даже если физически они хранятся в разных местах.

Аналогия: умный город. Районы разные, системы разные, но есть единая транспортная, информационная и управляющая инфраструктура.

Data Fabric не обязательно переносит все данные в одно место. Он связывает источники, каталоги, политики доступа, метаданные и инструменты обработки.

Плюсы:

единый доступ;  
снижение дублирования;  
автоматизация;  
работа с распределёнными источниками;  
полезно для гибридной и мультиоблачной среды.

Минусы:

сложность;  
высокая стоимость;  
зависимость от инструментов;  
не решает проблему качества данных сам по себе.

Data Fabric подходит компаниям, где уже много систем, хранилищ, облаков и источников, но бизнесу нужен единый доступ и управление.

### Как выбирать архитектуру
![Слайд: Сравнение архитектур хранения данных](/images/articles/hse-storing-retrieving-data/slide-34.png)

Нет лучшей архитектуры в вакууме.

DWH — когда нужен порядок и единая отчётность.  
Data Lake — когда нужно сохранять много разнотипных данных.  
Lakehouse — когда нужен баланс гибкости и аналитической управляемости.  
Data Mesh — когда организация большая и ответственность нужно распределять по доменам.  
Data Fabric — когда данные уже распределены, но нужен единый слой доступа.

Выбор зависит от зрелости компании, типов данных, задач, бюджета, команды и организационной структуры.

---

## Импортозамещение СУБД: российские решения и реальность выбора

Отдельная тема, которую нельзя игнорировать в российском контексте, — импортозамещение СУБД.

За последние годы стало понятно, что зависимость от зарубежного ПО — это не только технический, но и стратегический риск. Ограничение доступа к обновлениям, поддержке, лицензиям, облачным сервисам и документации может внезапно стать бизнес-проблемой.

Особенно если речь идёт о госсекторе, финансовых организациях, критической инфраструктуре и компаниях с жёсткими требованиями к сертификации.

Важно: импортозамещение — это не «срочно заменить всё на первое отечественное». Это отдельный проект, где нужно учитывать совместимость, нагрузку, команду, стоимость миграции, поддержку, экосистему и регуляторные требования.

### Зачем рассматривать российские СУБД

У российских решений есть несколько потенциальных преимуществ:

соответствие требованиям регуляторов;  
локальная техническая поддержка;  
снижение санкционных рисков;  
учёт российской специфики;  
доступность специалистов и партнёров;  
возможность сертифицированных поставок.

Но есть и вызовы:

функциональные ограничения;  
необходимость переобучения команды;  
стоимость миграции;  
совместимость с существующими системами;  
зрелость экосистемы;  
наличие драйверов, инструментов мониторинга, резервного копирования, репликации;  
реальная производительность под конкретной нагрузкой.

То есть выбор СУБД — это не выбор по таблице «наша / не наша». Это инженерно-управленческое решение.

### SQL / реляционные СУБД

В лекционном материале были выделены следующие российские или локализованные решения в сегменте реляционных СУБД. Конкретный статус сертификации, версий и правообладателей перед реальным проектом нужно обязательно перепроверять, потому что эти данные меняются.

| Название | Происхождение | Разработчик | Сертификация в лекционном материале |
|---|---|---|---|
| Postgres Pro | форк PostgreSQL | Postgres Professional | ФСТЭК, ФСБ |
| Jatoba | форк PostgreSQL | Газинформсервис | ФСТЭК |
| Tantor | форк PostgreSQL | ТАНТОР Лабс | ФСТЭК |
| Proxima DB | форк PostgreSQL | OrionSoft | ФСТЭК |
| Ред База Данных | форк Firebird | РЕД СОФТ | ФСТЭК |
| Pangolin DB | собственная разработка | СберТех | — |
| «Квант-Гибрид» | форк PostgreSQL | КВАНТОМ | ФСТЭК |
| Arenadata Postgres | форк PostgreSQL | Arenadata | — |
| SoQoL | собственная разработка | РЕЛЭКС | ФСТЭК |
| Linter | собственная разработка | НИП ИВК | ФСТЭК, ФСБ |

Что важно заметить: значительная часть российских SQL-решений построена вокруг PostgreSQL. Это логично. PostgreSQL — зрелая open-source СУБД, вокруг которой есть сильная экспертиза, расширяемость и большая экосистема.

Для бизнеса это означает, что миграция с зарубежных enterprise-СУБД не всегда будет простой, но часто есть понятный путь: анализ совместимости, перенос схем, переписывание процедур, тестирование производительности, настройка отказоустойчивости и обучение команды.

### NoSQL и NewSQL

В лекции также были выделены российские решения и решения с российскими корнями в других классах СУБД:

| Название | Тип | Происхождение / разработчик в лекционном материале |
|---|---|---|
| ClickHouse | колоночная СУБД | собственная разработка, ClickHouse Inc. / Yandex |
| Qdrant | векторная СУБД | собственная разработка, Qdrant Team |
| Tarantool | In-Memory СУБД | собственная разработка, VK / ex-Mail.ru Group |
| YDB | NewSQL | собственная разработка, Yandex |

Здесь особенно важно не смешивать разные классы решений.

ClickHouse не заменяет PostgreSQL в транзакционной системе.  
Qdrant не заменяет DWH.  
Tarantool не является универсальным архивом данных.  
YDB решает задачи распределённой SQL-нагрузки, но требует отдельной архитектурной оценки.

Каждая из этих систем сильна в своём классе задач.

ClickHouse — аналитика и быстрые агрегации.  
Qdrant — векторный поиск и AI-сценарии.  
Tarantool — высоконагруженные in-memory сценарии.  
YDB — распределённые SQL-нагрузки и масштабирование.

### Как подходить к импортозамещению

Здесь нельзя начинать с вопроса: «На что заменить Oracle?»

Правильнее идти по шагам.

Сначала нужно описать текущий ландшафт:

какие СУБД используются;  
какие системы от них зависят;  
какие нагрузки они несут;  
какие SLA требуются;  
какие есть интеграции;  
какие используются процедуры, функции, расширения;  
какие данные критичны;  
какие требования по сертификации.

Потом нужно разделить системы по критичности.

Не все базы одинаково важны. Есть экспериментальные системы, есть отчётность, есть клиентские сервисы, есть ядро бизнеса. Миграция ядра — это всегда отдельный проект с тестами, резервным планом и длительной подготовкой.

Затем нужно провести пилот.

Не презентацию поставщика, а реальный пилот на ваших данных и нагрузках.

И только после этого принимать решение.

Импортозамещение — это не разовая закупка. Это программа изменения технологического ландшафта.

---

## Векторные базы данных и AI
![Слайд: Векторные базы данных и AI](/images/articles/hse-storing-retrieving-data/slide-39.png)

Теперь перейдём к теме, которая за последние годы стала особенно актуальной: векторные базы данных и их связь с искусственным интеллектом.

Когда мы говорим о классических базах данных, обычно имеем в виду точный поиск.

Найди клиента с ID 123.  
Покажи заказ №456.  
Выбери платежи за март.  
Отфильтруй товары категории «электроника».

Но в реальной жизни часто нужен не точный поиск, а поиск по смыслу.

Найди похожие обращения клиентов.  
Покажи документы, близкие к этому вопросу.  
Найди товары, похожие по описанию.  
Подбери инструкции, которые могут помочь в этой ситуации.  
Найди договоры с похожими условиями.

Обычная SQL-база не очень хорошо решает такие задачи. Она не понимает, что «претензия клиента», «жалоба на доставку» и «недовольство сроками» могут быть смыслово близкими.

Для этого данные превращают в векторы.

### Что такое векторизация

Векторизация — это преобразование объекта в набор чисел.

Текст, изображение, аудио, пользовательский профиль или документ превращаются в числовой «отпечаток».

Идея в том, что похожие по смыслу объекты оказываются рядом в многомерном пространстве.

Аналогия: представьте карту, где рядом расположены не города, а смыслы.

Слова «автомобиль» и «машина» будут близко.  
«Командировка» и «служебная поездка» — тоже близко.  
А «яблоко» окажется дальше, если контекст про транспорт или документы.

Векторная база хранит такие отпечатки и умеет быстро искать ближайшие.

### Зачем это бизнесу

Векторные базы нужны там, где важна похожесть:

поиск по корпоративным документам;  
умные FAQ;  
рекомендательные системы;  
анализ обращений клиентов;  
поиск похожих инцидентов;  
сопоставление товаров;  
обработка договоров;  
AI-ассистенты;  
RAG-системы.

И здесь мы подходим к RAG.

### Что такое RAG

RAG — Retrieval Augmented Generation. По-русски можно сказать: генерация с дополнением через поиск.

Смысл простой: языковая модель не должна отвечать только «из головы». Она должна сначала найти релевантные фрагменты в ваших корпоративных данных, а потом использовать их как контекст для ответа.

Как это работает:

1. Корпоративные документы разбиваются на фрагменты.
2. Каждый фрагмент превращается в вектор.
3. Векторы сохраняются в векторной базе.
4. Пользователь задаёт вопрос.
5. Вопрос тоже превращается в вектор.
6. Векторная база ищет похожие фрагменты.
7. Найденные фрагменты передаются в LLM как контекст.
8. Модель генерирует ответ на основе найденных материалов.

Пример.

Сотрудник спрашивает: «Как оформить командировку в мае?»

Система не просто генерирует общий ответ. Она ищет во внутренних HR-документах, находит регламент командировок, актуальные правила, ограничения, форму заявки и только потом формирует ответ.

Именно поэтому RAG так важен для бизнеса.

Он позволяет AI работать не вообще, а с вашими знаниями, вашими документами и вашими правилами.

### Почему AI без данных не работает

Многие компании хотят внедрить AI, но начинают с модели.

Какую модель выбрать?  
Какой чат-бот поставить?  
Какой интерфейс сделать?  
Какую LLM подключить?

Это важные вопросы, но не первые.

Первый вопрос другой:

> Где ваши данные, можно ли им доверять и можно ли безопасно дать к ним доступ?

Если документы устарели, база знаний не ведётся, права доступа не описаны, данные дублируются, регламенты противоречат друг другу, то AI просто ускорит хаос.

Он будет быстро и уверенно отвечать на основе плохих данных.

А это опаснее, чем медленный ручной процесс.

---

## Что должен вынести управленец

Если собрать всю статью в несколько управленческих выводов, получится следующее.

### 1. Данные — это актив

Данные не должны быть побочным продуктом работы систем. У них должны быть владельцы, правила качества, жизненный цикл и понятные сценарии использования.

### 2. Ответственность за данные не может лежать только на IT

IT отвечает за инфраструктуру и реализацию. Но смысл данных, правила расчёта показателей, приоритеты и ценность определяет бизнес.

### 3. Универсальной базы данных не существует

SQL, NoSQL, NewSQL, колоночные, графовые, векторные, in-memory базы — это не модный зоопарк, а набор инструментов под разные задачи.

Плохой вопрос: «Какая база лучше?»  
Хороший вопрос: «Какую задачу мы решаем, какие данные у нас есть и какие требования к скорости, качеству, масштабу и согласованности?»

### 4. OLTP и OLAP нужно разделять по смыслу

Операционные системы фиксируют события бизнеса. Аналитические системы помогают понимать картину целиком.

Касса и аналитический отдел — разные сущности. База для заказов и база для стратегической отчётности тоже часто должны быть разными.

### 5. Архитектура важнее отдельного инструмента

Можно купить дорогую платформу и не получить результата.  
Можно начать с простых шагов и быстро улучшить качество решений.

Важно не название технологии, а то, как данные проходят путь от источника до решения.

### 6. Импортозамещение — это стратегический проект

Нельзя заменить СУБД по принципу «поставим аналог». Нужно анализировать нагрузку, совместимость, команду, миграцию, сертификацию, поддержку и риски.

### 7. AI начинается не с модели, а с данных

Векторные базы, RAG и LLM дают огромные возможности. Но только если компания понимает, где лежат её знания, насколько они актуальны и кто за них отвечает.

---

## Вместо заключения

Мы начали с простой мысли: данные — это актив, а не инфраструктура.

Но активом они становятся не автоматически. Не потому что лежат в базе. Не потому что подключён BI. Не потому что компания купила платформу или внедрила AI.

Данные становятся активом, когда ими управляют.

Когда понятно, кто за них отвечает.  
Когда есть качество.  
Когда есть единые определения.  
Когда данные можно найти.  
Когда им можно доверять.  
Когда они помогают принимать решения.  
Когда бизнес и IT говорят на одном языке.

Руководителю не нужно знать все технические детали. Но нужно понимать карту местности.

Потому что без этой карты очень легко оказаться в ситуации, где в компании вроде бы есть всё: CRM, ERP, отчёты, BI, базы, хранилища, AI-пилоты.

А решения всё равно принимаются на догадках.

И вот этого как раз хотелось бы избежать.

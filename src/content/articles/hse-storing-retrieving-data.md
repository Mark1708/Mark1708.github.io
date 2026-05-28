---
title: "Хранение и получение данных: от реляционных БД до Data Mesh и векторных СУБД"
titleEn: "Storing and Retrieving Data: From Relational DBs to Data Mesh and Vector Databases"
description: "Лекция в ВШЭ о типах данных, СУБД, архитектурах хранения и роли данных в современном бизнесе"
descriptionEn: "HSE University lecture on data types, DBMS, storage architectures and the role of data in modern business"
date: "2025-06-02"
sourceUrl: "https://www.hse.ru/"
sourceName: "HSE University"
sourceNameRu: "ВШЭ"
tags: ["Databases", "Data Architecture", "Data Engineering", "OLAP", "NoSQL"]
readingTime: "45 min"
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

## Введение

![Слайд: Хранение и получение данных](/images/articles/hse-storing-retrieving-data/slide-01.png)

### Приветствие и начало пути

Всем привет! 


Давайте ненадолго вернемся в 2006 год. Мне вот например в этом году было всего лишь 5 лет и уж поверьте я тогда точно не думал о том, как же получать и хранить данные. Но именно тогда прозвучала фраза, которая за следующие годы облетела весь деловой мир: «Data is the new oil» — «Данные — это новая нефть». Эти слова приписывают британскому математику Клайву Хамби, и с тех пор их повторяли тысячи раз, в том числе — на уровне правительств, крупных компаний и топ-менеджеров.

Прошло почти два десятилетия, но давайте задумаемся: насколько мы действительно начали относиться к данным как к ценному ресурсу?

Скорее всего, нет. Да, отчёты есть, вероятно  есть красивые BI-панели, возможно вы даже AI где-то пробовали подключить. Но по-настоящему стратегическое, активное, управленческое отношение к данным — по-прежнему редкость. Мы храним, но не управляем. Видим, но не осмысливаем.

Но на данный момент вы вполне можете меня остановить и сказать: Нееет, у нас на кухне с этим умею профессионально обращаться. Поэтому предлагаю устроить небольшой опрос, где вы без раскрытия деталей дадите односложный ответ на вопрос (да или нет).

На ваш взгляд, умело ли компания, где вы работаете управляться с данными?  
Раскрою мысль чуть шире:

- оцифровала данные, которые до недавних пор хранились на бумажных и прочих носителях  
- умеет определять какие данные будут полезны бизнесу и организовывать их сбор  
- знает какие данные уже есть на данный момент во всех продуктах компании, а лучше даже в продуктах дочерних компаний  
- понимает как и какие данные можно использовать для улучшения процессов или уже здесь и сейчас эффективно использует их для принятия бизнес решений

Для начала думаю хватит)


### Почему управленцу важно понимать работу с данными

Сегодня управленец, не понимающий принципов работы с данными — это как водитель автомобиля, не знающий, где взять топливо, куда его залить и зачем оно вообще необходимо.  
Думаю все хоть раз да встречали такого персонажа)

Я тут не для того чтобы за пару часов научить писать SQL запросы или шардировать базу данных, это никак не уложить в выделенное нам время, да и не очень важно для вас. 

Мы разберемся вот в чем:

- Как общаться на одном языке с представителями технической части (Архитекторы, Разработчики и прочие)  
- Как увидеть данные, которые можно использовать либо как такие собрать  
- С помощью каких инструментов и как двигается или мог бы двигаться поток данных в вашей компании

Если что-то забыл упомянуть будем считать, что это было намеренно так как это сюрприз или бонус)

### Данные — не инфраструктура, а актив

![Слайд: Данные как актив](/images/articles/hse-storing-retrieving-data/slide-05.png)

Бухгалтерия работает с финансами, HR — с персоналом, а ваши клиенты озадачены вообще своими вопросами и работают с вашими решениями как им вздумается. А кто работает с данными?

Если никто — значит, данные никому не принадлежат. А если нет владельца — нет ответственности, нет качества, нет движения.

В 15 веке европейские колонисты обменивали золото индейцев на разные изделия, так как они попросту не осознавали ценность этого ресурса. Сейчас за сбор данных или за те, что лежат у вас готовенькие готовы даже деньги платить.

Например компания DataDome платила владельцам веб приложений за использование JavaScript-библиотеки, которая собирает данные о поведении пользователей (движения мыши, нажатия клавиш и т. д.). По итогу компания представила продукт, который помогает защититься от ботов и думаю с лихвой окупила вложения.

Либо другой пример уже от российской компании с платформой “Яндекс.Задания”, которая позволяет пользователям за оплату готовить данные для обучения моделей используемых в сервисах Яндекса.

Это лишь 2 кейса из многих, но они отлично демонстрируют ценность данных.  
Думаю каждый из вас понимает, что хранить деньги наличкой под подушкой не самая дальновидная задумка. Данные, которые имеются в разном виде у вашей компании просто лежат, хотя могли бы работать на вас для оптимизации внутренних процессов, увеличения прибыли и так далее.

### Работа с данными “по старинке”

Давайте попробуем повспоминать проблемы, которые преследуют компании, которые привыкли работать с данными “по старинке”:

- Есть расхождение в отчетности, которое приходится вручную проверять  
- Справочная информация в разных отделах дублируется и отличается  
- Бизнес решения строится на догадках  
- Отсутствует возможность применять современные решения или это очень затратно  
- Поиск и подготовка информации занимает много времени

Думаю мы все понимаем, что это лишь капля в море. 

### Мифы и барьеры

![Слайд: Мифы и барьеры](/images/articles/hse-storing-retrieving-data/slide-07.png)

Так что же останавливает многие компании? Почему они все еще не используют данные эффективно?

**Миф 1: “Это сложно, дорого и долго”:**  
Реальность: начинать можно постепенно и с малого.  
Не нужно сразу внедрять DWH, Data Mesh и LLM.   
Часто достаточно:

* описать, какие данные уже есть;  
* навести порядок в справочниках;  
* выделить 1–2 приоритетных витрины под ключевые решения;  
* автоматизировать формирование нескольких отчётов, которые сейчас делаются руками каждый день.

**Миф 2: “Это задача ИТ”**

Это одна из самых губительных установок.  
Если данные — это актив, то ответственность за него не может лежать только на ИТ.  
ИТ может обеспечить инструменты, инфраструктуру, обработку.  
Но:

* что собирать — знает бизнес;  
* как трактовать данные — определяет аналитик;  
* какие метрики важны — решает менеджер.

**Миф 3: “У нас всё уже есть”**  
Один из самых опасных самообманов. BI может быть установлен, отчёты — настроены, но:

* показатели считаются по-разному в разных отделах;  
* справочники не синхронизированы;  
* данные обновляются вручную;  
* все сваливается в помойку, где в отсутствии структуры невозможно разглядеть что-нибудь полезное.

**Миф 4: “Главное — собрать всё”**  
Это ловушка перфекционизма.  
Компании часто пытаются собрать максимум данных «на всякий случай», полагая, что чем больше — тем лучше. В итоге:

* хранятся терабайты неиспользуемой информации;  
* аналитика тонет в нерелевантных атрибутах;  
* инфраструктура перегружена, но управленческих решений больше не стало.

**Миф 5: “Мы не IT-компания — нам не нужно это всерьёз”**  
Это частый аргумент в «традиционных» отраслях: производство, логистика, государственный сектор. Предполагается, что данные — это для банков, маркетинга, BigTech.  
Но факты говорят обратное:

* Компании, которые умеют прогнозировать спрос, — оптимизируют запасы.  
* Те, кто анализирует жалобы в текстах — улучшают сервис.  
* Те, кто автоматизирует аналитику — растут быстрее конкурентов.

**Миф 6: “У нас и так всё работает”**  
Работает — пока рынок стабилен. Пока конкуренты не автоматизировались. Пока регулятор не ужесточил требования. Пока не пришёл кризис.

### Как меняется роль управленца

![Слайд: Как меняется роль управленца](/images/articles/hse-storing-retrieving-data/slide-08.png)

Кто же такой - этот управленец в цифровой среде?

* понимает, какие данные у него есть, как они хранятся и откуда берутся;  
* требует данные как основу для решений;  
* создаёт культуру ответственности за качество данных;  
* на одном языке ведет диалог с собеседником об архитектуре, метриках и аналитике.

### Эволюция

![Слайд: Эволюция хранения данных 1970-1999](/images/articles/hse-storing-retrieving-data/slide-09.png)

Думаю многие из вас согласятся с тем, что знание истории это один из важнейших тузов в рукаве любого визионера, так как нередко это позволяет буквально предсказывать будущее. Чтобы лучше понимать темы, которые мы будем разбирать, предлагаю взглянуть на эту тему шире и посмотреть на то как эволюционировало хранение и работа с данными на долгой дистанции, а также к чему нас это привело.

**1970-1979: Зарождение реляционной модели**  
Теоретические основы современных БД  
В 1970 году Эдгар Кодд из IBM публикует революционную статью "A Relational Model of Data for Large Shared Data Banks", которая заложила основы всей современной индустрии баз данных. Его реляционная модель предложила математически строгий подход к организации данных через таблицы, строки и столбцы.  
**Ключевые события:**

* 1970: Статья Кодда о реляционной модели  
* 1974-1979: IBM разрабатывает System R - первую реляционную СУБД  
* 1975: Появление концепции ACID (Atomicity, Consistency, Isolation, Durability)  
* 1970-е: Разработка SQL (Structured Query Language) в IBM

Этот период заложил математические и теоретические основы, которые до сих пор определяют принципы работы большинства баз данных.

**1980-1989: Коммерциализация реляционных БД  
От лабораторий к реальному бизнесу  
Десятилетие коммерциализации идей Кодда. Появляются первые коммерческие продукты, которые превращают академические исследования в реальные бизнес-решения.  
**Ключевые события:**

* 1979: Oracle (Relational Software Inc.) выпускает первую коммерческую SQL СУБД, опередив саму IBM  
* 1982: IBM DB2 - ответ IBM на успех Oracle  
* 1986: SQL становится стандартом ANSI  
* 1987: SQL становится стандартом ISO  
* Конец 1980-х: Появление концепции OLTP (Online Transaction Processing)

Реляционные базы данных становятся стандартом для корпоративных приложений, формируя многомиллиардную индустрию.

**1990-1999: Интернет-революция и масштабирование**  
Адаптация к новой реальности веба  
С появлением World Wide Web и массового интернета базы данных сталкиваются с принципиально новыми вызовами: необходимость обслуживать тысячи одновременных пользователей и обрабатывать неструктурированную информацию.  
**Ключевые события:**

* 1995: MySQL выпущен как open-source решение для веб-приложений  
* 1996: PostgreSQL появляется как объектно-реляционная СУБД  
* 1997: Microsoft SQL Server 7.0 интегрируется с Windows NT  
* Середина 1990-х: Появление концепции Data Warehousing (Ральф Кимбалл, Билл Инмон)  
* 1990-е: Развитие OLAP (Online Analytical Processing) и многомерных кубов  
* 1998: Google основана - начало эры поисковых систем

Этот период характеризуется попытками адаптировать традиционные реляционные БД к требованиям интернет-приложений.

**2000-2006: Кризис масштабирования и поиск альтернатив**  
Границы традиционных подходов  
Рост интернет-компаний (Amazon, Google, eBay) выявляет фундаментальные ограничения традиционных СУБД при работе с web-scale нагрузками.  
**Ключевые события:**

* 2003: Google публикует статью о Google File System (GFS)  
* 2004: Google MapReduce paper - революция в распределенной обработке данных  
* 2005: Apache Hadoop начинает разработку на базе GFS и MapReduce  
* 2006:   
  * Amazon запускает S3 и EC2 - рождение облачных вычислений  
  * Google BigTable представлен как колоночная NoSQL БД  
  * Clive Humby: "Data is the new oil"

Крупные интернет-компании начинают разрабатывать собственные решения, не ограниченные принципами традиционных СУБД.

**2007-2012: NoSQL революция и Big Data платформы**  
Отказ от реляционной догмы  
Период массового появления альтернативных моделей данных и распределенных систем. Термин "NoSQL" становится мейнстримом.  
Ключевые события:

* 2007: Amazon DynamoDB, CouchDB  
* 2008: Cassandra (Facebook), Google App Engine с Bigtable  
* 2009: MongoDB, Redis появляются как новый класс БД  
* 2010: Apache HBase стабилизируется, Instagram демонстрирует потребности в обработке медиа  
* 2011: Apache Kafka (LinkedIn) для потоковой обработки, начало разработки Apache Spark  
* 2012: Facebook достигает 1 млрд пользователей, Google Spanner как глобально распределенная БД

Появляется экосистема специализированных решений: документные БД, key-value stores, колоночные БД, графовые БД.

**2013-2018: Облачная трансформация и конвергенция**  
От on-premise к cloud-native  
Массовая миграция в облако и появление managed services. Попытки объединить лучшее от SQL и NoSQL миров.  
**Ключевые события:**

* 2013: Snowflake основана как cloud-native платформа  
* 2014: Apache Spark становится top-level проектом, Amazon Redshift революционизирует облачные хранилища  
* 2015: Apache Flink, TensorFlow открыт Google  
* 2016: Google BigQuery с ML, Microsoft Azure Cosmos DB  
* 2017: Amazon Aurora, Apache Airflow, Kubernetes революция  
* 2018: GDPR влияет на архитектуру данных, Apache Kafka становится стандартом

Облачные провайдеры становятся основными инноваторами в области баз данных.

**2019-2024: Эра Data Lakehouse и AI-революции**  
**Унификация аналитики и транзакций**  
Появление архитектур, объединяющих возможности data lakes и data warehouses. AI и машинное обучение становятся основными драйверами инноваций.  
**Ключевые события:**

* 2019: Databricks представляет концепцию Data Lakehouse, Apache Delta Lake  
* 2020: Пандемия ускоряет цифровизацию, Snowflake IPO ($3.4 млрд), Apache Iceberg (Netflix)  
* 2021: dbt революционизирует ELT, Fivetran/Airbyte развивают modern data stack  
* 2022: ChatGPT создает спрос на векторные БД, Pinecone/Weaviate  
* 2023: Apache Iceberg 1.0, LLM и RAG архитектуры, PostgreSQL pgvector  
* 2024: Массовое внедрение векторных БД (Chroma, Qdrant), real-time OLAP (ClickHouse)

Данные становятся основой для AI-приложений, требуя новых специализированных решений.

**Выводы**  
Каждая волна была ответом на конкретные технологические и бизнес-вызовы своего времени, формируя многослойную экосистему современных решений и подходов для работы с данными. 

### Подведение итогов и переход от болтовни к теории

![Слайд: Эволюция хранения данных 2019-2024](/images/articles/hse-storing-retrieving-data/slide-11.png)

Давайте подведем промежуточные итоги. Мы обсудили почему данные это ценный ресурс, зачем вам ориентироваться в этой теме, прошли путь длиной в более чем полвека и теперь понимаем как все строилось и даже можем поиграться в оракула.  
Давайте углубимся еще больше, чтобы понять как именно и с помощью чего это сделать!

## Типы и источники данных

![Слайд: Типы данных](/images/articles/hse-storing-retrieving-data/slide-12.png)

### Вступительное слово

Думаю каждый из вас знаком с одно философской загадкой: Что раньше курица или яйцо?  
Пускай в нашем случае курица - это процесс, а яйцо - это данные.  
Процесс начинается с каких-то вводных, а заканчивается каким-то результатом, но чтобы работать с данными нужно ввести классификацию, ведь к каждому нужен свой подход. С этого и начнем!

Принято делить данные на три ключевые категории:

* Структурированные  
* Полуструктурированные  
* Неструктурированные

Будто бы тут и так все ясно, но давайте пройдемся по каждому.

### Структурированные данные

![Слайд: Структурированные данные](/images/articles/hse-storing-retrieving-data/slide-13.png)

**Что это такое?**  
Это наиболее понятный и привычный тип данных, с которого исторически началось цифровое хранение информации. У таких данных есть:

* чёткая схема;  
* фиксированная структура: строки и столбцы;  
* заданные типы значений: дата, число, текст, логический признак и т.д.

**Аналогия:**

* Представьте Excel-таблицу, в которой:  
* каждая строка — запись о событии;  
*  каждый столбец — строго определённое поле (например, «дата заказа» или «сумма»);  
* всё упорядочено и понятно.

**Примеры структурированных данных**

| Объект | Поля |
| ----- | ----- |
| Таблица заказов | ID заказа, дата, сумма, статус |
| Справочник клиентов | ФИО, дата регистрации, номер телефона |
| Бухгалтерские проводки | Счёт дебета, счёт кредита, сумма, дата |

**Почему это важно для бизнеса?**

Структурированные данные — это фундамент для автоматизации и аналитики. Их ключевые преимущества:

* **Хранение:** легко сохраняются в базах данных;  
  **Анализ:** по ним просто строить отчёты, диаграммы, дашборды;  
* **Качество:** у данных есть стандарт — это упрощает контроль и валидацию;  
* **Интеграция:** их проще передавать между системами и обрабатывать автоматически.

**Где применяются?**

Проще сказать, где они не применяются, но всё же.

Именно из-за своей предсказуемости и формализованности структурированные данные чаще всего используются в:

* BI-системах;  
* управленческом и финансовом анализе;  
* логистике и производстве;  
* HR-учёте и KPI-системах;  
* бухгалтерии и нормативной отчётности.

**Вывод:**  
Именно с них всё начинается — и именно на них строится основа зрелой работы с данными в компании.

### Полуструктурированные данные

![Слайд: Полуструктурированные данные](/images/articles/hse-storing-retrieving-data/slide-14.png)

**Что это такое?**  
Полуструктурированные данные — это данные, у которых нет жёсткой табличной структуры, как у Excel, но присутствует внутренняя логика и формат, позволяющий их интерпретировать и обрабатывать.

**Такие данные хранятся в виде:**

* JSON-файлов;  
* XML-документов;  
* YAML-структур;  
* логов с заданной схемой;  
* событий в формате key-value.

Отличительная особенность — структура может быть вложенной и непостоянной, но при этом сохраняет читаемость и машинообрабатываемость.

**Аналогия:**  
Если структурированные данные — это строгая таблица, то полуструктурированные — как анкета с блоками «по выбору»: у кого-то заполнены все поля, у кого-то только часть.

**Примеры полуструктурированных данных**

| Источник | Пример формата |
| ----- | ----- |
| API-запросы | JSON: {"user": {"id": 123, "name": "Анна"}} |
| Веб-логи | Строки логов в формате ключ=значение |
| Формы обратной связи | Разные по структуре, но со схемой JSON |
| IoT-сенсоры | Потоковые сообщения с ключами и метками |
| XML-документы | Описание структуры каталога товаров |

**Почему это важно для бизнеса?**

Полуструктурированные данные сегодня составляют значительную часть бизнес-реальности, потому что:

* многие внешние сервисы (API, SaaS) возвращают именно такие форматы;  
* внутренняя разработка часто опирается на JSON или YAML;  
* хранение в виде документов даёт гибкость, особенно при нестабильных структурах;  
* эти данные обрабатываются быстрее, чем неструктурированные, и дают больше свободы, чем строгие таблицы.

**Где применяются?**  
Полуструктурированные данные встречаются везде, где:

* нужен гибкий формат под разные кейсы;  
* данные приходят из внешних источников;  
* система работает в режиме событий (event-driven).

**Вывод:**  
Полуструктурированные данные — это компромисс между табличным порядком и свободной формой. Они требуют более гибкой обработки, но при этом позволяют решать широкий круг задач, особенно в современных распределённых системах.

### Неструктурированные данные

**Что это такое?**  
Неструктурированные данные — это информация без заранее заданной схемы: тексты, презентации, изображения, видео, аудио, сканы документов, переписка и другие материалы, которые сложно сразу разложить по строкам и столбцам.

![Слайд: Неструктурированные данные](/images/articles/hse-storing-retrieving-data/slide-15.png)

**Почему это важно для бизнеса?**

Именно в неструктурированных данных часто лежит контекст: жалобы клиентов, причины отказов, внутренние знания, договоры, инструкции, обращения в поддержку. Раньше такие материалы было трудно анализировать автоматически, но развитие OCR, NLP, векторного поиска и LLM делает их полноценным источником управленческой информации.

**Где применяются?**

* анализ обращений и отзывов;
* поиск по корпоративным документам;
* обработка сканов и договоров;
* классификация изображений и медиа;
* обучение и дообучение моделей.

**Вывод:**  
Неструктурированные данные требуют больше подготовки, но дают глубинный контекст, которого нет в таблицах.

### Подведение итогов про типы

**Каждый тип данных — это отдельный класс бизнес-ресурса.**

* Структурированные — для управления и учёта.  
* Полуструктурированные — для гибких взаимодействий и интеграций.  
* Неструктурированные — для понимания, контекста и глубинного анализа.

### Источники данных и архитектура получения

![Слайд: Источники данных](/images/articles/hse-storing-retrieving-data/slide-16.png)

После того как мы разобрались в типах данных, следующий логичный вопрос — откуда они поступают, как объединяются и почему с этим столько сложностей.

Тут есть 2 типа классификации, которые следует учесть при работе с данными.  
Первый, классифицирует по месту: внутренний и внешний источники.  
Второй, я бы сказал по принципу поступления: оффлайн / онлайн.

Давайте поговорим про каждый!

### Внутренние источники

Почти каждая организация производит данные внутри себя. И, как правило, эти данные разбросаны по отдельным сервисам, системам, отделам, форматам.

Основные типы внутренних источников:

* **CRM-системы** (клиенты, обращения, сделки);  
* **ERP-системы** (склады, закупки, производство, финансы);  
* **1С и аналоги** (бухгалтерия, зарплаты, налоговая отчётность);  
* **HR-системы** (штат, графики, увольнения, KPI);  
* **Системы учёта задач и проектов** (Jira, Bitrix, Trello);  
* **Оборудование, сенсоры, сканеры** (в производстве, логистике, медицине);  
* **Внутренние документы и переписка** (электронная почта, формы, согласования;  
* **Продукты компании и другие используемые системы**).

Проблема в том, что эти источники:

* не синхронизированы друг с другом;  
* используют разные идентификаторы, форматы;  
* могут дублировать или противоречить друг другу.

### Внешние источники

Помимо внутренних данных, часто компании подключают внешние источники:

* **Платёжные и банковские шлюзы** (эквайринг, расчёты, кредиты);  
* **Поставщики данных** (контрагенты, цены, погодные условия, геолокация);  
* **API сторонних сервисов** (телематика, call tracking, аналитика трафика);  
* **Открытые данные** (государственные реестры, статистика, публичные датасеты);  
* **Партнёрские системы** (сквозная аналитика, совместные витрины данных).

Здесь основная сложность — в стандартизации, надёжности и объёмах. Внешние данные не всегда можно контролировать: они могут меняться, исчезать или поступать в нестабильном формате.

### Онлайн и офлайн источники

Другим видом классификации являются:

* **Онлайн источники** — данные, поступающие в реальном времени (например, клики пользователей, телеметрия с устройств, события из веб-приложений);

* **Офлайн источники** — данные, которые поступают периодически, пакетами (например, отчёт из 1С каждую ночь, экспорт из системы безопасности раз в неделю).

Эта разница имеет значение для выбора архитектуры: то, что хорошо для офлайна, не всегда работает в real-time сценариях.

### Собрать все в одно место - задача не из простых

Большинство считает, что если все данные уже есть, их достаточно «собрать в одно хранилище» — и всё заработает. На практике всё сложнее. Вот основные барьеры, с которыми сталкиваются компании при интеграции данных:

1. Разные форматы  
   Данные приходят в виде таблиц, JSON, XML, PDF, аудиофайлов. Прежде чем объединять, их нужно привести к единому виду, стандартизировать и “разобрать”.  
2. Несовпадающие идентификаторы  
   Один и тот же клиент может называться по-разному в разных системах. Например:  
* в CRM — “ООО Альфа”,  
* в ERP — “Альфа ООО”,  
* в бухгалтерии — по ИНН.  
  Пока не будет единого ключа (master data), невозможно сопоставить данные корректно.  
3. Разные правила учёта  
   В одной системе сумма может считаться с НДС, в другой — без. Где-то дата — это дата оформления, а где-то — дата оплаты. Без выравнивания логики данные будут противоречить друг другу.  
4. Разная частота обновления  
* CRM может обновляться ежеминутно.  
* 1С — выгружать данные ночью.  
* API — отдавать данные с задержкой.  
  Это создаёт логические разрывы и требует настройки согласованных.  
5. Проблемы прав доступа и безопасности  
* Не все данные можно просто “выгрузить”.  
* Есть персональные данные, коммерческая тайна, ограничения по ФЗ-152.  
* Часто нет чёткого понимания: кто имеет право передавать и кто — принимать.

### Архитектуры интеграции или что за звери эти - ETL, ELT и CDC

![Слайд: ETL, ELT и CDC](/images/articles/hse-storing-retrieving-data/slide-17.png)

Чтобы преодолеть сложности, которые мы только что обсудили, в компаниях выстраивают архитектуру интеграции данных — специальную прослойку между источниками и хранилищем, которая «разбирает» данные, очищает, объединяет и подготавливает к использованию.

Сейчас мы разберем три основных подхода, которые вам стоит знать.

### ETL: извлечение, преобразование, загрузка (Extract – Transform – Load)

Классический подход, применяемый в аналитических системах:

* Extract (извлечение) — получаем данные из источников;  
* Transform (преобразование) — очищаем, нормализуем, пересчитываем;  
* Load (загрузка) — записываем в хранилище в готовом виде.

**Плюсы:** всё под контролем, удобно для отчётности.  
**Минусы:** сложно встраивать в real-time; трансформация занимает время.

**Аналогия:** бухгалтер собирает первичные документы, проверяет и формирует итоговую таблицу — уже чистую и согласованную.

### ELT: извлечение, загрузка, преобразование (Extract – Load – Transform)

Современный подход для мощных систем, которые могут обрабатывать данные “на лету”. Здесь:

* Сначала всё загружается в хранилище «как есть»;  
* Потом уже внутри хранилища запускаются преобразования.

**Плюсы:** быстрое получение доступа к сырым данным.  
**Минусы:** требует надёжного и масштабируемого хранилища.

**Аналогия:** вы складываете все документы в папку, а уже потом бухгалтер делает расчёты.

### CDC: отслеживание изменений (Change Data Capture)

Подход, при котором фиксируются только изменения, а не весь объём данных как в предыдущих подходах.

**Плюсы:** экономия ресурсов, ближе к реальному времени.  
**Минусы:** сложнее настроить, требует поддержки со стороны источников.

**Аналогия:** вы не пересчитываете весь бюджет, а просто учитываете поступившую корректировку.

### Вывод

В современном бизнесе данные поступают из десятков источников, в разных форматах, с разной скоростью и качеством.   
Именно от того, как выстроен сбор и обработка данных, зависит насколько достоверна ваша аналитика и как быстро принимаются решения.

Это все конечно хорошо, но мы же все понимаем, что есть разница между тем, хранить деньги в кошельке или в сейфе. Каждое “хранилище” будет обладать своими преимуществами и недостатками. Предлагаю в этом разобраться!

## OLTP и OLAP

![Слайд: OLTP и OLAP](/images/articles/hse-storing-retrieving-data/slide-18.png)

### Вступление

Когда мы говорим «база данных», большинство людей представляют себе нечто универсальное — место, где хранятся таблицы, откуда можно что-то достать и что-то туда записать. Однако в реальности существует **две принципиально разные группы систем хранения**, каждая из которых решает свои задачи и требует разного подхода: **OLTP** и **OLAP**.

Вспомним пример про то, где вы храните деньги:

* **OLTP** — это кошелек: быстрый доступ, четко помните сколько положили так как используем чаще.  
* **OLAP** — это сейф: доступ долгий, храним много с привязкой к истории (когда и сколько сложили).

Давайте разбираться дальше!

**Вопросы:**

* В чём отличие между операционными и аналитическими базами данных?  
* Какие задачи решают OLTP-системы?  
* Какие задачи решают OLAP-системы?  
* Почему нельзя всё хранить в одной базе?

### OLTP: Операционные системы в реальном времени

OLTP (Online Transaction Processing) — это тип информационных систем, которые обрабатывают ежедневные, текущие, операционные действия бизнеса. Это те самые действия, которые происходят постоянно: оформление заказов, списание товара со склада, регистрация клиентов, внесение платежей.

С точки зрения бизнеса, это «системы учёта здесь и сейчас». Они фиксируют каждое действие, каждую транзакцию, каждое изменение — в момент, когда оно происходит. Именно благодаря OLTP работают сайты, мобильные приложения, кассы, внутренние CRM и ERP-системы.

Эти системы обрабатывают много мелких операций, но очень быстро. Главное для OLTP — скорость реакции и точность выполнения каждой операции.

**Аналогия:**  
Представьте супермаркет. У каждой кассы — покупатель. Пробивается товар, оплачивается — и информация тут же должна попасть в систему: списание со склада, чек, начисление бонусов, изменение остатков.

OLTP — это как кассовая система, которая должна моментально зафиксировать факт продажи и передать его дальше. Всё должно работать чётко, мгновенно и без сбоев. Покупатель не будет ждать, пока система “подтянет данные из хранилища”.

**Преимущества**  
1. Скорость  
OLTP-системы обрабатывают сотни и тысячи транзакций в минуту. Это критично для тех бизнесов, где важно моментально зафиксировать событие — например, в розничной торговле, онлайн-заказах, банках.

2. Надёжность  
Каждая операция должна быть либо выполнена полностью, либо не выполнена вообще. Это предотвращает ситуации вроде «деньги списали, но заказ не оформился».

3. Актуальность  
В таких системах всегда содержится актуальное состояние бизнес-процессов. Вы точно знаете, сколько товара осталось, сколько заказов в обработке, сколько клиентов обратились за день.

**Недостатки**  
1. Ограниченность в аналитике  
OLTP-системы не предназначены для сложных аналитических запросов. Они заточены под быстрые, короткие операции. Попытка “вытянуть отчёт за год” может замедлить работу всей системы.

2. Неудобство для исторических анализов  
Данные в OLTP-системах часто обновляются и перезаписываются. Например, у клиента просто меняется телефон — и старое значение стирается. Для аналитики важно хранить историю изменений, но OLTP этого не делает.

3. Сложность масштабирования под аналитику  
Когда компания хочет анализировать поведение клиентов, тенденции продаж, отклонения и прогнозы — OLTP становится узким горлышком.

**Вывод**  
OLTP — это как нервная система бизнеса: она передаёт сигналы быстро, точно и обеспечивает мгновенную реакцию. Эти системы работают “на передовой” и фиксируют всё, что происходит с клиентами, товарами, оплатами и операциями. Без них невозможны ни учёт, ни обслуживание, ни автоматизация.

Но у OLTP есть свои границы: она не отвечает на вопросы “почему” и “что будет дальше” — этим занимается аналитика, которой нужен совсем другой подход. И именно поэтому OLTP всегда идёт в паре с OLAP — об этом мы поговорим в следующем разделе.

### OLAP: аналитика на уровне бизнеса

OLAP (Online Analytical Processing) — это подход к работе с данными, предназначенный не для оперативных действий, а для глубокого анализа информации.

Если OLTP — это касса, то OLAP — это отдел финансового планирования. Здесь нет необходимости обрабатывать тысячу операций в секунду. Зато есть задача: увидеть картину целиком, сделать выводы, найти закономерности, подготовить стратегическое решение.

OLAP-системы работают с большими объёмами исторических данных, собранных за дни, месяцы и годы. Они позволяют сравнивать, агрегировать, анализировать — по разным разрезам и с разной степенью детализации.

**Аналогия**:  
Представьте, что вы руководитель розничной сети и хотите понять:

* в каких регионах растут продажи, а где — падают?  
* какие товары чаще возвращают?  
* какие категории приносят наибольшую прибыль?  
* как меняется спрос по сезонам?

Кассовая система (OLTP) на эти вопросы не ответит — она просто фиксирует каждую транзакцию. Чтобы увидеть тренды, закономерности и аномалии — нужен инструмент, который агрегирует, фильтрует и сравнивает. Этим и занимается OLAP.

**Преимущества**  
1. Глубина анализа  
OLAP позволяет:

* агрегировать данные по разным измерениям (время, регионы, категории);  
* делать сравнения “год к году”, “период к периоду”;  
* выявлять зависимости и аномалии.

2. Высокая производительность при сложных запросах  
OLAP-системы специально оптимизированы для того, чтобы быстро выполнять аналитические запросы на больших объёмах данных.

3. Историчность  
В OLAP-среде данные не просто обновляются — они хранятся в разрезе времени. Это позволяет анализировать, как менялось поведение клиентов, динамика продаж, эффективность каналов.

4. Основа для BI и стратегического управления  
Именно OLAP лежит в основе бизнес-аналитики, дашбордов, KPI-систем. Это не просто отчётность — это поддержка принятия решений на основе данных.

**Недостатки**  
1. Не предназначен для оперативной работы  
OLAP не подходит для моментальной фиксации событий. Он не заменит CRM, кассу, биллинг. Это система анализа, а не действия.

2. Требует подготовки данных  
Перед тем как данные попадут в OLAP, они должны пройти фильтрацию, очистку, нормализацию и загрузку из разных источников. Это требует усилий и архитектуры (ETL/ELT).

3. Инфраструктурные требования  
Для хранения, обработки и визуализации больших массивов данных OLAP требует отдельной платформы — от классических DWH до современных cloud-сервисов.

**Вывод**  
OLAP — это инструмент стратегического управления. Он отвечает не на вопрос “что произошло?”, а на “почему это произошло?”, “что будет дальше?” и “что нам с этим делать?”. Это ваш аналитик, статистик и стратег — только в цифровом виде.

OLTP и OLAP работают вместе:

* OLTP фиксирует каждую транзакцию;  
* OLAP показывает, как эти транзакции складываются в бизнес-паттерны.

Если OLTP — это сердце компании, то OLAP — это её мозг.

### Почему бы не объединить?

На первый взгляд идея объединить OLTP и OLAP выглядит здраво:  
«Раз у нас есть система, где уже всё хранится, зачем городить отдельное хранилище под аналитику?»

Однако практика показывает: попытка использовать одну и ту же базу данных для оперативных задач и аналитики — приводит к сбоям, замедлению и ошибкам.

Разберёмся почему.

**Принципиальные различия**

| Критерий | OLTP (операционная система) | OLAP (аналитическая система) |
| :---- | :---- | :---- |
| **Назначение** | Учёт и выполнение ежедневных операций | Анализ, сравнение, прогнозирование |
| **Тип запросов** | Короткие, простые: «добавить заказ», «изменить статус» | Длинные, сложные: «сравнить продажи по 3 регионам за 5 лет» |
| **Обновление данных** | Постоянное, реальное время | Периодическое, по расписанию |
| **Объём данных** | Актуальные данные, ограниченный объём | Большой исторический объём |
| **Структура хранения** | Нормализованные таблицы (много связей) | Денормализованные или агрегированные данные |
| **Цель** | Быстро зафиксировать факт | Понять тренд или отклонение |

**Что происходит, если попытаться объединить?**  
1. Замедление оперативной работы  
Когда аналитики начинают выполнять тяжёлые запросы к OLTP-базе — это замедляет работу касс, CRM, биллинга. Даже временное торможение таких систем — это деньги и репутация.

2. Нестабильность аналитики  
OLTP постоянно обновляется. Это значит, что в течение одного и того же анализа данные могут измениться. Итог — несогласованные цифры, “прыгающие” отчёты и потеря доверия.

3. Разные требования к архитектуре  
OLTP нуждается в высокой доступности и защите транзакций. OLAP — в скорости выборки и возможности агрегировать данные. Невозможно настроить систему так, чтобы она одинаково хорошо справлялась с обеими задачами.

4. Рост сложности и стоимости  
Поддерживать универсальную систему, в которой всё «в одном месте», оказывается дороже, чем разделить архитектуру. Возникают сложности с резервным копированием, правами доступа, масштабированием.

**Аналогия:**  
Представьте, что у вас есть магазин и склад.

* Магазин — это OLTP: здесь клиенты, продажи, прилавки, расчёты.  
* Склад аналитики — это OLAP: здесь всё собрано, пересчитано, промаркировано.

Вы же не будете устраивать ревизию прямо на кассе в час пик?

Так и с базами данных: пытаться анализировать в рабочей системе — всё равно что перекладывать товар в момент продаж.

### Вывод

OLTP и OLAP — принципиально разные по целям, архитектуре и требованиям.  
Объединить их технически возможно, но это имеет свои последствия. 

Мы знаем что такое OLTP и OLAP, но на чем они работают? Спойлер - базы данных.   
Их то мы и обсудим!

## Типы СУБД

### Вступление: почему одной базы недостаточно

Когда речь заходит о цифровизации или разработки новой системы, часто звучит вопрос: «А какую базу данных нам выбрать?»  
Звучит просто. Но за этим вопросом скрывается целая архитектурная развилка.

В современных организациях одной базы данных уже недостаточно. Причин — как минимум три:

1. Данные стали разнообразнее.

    Это уже не только таблицы и цифры. Это письма, документы, изображения, аудио, события, профили, телеметрия, координаты, связи. Всё это — разные формы информации, требующие разных подходов к хранению и обработке.

2. Задачи стали сложнее.

    Раньше СУБД использовались в основном для хранения транзакций — покупок, платежей, клиентов. Сегодня они стали частью аналитики, рекомендательных систем, машинного обучения, мониторинга, цифровых двойников и даже искусственного интеллекта.

3. Объёмы резко выросли.

    Компании начали работать с миллиардами записей, терабайтами и петабайтами данных. Поддерживать такую нагрузку “традиционной” СУБД — дорого, неэффективно и технологически невозможно.

**Эволюция подхода**  
Вспомним, что мы обсуждали в начале.  
В 1990-х и 2000-х реляционные СУБД (такие как Oracle, SQL Server, PostgreSQL) были практически единственным выбором. Всё укладывалось в таблицы, и всё подчинялось строгой схеме.

Но с ростом масштабов и появлением новых требований на арену вышли альтернативные подходы, получившие общее название NoSQL. Они предложили гибкость, масштабируемость и простоту для новых типов данных.

Чуть позже появилась новая волна — NewSQL, объединившая сильные стороны реляционных и нереляционных систем.

**Зачем это вам?**  
Понимание различий между типами СУБД — это не про выбор “модной технологии”. Это про соответствие архитектуры — задачам бизнеса.

Если выбрать не ту базу:

* система будет тормозить;  
* отчёты будут строиться вечность, а их автоматизация длится вечность;  
* не получится масштабироваться;  
* вы потратите в 2–3 раза больше на инфраструктуру;  
* внедрение ИИ или аналитики станет невозможным либо крайне трудозатратным.

Выбор типа базы — это стратегическое решение. Оно напрямую влияет на устойчивость, скорость и возможности роста.

### Реляционные СУБД (SQL)

Реляционные базы данных — это классический и самый распространённый тип СУБД. В них вся информация организована в виде связанных таблиц, где каждая строка — это запись, а каждый столбец — поле с определённым типом данных.

Эти базы строго придерживаются схемы: заранее определены названия таблиц, связи между ними, формат данных. Они обеспечивают высокую точность, согласованность и надёжность при работе с информацией.

Такие СУБД используют язык запросов SQL (Structured Query Language), с помощью которого можно добавлять, обновлять, удалять и выбирать данные.

**Аналогия**  
Реляционную базу данных можно сравнить с архивом документов в идеальном порядке:

* у каждого документа — номер, категория, точное место на полке;  
* документы связаны ссылками и формами;  
* любые данные можно быстро найти, если знаешь структуру.

Она даёт строгий контроль и предсказуемость, но требует, чтобы заранее была понятна структура хранения.

**Когда использовать**  
SQL-базы данных идеальны в тех ситуациях, когда:

* информация хорошо структурирована и заранее известна;  
* важно обеспечить целостность и надёжность данных;  
* много связанных объектов (клиенты, заказы, товары, платежи);  
* требуется поддержка транзакций — то есть изменений, которые должны либо выполниться полностью, либо не выполняться вовсе.

Если бизнес-процесс требует строгой последовательности и контроля — SQL остаётся лучшим выбором.

**Примеры**

| СУБД | Описание |
| :---- | :---- |
| **PostgreSQL** | Открытая, надёжная, активно развиваемая. Поддержка расширений и геоданных. |
| **MySQL** | Лёгкая, популярная в веб-приложениях. Используется во многих CMS. |
| **Oracle Database** | Коммерческий гигант, стандарт для банков и корпораций. |
| **Microsoft SQL Server** | Интеграция с продуктами Microsoft, часто используется в корпоративной среде. |

**Вывод:**  
Реляционные базы — это проверенное временем решение. Но у них есть ограничение: они плохо справляются с гибкими, быстро меняющимися структурами и с огромными объёмами данных, которые не укладываются в таблицы.

Поэтому в ряде задач на смену классическим SQL приходят более гибкие NoSQL-решения. Именно о них мы поговорим дальше.

### NoSQL: гибкость, масштаб и новые форматы данных

![Слайд: NoSQL types](/images/articles/hse-storing-retrieving-data/slide-21.png)

NoSQL — это общее название для баз данных, которые не используют традиционную табличную (реляционную) модель хранения данных. Название “NoSQL” исторически означает “Not Only SQL” — то есть: не только таблицы, и не только строгие схемы.

Главные отличия NoSQL:

* отказ от единой фиксированной схемы;  
* хранение информации в более гибком формате (документы, ключ-значение, графы и т.д.);  
* упор на масштабируемость, скорость и удобство работы с неструктурированными или полуструктурированными данными.

NoSQL — это не замена SQL, а дополнение.  
На практике, многие компании используют оба подхода в одной архитектуре, решая разные задачи разными инструментами.

**Подтипы NoSQL**  
В NoSQL входят несколько направлений, каждое из которых заточено под определённую модель данных и бизнес потребность:

- Документные СУБД (Document-oriented)  
  Хранят данные в виде документов (обычно JSON). Подходящий выбор для хранения профилей, анкет, настроек, заказов.  
- Колоночные СУБД (Column-oriented)  
  Оптимизированы под аналитику на больших объёмах: запросы по колонкам, а не по строкам.  
- Ключ-значение (Key-Value)  
  Простейшая модель: быстрый доступ по ключу. Отлично подходит для кэширования и сессий.  
- Графовые СУБД  
  Используются там, где важны связи между объектами: социальные сети, маршруты, иерархии.  
- Векторные СУБД  
  Новое поколение баз, применяемое в ИИ и рекомендательных системах. Хранят данные в виде математических векторов для поиска “по смыслу”.  
- In-Memory БД  
  Базы, работающие целиком в оперативной памяти. Предельная скорость при ограничениях по объёму.

Теперь последовательно рассмотрим каждый из этих подтипов.  
Начнём с документных СУБД — самого распространённого и универсального варианта в мире NoSQL.

### Документные СУБД (Document-oriented)

![Слайд: Документные СУБД](/images/articles/hse-storing-retrieving-data/slide-22.png)

Документные СУБД — один из самых популярных подтипов NoSQL.

Они хранят данные в виде **документов**, чаще всего в формате **JSON**, **BSON** или **XML**. Каждый документ — это самостоятельная запись, содержащая набор полей и значений. В отличие от реляционных баз, здесь нет жёстко заданной схемы: каждый документ может иметь **свою уникальную структуру**, даже внутри одной коллекции.

Документы могут быть вложенными (то есть содержать другие документы), что удобно для хранения сложных объектов, таких как «профиль клиента» или «карточка товара».

Это позволяет очень гибко работать с разнородными и изменяющимися данными, не нарушая общую систему хранения.

**Аналогия**

Представьте папку с анкетами клиентов.  
 Одна анкета содержит только имя и телефон, другая — имя, телефон, историю заказов, отзывы, дату рождения.  
 Каждая анкета — это отдельный документ, и вы не обязаны заранее определять шаблон для всех.

Документные СУБД позволяют **“хранить данные так, как они есть”**, без предварительного построения жёсткой структуры.

**Когда использовать**

Документные СУБД отлично подходят, если:

* структура данных меняется со временем;  
* каждый объект может содержать уникальный набор атрибутов;  
* важно быстро получать и сохранять **цельные объекты** (например, весь заказ — в одном документе);  
* система работает с **полуструктурированными** данными — как раз с теми, что обсуждались ранее.

**Примеры СУБД**

| Название | Описание |
| :---- | :---- |
| **MongoDB** | Самая популярная документная СУБД. Простая, гибкая, поддерживает вложенные структуры. |
| **Couchbase** | Совмещает документы с возможностями кэширования. Подходит для real-time приложений. |
| **Amazon DocumentDB** | Облачная альтернатива MongoDB от Amazon, совместимая по API. |
| **RavenDB** | Поддерживает ACID-транзакции, ориентирована на .NET-разработку. |
| **Firebase Realtime Database / Firestore** | Документные БД от Google для мобильных и веб-приложений. |

**Вывод:**  
Документные базы — отличный выбор, когда нужно гибко, быстро и удобно работать с данными, структура которых может меняться. Они не заменяют SQL в задачах строгой отчётности, но превосходны в ситуациях, где требуется скорость и адаптивность.

### Колоночные СУБД (Column-oriented)

![Слайд: Колоночные СУБД](/images/articles/hse-storing-retrieving-data/slide-23.png)

Колоночные базы данных хранят данные не построчно, как реляционные СУБД, а по столбцам. Это означает, что значения одного и того же поля (например, "сумма покупки") хранятся рядом, а не распределены по разным строкам.

Такая модель сильно ускоряет аналитические запросы, когда нужно обработать и агрегировать один или несколько столбцов по огромному объёму данных. Именно поэтому колоночные СУБД часто применяются в системах бизнес-аналитики и отчётности.

**Аналогия**  
Представьте себе обычную таблицу Excel с миллионами строк.  
Если вам нужно посчитать средний чек по всем заказам, вы открываете только столбец «Сумма», а не листаете всю таблицу построчно.

Колоночная СУБД делает именно это — чтение только нужных полей, что значительно экономит ресурсы и ускоряет работу.

**Когда использовать**  
Колоночные базы особенно эффективны в ситуациях, где:

* нужно анализировать большие объёмы данных по определённым признакам;  
* данные редко обновляются, но активно читаются и агрегируются;  
* бизнес строит дашборды, отчёты, KPI на основе истории;  
* важно быстро отвечать на аналитические запросы с фильтрацией и группировкой.

**Примеры СУБД**

| Название | Описание |
| :---- | :---- |
| **ClickHouse** | Российская колоночная СУБД, ориентирована на высокопроизводительную аналитику. |
| **Amazon Redshift** | Облачное хранилище от AWS, активно используется для аналитики. |
| **Apache Druid** | Заточен под real-time аналитику и интерактивные панели мониторинга. |
| **Apache Pinot** | Используется в LinkedIn, оптимизирован для низкой задержки запросов. |
| **Vertica** | Коммерческая колоночная БД от Micro Focus. Высокая скорость агрегаций. |

**Вывод:**  
Колоночные СУБД — это выбор номер один для аналитических систем, где ключевая задача — извлечение смыслов и закономерностей из больших объёмов данных. Они не подходят для транзакционных систем, где важна быстрая запись и частые изменения, но незаменимы, когда речь идёт об анализе.

### СУБД ключ-значение (Key-Value)

![Слайд: СУБД ключ-значение](/images/articles/hse-storing-retrieving-data/slide-24.png)

Key-Value хранилища — это наиболее простая модель баз данных, в которой каждая запись состоит всего из двух частей:  
ключа (уникального идентификатора) и значения (данных, привязанных к этому ключу).

Такой подход обеспечивает максимально быструю запись и чтение, особенно при огромных объёмах и высокой нагрузке. Благодаря своей простоте Key-Value базы легко масштабируются и часто используются в распределённых системах и real-time сценариях.

Они не поддерживают сложных связей, запросов или аналитики — их задача проста: “сохрани и отдай по ключу”.

**Аналогия**  
Представьте шкаф с ячейками, у каждой — свой номер (ключ).  
Вы можете положить в любую ячейку документ (значение), и затем мгновенно найти его, зная номер.

Это идеальный способ хранить сессионные данные, настройки пользователей или кэшированные ответы — без лишней структуры.

**Когда использовать**  
Key-Value базы эффективны, когда:

* нужно быстро сохранять и получать данные по уникальному ключу;  
* структура данных вторична или не имеет значения;  
* объём записей большой, а производительность — критична;  
* данные часто используются временно (например, кэш, токены, корзины, авторизация);  
* система распределена по нескольким серверам и должна масштабироваться горизонтально.

**Примеры СУБД**

| Название | Описание |
| :---- | :---- |
| **Redis** | Лёгкое и очень быстрое хранилище в памяти, часто используется как кэш. |
| **Amazon DynamoDB** | Облачное масштабируемое Key-Value хранилище от AWS. |
| **Riak KV** | Распределённая СУБД с высокой отказоустойчивостью. |
| **Aerospike** | Высокопроизводительное решение для real-time аналитики. |
| **LevelDB / RocksDB** | Встраиваемые локальные key-value базы от Google / Meta. |

**Вывод:**  
Key-Value базы — это инструмент для скорости, а не для структурности. Они не предназначены для аналитики, поиска по содержимому или сложной фильтрации, но идеально подходят для сценариев, где важны мгновенные операции и масштабируемость.

### Графовые СУБД

![Слайд: Графовые СУБД](/images/articles/hse-storing-retrieving-data/slide-25.png)

Графовые базы данных — это тип СУБД, в которых информация хранится не в виде таблиц, а в виде узлов и связей между ними.  
Узел (node) — это объект (например, человек, компания, продукт),  
Связь (edge) — это то, что их соединяет (например, “друг”, “партнёр”, “купил”).

Такая модель позволяет очень быстро анализировать сложные сети и отношения, что невозможно или крайне затратно на реляционных СУБД.

Графовые базы не просто хранят данные, а делают сами связи частью данных — со своими типами, весами, направлениями и контекстом.

**Аналогия**  
Представьте карту метро.  
Станции — это узлы, а линии между ними — связи.  
Если вы хотите узнать, как быстрее добраться от точки А до точки Б — вам не нужна таблица, вам нужен граф маршрутов.

Графовые базы решают такие задачи мгновенно, в отличие от табличных решений, где они превращаются в громоздкие и медленные JOIN-запросы.

**Когда использовать**  
Графовые СУБД применяются там, где:

* важны отношения между объектами и нужно их быстро анализировать;  
* структура информации гибкая, разветвлённая, иерархическая или циклическая;  
* требуется навигация по связям (например, “друзья друзей”);  
* данные активно развиваются: появляются новые типы объектов и связей;  
* стандартные базы “захлёбываются” от большого количества соединений (JOIN'ов).

**Примеры СУБД**

| Название | Описание |
| :---- | :---- |
| **Neo4j** | Самая известная графовая СУБД, с визуальным интерфейсом и удобным языком Cypher. |
| **OrientDB** | Комбинирует графовую и документную модели, подходит для гибридных задач. |
| **Amazon Neptune** | Облачное графовое хранилище, оптимизировано под масштабирование. |
| **ArangoDB** | Мульти-модельная СУБД: поддерживает графы, документы и key-value. |
| **Microsoft Azure Cosmos DB** | Поддерживает графовые запросы через Gremlin. |

**Вывод:**  
Графовые базы — это ответ на задачи, где связи важнее самих объектов.  
Они незаменимы в системах, моделирующих поведение, маршруты, сообщества и зависимости. Там, где реляционные базы “запутываются в JOIN'ах” — графовые показывают себя блестяще.

### Векторные СУБД

![Слайд: Векторные СУБД](/images/articles/hse-storing-retrieving-data/slide-26.png)

Векторные базы данных предназначены для хранения и поиска по векторным представлениям данных — числовым наборам, описывающим объекты в многомерном пространстве.

Каждый вектор — это, по сути, цифровой “отпечаток” объекта, будь то текст, изображение, аудиофрагмент или профиль пользователя. Такие отпечатки можно сравнивать между собой: чем ближе вектора — тем более схожи объекты.

Главная задача векторных СУБД — быстрый поиск по схожести, а не по точному совпадению.  
Это позволяет находить близкие по смыслу записи, даже если формально они не совпадают.

**Аналогия**  
Представьте библиотеку без карточного каталога, но с системой, которая “чувствует” близость книг по содержанию.  
Вы даёте ей одну книгу — и она предлагает другие, похожие по стилю, тематике или тону.  
Не по точному совпадению названия или автора — а по смыслу и содержанию.

Так работают векторные СУБД — они находят не то, что вы указали явно, а то, что наиболее близко по характеристикам.

**Когда использовать**  
Векторные базы применимы там, где:

* важна схожесть, а не идентичность объектов;  
* нельзя заранее определить фиксированные критерии фильтрации;  
* нужен быстрый поиск по “похожести” в больших массивах данных;  
* необходимо навигировать по многомерному пространству признаков.

**Примеры СУБД**

| Название | Описание |
| :---- | :---- |
| **Qdrant** | Российская высокопроизводительная векторная СУБД с REST API. |
| **Milvus** | Open-source хранилище с поддержкой масштабирования и гибкой индексации. |
| **Pinecone** | Облачная векторная база, рассчитанная на поиск по большим коллекциям. |
| **Weaviate** | Векторное хранилище с возможностью расширения семантического поиска. |
| **Faiss** | Библиотека от Meta для локального векторного поиска, применяется в СУБД. |

**Вывод:**  
Векторные СУБД — это инструмент для работы с похожестью, когда традиционный поиск по ключам или фильтрам не даёт нужного результата.  
Они особенно ценны в задачах, где объекты описаны сложными признаками, и важно быстро находить семантически близкие варианты, а не точные совпадения.   
Спойлер: Об этом типе мы еще поговорим.

### In-Memory СУБД

![Слайд: In-Memory СУБД](/images/articles/hse-storing-retrieving-data/slide-27.png)

In-Memory базы данных — это системы, которые хранят данные не на жёстком диске, а в оперативной памяти (RAM).  
Благодаря этому операции чтения и записи происходят в десятки и сотни раз быстрее, чем в классических СУБД, работающих с диском.

Такие базы особенно полезны там, где важны минимальные задержки — например, в высоконагруженных веб-системах, финансовых приложениях, игровых и телеком-сервисах.

Некоторые In-Memory СУБД поддерживают долговременное хранение на диске “на всякий случай”, но основная работа — всегда “в памяти”.

**Аналогия**  
Представьте, что вы ведёте расчёты.  
Одно дело — каждый раз открывать папку с бумагами (жёсткий диск).  
Другое — держать всё нужное на столе (в памяти) и моментально к этому обращаться.  
In-Memory СУБД — это именно “рабочий стол”, доступ к которому мгновенный.

**Когда использовать**  
In-Memory базы применяются там, где:

* важны мгновенные отклики и высокая скорость обработки;  
* данные активно читаются и обновляются;  
* нужно кэшировать данные между системами;  
* есть риск “просадки” производительности из-за доступа к диску.

**Примеры СУБД**

| Название | Описание |
| :---- | :---- |
| **Redis** | Лидер в области In-Memory. Часто используется как кэш, брокер сообщений и счётчик. |
| **Memcached** | Очень лёгкая система для кэширования запросов и данных. |
| **SAP HANA** | Корпоративная платформа, ориентированная на аналитику в памяти. |
| **VoltDB** | Расчётная СУБД с поддержкой транзакций и аналитики в режиме реального времени. |
| **Tarantool** | Российская In-Memory СУБД с возможностью скриптов и расширений. |

**Вывод:**  
In-Memory базы — это выбор, когда счёт идёт на миллисекунды.  
Они незаменимы там, где задержки недопустимы, а скорость — главный критерий. Это не “архив”, а инструмент быстрого доступа и оперативной реакции.

### NewSQL

![Слайд: NewSQL](/images/articles/hse-storing-retrieving-data/slide-28.png)

NewSQL — это новое поколение систем управления базами данных, которые сохраняют реляционную модель и язык SQL, но при этом решают те задачи, с которыми классические СУБД не справляются: масштабирование, отказоустойчивость, обработка больших объёмов.

NewSQL совмещают надежность и предсказуемость реляционной архитектуры с гибкостью и производительностью, присущей NoSQL. Эти СУБД ориентированы на нагруженные системы, которым требуются транзакции и аналитика в одном решении.

**Аналогия**  
Кто интересуется автомобилями вероятно слышал, есть ребята, которые делают культовые авто с новой начинкой.

Так и с NewSQL: привычный SQL, но внутри — современные технологии масштабирования и параллельной обработки.

**Когда использовать**  
NewSQL идеален в ситуациях, когда:

* бизнесу нужен SQL-подход, но классические СУБД не выдерживают нагрузки;  
* нужно обрабатывать огромные объёмы данных с высокой доступностью;  
* желательно объединить транзакционную и аналитическую нагрузку в одной системе (HTAP-подход).

**Примеры СУБД**

| Название | Описание |
| :---- | :---- |
| **CockroachDB** | Распределённая SQL-база с высокой отказоустойчивостью. |
| **Google Spanner** | Масштабируемая SQL-база от Google с глобальной синхронизацией. |
| **TiDB** | Китайская NewSQL-база, сочетающая транзакции и аналитику. |
| **YDB** | Российская распределённая СУБД с поддержкой SQL-подобного языка YQL. |
| **VoltDB** | Вариант in-memory NewSQL, рассчитанный на real-time транзакции. |

**Вывод:**  
NewSQL — это ответ на вызов: “как масштабировать SQL без жертв”. Это решение для тех, кто хочет сохранить структурный подход и транзакционную надёжность, но уже перерос возможности классических систем. Также вы могли заметить, что в этом типе СУБД пытаются совместить OLTP и OLAP.

### Подведение итогов

На данный момент универсального решения не придумали, поэтому наиболее выигрышная позиция это комбинация различных типов подобранных под конкретные задачи.   
Мы познакомились с типами СУБД и поняли, что пока приходится работать с зоопарком, но возникают вопросы:

* Как всё это соединить?  
* Как выстроить единую архитектуру хранения и обработки данных, которая масштабируется и служит бизнесу?

Ответы на эти вопросы можно найти в следующей теме!

## Архитектуры хранения

### Вступление

Забавный факт, большинство компаний в России можно цифровизировать банально если данные перетекут с бумаги в Excel или Google таблицы, но это закономерно только для малого бизнеса и вам этом мало чем поможет. Но что если я вам скажу, что был свидетелем одного впечатляющего бизнес процесса в компании у которой в 2024 году прибыль составила 48,5 млрд руб, в общем ребята достаточно крупные. Каждый месяц формируется отчет, автоматизированный просто по божески путем пересылки Excel таблицы между несколькими отделами и финальным анализом результатов.

Но нас же интересует как строить архитектуру хранение, которая приносит реальную пользу, позволяет автоматизировать процессы и использовать данные на максимум?  

Мы только что познакомились с тем, какие бывают типы СУБД и какие задачи они решают. Но выбор подходящей базы данных — это лишь один из элементов общей картины. На практике данные в компании не существуют изолированно. Они распределены по системам, форматам, каналам и этапам жизненного цикла. Возникает главный вопрос:

*Как выстроить такую структуру хранения и обработки данных, которая действительно работает на бизнес?*

Именно на этот вопрос отвечает понятие архитектуры хранения данных.

Архитектура — это не просто выбор инструмента. Это подход к тому, как данные собираются, хранятся, передаются, трансформируются, используются и масштабируются. И как они при этом служат целям бизнеса, а не просто “лежат в системах”.

Давайте разберемся какие есть виды архитектуры!

### Data Warehouse: единая версия правды

![Слайд: Data Warehouse](/images/articles/hse-storing-retrieving-data/slide-29.png)

**Что это такое**  
Data Warehouse (хранилище данных, DWH) — это централизованная система, в которую собираются данные из всех внутренних систем компании: CRM, ERP, складов, финансов, маркетинга и других источников.  
Главная задача — превратить разрозненные данные в структурированную, очищенную и согласованную информацию, пригодную для анализа, отчётов и принятия решений.

В отличие от обычных хранилищ, DWH формирует единую версию правды — цифру, которой могут доверять все отделы.

**Аналогия**  
Представьте, что у вас сеть магазинов. У каждого — свои кассы, отчётность и форматы.  
DWH — это как центральный офис, где:

* отчёты приведены к одному виду;  
* данные проверены и синхронизированы;  
* аналитики и руководители получают информацию из единого источника.

Это снимает необходимость “сводить всё вручную” и исключает расхождения между подразделениями.

**Преимущества**

* Централизация: данные из разных систем стекаются в одну точку.  
* Чистота данных: устраняются дубли, ошибки и несогласованности.  
* Историчность: можно строить аналитику по периодам и отслеживать изменения.  
* Интеграция с BI: легко подключаются инструменты визуализации (Power BI, Tableau и др.).  
* Прозрачность и доверие: все смотрят на одни и те же цифры.

**Ограничения**

* Инерционность: сложнее вносить изменения в структуру данных.  
* Задержка обновления: данные не в реальном времени — обычно загружаются раз в день.  
* Сложность запуска: требует проектирования, согласования бизнес-логики, построения ETL.  
* Ограниченная гибкость: при росте разнообразия данных может потребоваться смена архитектуры.

**Когда использовать**  
Data Warehouse оправдан, если:

* нужно стандартизировать аналитику и управленческую отчётность;  
* компания работает с разными системами и хочет объединить данные;  
* важны согласованные KPI и контроль изменений;  
* приоритет — надёжность и структурированность, а не скорость.

**Вывод**  
DWH — это фундамент для зрелого подхода к аналитике. Он даёт бизнесу согласованные, чистые и прозрачные данные.  
Но он не идеален: его сложно масштабировать под гибкие данные, и он не работает в режиме реального времени. Именно поэтому следующим этапом эволюции стали более гибкие и масштабные подходы — такие как Data Lake.

### Data Lake: гибкость без границ

![Слайд: Data Lake](/images/articles/hse-storing-retrieving-data/slide-30.png)

**Что это такое**  
Data Lake — это архитектура хранения данных, ориентированная на массовое и дешевое накопление информации в сыром виде, без предварительной структуризации и обработки. В отличие от Data Warehouse, где данные заранее очищаются и нормализуются, в Data Lake можно сохранять всё — от таблиц и логов до изображений, PDF, аудио, JSON и видеофайлов.

Такое хранилище чаще всего строится на базе объектного хранения — как правило, в облаке — и позволяет компаниям “не выбрасывать ничего”, собирая огромные объёмы информации на перспективу.

**Аналогия**  
Если DWH — это оформленный архив с каталогами и систематизацией,  
то Data Lake — это огромный склад, куда можно складировать любые данные “про запас”: как структурированные, так и нет. Сначала собираем — потом разберёмся, как использовать.

Подход: “Сначала собери всё. Потом реши, что с этим делать.”

**Преимущества**

* Гибкость: можно хранить любые типы данных — таблицы, документы, изображения, события.  
* Масштабируемость: хранилище легко увеличивается под растущие объёмы.  
* Низкая стоимость хранения: особенно при использовании облачных решений.  
* Хранение без потерь: не требуется предварительной фильтрации — данные сохраняются “как есть”.  
* Поддержка современных задач: пригоден для аналитики, отчётности, обучения моделей, телеметрии, логирования.

**Ограничения**

* Нет “единой версии правды”: данные не стандартизированы, могут быть дубли и ошибки.  
* Сложность доступа: без дополнительной обработки данные часто не пригодны для прямой аналитики.  
* Риск “болота” (data swamp): при отсутствии системы каталогизации и контроля lake превращается в свалку, где никто не может найти нужное.  
* Потребность в инженерной поддержке: необходимо строить процессы обработки, чтобы извлекать пользу.

**Когда использовать**  
Data Lake — отличный выбор, когда:

* объём данных быстро растёт и заранее неизвестно, как он будет использоваться;  
* в систему поступают разнотипные и неструктурированные данные;  
* бизнес хочет сохранить все “цифровые следы” — от логов до изображений и писем;  
* необходимо собирать данные для последующего анализа, обучения, мониторинга;  
* нужно гибкое хранилище, не ограниченное схемой SQL.

**Вывод**

Data Lake — это шаг к большему масштабу и универсальности, чем Data Warehouse. Он позволяет организациям собирать больше данных, в разных форматах и без предварительной обработки. Это открывает большие возможности для будущей аналитики, но также требует дисциплины, чтобы lake не превратился в “болото”.

### Lakehouse: мост между хаосом и порядком

![Слайд: Data Lakehouse](/images/articles/hse-storing-retrieving-data/slide-31.png)

**Что это такое**  
Lakehouse — это архитектура, которая объединяет сильные стороны Data Lake и Data Warehouse.  
Цель — получить гибкость и масштабируемость хранилища данных, не жертвуя структурой, согласованностью и аналитическими возможностями.

В основе Lakehouse лежит идея: хранить данные как в Data Lake (в сыром виде и в разных форматах), но с возможностью структурировать, индексировать и обрабатывать их, как в DWH — напрямую, без копирования.

Это позволяет аналитикам, BI-инструментам и дата-инженерам работать с одним и тем же источником данных — но каждый по-своему.

**Аналогия**  
Представьте склад, в который можно складывать любые грузы — коробки, пакеты, паллеты.  
Но при этом в нем:

* есть строгая система учёта;  
* зоны для приёмки, сортировки и выдачи;  
* автоматизированные процессы.

Это уже не просто “свалка” (как Data Lake), но и не “оформленный архив” (как DWH). Это универсальное хранилище, готовое к разным задачам.

**Преимущества**

* Единое хранилище для всех данных — и сырых, и обработанных.  
* Поддержка разных форматов: таблицы, JSON, паркет-файлы, логи, изображения.  
* Гибкость Data Lake + структура DWH.  
* Ускоренная аналитика — без необходимости копирования данных.  
* Поддержка BI, аналитики, машинного обучения — из одного источника.  
* Снижение стоимости инфраструктуры — меньше дублирования и копий данных.

**Ограничения**

* Молодая архитектура: всё ещё развивается, не все решения зрелые.  
* Сложность внедрения: требует пересмотра существующей архитектуры и согласования подходов.  
* Повышенные требования к квалификации команды, особенно в части инфраструктуры и оркестрации.

**Когда использовать**  
Lakehouse актуален, если:

* организация уже работает с Data Lake, но хочет повысить управляемость и аналитическую ценность данных;  
* бизнес стремится сократить время от появления данных до получения отчётов;  
* в компании активное использование разных типов аналитики и дата-продуктов;  
* нужно избавиться от дублирования данных между хранилищами и аналитикой;  
* есть цель — построить унифицированную платформу для всех задач, связанных с данными.

**Вывод**  
Lakehouse — это компромисс между контролем и гибкостью. Он позволяет хранить любые данные и одновременно получать от них “порядок” и ценность.  
Если Data Lake — это “всё сохранить”, а DWH — “всё упорядочить”, то Lakehouse — это “и то, и другое в одном месте”.

### Data Mesh: данные как продукт, ответственность — как у бизнеса

![Слайд: Data Mesh](/images/articles/hse-storing-retrieving-data/slide-32.png)

**Что это такое**  
Data Mesh — это не технология, а архитектурный и организационный подход к работе с данными. В отличие от централизованных моделей, где вся ответственность сосредоточена у ИТ или аналитиков, Data Mesh предлагает:

    “Каждый бизнес-домен управляет своими данными самостоятельно и предоставляет их как продукт другим.”

Суть: данные распределяются по подразделениям, как и ответственность за их качество, актуальность и доступность. При этом действуют общие стандарты — формат, доступ, мониторинг, безопасность.

**Аналогия**  
Если раньше данные были “на складе” и все стояли в очереди к ИТ,  
то теперь это магазин с разными отделами, где каждый отдел — это подразделение,  
и каждый продаёт свои “данные-продукты”: чистые, оформленные, готовые к использованию.

Маркетинг отвечает за аналитику по кампаниям.  
Финансы — за отчётность по затратам.  
Склад — за остатки и логистику.  
А не централизованная “служба данных”, которая за всё отвечает одна.

**Преимущества**

* Распределённая ответственность: бизнес-домены сами управляют своими данными.  
* Масштабируемость: новые источники и команды легко подключаются к общей структуре.  
* Гибкость и скорость: меньше узких мест, меньше очередей в ИТ.  
* Повышение качества: потому что владельцы данных — те, кто их создаёт и использует.  
* Продуктовый подход: каждый датасет оформляется и публикуется как готовый продукт с документацией и SLA.

**Ограничения**

* Высокие требования к зрелости компании: Data Mesh требует культуры, процессов и доверия.  
* Сложность внедрения: нужны стандарты, платформы, контроль и обучение.  
* Переосмысление ролей: бизнес становится не только потребителем, но и производителем данных.

**Когда использовать**  
Data Mesh актуален, если:

* организация большая и состоит из многих независимых бизнес-направлений;  
* централизованная команда данных не справляется с потоком задач;  
* часто возникают конфликты из-за приоритетов и очередей в ИТ;  
* данные стали стратегическим активом, и бизнес готов взять за них ответственность;  
* компания стремится к гибкой, масштабируемой, “продуктовой” работе с данными.

**Вывод**  
Data Mesh — это подход для компаний, которые выросли из централизованных хранилищ.  
Он требует зрелости, стандартов и смены мышления:

    данные — это не побочный продукт операций, а полноценный цифровой продукт, который должен разрабатываться, сопровождаться и использоваться с полной ответственностью.

### Data Fabric: единая “ткань” доступа к данным

![Слайд: Data Fabric](/images/articles/hse-storing-retrieving-data/slide-33.png)

**Что это такое**  
Data Fabric — это архитектурный подход, основанный на идее создания единой логической платформы для доступа к данным, где бы они ни хранились.  
Цель — связать разрозненные хранилища, базы данных, API и источники информации в единую “ткань” (fabric), чтобы пользователи могли получать нужные данные, не задумываясь о том, где они физически находятся и в каком виде хранятся.

Data Fabric не требует миграции или централизации данных — он “оборачивает” существующие хранилища и системы, создавая единый слой управления, доступа и анализа.

**Аналогия**  
Представьте крупную компанию с десятками офисов по стране. В каждом — свой архив, база клиентов, таблицы.  
Data Fabric — это как единая корпоративная поисковая система, которая позволяет сотруднику в любом городе найти нужные документы — быстро, по ключевым словам, без поездок и звонков.

Она не переносит всё в одно место — она делает распределённые данные доступными как будто они в одном пространстве.

**Преимущества**

* Единый доступ ко всем данным — независимо от формата и расположения.  
* Нет нужды в миграции: данные остаются там, где есть, но становятся доступными через общую платформу.  
* Повышение скорости анализа — меньше времени на сбор и согласование информации.  
* Интеграция в реальном времени — можно собирать отчёты и дашборды “на лету”.  
* Автоматизация управления — через метаданные, каталогизацию и политику доступа.

**Ограничения**

* Высокая технологическая сложность: требует зрелой инфраструктуры, каталогов, API и стандартов.  
* Стоимость: внедрение требует продвинутых платформ и инструментов.  
* Не снимает необходимости в чистке и стандартизации данных — он лишь “оборачивает” их, не исправляя содержимое.

**Когда использовать**  
Data Fabric подходит, если:

* данные уже хранятся в разных системах, и нет возможности или смысла их централизовать;  
* бизнесу важно обеспечить быстрый и безопасный доступ к информации в разных подразделениях;  
* аналитика и отчётность требуют сбора информации из десятков источников;  
* планируется масштабирование, но без единого центра хранения;  
* организация стремится к “умной” интеграции данных, без тотальной миграции.

**Вывод**  
Data Fabric — это архитектура про доступ, а не про хранение. Она не заменяет DWH, Lakehouse или Mesh, а дополняет их, обеспечивая связность, автоматизацию и доступность данных через единый логический слой.  
Это подход для компаний, у которых данные уже распределены, но которые хотят использовать их как единую, согласованную экосистему.

### Сравнение архитектур хранения данных

![Слайд: Сравнение архитектур](/images/articles/hse-storing-retrieving-data/slide-34.png)

| Архитектура | Ключевая идея | Преимущества | Ограничения | Когда подходит |
| ----- | ----- | ----- | ----- | ----- |
| **Data Warehouse (DWH)** | Централизованное хранилище | Стандартизированные отчёты, единая версия правды | Задержка обновления, инерционность | Регулярная управленческая отчётность |
| **Data Lake** | Массовое хранение в сыром виде | Гибкость, масштаб, любые форматы | Без контроля превращается в “болото” | Сбор всех цифровых следов, неструктурированные данные |
| **Lakehouse** | Гибрид Lake + DWH | Унифицированное хранилище, аналитика “на месте” | Молодая архитектура, требует зрелости | Аналитика и отчётность из единого слоя |
| **Data Mesh** | Ответственность за данные у бизнес-команд | Масштабируемость, распределённая экспертиза | Требует организационной зрелости, стандартов | Большие компании, распределённая структура |
| **Data Fabric** | Единый логический доступ к распределённым данным | Доступ без миграции, быстрая интеграция | Сложность, высокая цена, не решает проблемы качества | Быстрая связка старых и новых систем |

### Вывод

Эволюция архитектур показывает, как менялись подходы — от ручного хранения к системному управлению данными.

* DWH — порядок и структура.  
* Data Lake — гибкость и масштаб.  
* Lakehouse — попытка совместить всё.  
* Data Mesh — распределённая ответственность.  
* Data Fabric — технологический “клей” для связывания разрозненных систем.

Нельзя сказать, что одна архитектура лучше другой — важно подбирать подход под задачи, зрелость и масштаб организации.

Теперь перейдем к бонусным темам!

## Импортозамещение СУБД: российские решения

![Слайд: Импортозамещение СУБД](/images/articles/hse-storing-retrieving-data/slide-35.png)

### Вступление

За последние годы стало очевидно: использовать зарубежное ПО — значит закладываться на неопределённость. Ограничения доступа, приостановка поддержки и прочие палки в колесах— всё это стало реальностью. Безусловно - это не относится ко всему ПО, однако не обратить на это внимания будет большой ошибкой.

Государственные заказы или сертификация ПО имеет определенный набор требований к выбору СУБД и прочего инструментария.

Как вы могли догадаться сейчас речь пойдет про возможность импортозамещения СУБД. Посмотрим варианты для каждого типа СУБД.

### SQL (Реляционные СУБД)

![Слайд: SQL: российские СУБД](/images/articles/hse-storing-retrieving-data/slide-36.png)

| Название | Происхождение | Разработчик | Сертификация |
| :---: | :---: | :---: | :---: |
| **Postgres Pro** | Форк PostgreSQL | Postgres Professional | ФСТЭК, ФСБ |
| **Jatoba** | Форк PostgreSQL | Газинформсервис‎ | ФСТЭК |
| **Tantor** | Форк PostgreSQL | ТАНТОР Лабс | ФСТЭК |
| **Proxima DB** | Форк PostgreSQL | OrionSoft | ФСТЭК |
| **Ред База Данных** | Форк Firebird | РЕД СОФТ | ФСТЭК |
| **Linter** | Собственная разработка | НИП ИВК | ФСТЭК, ФСБ |
| **Pangolin DB** | Собственная разработка | СберТех | — |
| **«‎‎Квант- Гибрид»** | Форк PostgreSQL | КВАНТОМ | ФСТЭК |
| **Arenadata Postgres** | Форк PostgreSQL | Arenadata | — |
| **SoQoL** | Собственная разработка | РЕЛЭКС | ФСТЭК |

### NoSQL

![Слайд: NoSQL и NewSQL](/images/articles/hse-storing-retrieving-data/slide-38.png)

### Колоночные СУБД

| Название | Происхождение | Разработчик | Сертификация |
| :---: | :---: | :---: | :---: |
| **ClickHouse** | Собственная разработка | ClickHouse Inc. / Yandex | — |

### Векторные СУБД

![Слайд: Векторные СУБД](/images/articles/hse-storing-retrieving-data/slide-26.png)

| Название | Происхождение | Разработчик | Сертификация |
| :---: | :---: | :---: | :---: |
| **Qdrant** | Собственная разработка | Qdrant Team (Россия) | — |

### In-Memory СУБД

![Слайд: In-Memory СУБД](/images/articles/hse-storing-retrieving-data/slide-27.png)

| Название | Происхождение | Разработчик | Сертификация |
| :---: | :---: | :---: | :---: |
| **Tarantool** | Собственная разработка | VK (ex-Mail.ru Group) | — |

### NewSQL

![Слайд: NewSQL](/images/articles/hse-storing-retrieving-data/slide-28.png)

| Название | Происхождение | Разработчик | Сертификация |
| :---: | :---: | :---: | :---: |
| **YDB** | Собственная разработка | Yandex | В процессе |

### Вывод

Безусловно, информации из представленных таблиц недостаточно, чтобы сразу принять окончательное решение о переходе на ту или иную СУБД. Однако теперь у вас есть ключевое понимание: в России существуют отечественные аналоги, и их достаточно по количеству и разнообразию, чтобы действительно было из чего выбирать — под разные задачи и масштабы.

Важно помнить, что многие из этих решений создавались под конкретные потребности компаний или секторов — от банков и госсектора до телекомов и ритейла. Поэтому универсальной “волшебной кнопки” здесь нет — нужен взвешенный подход и анализ ваших требований.

Эта глава — не призыв к срочному импортозамещению любой ценой. Это, прежде всего, возможность осознанно подготовиться к потенциальным рискам и начать мыслить стратегически. Как говорится:

    «Знание — это лучшее оружие».

А значит, владение информацией — уже половина пути к уверенным технологическим решениям.

## Векторные базы данных и ИИ

![Слайд: Векторные БД и ИИ](/images/articles/hse-storing-retrieving-data/slide-39.png)

### Вступление

Когда мы говорили о типах СУБД, среди прочих упомянули векторные базы данных — и тогда я отметил: “об этом мы ещё поговорим отдельно”. Сейчас — самое время это сделать.

Почему? Потому что за последние два года векторные хранилища из экспериментальной технологии превратились в основу новых цифровых решений, включая интеллектуальный поиск, персональные рекомендации, голосовых помощников и многое другое. Они становятся инфраструктурной опорой для ИИ-продуктов, включая те, что уже используются в бизнесе: от сервисов поддержки клиентов до автоматической генерации контента и поиска по смыслу в корпоративных архивах.

В этом разделе мы разберёмся:

* зачем данные преобразуют в векторы;  
* в чём отличие поиска “по смыслу” от классических подходов;  
* почему обычные SQL и NoSQL базы с такими задачами не справляются;  
* и главное — где это уже применяется в бизнесе.

### Что такое векторизация данных и зачем она нужна

Как мы помним векторная СУБД хранит в себе представления сложных объектов таких как: текст, изображение, аудио, – в виде набора чисел, то есть вектор. 

Процесс создания вектора, то есть векторизация — это способ “понять, о чём речь”, даже если фразы звучат по-разному. Это основа для поиска по смыслу, рекомендаций, интеллектуальной фильтрации и ИИ-поддержки.

Современные компании работают с массивами неструктурированной информации: письма, документы, переписки, изображения. Такие данные сложно обрабатывать с помощью обычных баз данных, потому что:

* нет чёткой структуры;  
* невозможно задать фильтр типа “найди всё, что похоже на это по смыслу”;  
* бизнесу нужен поиск по сути, а не по точным словам.

**Как это работает?**

Обычные базы данных — SQL и NoSQL — работают с чёткими структурами: фильтрами, полями, индексами.

Они не могут понять, что “заявка на возврат” и “претензия клиента” — это об одном.

Пространсво векторов, которым и является база данных этого типа можно представить, как карту:

* Оси координат — это измерения смысла: «тематика», «контекст», «интонация», «сфера», «роль».  
* Каждый объект (документ, запрос, отзыв, изображение) — точка на этой карте.  
* Объекты, близкие по значению, собираются “кластером” — например:  
  * все обращения по жалобам;  
  * все товары для детей;  
  * все инструкции по технике безопасности.

Когда приходит новый запрос — система просто находит точки, ближайшие к нему.

Не вдаваясь в технические подробности это работает как-то так.

**Причем тут ИИ?**  
ИИ и векторные базы не просто «пересекаются» — они неразрывно связаны технологически. Причина в том, как устроен ИИ и как он “думает”.

Возможно вы слышали про принцип работы именуемый  RAG? Работает он примерно следующим образом:

1) Подготовка (разовая):

Вся корпоративная информация (документы, статьи, инструкции, чаты и т.д.)

→ разбивается на куски

→ каждый фрагмент векторизуется и сохраняется в векторной базе.

2) Запрос пользователя:

Вы задаёте вопрос, например: «Как оформить командировку в мае?»

GPT векторизует этот запрос.

3) Поиск по смыслу:

Этот вектор отправляется в векторную БД, которая находит несколько самых близких фрагментов по смыслу (например, из внутренних инструкций HR).

4) Формирование ответа:

Найденные фрагменты возвращаются в GPT как «контекст».

GPT читает их и на основе этой информации генерирует точный ответ — как будто «знает» ваши внутренние правила.

### Выводы

Поэтому векторные базы стали ключевым компонентом современных ИИ-систем. Модели вроде GPT не «хранят» всю информацию внутри себя, а обращаются к внешним данным — и делают это через векторную базу, находя подходящие фрагменты по смыслу. Без этой связки ИИ не сможет учитывать специфику вашего бизнеса, отвечать точно или работать с внутренними источниками.

## Заключение и выводы

Мы начали эту лекцию с простой мысли: данные — это актив, а не инфраструктура. И к финалу нашего разговора, надеюсь, эта идея уже не вызывает сомнений. Мы прошли путь от истории появления баз данных до самых современных архитектур и практик, увидели, как технологии эволюционировали в ответ на растущие вызовы — от управления транзакциями до поддержки искусственного интеллекта.

**Что теперь точно понятно?**

1. Универсальной базы данных не существует — каждая технология решает свою задачу. SQL не справится с гибкими данными, а NoSQL не обеспечит строгой отчётности. Поэтому современная архитектура всегда — это комбинация решений.  
2. Хранение — это только начало. Данные нужно не только собирать, но и понимать, очищать, трансформировать и готовить к использованию. Без этого они — просто цифровой мусор.  
3. Архитектура важнее, чем кажется. То, как устроены потоки данных, напрямую влияет на скорость принятия решений, качество отчётности и способность бизнеса адаптироваться.  
4. Импортозамещение — не катастрофа, а вызов. Мы увидели, что российские разработки покрывают ключевые сегменты рынка. И хотя они не всегда равнозначны западным аналогам, стратегическая независимость требует хотя бы понимания этих опций.  
5. ИИ без данных — ничто. Модели работают не в вакууме, а на базе вашей информации. И именно от того, как выстроены ваши хранилища и процессы, зависит точность, безопасность и польза от ИИ-решений.

И главное — ответственность за данные лежит не только на ИТ.  
Это задача бизнеса, управления, аналитики. Кто работает с данными — тот и формирует будущее компании. Уже сейчас.

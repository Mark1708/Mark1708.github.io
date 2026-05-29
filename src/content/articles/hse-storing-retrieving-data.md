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
  Last year I gave an online lecture at HSE University on **“Storing and Retrieving Data”**. It was my first experience of this kind, and the audience was unusual for me: not fellow developers, architects or data engineers, but leaders from different functions in large companies.

  These are people who make decisions every day. They are responsible for processes, budgets, teams, metrics, risks and business growth, but they are not expected to know how to write SQL queries, configure database sharding or design distributed storage.

  That is why the goal was not to turn managers into engineers in three hours. That would be impossible, and it is not needed.

  The goal was different: to explain **how the world of data works at a level that is enough for a meaningful management conversation**.

  Not at the level of “oh, this is all IT, let them deal with it”.
  And not at the level of “let's urgently implement AI because everyone else is doing it”.
  Somewhere in the middle: so a leader understands what data the company has, where it comes from, where it flows, why reports disagree, why storage layers are needed, why one database does not solve every problem, and why artificial intelligence without proper data becomes an expensive toy.

  This article is an expanded companion to that lecture.

  > **Who this article is for**: managers, analysts and product leaders who want to speak the same language as engineers and architects. You do not need to know SQL. It is enough to understand what data exists, where it comes from and why it matters for the business.

  ### In short

  - **Data is an asset**, not a by-product. Without owners, standards and quality, it turns into noise.
  - **There is no universal database.** SQL, NoSQL, column-oriented, graph and vector databases each solve a different class of problems.
  - **OLTP and OLAP should be separated.** A cash register and an analytics department are different things, and their databases often should be different too.
  - **Architecture matters more than the tool.** The path from source to decision is what defines value.
  - **AI starts with data.** Without clean data, catalogs and access control, an LLM only accelerates chaos.
  - **Import substitution is a strategic project**, not a one-time purchase. It requires workload, compatibility and risk analysis.

  ---

  ## Data is an asset, not infrastructure
  ![Slide: Data as an asset](/images/articles/hse-storing-retrieving-data/slide-05.png)

  Let's start with a phrase almost everyone has heard:

  > Data is the new oil.
  > In Russian: data is the new oil.

  The phrase is usually attributed to Clive Humby. It has been repeated so often that it has become a little tired. But the problem is not the phrase itself. The problem is that many companies say it out loud while still treating data as something secondary.

  As a by-product of systems doing their work.

  - Somewhere in the CRM, there are customers.
  - Somewhere in the ERP, there are purchases and inventory.
  - Somewhere in the accounting system, there is finance.
  - Somewhere in Excel, there is “the most correct version of the report”.
  - Somewhere in email, there are agreements.
  - Somewhere in the head of a department leader, there is the real KPI calculation logic.

  Formally, the data exists. In practice, no one manages it.

  This is where we need to fix one simple idea:

  > **Data has no value by itself if no one can work with it.**

  Oil is not especially useful if it simply stays underground. It has to be found, extracted, cleaned, transported, refined and turned into something useful. Data is similar.

  If you only store it, it does not create business value.

  - If it is messy, it causes harm.
  - If it contradicts itself, people stop trusting it.
  - If no one knows who is responsible for it, it quickly becomes digital waste.

  So instead of saying “we have data”, it is better to ask less comfortable questions:

  - Who is responsible for this data?
  - Who understands what it means?
  - Who monitors its quality?
  - Who defines which data matters?
  - Who can explain why two reports show different numbers?
  - Who decides what data we need to start collecting now so that it is not too late in a year?

  If the answer is “no one”, then the data belongs to no one.

  The chain after that is short:

  1. If there is no owner, there is no responsibility.
  2. If there is no responsibility, there is no quality.
  3. If there is no quality, there is no trust.
  4. If there is no trust, data stops being an asset.

  It becomes noise.

  > **Questions for a manager**
  >
  > - Which data in your area of responsibility is considered critical?
  > - Does every such dataset have an owner?
  > - Who can explain report discrepancies without a manual investigation?

  ---

  ## Why managers need to understand this

  A manager who does not understand the basics of working with data is like a driver who does not know where to get fuel, where to put it and why it is needed at all.

  Yet people still expect the car to move.

  It is important not to confuse roles. A leader does not need to become a data engineer. They do not need to write pipelines by hand, choose PostgreSQL indexes or argue about the pros and cons of Kafka.

  But they do need to understand the basic mechanics:

  - how data appears;
  - where it is stored;
  - why it degrades;
  - why reports disagree;
  - how an operational database differs from an analytical one;
  - why “put everything into one database” is not a strategy;
  - what questions to ask IT, analysts and process owners.

  > This is not a technical luxury. It is a management necessity.

  Today almost every serious business decision depends on data in one way or another:

  - launching a new product;
  - optimizing inventory;
  - measuring team performance;
  - managing customer experience;
  - automating a process;
  - introducing AI;
  - moving to domestic software;
  - reducing operating costs;
  - finding growth points.

  If the data is bad, the decisions will be bad too. They will just look convincing because they can be shown nicely on a dashboard.

  > A beautiful chart does not make data correct.

  ---

  ## What old-style data work looks like

  In companies without a systematic approach to data, the same problems usually repeat. Industries, scale and system names change, but the symptoms look very similar.

  The first symptom is **inconsistent reporting**.

  Finance shows one number. Sales shows another. Operations shows a third. Then come manual reconciliations, calls, Excel files, formula checks and the search for the “right version”.

  The second symptom is **duplicated reference data**.

  The same customer may be named differently in different systems. In one place it is “Romashka LLC”, in another “LLC Romashka”, somewhere the record is tied to a tax ID, somewhere to an internal ID, and somewhere to a manager's surname.

  Until there is a shared identification logic, the company does not see the real picture. It sees a set of fragments.

  The third symptom is **decisions based on guesses**.

  When there is no trust in data, leaders return to intuition. Intuition matters, but it should not replace facts. Especially in a large company, where mistakes become expensive at scale.

  The fourth symptom is **high cost of introducing modern solutions**.

  A company wants BI, predictive analytics, personalization, an AI assistant or automatic processing of customer requests. Then it quickly turns out that data is scattered, poorly described, not cleaned, not connected and sometimes unclear from a legal point of view.

  As a result, the modern solution can be introduced only after long and painful preparation. Sometimes it turns out that the company should not start with AI at all, but with cleaning up reference data.

  The fifth symptom is **slow information search**.

  People spend hours and days not on analysis, but on preparing data. Find a file. Check whether it is current. Ask a colleague. Verify a formula. Rebuild a table. Clarify why yesterday there was one value and today there is another.

  This is the hidden cost of chaos.

  ---

  ## Myths that stop companies from working with data
  ![Slide: Myths and barriers](/images/articles/hse-storing-retrieving-data/slide-07.png)

  There are several persistent myths that make companies postpone proper data work for years.

  ### Myth 1. “It is complex, expensive and slow”

  Sometimes it is complex. Sometimes it is expensive. Sometimes it is slow.

  But the mistake is that many people imagine data work as a huge project where they must immediately introduce a DWH, Data Lake, Data Mesh, machine learning, a data catalog, governance, MDM and a corporate AI assistant on top.

  In practice, the start can be much simpler.

  For example:

  - describe the key data sources;
  - understand which reports are assembled manually;
  - identify critical reference data;
  - assign data owners;
  - automate 2 or 3 reports that consume time every day;
  - agree on shared definitions for key metrics.

  This is already data work. And it already has an effect.

  ### Myth 2. “This is an IT task”

  This is one of the most dangerous myths.

  - IT can build infrastructure.
  - IT can set up integrations.
  - IT can provide storage, availability, security and performance.

  - But IT does not always know what the “active customer” metric actually means.
  - IT should not decide alone which data matters for the commercial function.
  - IT cannot define the correct KPI calculation logic without the business.
  - IT should not have to guess what data a leader will need in six months.

  If data is an asset, the business cannot fully delegate responsibility for it to a technical function.

  The right model looks different:

  - the business defines meaning and value;
  - analysts help interpret and model;
  - IT provides the technical implementation;
  - managers create a culture of data use.

  > **Questions for a manager**
  >
  > - Which metrics in your function are considered key?
  > - Who approves their definitions?
  > - What has to be checked manually before an important decision today?

  ### Myth 3. “We already have everything”

  Usually this means: “We have BI”, “We have CRM”, “We have a database”, “We have reports”.

  But having a tool does not mean the company is mature in working with data.

  BI may be installed, while departments still calculate metrics differently.
  CRM may be used, while managers still keep “their own spreadsheets”.
  A DWH may exist, while no one trusts the data.
  Reports may be automated, while their business logic is outdated.

  “We already have everything” is a dangerous phrase. After it, companies often discover that they have tools, but not management.

  ### Myth 4. “The main thing is to collect everything”

  No.

  Collecting everything is not a strategy. It is warehousing.

  If you simply put all data into one place, without describing it, assigning owners, setting quality rules or defining use cases, you do not get a Data Lake. You get a data swamp.

  Everything seems to be there, but nothing can be found.
  And if you do find something, you do not know whether it can be trusted.

  ### Myth 5. “We are not an IT company, so we do not need this”

  Data is not needed only by banks, marketplaces and BigTech.

  Manufacturing uses data for load planning and equipment maintenance.
  Logistics uses it for routes, deadlines and warehouse inventory.
  HR uses it to analyze turnover and hiring efficiency.
  Legal functions use it for contracts, risks and claims.
  Customer service uses it to analyze requests and service quality.

  If a company makes decisions, serves customers, manages resources and is responsible for results, it needs data.

  ### Myth 6. “Everything works fine already”

  It works while the market is stable.
  While competitors have not become faster.
  While the regulator has not changed the requirements.
  While the key employee with the Excel file has not gone on vacation.
  While AI has not become necessary.
  While no crisis has happened.

  Weak data work is often invisible in calm periods. It appears at the moment of change.

  ---

  ## How the role of a manager is changing
  ![Slide: How the manager's role is changing](/images/articles/hse-storing-retrieving-data/slide-08.png)

  A modern manager should not be only a consumer of reports.

  They should be a participant in data work.

  This does not mean they must build data marts or design architecture by hand. But they should:

  - understand what data exists in their area of responsibility;
  - know where it comes from;
  - understand how it is used;
  - demand data as the basis for decisions;
  - create a culture of responsibility for quality;
  - speak the same language as IT and analysts.

  A good management question today does not sound like this:

  > Why don't we have a beautiful dashboard?

  It sounds like this:

  > Which decisions do we want to make faster and more accurately, what data do we need for that, where is it created, who is responsible for it and can we trust it?

  That is the beginning of a mature approach.

  ---

  ## A little history: why databases became so different
  ![Slide: Evolution of data storage 1970-1999](/images/articles/hse-storing-retrieving-data/slide-09.png)

  To understand modern data architecture, it helps to look at how we got here.

  | Period | What happened | Key technologies |
  |---|---|---|
  | 1970s | Edgar Codd proposed the relational model: tables, rows, columns and relationships | Relational theory, SQL |
  | 1980s | Relational DBMS became the commercial standard | Oracle, IBM DB2, SQL standardization |
  | 1990s | The internet increased scale. OLAP and data warehouses appeared | MySQL, PostgreSQL, DWH, OLAP |
  | 2000s | Web-scale companies reached the limits of classic DBMS | MapReduce, BigTable, Dynamo |
  | 2007-2012 | The NoSQL revolution responded to new data types and horizontal scaling | MongoDB, Cassandra, Redis, CouchDB |
  | 2013-2018 | Clouds and managed services made storage and processing easier | Cloud-native DWH, Spark, Kafka, Airflow |
  | 2019-2024 | Lakehouse combined Lake flexibility with Warehouse structure. AI created demand for vector DBMS | Lakehouse, vector DBMS, RAG |

  The main conclusion from this history is simple:

  **each new wave of technology appeared not because older technologies became bad, but because tasks changed.**

  There is no single database “for everything”. There are different classes of tasks, and they need different solutions.

  ---

  ## Data types: not all data is the same
  ![Slide: Data types](/images/articles/hse-storing-retrieving-data/slide-12.png)

  Before we talk about databases and architectures, we need to understand the data itself.

  It is common to distinguish three large types:

  - structured;
  - semi-structured;
  - unstructured.

  ### Structured data
  ![Slide: Structured data](/images/articles/hse-storing-retrieving-data/slide-13.png)

  Structured data is the most familiar format.

  Imagine an Excel table:

  - each row is a separate record;
  - each column is a clear field;
  - each field has a type: date, number, text, status, amount.

  Examples:

  - an orders table;
  - a customer directory;
  - accounting entries;
  - warehouse balances;
  - payments;
  - shift schedules.

  This data fits well into relational databases. It is convenient to validate, analyze, aggregate and use in reporting.

  The main advantage of structured data is predictability.

  If a field is called `order_date`, it is clear that it should contain the order date. If a field is called `amount`, it is expected to contain an amount. If a field is called `status`, it should contain a status from a limited set of values.

  For management reporting, this is the foundation.

  ### Semi-structured data
  ![Slide: Semi-structured data](/images/articles/hse-storing-retrieving-data/slide-14.png)

  Semi-structured data is no longer a strict table, but it is not complete chaos either.

  Usually this means JSON, XML, YAML, events, API responses and logs.

  Such data has internal structure, but it can be flexible. One object contains one set of fields, another object contains another. Nesting can change. Data can come from an external service, a mobile app, a web system or an IoT device.

  Analogy: if structured data is a strict questionnaire where every field is required, semi-structured data is a questionnaire with “depends on the case” sections.

  One customer has a phone and email.
  Another has a phone, email, Telegram and order history.
  A third has only an identifier from an external system.

  Semi-structured data is very important for modern integrations. Most APIs and event-driven systems work this way.

  ### Unstructured data
  ![Slide: Unstructured data](/images/articles/hse-storing-retrieving-data/slide-15.png)

  Unstructured data means texts, emails, contracts, scans, images, audio, video, presentations, customer requests and messages.

  In other words, everything that does not fit into a simple table.

  In the past, such data was often just stored as files. It was important for people, but poorly available for machine processing.

  Today the situation has changed. With machine learning, LLMs, OCR, speech-to-text and vector search, unstructured data has become a major source of value.

  For example:

  - customer requests can be analyzed;
  - similar contracts can be found;
  - common complaint reasons can be detected;
  - internal document search can be built;
  - corporate assistants can be created;
  - meaning can be extracted from messages and texts.

  But there is an important nuance: unstructured data requires special processing methods. A normal table will not help here.

  ---

  ## Data sources: where everything comes from
  ![Slide: Data sources](/images/articles/hse-storing-retrieving-data/slide-16.png)

  Data does not appear out of thin air. It is born in processes.

  There are internal sources:

  - CRM;
  - ERP;
  - accounting systems;
  - point-of-sale systems;
  - warehouse accounting;
  - HR systems;
  - document management systems;
  - task management systems;
  - email;
  - messengers;
  - company products;
  - internal services;
  - industrial equipment;
  - sensors and devices.

  There are external sources:

  - government registers;
  - open data;
  - partner systems;
  - suppliers;
  - logistics operators;
  - payment services;
  - social networks;
  - external APIs;
  - public datasets.

  There is another important classification: online and offline.

  **Online sources** provide data almost in real time: clicks, application events, transactions, telemetry.

  **Offline sources** send data periodically: an accounting export once a night, a supplier report once a week, an Excel file from a partner once a month.

  For the business, this is not a technical detail. The type of source determines how quickly decisions can be made.

  If you manage warehouse balances, a one-day delay may be acceptable.
  If you manage payment antifraud, a one-day delay turns the system into a museum.

  > **Questions for a manager**
  >
  > - Which decisions in your function require same-day data?
  > - Where is weekly or monthly frequency enough?
  > - Which sources are currently treated as external, but actually affect daily decisions?

  ---

  ## Why “put everything in one place” is harder than it sounds

  At the idea level, everything looks simple:

  - we have data in different systems;
  - let's collect it in one storage layer;
  - build reports;
  - start making decisions.

  In reality, the fun begins.

  ### Different formats

  One system returns tables.
  Another returns JSON.
  A third returns XML.
  A fourth returns PDF.
  A fifth returns an archive of files.
  A sixth returns an event stream.

  Before data can be combined, it has to be parsed, brought into a clear form and described.

  ### Different identifiers

  The same customer may have different IDs in CRM, ERP and accounting. The same product may be named differently by warehouse, procurement and marketing.

  Until there is a shared master data logic, the company cannot confidently say that it sees the same object.

  ### Different accounting rules

  In one system, the amount includes VAT.
  In another, it excludes VAT.
  Somewhere the date means the order creation date.
  Somewhere it means the payment date.
  Somewhere it means the shipment date.

  Formally, the fields look similar. Semantically, they are different.

  This is exactly where reports that argue with each other are born.

  ### Different update frequency

  CRM updates constantly.
  The accounting system exports at night.
  A partner sends a file once a week.
  An external API is sometimes unavailable.

  If this is ignored, analytics will show strange results. Not because the system is broken, but because data lives in different rhythms.

  ### Access rights and security

  Not all data can simply be taken and moved. There is personal data, trade secrets, regulatory requirements and internal security policies.

  Working with data is not only about technology. It is also about responsibility.

  ---

  ## ETL, ELT and CDC: how data moves between systems
  ![Slide: ETL, ELT and CDC](/images/articles/hse-storing-retrieving-data/slide-17.png)

  For data from different sources to reach storage, integration is needed.

  There are three approaches a manager should know: ETL, ELT and CDC.

  ### ETL: Extract, Transform, Load

  ETL means:

  - Extract, take data from the source;
  - Transform, convert it;
  - Load, put it into storage.

  First the data is taken from the source, then cleaned, normalized and brought to the required structure, and only after that loaded into storage.

  Analogy: an accountant first collects primary documents, checks them, fixes errors, brings them to one format and only then prepares the final report.

  The advantage of ETL is quality control before loading.
  The drawback is that the process can be slow and less flexible.

  ETL is well suited to classic reporting and situations where strict data preparation matters.

  ### ELT: Extract, Load, Transform

  ELT changes the order:

  1. First we extract.
  2. Then we load as is.
  3. And transform later inside storage.

  Analogy: we put all documents into a large archive, and then sort, clean, group and analyze them inside that archive.

  ELT became especially popular with powerful cloud storage and analytical platforms. They let teams load a lot of data quickly, then process it inside the platform.

  The advantage of ELT is speed and flexibility.
  The drawback is that storage must be powerful and well managed, otherwise it becomes a mess.

  ### CDC: Change Data Capture

  CDC is an approach where the system tracks changes in a source and sends only what changed.

  You do not need to export the whole customer table every time. It is enough to send new records, updates and deletions.

  Analogy: you do not recalculate the whole family budget from zero after each purchase. You simply record the new change.

  CDC is useful when data is needed almost in real time and when the source should not be overloaded with constant full exports.

  | Approach | What happens first | Strength | Where it fits especially well |
  |---|---|---|---|
  | ETL | Data is cleaned before loading | Quality control | Classic reporting and regulated metrics |
  | ELT | Data is loaded as is | Speed and flexibility | Cloud storage, analytical platforms, fast experiments |
  | CDC | Only changes are sent | Near real-time behavior | Events, transactions, operational synchronization |

  > The main point is not the name of the approach, but the management rhythm it supports: a monthly report, a report every morning or a reaction almost immediately.

  ---

  ## OLTP and OLAP: why one database is usually not enough
  ![Slide: OLTP and OLAP](/images/articles/hse-storing-retrieving-data/slide-18.png)

  When people say “database”, they often imagine one universal place where you can write operations, build reports and run analytics.

  In reality, there are two different classes of tasks: OLTP and OLAP.

  ### OLTP: the operational pulse of the company

  OLTP means Online Transaction Processing.

  These systems support daily business operations:

  - create an order;
  - process a payment;
  - write off inventory;
  - change a request status;
  - register a customer;
  - process a transaction.

  OLTP systems must be fast, accurate and reliable.

  Analogy: a cash register in a store. A customer scans goods, pays and receives a receipt. The system must immediately decrease stock, record payment and avoid mistakes.

  If money is charged but the order is not created, that is a problem.
  If an item is sold twice while only one unit was in stock, that is a problem.
  If the cash register freezes because of an analytical report, that is a very bad story.

  OLTP is about the current state of the business.

  ### OLAP: the analytical brain of the company

  OLAP means Online Analytical Processing.

  These are systems for analysis:

  - how sales changed by month;
  - which regions are growing;
  - which products are returned more often;
  - how customers behave;
  - which channels are more effective;
  - where performance deviates from plan.

  OLAP works with large volumes of historical data. Aggregations, comparisons, slices and trends matter here.

  Analogy: if OLTP is the cash register, OLAP is the finance and analytics department that studies results over a period and helps make strategic decisions.

  | Criterion | OLTP | OLAP |
  |---|---|---|
  | Main question | What is happening now? | Why did it happen, how did it change and what should we do next? |
  | Load type | Short operations and frequent writes | Heavy reads, aggregations, historical selections |
  | Typical example | Order, payment, inventory write-off | Dashboard, forecast, sales analysis |
  | Risk of mixing | Slower working processes | Low trust in reports and jumping numbers |

  ### Why you cannot simply do analytics in the working database

  Technically, sometimes you can. From a management point of view, it is often risky.

  If an analyst runs a heavy query against an operational database, it can slow down the system that serves customers, cash registers, orders or payments.

  Also, OLTP changes constantly. While you build a report, data may update. The numbers start to “jump”.

  Finally, OLTP and OLAP have different storage structure requirements.

  - OLTP is optimized for writes and short operations.
  - OLAP is optimized for reads, aggregations and large historical selections.

  Trying to make one system perfect for everything is like doing a warehouse audit right at the cash register during rush hour.

  > **Questions for a manager**
  >
  > - Which reports are currently built directly from working systems?
  > - Are there cases where analytics interferes with operations?
  > - Which metrics should be historical, not only current?

  ---

  ## DBMS types: why we ended up with a “zoo”
  ![Slide: NoSQL DBMS types](/images/articles/hse-storing-retrieving-data/slide-21.png)

  A DBMS is a database management system. The key point here is this: different database types did not appear because of fashion, but because data and tasks became different.

  ### Relational DBMS

  This is the classic category: PostgreSQL, MySQL, Oracle, Microsoft SQL Server.

  Data is stored in tables. There are rows, columns, relationships, constraints, transactions and SQL.

  A relational database is like a well-organized archive:

  - every document has its place;
  - everything is described in advance;
  - relationships are clear;
  - errors are controlled;
  - access to data is predictable.

  Relational DBMS are strong when:

  - the data structure is known in advance;
  - integrity matters;
  - transactions are needed;
  - there are related entities: customers, orders, payments, contracts.

  For finance, accounting, ERP, CRM and transactional systems, SQL remains a basic and very strong choice.

  ### Document DBMS
  ![Slide: Document DBMS](/images/articles/hse-storing-retrieving-data/slide-22.png)

  Document databases store data as documents, most often JSON or BSON.

  Examples: MongoDB, Couchbase, Firestore.

  They are convenient when an object's structure can change. For example, a customer card, user profile, settings or product catalog.

  Analogy: a folder with questionnaires. One questionnaire has five fields, another has ten, a third has nested interaction history. You do not need to force everyone to be identical in advance.

  Document databases provide flexibility, but they are less suitable for strict financial reporting where a rigid schema and control are needed.

  ### Column-oriented DBMS
  ![Slide: Column-oriented DBMS](/images/articles/hse-storing-retrieving-data/slide-23.png)

  Column-oriented databases store data by columns, not by rows.

  Examples: ClickHouse, Amazon Redshift, Apache Druid, Apache Pinot, Vertica.

  This is especially useful for analytics. If you need to calculate total sales over a billion rows, the system does not have to read every whole row. It can read only the needed column, for example `amount`.

  Analogy: in a huge Excel table, you work not with the whole sheet, but only with the “Amount” column.

  Column-oriented databases are good for BI, reports, event analytics, logs, monitoring and product analytics.

  But they are not designed for classic transactions like “create an order and reliably charge payment”.

  ### Key-value stores
  ![Slide: Key-value stores](/images/articles/hse-storing-retrieving-data/slide-24.png)

  Key-value is the simplest model: there is a key and a value.

  Examples: Redis, DynamoDB, Riak, RocksDB.

  Analogy: a storage locker. If you know the locker number, you quickly get its contents.

  Such databases are good for cache, sessions, tokens, counters, temporary data and fast operations.

  But if you need complex analytics, relationships, filters and reports, that is not their job.

  ### Graph DBMS
  ![Slide: Graph DBMS](/images/articles/hse-storing-retrieving-data/slide-25.png)

  Graph databases store not only objects, but also relationships between them.

  Examples: Neo4j, JanusGraph, ArangoDB, Amazon Neptune.

  A node is an object: a person, company, product or account.
  An edge is a relationship: bought, knows, owns, connected, transferred money, follows.

  Analogy: a metro map. Stations matter, but the routes between them matter just as much.

  Graph databases are strong where relationships matter more than the objects themselves:

  - social networks;
  - recommendations;
  - antifraud;
  - ownership chains;
  - routes;
  - dependencies;
  - hierarchies.

  Where a relational database starts to suffer from many JOINs, a graph database may be the natural solution.

  ### Vector DBMS
  ![Slide: Vector DBMS](/images/articles/hse-storing-retrieving-data/slide-26.png)

  Vector databases store numeric representations of objects: texts, images, audio, profiles and documents.

  Examples: Qdrant, Milvus, Pinecone, Weaviate, Faiss.

  Their job is to search not for exact matches, but for similarity.

  Traditional search looks for words.
  Vector search looks for meaning.

  For example, the query “how to arrange a business trip” can find a document called “business travel policy”, even if that exact phrase is not in the document.

  Vector databases became especially important with LLMs and RAG architectures.

  ### In-memory DBMS
  ![Slide: In-memory DBMS](/images/articles/hse-storing-retrieving-data/slide-27.png)

  In-memory databases work mostly in RAM.

  Examples: Redis, Memcached, Tarantool, SAP HANA.

  They are needed where minimum latency matters.

  Analogy: one thing is going to the archive every time for a folder. Another is keeping the needed documents right on the desk.

  Such solutions are useful for cache, high-load services, real-time scenarios, fast customer profiles, telecom systems and financial systems.

  ### NewSQL
  ![Slide: NewSQL](/images/articles/hse-storing-retrieving-data/slide-28.png)

  NewSQL is an attempt to keep the advantages of SQL and transactions, while adding the scalability of distributed systems.

  Examples: Google Spanner, CockroachDB, TiDB, YDB.

  NewSQL is needed when a classic SQL database no longer handles the scale, but the business is not ready to give up strict transactions and a clear data model.

  It is like a classic car with modern internals: familiar SQL logic on the outside, distributed architecture inside.

  ---

  ## Data storage architectures

  A DBMS type is not yet an architecture. In reality, company data lives in different systems, moves between them, gets cleaned, aggregated and used by different teams.

  That is why we need to talk about storage and data management architectures.

  ### Data Warehouse: a single version of truth
  ![Slide: Data Warehouse](/images/articles/hse-storing-retrieving-data/slide-29.png)

  A Data Warehouse, or DWH, is centralized data storage for analytics and reporting.

  Its job is to collect data from different systems, clean it, align it and give the business a single version of truth.

  Analogy: a retail chain where every store has its own cash register and its own reports. The DWH is the central office where data is brought to one form, checked and used as the basis for management reporting.

  DWH advantages:

  - centralization;
  - clean data;
  - history;
  - shared KPIs;
  - trust in reporting;
  - convenient integration with BI.

  Drawbacks:

  - launch complexity;
  - inertia;
  - update delay;
  - limited flexibility with new data types.

  A DWH fits well when a company needs regular management reporting, aligned metrics and data quality control.

  ### Data Lake: store everything as is
  ![Slide: Data Lake](/images/articles/hse-storing-retrieving-data/slide-30.png)

  A Data Lake is an architecture where data is stored in raw form.

  It can contain tables, JSON, logs, images, documents, audio, video and events.

  Analogy: if a DWH is a formal archive with catalogs, a Data Lake is a huge warehouse where everything can be stored “just in case”.

  Data Lake advantages:

  - flexibility;
  - scalability;
  - support for any formats;
  - low storage cost;
  - ability to keep data before it is clear how exactly it will be useful.

  Drawbacks:

  - without management, it turns into a swamp;
  - it can be hard to find the needed data;
  - there is no single version of truth;
  - engineering discipline is required;
  - data quality is not guaranteed.

  A Data Lake is useful when there is a lot of data, it has different types and it is not clear in advance which parts will be needed.

  ### Data Lakehouse: an attempt to combine order and flexibility
  ![Slide: Data Lakehouse](/images/articles/hse-storing-retrieving-data/slide-31.png)

  A Lakehouse is a hybrid of Data Lake and Data Warehouse.

  The idea is to store data flexibly, as in a Data Lake, while adding structure, metadata, transactions and analytical convenience, as in a DWH.

  Analogy: not just a warehouse where everything was dumped, but a modern logistics center. It can store different cargo types, but it has accounting, zones, rules, routes and a search system.

  Lakehouse advantages:

  - one platform;
  - less duplication;
  - support for BI and ML;
  - work with different data types;
  - faster path from data to analytics.

  Drawbacks:

  - the architecture is relatively new;
  - it requires a mature team;
  - migration can be difficult;
  - discipline in metadata and processes is needed.

  Lakehouse fits companies that have already hit the limits of DWH or Data Lake and want to combine flexibility with manageability.

  ### Data Mesh: data as a product
  ![Slide: Data Mesh](/images/articles/hse-storing-retrieving-data/slide-32.png)

  Data Mesh is more of an organizational approach than a specific technology.

  Its idea is that data should belong to business domains. The team that creates and understands the data should be responsible for its quality, documentation and availability.

  Marketing owns marketing data.
  Finance owns financial data.
  Logistics owns logistics data.
  HR owns HR data.

  At the same time, everyone follows shared standards: security, access, quality, format and SLA.

  Analogy: a market instead of one huge centralized warehouse. Each seller is responsible for their own goods, but the trading rules are common.

  Data Mesh advantages:

  - responsibility is closer to the source;
  - fewer bottlenecks in the central team;
  - better data quality;
  - scalability for large organizations.

  Drawbacks:

  - high maturity is needed;
  - a culture of responsibility is needed;
  - inconsistency is a risk;
  - standards and a self-service platform are needed.

  Data Mesh fits large organizations where a centralized data team can no longer handle the number of domains and requests.

  ### Data Fabric: a unified access fabric
  ![Slide: Data Fabric](/images/articles/hse-storing-retrieving-data/slide-33.png)

  Data Fabric is an approach where a unified logical data access layer is created, even if the data is physically stored in different places.

  Analogy: a smart city. Districts are different and systems are different, but there is a shared transport, information and control infrastructure.

  Data Fabric does not necessarily move all data into one place. It connects sources, catalogs, access policies, metadata and processing tools.

  Advantages:

  - unified access;
  - less duplication;
  - automation;
  - work with distributed sources;
  - useful for hybrid and multi-cloud environments.

  Drawbacks:

  - complexity;
  - high cost;
  - dependency on tools;
  - it does not solve data quality by itself.

  Data Fabric fits companies that already have many systems, storage layers, clouds and sources, while the business needs unified access and governance.

  ### How to choose an architecture
  ![Slide: Comparison of data storage architectures](/images/articles/hse-storing-retrieving-data/slide-34.png)

  There is no best architecture in a vacuum.

  | Architecture | When it fits | Main risk |
  |---|---|---|
  | DWH | Unified reporting and KPIs | Inertia |
  | Data Lake | Different formats and large volumes | Data swamp |
  | Lakehouse | BI, ML and flexibility in one layer | Implementation complexity |
  | Data Mesh | Many domains and teams | Inconsistency |
  | Data Fabric | Distributed sources | Platform dependency |

  In short:

  - DWH is needed when order and unified reporting matter.
  - Data Lake helps when many different data types need to be stored.
  - Lakehouse gives a balance between flexibility and analytical manageability.
  - Data Mesh is useful when the organization is large and responsibility should be distributed by domain.
  - Data Fabric fits when data is already distributed, but a unified access layer is needed.

  The choice depends on company maturity, data types, tasks, budget, team and organizational structure.

  > **Questions for a manager**
  >
  > - Which problem matters most right now: unified KPIs, experiment speed, access to distributed sources or domain responsibility?
  > - Is there a team that can support the chosen architecture after launch?
  > - What will get worse if everything stays as it is for another year?

  ---

  ## DBMS import substitution: Russian solutions and the reality of choice

  A separate topic that cannot be ignored in the Russian context is DBMS import substitution.

  In recent years, it has become clear that dependence on foreign software is not only a technical risk, but also a strategic one. Limited access to updates, support, licenses, cloud services and documentation can suddenly become a business problem.

  This is especially true for the public sector, financial organizations, critical infrastructure and companies with strict certification requirements.

  Important: import substitution does not mean “urgently replace everything with the first domestic option”. It is a separate project where compatibility, workload, team, migration cost, support, ecosystem and regulatory requirements must be considered.

  ### Why consider Russian DBMS

  Russian solutions have several potential advantages:

  - compliance with regulator requirements;
  - local technical support;
  - lower sanctions risk;
  - understanding of Russian specifics;
  - availability of specialists and partners;
  - possibility of certified deliveries.

  But there are challenges too:

  - functional limitations;
  - need to retrain the team;
  - migration cost;
  - compatibility with existing systems;
  - ecosystem maturity;
  - availability of drivers, monitoring tools, backup, replication;
  - real performance under a specific workload.

  So choosing a DBMS is not a choice by a “ours / not ours” table. It is both an engineering and management decision.

  ### SQL / relational DBMS

  The lecture material highlighted the following Russian or localized solutions in the relational DBMS segment. Before a real project, the exact certification status, versions and rights holders must be checked again, because this information changes.

  | Name | Origin | Developer | Certification in the lecture material |
  |---|---|---|---|
  | Postgres Pro | PostgreSQL fork | Postgres Professional | FSTEC, FSB |
  | Jatoba | PostgreSQL fork | Gazinformservice | FSTEC |
  | Tantor | PostgreSQL fork | TANTOR Labs | FSTEC |
  | Proxima DB | PostgreSQL fork | OrionSoft | FSTEC |
  | Red Database | Firebird fork | RED SOFT | FSTEC |
  | Pangolin DB | Own development | SberTech | None listed |
  | Kvant-Hybrid | PostgreSQL fork | KVANTOM | FSTEC |
  | Arenadata Postgres | PostgreSQL fork | Arenadata | None listed |
  | SoQoL | Own development | RELEX | FSTEC |
  | Linter | Own development | NIP IVK | FSTEC, FSB |

  One important observation: a significant part of Russian SQL solutions is built around PostgreSQL. This is logical. PostgreSQL is a mature open-source DBMS with strong expertise, extensibility and a large ecosystem around it.

  For the business, this means that migration from foreign enterprise DBMS will not always be simple, but often there is an understandable path: compatibility analysis, schema migration, rewriting procedures, performance testing, high availability setup and team training.

  ### NoSQL and NewSQL

  The lecture also highlighted Russian solutions and solutions with Russian roots in other DBMS classes:

  | Name | Type | Origin / developer in the lecture material |
  |---|---|---|
  | ClickHouse | Column-oriented DBMS | Own development, ClickHouse Inc. / Yandex |
  | Qdrant | Vector DBMS | Own development, Qdrant Team |
  | Tarantool | In-memory DBMS | Own development, VK / ex-Mail.ru Group |
  | YDB | NewSQL | Own development, Yandex |

  Here it is especially important not to mix different solution classes.

  ClickHouse does not replace PostgreSQL in a transactional system.
  Qdrant does not replace a DWH.
  Tarantool is not a universal data archive.
  YDB solves distributed SQL workload tasks, but it requires a separate architectural assessment.

  Each of these systems is strong in its own class of tasks.

  ClickHouse is for analytics and fast aggregations.
  Qdrant is for vector search and AI scenarios.
  Tarantool is for high-load in-memory scenarios.
  YDB is for distributed SQL workloads and scaling.

  ### How to approach import substitution

  You should not start with the question: “What should we replace Oracle with?”

  It is better to move step by step.

  First, describe the current landscape:

  - which DBMS are used;
  - which systems depend on them;
  - what workloads they carry;
  - which SLA are required;
  - what integrations exist;
  - which procedures, functions and extensions are used;
  - which data is critical;
  - which certification requirements apply.

  Then divide systems by criticality.

  Not all databases are equally important. There are experimental systems, reporting systems, customer services and the core of the business. Core migration is always a separate project with tests, a fallback plan and long preparation.

  Then run a pilot.

  Not a vendor presentation, but a real pilot on your data and your workloads.

  Only after that should the decision be made.

  Import substitution is not a one-time purchase. It is a program for changing the technology landscape.

  ---

  ## Vector databases and AI
  ![Slide: Vector databases and AI](/images/articles/hse-storing-retrieving-data/slide-39.png)

  Now let's move to a topic that has become especially relevant in recent years: vector databases and their connection to artificial intelligence.

  When we talk about classic databases, we usually mean exact search.

  Find the customer with ID 123.
  Show order number 456.
  Select payments for March.
  Filter products in the “electronics” category.

  But in real life, we often need not exact search, but semantic search.

  Find similar customer requests.
  Show documents close to this question.
  Find products similar by description.
  Suggest instructions that may help in this situation.
  Find contracts with similar terms.

  A regular SQL database does not solve these tasks very well. It does not understand that “customer claim”, “delivery complaint” and “dissatisfaction with delivery times” can be semantically close.

  For this, data is turned into vectors.

  ### What vectorization is

  Vectorization is the transformation of an object into a set of numbers.

  Text, an image, audio, a user profile or a document becomes a numeric “fingerprint”.

  The idea is that objects close in meaning end up near each other in a multidimensional space.

  Analogy: imagine a map where meanings, not cities, are located near each other.

  The words “automobile” and “car” will be close.
  “Business trip” and “work travel” will also be close.
  But “apple” will be farther away if the context is transport or documents.

  A vector database stores these fingerprints and can quickly search for the nearest ones.

  ### Why business needs this

  Vector databases are needed where similarity matters:

  - search across corporate documents;
  - smart FAQ;
  - recommendation systems;
  - customer request analysis;
  - search for similar incidents;
  - product matching;
  - contract processing;
  - AI assistants;
  - RAG systems.

  And this brings us to RAG.

  ### What RAG is

  RAG means Retrieval Augmented Generation. In simple terms: generation enhanced with search.

  The idea is simple: a language model should not answer only “from its head”. It should first find relevant fragments in your corporate data, and then use them as context for the answer.

  How it works:

  1. Corporate documents are split into fragments.
  2. Each fragment is turned into a vector.
  3. The vectors are stored in a vector database.
  4. A user asks a question.
  5. The question is also turned into a vector.
  6. The vector database searches for similar fragments.
  7. The found fragments are passed to the LLM as context.
  8. The model generates an answer based on the found materials.

  Example.

  An employee asks: “How do I arrange a business trip in May?”

  The system does not just generate a generic answer. It searches internal HR documents, finds the business travel policy, current rules, restrictions and the request form, and only then creates the answer.

  That is why RAG is so important for business.

  It lets AI work not in general, but with your knowledge, your documents and your rules.

  ### Why AI does not work without data

  Many companies want to introduce AI, but start with the model.

  Which model should we choose?
  Which chatbot should we install?
  Which interface should we build?
  Which LLM should we connect?

  These are important questions, but they are not the first ones.

  The first question is different:

  > Where is your data, can it be trusted and can access to it be granted safely?

  > **Questions for a manager**
  >
  > - Which internal documents should an AI system see, and which must it not see?
  > - Who is responsible for keeping the knowledge base used by RAG up to date?
  > - How will you know that an AI answer is based on the right source?

  If documents are outdated, the knowledge base is not maintained, access rights are not described, data is duplicated and policies contradict each other, AI will simply accelerate chaos.

  It will answer quickly and confidently based on bad data.

  That is more dangerous than a slow manual process.

  ---

  ## What a manager should take away

  If we compress the whole article into several management conclusions, they are these.

  1. **Data is an asset.** Data should not be a by-product of system work. It should have owners, quality rules, a lifecycle and clear use cases.

  2. **Responsibility for data cannot belong only to IT.** IT is responsible for infrastructure and implementation. But the business defines data meaning, metric calculation rules, priorities and value.

  3. **There is no universal database.** SQL, NoSQL, NewSQL, column-oriented, graph, vector and in-memory databases are not a fashionable zoo. They are tools for different tasks.

     A bad question: “Which database is better?”
     A good question: “What task are we solving, what data do we have and what requirements do we have for speed, quality, scale and consistency?”

  4. **OLTP and OLAP should be separated by meaning.** Operational systems record business events. Analytical systems help understand the whole picture.

     A cash register and an analytics department are different things. A database for orders and a database for strategic reporting often should be different too.

  5. **Architecture matters more than a single tool.** You can buy an expensive platform and get no result.
     You can start with simple steps and quickly improve decision quality.

     What matters is not the technology name, but how data travels from source to decision.

  6. **Import substitution is a strategic project.** You cannot replace a DBMS by saying “let's install an analogue”. Workload, compatibility, team, migration, certification, support and risks must be analyzed.

  7. **AI starts not with a model, but with data.** Vector databases, RAG and LLMs create major opportunities. But only if the company understands where its knowledge lives, how current it is and who is responsible for it.

  ---

  ## Instead of a conclusion

  We started with a simple idea: data is an asset, not infrastructure.

  But data does not become an asset automatically. Not because it is stored in a database. Not because BI is connected. Not because the company bought a platform or introduced AI.

  Data becomes an asset when it is managed.

  When it is clear who is responsible for it.
  When there is quality.
  When there are shared definitions.
  When data can be found.
  When it can be trusted.
  When it helps make decisions.
  When business and IT speak the same language.

  A leader does not need to know every technical detail. But they do need to understand the map of the territory.

  Without that map, it is very easy to end up in a situation where the company seems to have everything: CRM, ERP, reports, BI, databases, storage layers and AI pilots.

  And decisions are still made by guesswork.

  That is exactly what we want to avoid.
---
Так получилось, что в прошлом году я читал онлайн-лекцию в ВШЭ на тему **«Хранение и получение данных»**. Это был в целом первый опыт так еще и для нетипичных для меня слушателей, так как это были не коллеги разработчики/архитекторов/дата-инженеров, а руководители разных функций крупных компаний.

То есть на людей, которые каждый день принимают решения, отвечают за процессы, бюджеты, команды, показатели, риски и развитие бизнеса, но при этом не обязаны знать, как писать SQL-запросы, настраивать шардирование базы данных или проектировать распределённое хранилище.

Именно поэтому задача была не в том, чтобы за три часа превратить управленцев в инженеров. Это невозможно, да и не нужно.

Задача была другая: объяснить, **как устроен мир данных на уровне, достаточном для осознанного управленческого разговора**.

Не на уровне «ой, это всё IT, пусть они сами разберутся».
И не на уровне «давайте срочно внедрим AI, потому что все внедряют».
А где-то посередине: чтобы руководитель понимал, какие данные есть в компании, откуда они берутся, куда текут, почему отчёты расходятся, зачем нужны хранилища, почему одна база данных не решает все задачи и почему искусственный интеллект без нормальных данных превращается в дорогую игрушку.

Эта статья — расширенное сопровождение к той лекции.

> **Для кого эта статья** — руководители, аналитики и продуктовые лидеры, которые хотят говорить с инженерами и архитекторами на одном языке. Не нужно знать SQL, достаточно понимать, какие данные есть, откуда они берутся и почему это важно для бизнеса.

### Коротко

- **Данные — это актив**, а не побочный продукт. Без владельцев, стандартов и качества они превращаются в шум.
- **Универсальной базы данных не существует.** SQL, NoSQL, колоночные, графовые, векторные — каждый тип решает свой класс задач.
- **OLTP и OLAP нужно разделять.** Касса и аналитический отдел — разные сущности, и их базы тоже.
- **Архитектура важнее инструмента.** Путь данных от источника до решения — вот что определяет ценность.
- **AI начинается с данных.** Без чистых данных, каталогов и управления доступом LLM лишь ускорит хаос.
- **Импортозамещение — стратегический проект**, а не разовая закупка. Нужен анализ нагрузки, совместимости и рисков.

---

## Данные — это актив, а не инфраструктура
![Слайд: Данные как актив](/images/articles/hse-storing-retrieving-data/slide-05.png)

Давайте начнём с фразы, которую слышали почти все:

> Data is the new oil.
> Данные — это новая нефть.

Эту фразу обычно приписывают Клайву Хамби. Её повторяли так часто, что она уже успела немного надоесть. Но проблема не во фразе. Проблема в том, что многие компании произносят её вслух, но продолжают относиться к данным как к чему-то второстепенному.

Как к побочному продукту работы систем.

- Где-то в CRM лежат клиенты.
- Где-то в ERP — закупки и склад.
- Где-то в 1С — бухгалтерия.
- Где-то в Excel — «самая правильная версия отчёта».
- Где-то в почте — договорённости.
- Где-то в голове у руководителя отдела — настоящая логика расчёта KPI.

Формально данные есть. Фактически ими никто не управляет.

И вот здесь важно зафиксировать простую мысль:

> **Данные сами по себе ничего не стоят, если с ними нельзя работать.**

Нефть тоже не особенно полезна, если она просто лежит под землёй. Её нужно найти, добыть, очистить, транспортировать, переработать и превратить во что-то полезное. С данными примерно так же.

Если их просто хранить, они не дают бизнес-эффекта.

- Если в них бардак, они вредят.
- Если они противоречат друг другу, им перестают доверять.
- Если непонятно, кто за них отвечает, они быстро превращаются в цифровой мусор.

Поэтому правильнее говорить не «у нас есть данные», а задавать более неприятные вопросы:

- Кто отвечает за эти данные?
- Кто понимает их смысл?
- Кто следит за качеством?
- Кто определяет, какие данные важны?
- Кто может объяснить, почему в двух отчётах разные цифры?
- Кто принимает решение, какие данные нужно начать собирать уже сейчас, чтобы через год не было поздно?

Если ответ — «никто», значит данные никому не принадлежат.

А дальше цепочка короткая:

1. Если нет владельца, то нет ответственности.
2. Если нет ответственности, нет качества.
3. Если нет качества, нет доверия.
4. Если нет доверия, данные перестают быть активом.

Они становятся шумом.

> **Вопросы управленцу**
>
> - Какие данные в вашей зоне ответственности считаются критичными?
> - У каждого такого набора данных есть владелец?
> - Кто может объяснить расхождения в отчётах без ручного расследования?

---

## Почему управленцу нужно в этом разбираться

Управленец, который не понимает принципов работы с данными, похож на водителя, который не знает, где взять топливо, куда его залить и зачем оно вообще нужно.

При этом от него всё равно ждут, что машина поедет.

Важно не путать роли. Руководителю не нужно становиться дата-инженером. Ему не нужно руками писать пайплайны, выбирать индексы в PostgreSQL или спорить о плюсах и минусах Kafka.

Но ему нужно понимать базовую механику:

- как данные появляются;
- где они хранятся;
- почему они портятся;
- почему отчёты расходятся;
- чем операционная база отличается от аналитической;
- почему «собрать всё в одну базу» — не стратегия;
- какие вопросы нужно задавать IT, аналитикам и владельцам процессов.

> Это не техническая роскошь. Это управленческая необходимость.

Потому что сегодня почти любое серьёзное бизнес-решение так или иначе опирается на данные:

- запуск нового продукта;
- оптимизация запасов;
- оценка эффективности команды;
- управление клиентским опытом;
- автоматизация процесса;
- внедрение AI;
- переход на отечественное ПО;
- снижение операционных расходов;
- поиск точек роста.

Если данные плохие, то и решения будут плохими. Только выглядеть они будут убедительно, потому что их можно будет красиво показать на дашборде.

> Красивый график не делает данные правильными.

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

- описать ключевые источники данных;
- понять, какие отчёты собираются вручную;
- выделить критичные справочники;
- назначить владельцев данных;
- автоматизировать 2–3 отчёта, которые каждый день съедают время;
- согласовать единые определения ключевых метрик.

Это уже работа с данными. И она уже даёт эффект.

### Миф 2. «Это задача IT»

Это один из самых опасных мифов.

- IT может построить инфраструктуру.
- IT может настроить интеграции.
- IT может обеспечить хранение, доступность, безопасность и производительность.

- Но IT не всегда знает, что именно означает показатель «активный клиент».
- IT не должно самостоятельно решать, какие данные важны для коммерческого блока.
- IT не может без бизнеса определить, какая логика расчёта KPI правильная.
- IT не обязано угадывать, какие данные понадобятся руководителю через полгода.

Если данные — это актив, то бизнес не может полностью делегировать ответственность за них технической функции.

Правильная модель выглядит иначе:

- бизнес определяет смысл и ценность;
- аналитики помогают интерпретировать и моделировать;
- IT обеспечивает технологическую реализацию;
- управленцы создают культуру использования данных.

> **Вопросы управленцу**
>
> - Какие метрики в вашей функции считаются ключевыми?
> - Кто утверждает их определения?
> - Что сейчас приходится сверять вручную перед важным решением?

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

- понимать, какие данные есть в зоне его ответственности;
- знать, откуда они берутся;
- понимать, как они используются;
- требовать данные как основу для решений;
- создавать культуру ответственности за качество;
- говорить с IT и аналитиками на одном языке.

Хороший управленческий вопрос сегодня звучит не так:

> Почему у нас нет красивого дашборда?

А так:

> Какие решения мы хотим принимать быстрее и точнее, какие данные для этого нужны, где они рождаются, кто за них отвечает и можем ли мы им доверять?

Вот это уже начало зрелого подхода.

---

## Немного истории: почему базы данных стали такими разными
![Слайд: Эволюция хранения данных 1970-1999](/images/articles/hse-storing-retrieving-data/slide-09.png)

Чтобы понимать современную архитектуру данных, полезно посмотреть, как мы сюда пришли.

| Период | Что произошло | Ключевые технологии |
|---|---|---|
| 1970-е | Эдгар Кодд предложил реляционную модель: таблицы, строки, столбцы, связи | Реляционная теория, SQL |
| 1980-е | Реляционные СУБД стали коммерческим стандартом | Oracle, IBM DB2, стандартизация SQL |
| 1990-е | Интернет увеличил масштабы. Появились OLAP и хранилища данных | MySQL, PostgreSQL, DWH, OLAP |
| 2000-е | Web-scale компании упёрлись в ограничения классических СУБД | MapReduce, BigTable, Dynamo |
| 2007--2012 | NoSQL-революция: ответ на новые типы данных и горизонтальное масштабирование | MongoDB, Cassandra, Redis, CouchDB |
| 2013--2018 | Облака и managed-сервисы упростили хранение и обработку | Cloud-native DWH, Spark, Kafka, Airflow |
| 2019--2024 | Lakehouse объединил гибкость Lake и структуру Warehouse. AI породил спрос на векторные БД | Lakehouse, векторные СУБД, RAG |

Главный вывод из этой истории простой:

**каждая новая волна технологий появлялась не потому, что старые технологии стали плохими, а потому что менялись задачи.**

Не существует одной базы данных «на всё». Есть разные классы задач, и под них нужны разные решения.

---

## Типы данных: не все данные одинаковые
![Слайд: Типы данных](/images/articles/hse-storing-retrieving-data/slide-12.png)

Прежде чем говорить о базах данных и архитектурах, нужно разобраться с самими данными.

Принято выделять три больших типа:

- структурированные;
- полуструктурированные;
- неструктурированные.

### Структурированные данные
![Слайд: Структурированные данные](/images/articles/hse-storing-retrieving-data/slide-13.png)

Структурированные данные — это самый привычный формат.

Представьте Excel-таблицу:

- каждая строка — отдельная запись;
- каждый столбец — понятное поле;
- у каждого поля есть тип: дата, число, текст, статус, сумма.

Примеры:

- таблица заказов;
- справочник клиентов;
- бухгалтерские проводки;
- складские остатки;
- платежи;
- графики смен.

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

- можно анализировать обращения клиентов;
- искать похожие договоры;
- выявлять типовые причины жалоб;
- строить поиск по внутренним документам;
- создавать корпоративных ассистентов;
- извлекать смысл из переписки и текстов.

Но есть важный нюанс: неструктурированные данные требуют специальных методов обработки. Обычная таблица здесь не поможет.

---

## Источники данных: откуда всё берётся
![Слайд: Источники данных](/images/articles/hse-storing-retrieving-data/slide-16.png)

Данные не появляются из воздуха. Они рождаются в процессах.

Есть внутренние источники:

- CRM;
- ERP;
- 1С;
- кассовые системы;
- складской учёт;
- HR-системы;
- системы документооборота;
- системы управления задачами;
- почта;
- мессенджеры;
- продукты компании;
- внутренние сервисы;
- промышленное оборудование;
- датчики и устройства.

Есть внешние источники:

- государственные реестры;
- открытые данные;
- партнёрские системы;
- поставщики;
- логистические операторы;
- платёжные сервисы;
- социальные сети;
- внешние API;
- публичные датасеты.

Есть ещё одна важная классификация: онлайн и офлайн.

**Онлайн-источники** дают данные почти в реальном времени: клики, события приложения, транзакции, телеметрия.

**Офлайн-источники** передают данные периодически: выгрузка из 1С раз в ночь, отчёт поставщика раз в неделю, Excel-файл от партнёра раз в месяц.

Для бизнеса это не техническая деталь. От типа источника зависит, насколько быстро можно принимать решения.

Если вы управляете складскими остатками, задержка в сутки может быть приемлемой.
Если вы управляете антифродом в платежах, задержка в сутки превращает систему в музей.

> **Вопросы управленцу**
>
> - Какие решения в вашей функции требуют данных в тот же день?
> - Где достаточно недельной или месячной периодичности?
> - Какие источники сейчас считаются внешними, но фактически влияют на ежедневные решения?

---

## Почему «собрать всё в одно место» сложнее, чем кажется

На уровне идеи всё выглядит просто:

- у нас есть данные в разных системах;
- давайте соберём их в одно хранилище;
- построим отчёты;
- начнём принимать решения.

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

- Extract — извлечь данные;
- Transform — преобразовать;
- Load — загрузить.

То есть сначала данные забираются из источника, потом очищаются, нормализуются, приводятся к нужной структуре, и только после этого загружаются в хранилище.

Аналогия: бухгалтер сначала собирает первичные документы, проверяет их, исправляет ошибки, приводит к единому виду и только потом формирует итоговый отчёт.

Плюс ETL — контроль качества до загрузки.
Минус — процесс может быть медленным и менее гибким.

ETL хорошо подходит для классической отчётности и ситуаций, где важна строгая подготовка данных.

### ELT: Extract, Load, Transform

ELT меняет порядок:

1. Сначала извлекаем.
2. Потом загружаем как есть.
3. А преобразуем уже внутри хранилища.

Аналогия: мы складываем все документы в большой архив, а потом внутри архива раскладываем, очищаем, группируем и анализируем.

ELT стал особенно популярен с развитием мощных облачных хранилищ и аналитических платформ. Они позволяют быстро загрузить много данных, а потом обрабатывать их уже внутри.

Плюс ELT — скорость и гибкость.
Минус — нужно мощное и хорошо управляемое хранилище, иначе получится бардак.

### CDC: Change Data Capture

CDC — это подход, при котором система отслеживает изменения в источнике и передаёт только то, что изменилось.

Не нужно каждый раз выгружать всю таблицу клиентов. Достаточно передать новые записи, изменения и удаления.

Аналогия: вы не пересчитываете весь семейный бюджет с нуля после каждой покупки. Вы просто фиксируете новое изменение.

CDC полезен, когда данные нужны почти в реальном времени и когда нельзя перегружать источник постоянными полными выгрузками.

| Подход | Что происходит сначала | Сильная сторона | Где особенно уместен |
|---|---|---|---|
| ETL | Данные очищаются до загрузки | Контроль качества | Классическая отчётность и регламентированные показатели |
| ELT | Данные загружаются как есть | Скорость и гибкость | Облачные хранилища, аналитические платформы, быстрые эксперименты |
| CDC | Передаются только изменения | Близость к реальному времени | События, транзакции, оперативная синхронизация |

> Главное не в названии подхода, а в том, какой управленческий ритм он поддерживает: отчёт раз в месяц, отчёт каждое утро или реакцию почти сразу.

---

## OLTP и OLAP: почему одной базы обычно недостаточно
![Слайд: OLTP и OLAP](/images/articles/hse-storing-retrieving-data/slide-18.png)

Когда люди говорят «база данных», они часто представляют универсальное место, куда можно и записывать операции, и строить отчёты, и запускать аналитику.

Но в реальности есть два разных класса задач: OLTP и OLAP.

### OLTP: операционный пульс компании

OLTP — Online Transaction Processing.

Это системы, которые обслуживают ежедневные операции бизнеса:

- создать заказ;
- провести оплату;
- списать товар;
- изменить статус заявки;
- зарегистрировать клиента;
- провести транзакцию.

OLTP-системы должны быть быстрыми, точными и надёжными.

Аналогия: касса в магазине. Покупатель пробивает товар, платит, получает чек. Система должна мгновенно списать остаток, зафиксировать оплату и не ошибиться.

Если деньги списались, а заказ не создался — это проблема.
Если товар продался дважды, хотя на складе был один экземпляр — это проблема.
Если касса зависла из-за аналитического отчёта — это совсем плохая история.

OLTP — это про текущее состояние бизнеса.

### OLAP: аналитический мозг компании

OLAP — Online Analytical Processing.

Это системы для анализа:

- как менялись продажи по месяцам;
- какие регионы растут;
- какие товары чаще возвращают;
- как ведут себя клиенты;
- какие каналы эффективнее;
- где отклонение от плана.

OLAP работает с большими объёмами исторических данных. Здесь важны агрегации, сравнения, разрезы, тренды.

Аналогия: если OLTP — это касса, то OLAP — это финансово-аналитический отдел, который изучает результаты за период и помогает принимать стратегические решения.

| Критерий | OLTP | OLAP |
|---|---|---|
| Главный вопрос | Что происходит сейчас? | Почему это произошло, как менялось и что делать дальше? |
| Тип нагрузки | Короткие операции и частые записи | Тяжёлые чтения, агрегации, исторические выборки |
| Типичный пример | Заказ, платёж, списание товара | Дашборд, прогноз, анализ продаж |
| Риск смешивания | Замедление рабочих процессов | Недоверие к отчётам и «прыгающие» цифры |

### Почему нельзя просто делать аналитику в рабочей базе

Технически иногда можно. Управленчески — часто опасно.

Если аналитик запускает тяжёлый запрос к операционной базе, он может замедлить работу системы, которая обслуживает клиентов, кассы, заказы или платежи.

Кроме того, OLTP постоянно изменяется. Пока вы строите отчёт, данные могут обновиться. В итоге цифры начинают «прыгать».

И наконец, у OLTP и OLAP разные требования к структуре хранения.

- OLTP оптимизирован под запись и короткие операции.
- OLAP оптимизирован под чтение, агрегации и большие исторические выборки.

Пытаться сделать одну систему идеальной для всего — всё равно что устроить ревизию склада прямо на кассе в час пик.

> **Вопросы управленцу**
>
> - Какие отчёты сейчас строятся прямо по рабочим системам?
> - Есть ли случаи, когда аналитика мешает операционной работе?
> - Какие показатели должны быть историческими, а не только текущими?

---

## Типы СУБД: почему у нас получился «зоопарк»
![Слайд: Типы NoSQL СУБД](/images/articles/hse-storing-retrieving-data/slide-21.png)

СУБД — система управления базами данных. И здесь важно понять: разные типы баз появились не ради моды, а потому что данные и задачи стали разными.

### Реляционные СУБД

Это классика: PostgreSQL, MySQL, Oracle, Microsoft SQL Server.

Данные хранятся в таблицах. Есть строки, столбцы, связи, ограничения, транзакции, SQL.

Реляционная база — это как хорошо организованный архив:

- у каждого документа своё место;
- всё описано заранее;
- связи понятны;
- ошибки контролируются;
- доступ к данным предсказуем.

Реляционные СУБД хороши, когда:

- структура данных понятна заранее;
- важна целостность;
- нужны транзакции;
- есть связанные сущности: клиенты, заказы, платежи, договоры.

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

- социальные сети;
- рекомендации;
- антифрод;
- цепочки владения;
- маршруты;
- зависимости;
- иерархии.

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

- централизация;
- чистота данных;
- историчность;
- единые KPI;
- доверие к отчётности;
- удобная интеграция с BI.

Минусы:

- сложность запуска;
- инерционность;
- задержка обновления;
- ограниченная гибкость при новых типах данных.

DWH хорошо подходит, когда компании нужна регулярная управленческая отчётность, согласованные показатели и контроль качества данных.

### Data Lake: сохраняем всё как есть
![Слайд: Data Lake](/images/articles/hse-storing-retrieving-data/slide-30.png)

Data Lake — это архитектура, где данные хранятся в сыром виде.

Туда можно складывать таблицы, JSON, логи, изображения, документы, аудио, видео, события.

Аналогия: если DWH — это оформленный архив с каталогами, то Data Lake — огромный склад, куда можно сложить всё «про запас».

Плюсы Data Lake:

- гибкость;
- масштабируемость;
- поддержка любых форматов;
- низкая стоимость хранения;
- возможность сохранять данные до того, как понятно, как именно они пригодятся.

Минусы:

- без управления превращается в болото;
- сложно найти нужные данные;
- нет единой версии правды;
- нужна инженерная дисциплина;
- качество данных не гарантировано.

Data Lake хорош, когда данных много, они разнотипные и заранее неизвестно, какие из них понадобятся.

### Data Lakehouse: попытка совместить порядок и гибкость
![Слайд: Data Lakehouse](/images/articles/hse-storing-retrieving-data/slide-31.png)

Lakehouse — это гибрид Data Lake и Data Warehouse.

Идея: хранить данные гибко, как в Data Lake, но добавить структуру, метаданные, транзакционность и удобство аналитики, как в DWH.

Аналогия: уже не просто склад, куда всё свалили, а современный логистический центр. Там можно хранить разные типы грузов, но есть учёт, зоны, правила, маршруты и система поиска.

Плюсы Lakehouse:

- единая платформа;
- меньше дублирования;
- поддержка BI и ML;
- работа с разными типами данных;
- возможность быстрее переходить от данных к аналитике.

Минусы:

- архитектура относительно новая;
- требует зрелой команды;
- миграция может быть сложной;
- нужна дисциплина в метаданных и процессах.

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

- ответственность ближе к источнику;
- меньше узких мест в центральной команде;
- лучшее качество данных;
- масштабируемость для больших организаций.

Минусы:

- нужна высокая зрелость;
- нужна культура ответственности;
- есть риск несогласованности;
- нужны стандарты и платформа самообслуживания.

Data Mesh подходит крупным организациям, где централизованная команда данных уже не справляется с количеством доменов и запросов.

### Data Fabric: единая ткань доступа
![Слайд: Data Fabric](/images/articles/hse-storing-retrieving-data/slide-33.png)

Data Fabric — это подход, при котором создаётся единый логический слой доступа к данным, даже если физически они хранятся в разных местах.

Аналогия: умный город. Районы разные, системы разные, но есть единая транспортная, информационная и управляющая инфраструктура.

Data Fabric не обязательно переносит все данные в одно место. Он связывает источники, каталоги, политики доступа, метаданные и инструменты обработки.

Плюсы:

- единый доступ;
- снижение дублирования;
- автоматизация;
- работа с распределёнными источниками;
- полезно для гибридной и мультиоблачной среды.

Минусы:

- сложность;
- высокая стоимость;
- зависимость от инструментов;
- не решает проблему качества данных сам по себе.

Data Fabric подходит компаниям, где уже много систем, хранилищ, облаков и источников, но бизнесу нужен единый доступ и управление.

### Как выбирать архитектуру
![Слайд: Сравнение архитектур хранения данных](/images/articles/hse-storing-retrieving-data/slide-34.png)

Нет лучшей архитектуры в вакууме.

| Архитектура | Когда уместна | Главный риск |
|---|---|---|
| DWH | Единая отчётность и KPI | Инерционность |
| Data Lake | Разные форматы и большие объёмы | Data swamp |
| Lakehouse | BI, ML и гибкость в одном слое | Сложность внедрения |
| Data Mesh | Много доменов и команд | Несогласованность |
| Data Fabric | Распределённые источники | Зависимость от платформы |

Коротко:

- DWH нужен, когда важны порядок и единая отчётность.
- Data Lake помогает, когда нужно сохранять много разнотипных данных.
- Lakehouse даёт баланс гибкости и аналитической управляемости.
- Data Mesh полезен, когда организация большая и ответственность нужно распределять по доменам.
- Data Fabric подходит, когда данные уже распределены, но нужен единый слой доступа.

Выбор зависит от зрелости компании, типов данных, задач, бюджета, команды и организационной структуры.

> **Вопросы управленцу**
>
> - Какая проблема сейчас важнее: единые KPI, скорость экспериментов, доступ к распределённым источникам или ответственность доменов?
> - Есть ли команда, которая сможет поддерживать выбранную архитектуру после запуска?
> - Что станет хуже, если оставить всё как есть ещё на год?

---

## Импортозамещение СУБД: российские решения и реальность выбора

Отдельная тема, которую нельзя игнорировать в российском контексте, — импортозамещение СУБД.

За последние годы стало понятно, что зависимость от зарубежного ПО — это не только технический, но и стратегический риск. Ограничение доступа к обновлениям, поддержке, лицензиям, облачным сервисам и документации может внезапно стать бизнес-проблемой.

Особенно если речь идёт о госсекторе, финансовых организациях, критической инфраструктуре и компаниях с жёсткими требованиями к сертификации.

Важно: импортозамещение — это не «срочно заменить всё на первое отечественное». Это отдельный проект, где нужно учитывать совместимость, нагрузку, команду, стоимость миграции, поддержку, экосистему и регуляторные требования.

### Зачем рассматривать российские СУБД

У российских решений есть несколько потенциальных преимуществ:

- соответствие требованиям регуляторов;
- локальная техническая поддержка;
- снижение санкционных рисков;
- учёт российской специфики;
- доступность специалистов и партнёров;
- возможность сертифицированных поставок.

Но есть и вызовы:

- функциональные ограничения;
- необходимость переобучения команды;
- стоимость миграции;
- совместимость с существующими системами;
- зрелость экосистемы;
- наличие драйверов, инструментов мониторинга, резервного копирования, репликации;
- реальная производительность под конкретной нагрузкой.

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

- какие СУБД используются;
- какие системы от них зависят;
- какие нагрузки они несут;
- какие SLA требуются;
- какие есть интеграции;
- какие используются процедуры, функции, расширения;
- какие данные критичны;
- какие требования по сертификации.

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

- поиск по корпоративным документам;
- умные FAQ;
- рекомендательные системы;
- анализ обращений клиентов;
- поиск похожих инцидентов;
- сопоставление товаров;
- обработка договоров;
- AI-ассистенты;
- RAG-системы.

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

> **Вопросы управленцу**
>
> - Какие внутренние документы AI-система должна видеть, а какие ей видеть нельзя?
> - Кто отвечает за актуальность базы знаний, на которую будет опираться RAG?
> - Как вы поймёте, что ответ AI основан на правильном источнике?

Если документы устарели, база знаний не ведётся, права доступа не описаны, данные дублируются, регламенты противоречат друг другу, то AI просто ускорит хаос.

Он будет быстро и уверенно отвечать на основе плохих данных.

А это опаснее, чем медленный ручной процесс.

---

## Что должен вынести управленец

Если собрать всю статью в несколько управленческих выводов, получится следующее.

1. **Данные — это актив.** Данные не должны быть побочным продуктом работы систем. У них должны быть владельцы, правила качества, жизненный цикл и понятные сценарии использования.

2. **Ответственность за данные не может лежать только на IT.** IT отвечает за инфраструктуру и реализацию. Но смысл данных, правила расчёта показателей, приоритеты и ценность определяет бизнес.

3. **Универсальной базы данных не существует.** SQL, NoSQL, NewSQL, колоночные, графовые, векторные, in-memory базы — это не модный зоопарк, а набор инструментов под разные задачи.

   Плохой вопрос: «Какая база лучше?»
   Хороший вопрос: «Какую задачу мы решаем, какие данные у нас есть и какие требования к скорости, качеству, масштабу и согласованности?»

4. **OLTP и OLAP нужно разделять по смыслу.** Операционные системы фиксируют события бизнеса. Аналитические системы помогают понимать картину целиком.

   Касса и аналитический отдел — разные сущности. База для заказов и база для стратегической отчётности тоже часто должны быть разными.

5. **Архитектура важнее отдельного инструмента.** Можно купить дорогую платформу и не получить результата.
   Можно начать с простых шагов и быстро улучшить качество решений.

   Важно не название технологии, а то, как данные проходят путь от источника до решения.

6. **Импортозамещение — это стратегический проект.** Нельзя заменить СУБД по принципу «поставим аналог». Нужно анализировать нагрузку, совместимость, команду, миграцию, сертификацию, поддержку и риски.

7. **AI начинается не с модели, а с данных.** Векторные базы, RAG и LLM дают огромные возможности. Но только если компания понимает, где лежат её знания, насколько они актуальны и кто за них отвечает.

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

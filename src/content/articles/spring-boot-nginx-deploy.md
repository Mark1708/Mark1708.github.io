---
title: "Развёртывание Spring Boot приложения с помощью Nginx, Let's Encrypt и Docker Compose"
titleEn: "Deploying a Spring Boot Application with Nginx, Let's Encrypt and Docker Compose"
description: "Пошаговое руководство по развёртыванию Spring Boot приложения с Nginx, SSL от Let's Encrypt и Docker Compose на Ubuntu сервере"
descriptionEn: "Step-by-step guide to deploying a Spring Boot application with Nginx, Let's Encrypt SSL and Docker Compose on an Ubuntu server"
date: "2022-09-08"
sourceName: "Habr"
sourceNameRu: "Хабр"
links:
  - label: "Read on Habr"
    labelRu: "Читать на Хабре"
    url: "https://habr.com/ru/articles/687210/"
  - label: "GitHub Repository"
    labelRu: "Репозиторий на GitHub"
    url: "https://github.com/Mark1708/simple-spring-boot-app"
tags: ["Java", "Spring Boot", "Nginx", "Docker", "DevOps"]
readingTime: "7 min"
readers: "31K"
bodyEn: |
  ## Introduction

  Hello, Habr! In my first article, I would like to share my experience deploying a Spring Boot application. But first, a small digression that should answer the questions of why and what for.

  Recently, I faced the task of developing a Telegram bot. It may seem simple enough. But there was a problem: I had not previously dealt with deploying a project, and I had many questions about obtaining an SSL certificate because the Telegram API works only over HTTPS. Unfortunately, after a long search, I still could not find an article that answered all my questions, so the deployment process dragged on because I had to collect the material piece by piece.

  You can find the repository with the final project [on GitHub](https://github.com/Mark1708/simple-spring-boot-app). For convenience, I made three branches; their purpose will become clear after you read the article.

  ## Preparing the server

  For my tests, I used the simplest Ubuntu cloud server from Timeweb.

  The first thing we need to do is prepare the server, namely:
  - Create a new user with administrator privileges
  - Install Docker and Docker Compose
  - Install git and authenticate

  ## Cloning the application

  For testing, I made a simple Spring Boot application and, to make things more interesting, used PostgreSQL + Flyway instead of H2.

  ```bash
  mkdir spring-boot-deploy-with-nginx-example
  cd spring-boot-deploy-with-nginx-example/
  git clone git@github.com:Mark1708/simple-spring-boot-app.git test-deploy
  ```

  In this project, you can find a prepared Dockerfile. It is very simple, without multistage builds, but we do not need anything more for a simple test project.

  ```dockerfile
  FROM maven:3.6.3-jdk-11 AS builder
  COPY ./ ./
  RUN mvn clean package -DskipTests

  FROM openjdk:11.0.7-jdk-slim
  COPY --from=builder /target/simple-spring-boot-app-0.0.1-SNAPSHOT.jar /app.jar
  EXPOSE 8080
  ENTRYPOINT ["java","-jar","/app.jar"]
  ```

  ## Configuring the web server

  We will use Nginx, so let us set up a minimal configuration and move on.

  ```bash
  mkdir -p nginx/conf.d
  vim nginx/conf.d/app.conf
  ```

  And write the server block:

  ```nginx
  server {
      listen 80;
      listen [::]:80;
      charset utf-8;
      access_log off;

      root /var/www/html;
      server_name domen.ru www.domen.ru;

      location / {
          proxy_pass http://simple-spring-boot-app:8080;
          proxy_set_header Host $host:$server_port;
          proxy_set_header X-Forwarded-Host $server_name;
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      }

      location /static {
          access_log   off;
          expires      30d;
          alias /simple-spring-boot-app/static;
      }

      location ~ /.well-known/acme-challenge {
          allow all;
          root /var/www/html;
      }
  }
  ```

  Do not forget to replace `domen.ru` with your real domain.

  ## Database initialization

  Create an `init.sql` file in the `init` directory:

  ```bash
  mkdir init && vim init/init.sql
  ```

  ```sql
  CREATE USER myuser WITH PASSWORD 'pass';
  CREATE DATABASE app;
  GRANT ALL PRIVILEGES ON DATABASE app TO myuser;
  ```

  ## Docker Compose

  Open the `docker-compose.yml` file:

  ```yaml
  version: '3'
  services:
    nginx:
      container_name: nginx
      image: nginx:1.13
      restart: always
      ports:
        - 80:80
      volumes:
        - ./nginx/conf.d:/etc/nginx/conf.d
        - web-root:/var/www/html
        - certbot-etc:/etc/letsencrypt
        - certbot-var:/var/lib/letsencrypt
      networks:
        - app-network

    certbot:
      image: certbot/certbot
      depends_on:
        - nginx
      container_name: certbot
      volumes:
        - certbot-etc:/etc/letsencrypt
        - certbot-var:/var/lib/letsencrypt
        - web-root:/var/www/html
      command: certonly --webroot --webroot-path=/var/www/html --email pochta@gmail.com --agree-tos --no-eff-email --staging -d domen.ru -d www.domen.ru

    postgresql:
      container_name: postgresql
      image: postgres:12.2-alpine
      environment:
        POSTGRES_USER: ${POSTGRES_USER}
        POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      ports:
        - "5432:5432"
      restart: always
      volumes:
        - ./init:/docker-entrypoint-initdb.d/
      networks:
        - app-network

    app:
      container_name: simple-spring-boot-app
      build:
        context: ./simple-spring-boot-app
        dockerfile: Dockerfile
      environment:
        - "DB_HOST=postgresql"
        - "POSTGRES_USER=${POSTGRES_USER}"
        - "POSTGRES_PASSWORD=${POSTGRES_PASSWORD}"
        - "SERVER_PORT=8080"
      expose:
        - "8080"
      depends_on:
        - nginx
        - postgresql
      restart: always
      networks:
        - app-network

  volumes:
    certbot-etc:
    certbot-var:
    web-root:

  networks:
    app-network:
      driver: bridge
  ```

  Do not forget to change the domain name `domen.ru` to your own and replace the email address as well.

  Create a `.env` file:

  ```bash
  vim .env
  ```

  ```
  POSTGRES_USER=postgres
  POSTGRES_PASSWORD=postgres
  ```

  ## Ready, steady, go!

  ```bash
  docker-compose up -d --build
  ```

  If everything went according to plan, visiting `http://domen.ru/person` will show the response from our application.

  Useful debugging commands:
  - `docker-compose logs service_name` — read logs
  - `docker system df` — view used disk space
  - `docker container ls -a` / `docker rm <container_id>` — view or clean containers
  - `docker image ls -a` / `docker rmi <image_id>` — view or clean images
  - `docker system prune` — remove everything Docker has accumulated

  ## Getting an SSL certificate

  Check that the credentials are mounted correctly:

  ```bash
  docker-compose exec nginx ls -la /etc/letsencrypt/live
  ```

  If everything went well, you will see the files `README` and `domen.ru`.

  Change the `--staging` flag in `docker-compose.yml` to `--force-renewal`:

  ```yaml
  certbot:
    # ...
    command: certonly --webroot --webroot-path=/var/www/html --email pochta@gmail.com --agree-tos --no-eff-email --force-renewal -d domen.ru -d www.domen.ru
  ```

  Restart certbot:

  ```bash
  docker-compose up --force-recreate --no-deps certbot
  ```

  ## Final configuration

  Stop nginx:

  ```bash
  docker-compose stop nginx
  ```

  Generate a Diffie-Hellman key:

  ```bash
  mkdir dhparam
  sudo openssl dhparam -out ./dhparam/dhparam-2048.pem 2048
  ```

  Update the nginx configuration (`nginx/conf.d/app.conf`):

  ```nginx
  server {
      listen 80;
      listen [::]:80;
      server_name domen.ru www.domen.ru;

      location ~ /.well-known/acme-challenge {
          allow all;
          root /var/www/html;
      }

      location / {
          rewrite ^ https://$host$request_uri? permanent;
      }
  }

  server {
      listen 443 ssl http2;
      listen [::]:443 ssl http2;
      server_name domen.ru www.domen.ru;
      server_tokens off;

      ssl_certificate /etc/letsencrypt/live/domen.ru/fullchain.pem;
      ssl_certificate_key /etc/letsencrypt/live/domen.ru/privkey.pem;
      ssl_buffer_size 8k;
      ssl_dhparam /etc/ssl/certs/dhparam-2048.pem;

      ssl_protocols TLSv1.2 TLSv1.1 TLSv1;
      ssl_prefer_server_ciphers on;
      ssl_ciphers ECDH+AESGCM:ECDH+AES256:ECDH+AES128:DH+3DES:!ADH:!AECDH:!MD5;
      ssl_ecdh_curve secp384r1;
      ssl_session_tickets off;
      ssl_stapling on;
      ssl_stapling_verify on;
      resolver 8.8.8.8;

      location / {
          try_files $uri @simple-spring-boot-app;
      }

      location @simple-spring-boot-app {
          proxy_pass http://simple-spring-boot-app:8080;
          add_header X-Frame-Options "SAMEORIGIN" always;
          add_header X-XSS-Protection "1; mode=block" always;
          add_header X-Content-Type-Options "nosniff" always;
          add_header Referrer-Policy "no-referrer-when-downgrade" always;
          add_header Content-Security-Policy "default-src * data: 'unsafe-eval' 'unsafe-inline'" always;
      }

      root /var/www/html;
      index index.html index.htm index.nginx-debian.html;
  }
  ```

  Add port 443 and the dhparam volume to `docker-compose.yml`:

  ```yaml
  nginx:
    # ...
    ports:
      - 80:80
      - 443:443
    volumes:
      # ...
      - dhparam:/etc/ssl/certs

  volumes:
    # ...
    dhparam:
      driver: local
      driver_opts:
        type: none
        device: /home/myuser/spring-boot-deploy-with-nginx-example/dhparam/
        o: bind
  ```

  Final command:

  ```bash
  docker-compose up -d --force-recreate --no-deps nginx
  ```

  ## What is worth knowing

  SSL certificates from Certbot must be renewed every 90 days, and preferably every 60 days. Certbot does not like being bothered more than five times per week.

  The renewal process can be automated with cron:

  ```bash
  #!/bin/bash
  /usr/local/bin/docker-compose -f /home/myuser/spring-boot-deploy-with-nginx-example/docker-compose.yml run certbot renew --dry-run \
  && /usr/local/bin/docker-compose -f /home/myuser/spring-boot-deploy-with-nginx-example/docker-compose.yml kill -s SIGHUP nginx
  ```

  ## Conclusion

  I hope this article saved you some time! For me, it was an interesting experience: after all, it was my first article rather than dry notes in a README for the future. I will be glad to hear your advice in the comments.
---

## Введение

Привет, Хабр! В своей первой статье я бы хотел поделиться опытом в развертывании Spring Boot приложения. Но для начала небольшое отступление, которое должно ответить на вопросы зачем и почему.

Недавно я столкнулся с задачей разработать Telegram бота. Казалось бы, что тут сложного? Но вот беда, ранее я не сталкивался с задачей развертывания проекта, тем более было много вопросов касаемо получения SSL сертификата так как Telegram API работает только с HTTPS протоколом. Увы после долгих поисков я так и не нашел статьи, которая ответила бы на все вопросы, поэтому процесс деплоя затянулся из-за того, что пришлось собирать весь материал по кусочкам.

Репозиторий с финальным проектом вы можете найти [на GitHub](https://github.com/Mark1708/simple-spring-boot-app). Для удобства сделал 3 ветки, о смысле которых вы поймете после прочтения.

## Подготовим сервер

Для своих тестов я использовал самый простой облачный сервер на Ubuntu от Timeweb.

Первое, что нам потребуется сделать — это подготовить сервер, а именно:
- Создать нового пользователя с привилегией администратора
- Установить Docker и Docker Compose
- Установить git и авторизоваться

## Клонируем приложение

Для тестов я сделал простое Spring Boot приложение и чтобы было интересней использовал не H2, а PostgreSQL + Flyway.

```bash
mkdir spring-boot-deploy-with-nginx-example
cd spring-boot-deploy-with-nginx-example/
git clone git@github.com:Mark1708/simple-spring-boot-app.git test-deploy
```

В этом проекте вы можете найти заготовленный Dockerfile. Совершенно простой без multistage, но нам этого и не надо для простого тестового проекта.

```dockerfile
FROM maven:3.6.3-jdk-11 AS builder
COPY ./ ./
RUN mvn clean package -DskipTests

FROM openjdk:11.0.7-jdk-slim
COPY --from=builder /target/simple-spring-boot-app-0.0.1-SNAPSHOT.jar /app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app.jar"]
```

## Настроим веб сервер

Использовать будем Nginx, поэтому настроим минимальную конфигурацию и двинем дальше.

```bash
mkdir -p nginx/conf.d
vim nginx/conf.d/app.conf
```

И напишем серверный блок:

```nginx
server {
    listen 80;
    listen [::]:80;
    charset utf-8;
    access_log off;

    root /var/www/html;
    server_name domen.ru www.domen.ru;

    location / {
        proxy_pass http://simple-spring-boot-app:8080;
        proxy_set_header Host $host:$server_port;
        proxy_set_header X-Forwarded-Host $server_name;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /static {
        access_log   off;
        expires      30d;
        alias /simple-spring-boot-app/static;
    }

    location ~ /.well-known/acme-challenge {
        allow all;
        root /var/www/html;
    }
}
```

Не забываем заменить `domen.ru` на ваш настоящий домен.

## Инициализация базы данных

Создаём файл `init.sql` в папке `init`:

```bash
mkdir init && vim init/init.sql
```

```sql
CREATE USER myuser WITH PASSWORD 'pass';
CREATE DATABASE app;
GRANT ALL PRIVILEGES ON DATABASE app TO myuser;
```

## Docker Compose

Открываем файл `docker-compose.yml`:

```yaml
version: '3'
services:
  nginx:
    container_name: nginx
    image: nginx:1.13
    restart: always
    ports:
      - 80:80
    volumes:
      - ./nginx/conf.d:/etc/nginx/conf.d
      - web-root:/var/www/html
      - certbot-etc:/etc/letsencrypt
      - certbot-var:/var/lib/letsencrypt
    networks:
      - app-network

  certbot:
    image: certbot/certbot
    depends_on:
      - nginx
    container_name: certbot
    volumes:
      - certbot-etc:/etc/letsencrypt
      - certbot-var:/var/lib/letsencrypt
      - web-root:/var/www/html
    command: certonly --webroot --webroot-path=/var/www/html --email pochta@gmail.com --agree-tos --no-eff-email --staging -d domen.ru -d www.domen.ru

  postgresql:
    container_name: postgresql
    image: postgres:12.2-alpine
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    ports:
      - "5432:5432"
    restart: always
    volumes:
      - ./init:/docker-entrypoint-initdb.d/
    networks:
      - app-network

  app:
    container_name: simple-spring-boot-app
    build:
      context: ./simple-spring-boot-app
      dockerfile: Dockerfile
    environment:
      - "DB_HOST=postgresql"
      - "POSTGRES_USER=${POSTGRES_USER}"
      - "POSTGRES_PASSWORD=${POSTGRES_PASSWORD}"
      - "SERVER_PORT=8080"
    expose:
      - "8080"
    depends_on:
      - nginx
      - postgresql
    restart: always
    networks:
      - app-network

volumes:
  certbot-etc:
  certbot-var:
  web-root:

networks:
  app-network:
    driver: bridge
```

Не забываем поменять доменное имя `domen.ru` на ваше, а также заменить почту.

Создаём файл `.env`:

```bash
vim .env
```

```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
```

## На старт, внимание, марш!

```bash
docker-compose up -d --build
```

Если все прошло по плану, то перейдя по ссылке `http://domen.ru/person`, вы увидите ответ нашего приложения.

Полезные команды для отладки:
- `docker-compose logs service_name` — почитать логи
- `docker system df` — посмотреть используемую память
- `docker container ls -a` / `docker rm <container_id>` — посмотреть/почистить контейнеры
- `docker image ls -a` / `docker rmi <image_id>` — посмотреть/почистить образы
- `docker system prune` — снести всё, что было в докере

## Получаем SSL сертификат

Проверяем правильность монтирования учётных данных:

```bash
docker-compose exec nginx ls -la /etc/letsencrypt/live
```

Если все прошло успешно, то вы увидите файлы: `README` и `domen.ru`.

Меняем в `docker-compose.yml` флаг `--staging` на `--force-renewal`:

```yaml
certbot:
  # ...
  command: certonly --webroot --webroot-path=/var/www/html --email pochta@gmail.com --agree-tos --no-eff-email --force-renewal -d domen.ru -d www.domen.ru
```

Перезапускаем certbot:

```bash
docker-compose up --force-recreate --no-deps certbot
```

## Финальная конфигурация

Останавливаем nginx:

```bash
docker-compose stop nginx
```

Генерируем ключ Diffie-Hellman:

```bash
mkdir dhparam
sudo openssl dhparam -out ./dhparam/dhparam-2048.pem 2048
```

Обновляем конфигурацию nginx (`nginx/conf.d/app.conf`):

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name domen.ru www.domen.ru;

    location ~ /.well-known/acme-challenge {
        allow all;
        root /var/www/html;
    }

    location / {
        rewrite ^ https://$host$request_uri? permanent;
    }
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name domen.ru www.domen.ru;
    server_tokens off;

    ssl_certificate /etc/letsencrypt/live/domen.ru/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/domen.ru/privkey.pem;
    ssl_buffer_size 8k;
    ssl_dhparam /etc/ssl/certs/dhparam-2048.pem;

    ssl_protocols TLSv1.2 TLSv1.1 TLSv1;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDH+AESGCM:ECDH+AES256:ECDH+AES128:DH+3DES:!ADH:!AECDH:!MD5;
    ssl_ecdh_curve secp384r1;
    ssl_session_tickets off;
    ssl_stapling on;
    ssl_stapling_verify on;
    resolver 8.8.8.8;

    location / {
        try_files $uri @simple-spring-boot-app;
    }

    location @simple-spring-boot-app {
        proxy_pass http://simple-spring-boot-app:8080;
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-XSS-Protection "1; mode=block" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header Referrer-Policy "no-referrer-when-downgrade" always;
        add_header Content-Security-Policy "default-src * data: 'unsafe-eval' 'unsafe-inline'" always;
    }

    root /var/www/html;
    index index.html index.htm index.nginx-debian.html;
}
```

Добавляем порт 443 и том dhparam в `docker-compose.yml`:

```yaml
nginx:
  # ...
  ports:
    - 80:80
    - 443:443
  volumes:
    # ...
    - dhparam:/etc/ssl/certs

volumes:
  # ...
  dhparam:
    driver: local
    driver_opts:
      type: none
      device: /home/myuser/spring-boot-deploy-with-nginx-example/dhparam/
      o: bind
```

Финальная команда:

```bash
docker-compose up -d --force-recreate --no-deps nginx
```

## Что стоит знать

SSL сертификаты от Certbot надо обновлять каждые 90 дней, а лучше каждые 60 дней. Certbot не любит, когда его беспокоят больше 5 раз в неделю.

Процесс обновления можно автоматизировать с помощью cron:

```bash
#!/bin/bash
/usr/local/bin/docker-compose -f /home/myuser/spring-boot-deploy-with-nginx-example/docker-compose.yml run certbot renew --dry-run \
&& /usr/local/bin/docker-compose -f /home/myuser/spring-boot-deploy-with-nginx-example/docker-compose.yml kill -s SIGHUP nginx
```

## Заключение

Надеюсь эта статья сэкономила вам время! Для меня это был интересный опыт — всё-таки первая статья, а не сухие заметки в README на будущее. Буду рад советам в комментариях.

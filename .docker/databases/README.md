# Dockerization of Open Source Databases

This project provides a complete configuration to deploy and dockerize three popular open-source databases: **PostgreSQL**, **MariaDB**, and **MongoDB**. Each database is defined as a service in the `docker-compose.yml` file, enabling an easy and centralized deployment process.

## Dockerized Services

The databases included in this project are:

- **PostgreSQL**: A robust and extensible relational database.
- **MariaDB**: A MySQL-compatible database with enhanced performance and features.
- **MongoDB**: A NoSQL document-oriented database.

### `docker-compose.yml` File Structure

The `docker-compose.yml` file defines all three database services. Below is the configuration for each service:

```yaml
version: '3'

services:

  postgresql_db:
    image: postgres:latest
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    ports:
      - "${POSTGRES_PORT_HOST}:${POSTGRES_PORT_CONTAINER}"

  mariadb_db:
    image: mariadb:latest
    volumes:
      - mariadb_data:/var/lib/mysql
    environment:
      MYSQL_DATABASE: ${MYSQL_DATABASE}
      MYSQL_USER: ${MYSQL_USER}
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
    ports:
      - "${MARIADB_PORT_HOST}:${MARIADB_PORT_CONTAINER}"

  mongodb_db:
    image: mongo:latest
    volumes:
      - mongodb_data:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_INITDB_ROOT_USERNAME}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_INITDB_ROOT_PASSWORD}
    ports:
      - "${MONGODB_PORT_HOST}:${MONGODB_PORT_CONTAINER}"

volumes:
  postgres_data:
  mariadb_data:
  mongodb_data:
```

---

## Environment Variables

The project uses an `.env` file to configure credentials and ports for each database. Below is an example of the required variables:

```env
# PostgreSQL Configuration
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=postgres
POSTGRES_PORT_HOST=5433 # Local port for PostgreSQL
POSTGRES_PORT_CONTAINER=5432 # Container port for PostgreSQL

# MariaDB Configuration
MYSQL_DATABASE=exampledb
MYSQL_USER=user
MYSQL_PASSWORD=password
MYSQL_ROOT_PASSWORD=rootpassword
MARIADB_PORT_HOST=3307 # Local port for MariaDB
MARIADB_PORT_CONTAINER=3306 # Container port for MariaDB

# MongoDB Configuration
MONGO_INITDB_ROOT_USERNAME=admin
MONGO_INITDB_ROOT_PASSWORD=adminpassword
MONGODB_PORT_HOST=27018 # Local port for MongoDB
MONGODB_PORT_CONTAINER=27017 # Container port for MongoDB
```

---

## Deployment Steps

1. Clone this repository:
   ```bash
   git clone https://github.com/Anyel-ec/SecurityMonitoring
   cd Backend
   ```

2. Create and configure the `.env` file:
   ```bash
   cp .env.template .env
   ```

3. Start all services using Docker Compose:
   ```bash
   docker-compose up -d
   ```

4. Verify that the services are running:
   ```bash
   docker ps
   ```

---

## Volumes

To ensure data persistence across container restarts, each database uses Docker volumes:

- **PostgreSQL**: Volume `postgres_data` stores the data for the PostgreSQL database.
- **MariaDB**: Volume `mariadb_data` stores the data for the MariaDB database.
- **MongoDB**: Volume `mongodb_data` stores the data for the MongoDB database.

---

## Accessing Databases

### PostgreSQL
- Host: `localhost`
- Port: `5433` (default in this configuration)
- Default credentials: Defined in the `.env` file.

### MariaDB
- Host: `localhost`
- Port: `3307`
- Default credentials: Defined in the `.env` file.

### MongoDB
- Host: `localhost`
- Port: `27018`
- Default credentials: Defined in the `.env` file.

---

## Contributions

Feel free to fork this repository and submit a pull request if you want to improve or extend the project. Contributions are always welcome!
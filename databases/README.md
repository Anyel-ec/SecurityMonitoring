# Dockerization of Open Source Databases

This project contains the necessary configuration to deploy and dockerize three popular open-source databases: **PostgreSQL**, **MariaDB**, and **MongoDB**. Each database is defined as a service in a `docker-compose.yml` file, making it easy and centralized to deploy them quickly.

## Dockerized Services

The databases included in this project are:

- **PostgreSQL**: A robust and extensible relational database.
## In progress 

- **MariaDB**: A MySQL fork with performance improvements and compatibility.
- **MongoDB**: A NoSQL document-oriented database.

### `docker-compose.yml` File Structure

Below is a basic example of how the PostgreSQL service is defined in `docker-compose.yml`. The services for **MariaDB** and **MongoDB** follow a similar structure.

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
      - mongo_data:/data/db
    environment:
      MONGO_INITDB_DATABASE: ${MONGO_INITDB_DATABASE}
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_INITDB_ROOT_USERNAME}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_INITDB_ROOT_PASSWORD}
    ports:
      - "${MONGODB_PORT_HOST}:${MONGODB_PORT_CONTAINER}"

volumes:
  postgres_data:
  mariadb_data:
  mongo_data:
```

## Deployment

1. Clone this repository.
2. Rename the `.env.template` file to `.env` and configure the necessary environment variables for each database.
3. Run the following command to start all services:

   ```bash
   docker-compose up -d
   ```

## Volumes

Volumes are used to persist the data for each database:

- **postgres_data**: Persists PostgreSQL data.
- **mariadb_data**: Persists MariaDB data.
- **mongo_data**: Persists MongoDB data.

## Contributions

If you want to contribute or improve this project, feel free to fork it or submit a pull request.

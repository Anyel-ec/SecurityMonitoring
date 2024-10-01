# SecurityMonitoring - Dev Container

This folder contains the configuration for three open-source databases (**MariaDB**, **MongoDB**, and **PostgreSQL**) that export their metrics using Prometheus exporters. The services in this folder are statically configured for database monitoring, and no future improvements will be made since this part of the project is complete. All further improvements will be made in the `.container` folder.

## Important Instructions

After downloading the project, rename the `.env.template` file to `.env` before running the services.

## Environment Variables

The `.env.template` file contains the following environment variables for each database:

### PostgreSQL
- `POSTGRES_USER`: PostgreSQL username.
- `POSTGRES_PASSWORD`: PostgreSQL password.
- `POSTGRES_DB`: PostgreSQL database name.
- `POSTGRES_HOST`: PostgreSQL service host.
- `POSTGRES_PORT_HOST`: Local port (host machine).
- `POSTGRES_PORT_CONTAINER`: Container port for PostgreSQL.

### MongoDB
- `MONGODB_USER`: MongoDB username.
- `MONGODB_PASSWORD`: MongoDB password.
- `MONGODB_DB`: MongoDB database name.
- `MONGODB_HOST`: MongoDB service host.
- `MONGODB_PORT_HOST`: Local port (host machine).
- `MONGODB_PORT_CONTAINER`: Container port for MongoDB.

### MariaDB
- `MYSQL_ROOT_PASSWORD`: Root password for MariaDB.
- `MYSQL_DATABASE`: Default MariaDB database.
- `MYSQL_USER`: Custom MariaDB user.
- `MYSQL_PASSWORD`: Password for the custom MariaDB user.
- `MYSQL_HOST`: MariaDB service host.
- `MYSQL_PORT_HOST`: Local port (host machine).
- `MYSQL_PORT_CONTAINER`: Container port for MariaDB.

## Service Summary

### 1. **Grafana**
- Image: `grafana/grafana`
- Exposed Port: `3000:3000`
- Credentials:
  - Admin User: `anyel`
  - Admin Password: `anyel`
- Purpose: Visualize the collected database metrics.

### 2. **Prometheus**
- Image: `prom/prometheus`
- Exposed Port: `9090:9090`
- Purpose: Collect metrics from all the database exporters and configured targets.

### 3. **MongoDB**
- Image: `mongo:latest`
- Exposed Port: `27020:27017`
- Persistent Volume: `mongo_data` to store MongoDB data.

### 4. **MariaDB**
- Image: `mariadb:latest`
- Exposed Port: `${MYSQL_PORT_HOST}:${MYSQL_PORT_CONTAINER}`
- Environment variables defined in `.env` to configure the custom user.

### 5. **PostgreSQL**
- Image: `postgres:latest`
- Exposed Port: `${POSTGRES_PORT_HOST}:${POSTGRES_PORT_CONTAINER}`
- Persistent Volume: `postgres_data` to store PostgreSQL data.

## Exporter Services

1. **MongoDB Exporter**
   - Image: `ssheehy/mongodb-exporter:latest`
   - Exposed Port: `9216:9216`
   - Collects metrics from MongoDB running on `mongo_db`.

2. **PostgreSQL Exporter**
   - Image: `prometheuscommunity/postgres-exporter`
   - Exposed Port: `9187:9187`
   - Collects metrics from PostgreSQL using the `DATA_SOURCE_NAME` environment variable.

3. **MariaDB Exporter**
   - Image: `prom/mysqld-exporter`
   - Exposed Port: `9104:9104`
   - Exports MariaDB metrics using the configuration in `.my.cnf`.

## Volumes

- `grafana_storage`: Persistent volume for Grafana data.
- `mongo_data`: Persistent volume for MongoDB data.
- `postgres_data`: Persistent volume for PostgreSQL data.

## Prometheus Configuration

The `prometheus.yml` file defines the following scraping targets:

- **Prometheus**: Target `prometheus:9090` to collect its own metrics.
- **PostgreSQL Exporter**: Target `postgres-exporter:9187`.
- **MongoDB Exporter**: Target `mongo-exporter:9216`.
- **MariaDB Exporter**: Target `192.168.0.215:9104`.

## How to Run

1. Rename `.env.template` to `.env`.
2. Ensure that the `.env` file is correctly configured with the appropriate environment variables.
3. In the `.devcontainer` directory, run:

   ```bash
   docker-compose up -d
   ```

4. Access the services:
   - **Grafana**: [http://localhost:3000](http://localhost:3000)
   - **Prometheus**: [http://localhost:9090](http://localhost:9090)

## Project Status

This project is finalized. The configuration here is static, and no further improvements will be made in this folder. Future enhancements will be implemented in the `.container` folder.
# SecurityMonitoring - Container

This project is designed to monitor database metrics using **Prometheus** and **Grafana**. Currently, **PostgreSQL** metrics are exported using the `postgres-exporter`, and in the future, **MariaDB/MySQL** and **MongoDB** metrics will be exported dynamically via environment variables managed by Spring Boot.

## Requirements

- Docker
- Docker Compose

## Services

1. **Grafana**: Used to visualize database metrics.
   - Exposed on port `3000`.
   - Access credentials:
     - User: `anyel`
     - Password: `anyel`
   - Persistent storage configured on the `grafana_storage` volume.

2. **Postgres Exporter**: Exports PostgreSQL database metrics for Prometheus to consume.
   - Exposed on port `9187`.
   - Configured to connect to a PostgreSQL database using the following environment variables:
     - `POSTGRES_USER`
     - `POSTGRES_PASSWORD`
     - `POSTGRES_HOST`
     - `POSTGRES_PORT`

3. **Prometheus**: Monitoring tool that collects metrics from the configured services.
   - Exposed on port `9090`.
   - Uses the `prometheus.yml` configuration file to define the monitoring targets (Prometheus and Postgres Exporter).

## File Structure

- `.container/`
  - This folder contains the Docker environment configuration for exporting PostgreSQL metrics. In the future, it will support **MariaDB/MySQL** and **MongoDB** databases dynamically via environment variables managed by a **Spring Boot** service.

## How to Run the Project

1. Ensure you are in the `.container` folder.
2. Run the following command:

    ```bash
    docker-compose up -d
    ```

3. The services will run in the background.
4. Access the services:
   - **Grafana**: [http://localhost:3000](http://localhost:3000)
   - **Prometheus**: [http://localhost:9090](http://localhost:9090)

## Prometheus Configuration

In the `prometheus.yml` file, two jobs are configured to collect metrics:

- **Prometheus**: Collects its own metrics on port `9090`.
- **Postgres Exporter**: Collects PostgreSQL metrics through the `postgres-exporter` on port `9187`.

## Volumes

- `grafana_storage`: Persistently stores Grafana data.

## Networks

The services communicate via the Docker network `monitoring`, which uses the `bridge` driver.

## Future Improvements

- Export metrics for **MariaDB/MySQL** and **MongoDB** using environment variables that will be dynamically sent from **Spring Boot**.

# Open Source Tool for Monitoring MariaDB, PostgreSQL, and MongoDB Databases Using Prometheus and Grafana

This project aims to develop an open-source tool for dynamic monitoring of three databases: **MongoDB**, **PostgreSQL**, and **MariaDB/MySQL**. The tool allows users to specify connection credentials through a web interface in **React** and, subsequently, visualize custom dashboards in **Grafana** for one or several databases combined.

The backend is built with **Spring Boot** and uses **Prometheus** and **Grafana** to collect and visualize the selected database metrics.

## Project Status

This project is under development. So far, the following has been implemented:
- A **React** interface for entering database connection credentials.
- Integration of **Docker Compose** with services for Grafana, Prometheus, and exporters for **PostgreSQL**, **MongoDB**, and **MariaDB**.
- Initial monitoring and visualization configuration in **Grafana**.

## Technologies Used

- **Frontend**: React (created with Vite), React Bootstrap for designing dynamic forms.
- **Backend**: Spring Boot (under development).
- **Monitoring and Visualization**: Grafana and Prometheus.
- **Databases**: MongoDB, PostgreSQL, and MariaDB.
- **Containers**: Docker and Docker Compose for service orchestration.

## Features

1. **Database Connection Configuration**:
    - Users can specify credentials to connect to **MongoDB**, **PostgreSQL**, and **MariaDB** via a dynamic form in the React app.
    - Allows for combinations of different databases: for example, monitoring only **MongoDB**, **PostgreSQL**, or **MariaDB**, or combinations like **MongoDB+PostgreSQL**.

2. **Dynamic Monitoring**:
    - The **Spring Boot** backend receives the credentials provided by the user and configures the database connections.
    - Metrics are collected using **Prometheus** and visualized through **Grafana**.

3. **Visualization in Grafana**:
    - Preconfigured dashboards in **Grafana** that are activated based on the databases selected by the user.

## Docker Compose Configuration (`docker-compose.yml`)

The `docker-compose.yml` file is configured to start the necessary services for monitoring the databases and visualizing them in Grafana. Below is the current configuration:

```yaml
version: '3'

services:
  grafana:
    image: grafana/grafana
    ports:
      - "${GRAFANA_PORT_EXTERNAL}:${GRAFANA_PORT_INTERNAL}"
    environment:
      GF_SECURITY_ADMIN_USER: "${GRAFANA_USER}"
      GF_SECURITY_ADMIN_PASSWORD: "${GRAFANA_PASSWORD}"
    volumes:
      - grafana_storage:/var/lib/grafana
    networks:
      - monitoring

  prometheus:
    image: prom/prometheus
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml:ro 
    ports:
      - "${PROMETHEUS_PORT_EXTERNAL}:${PROMETHEUS_PORT_INTERNAL}"
    networks:
      - monitoring

  postgres-exporter:
    image: quay.io/prometheuscommunity/postgres-exporter
    environment:
      DATA_SOURCE_NAME: "postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}?sslmode=disable"
    ports:
      - "${EXPORT_POSTGRES_PORT_EXTERNAL}:${EXPORT_POSTGRES_PORT_INTERNAL}"
    networks:
      - monitoring

networks:
  monitoring:
    driver: bridge

volumes:
  grafana_storage:
```

This `docker-compose.yml` file configures and exposes the **Grafana**, **Prometheus**, and **Postgres Exporter** services. Ensure that the environment variables (`GRAFANA_USER`, `GRAFANA_PASSWORD`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, etc.) are properly defined in your environment or `.env` file.

## Prometheus Configuration (`prometheus.yml`)

The `prometheus.yml` file is configured to monitor services for MongoDB, PostgreSQL, and MariaDB through their respective exporters.

```yaml
global:
  scrape_interval: 5s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['prometheus:9090']

  - job_name: 'postgres'
    static_configs:
      - targets: ['postgres-exporter:9187']
```

## Installation and Usage

### 1. Clone the Repository

```bash
git clone https://github.com/Anyel-ec/SecurityMonitoring
cd SecurityMonitoring
```

### 2. Run the Services with Docker Compose

```bash
docker-compose up -d
```

This will launch the following services:
- **Grafana**: Accessible at `http://localhost:3000` (username: `admin`, password: `admin`).
- **Prometheus**: Accessible at `http://localhost:9090`.
- **PostgreSQL Exporter**: Accessible at `http://localhost:9187`.

### 3. Configure Grafana

1. Access **Grafana** at `http://localhost:3000`.
2. Log in using the credentials (`admin/admin`).
3. Add **Prometheus** as a data source:
   - URL: `http://prometheus:9090`.
4. Import the relevant dashboard to visualize the metrics for the configured databases.

### 4. Next Steps

The next step in development is to improve the integration with the databases, as well as automate the creation of dashboards in Grafana.

## Contributions

If you wish to contribute to this project, please open an issue or submit a pull request.

## License

This project is licensed under the [Apache License 2.0](LICENSE).

## Team and Project Information

Open source tool service for dynamic monitoring of three DBMS: MongoDB, PostgreSQL, and MariaDB/MySQL.

**Project Manager: Ing. Luis Chica, Mgtr** - [GitHub Profile](https://github.com/LuisChica18)

**Developer: Ing. Angel Patiño** - [GitHub Profile](https://github.com/Anyel-ec)
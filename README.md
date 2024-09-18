# Dynamic Database Monitoring: MongoDB, MariaDB/MySQL, PostgreSQL using React and Spring Boot

This project aims to develop an open-source tool for dynamic monitoring of three databases: **MongoDB**, **PostgreSQL**, and **MariaDB/MySQL**. The tool allows users to specify connection credentials through a web interface in **React**, and subsequently visualize customized dashboards in **Grafana** for one or several databases in a combined manner.

The backend is built with **Spring Boot** and uses **Prometheus** and **Grafana** to collect and visualize the selected database metrics.

## Project Status

This project is under development. The following has been implemented so far:
- A **React** interface for entering database connection credentials.
- **Docker Compose** integration with services for Grafana, Prometheus, and exporters for **PostgreSQL**, **MongoDB**, and **MariaDB** databases.
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
    - It allows the combination of different databases: for example, monitoring only **MongoDB**, **PostgreSQL**, or **MariaDB**, or combinations like **MongoDB+PostgreSQL**.

2. **Dynamic Monitoring**:
    - The backend in **Spring Boot** (upcoming development) will receive the credentials provided by the user and configure the connections to the databases.
    - Metrics are collected using **Prometheus** and visualized through **Grafana**.

3. **Visualization in Grafana**:
    - Preconfigured dashboards in **Grafana** that are activated based on the databases selected by the user.

## Project Structure

```
.
├── frontend/                    # React Application
│   ├── src/
│   │   ├── components/          # React Components (includes SwitchToggle, Forms, etc.)
│   │   └── App.js               # React entry point
│   └── public/                  # Static files
├── backend/                     # Upcoming: Spring Boot Backend
├── .devcontainer/               # Development container configurations
└── README.md                    # Project documentation
```

## Prerequisites

- **Docker** and **Docker Compose** installed.
- **Node.js** and **npm** installed for the React frontend.

## Installation and Usage

### 1. Clone the Repository

```bash
git clone https://github.com/Anyel-ec/SecurityMonitoring
cd SecurityMonitoring
```

### 2. Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Run the Services with Docker Compose

```bash
docker-compose up -d
```

This will launch the following services:
- **Grafana**: Accessible at `http://localhost:3000` (user: `admin`, password: `admin`).
- **Prometheus**: Accessible at `http://localhost:9090`.
- **PostgreSQL Exporter**: Accessible at `http://localhost:9187`.
- **MongoDB Exporter**: Accessible at `http://localhost:9216`.
- **MariaDB Exporter**: Accessible at `http://localhost:9104`.

### 4. Configure Grafana

1. Access **Grafana** at `http://localhost:3000`.
2. Log in using the credentials (`admin/admin`).
3. Add **Prometheus** as a data source:
   - URL: `http://prometheus:9090`.
4. Import the relevant dashboard to visualize the metrics for the configured databases.

### 5. Next Steps

The next step in development is to integrate the **Spring Boot** backend to handle dynamic database connections and automatically configure Prometheus exporters based on the credentials provided.

## Docker Compose Configuration (`docker-compose.yml`)

The `docker-compose.yml` file is configured to start the necessary services for monitoring the databases and visualizing them in Grafana. Below is the current configuration:

```yaml
version: '3'

services:
  grafana:
    image: grafana/grafana
    ports:
      - "3000:3000"
    environment:
      GF_SECURITY_ADMIN_USER: admin
      GF_SECURITY_ADMIN_PASSWORD: admin
    volumes:
      - grafana_storage:/var/lib/grafana
    
  prometheus:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml:ro 
    
  # MongoDB Service
  mongo_db:
    image: mongo:latest
    ports:
      - "27020:27017"
    volumes:
      - mongo_data:/data/db
  
  # MariaDB Service
  mariadb_db:
    image: mariadb:latest
    restart: always
    environment:
      MYSQL_DATABASE: ${MYSQL_DATABASE}
      MYSQL_USER: ${MYSQL_USER}
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
    ports:
      - "3306:3306"
    expose:
      - "3306"

  # PostgreSQL Service
  postgresql_db:
    image: postgres:latest
    volumes:
      - postgres_data:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    ports:
      - "5433:5432"
  
  ##############################################
  # Exporter Services
  mongo-exporter:
    image: ssheehy/mongodb-exporter:latest
    ports:
      - "9216:9216"
    environment:
      MONGODB_URI: "mongodb://mongo_db:27017"
    depends_on:
      - mongo_db
  
  postgres-exporter:
    image: prometheuscommunity/postgres-exporter
    ports:
      - "9187:9187"
    environment:
      DATA_SOURCE_NAME: "postgresql://postgres:${POSTGRES_PASSWORD}@postgresql_db:5432/${POSTGRES_DB}?sslmode=disable"
    depends_on:
      - postgresql_db

  mariadb-exporter:
    image: prom/mysqld-exporter
    depends_on:
      - mariadb_db
    command:
      - --config.my-cnf=/cfg/.my.cnf
      - --mysqld.address=192.168.0.215:3306
    volumes:
      - "./.my.cnf:/cfg/.my.cnf"
    ports:
      - "9104:9104"
  
volumes:
  grafana_storage:
  postgres_data:
  mongo_data:
```

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

  - job_name: 'mongo'
    static_configs:
      - targets: ['mongo-exporter:9216']

  - job_name: 'mariadb'
    static_configs:
      - targets: ['192.168.0.215:9104']
```

## Contribution

This project is open-source, and any contributions are welcome. If you'd like to collaborate, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push your branch (`git push origin feature/new-feature`).
5. Open a **Pull Request** for review.

## Project Status

This project is still under development, and some of the functionalities described are under construction.

Upcoming features include:
- Full integration with **Spring Boot**.
- Enhanced configuration and customization of **Grafana** dashboards for each database.
- Support for more databases and monitoring systems.

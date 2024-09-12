# Open-Source Tools -  Dynamic Database Monitoring MongoDB, MariaDB and PostgreSQL. 

This project aims to develop an open-source tool for dynamic monitoring of three databases: **MongoDB**, **PostgreSQL**, and **MariaDB**. The tool allows users to specify connection credentials through a web interface built in **React**, and then display customized dashboards in **Grafana** for one or multiple databases. Users can monitor individual databases such as **MongoDB**, **PostgreSQL**, or **MariaDB**, or combinations like **MongoDB+PostgreSQL**.

The backend is built using **Spring Boot**, and **Prometheus** and **Grafana** are used to collect and visualize metrics for the selected databases.

## Project Status

This project is under active development. So far, the following has been implemented:
- A **React** interface to input connection credentials for the databases.
- **Docker Compose** integration with services for Grafana, Prometheus, and exporters for **PostgreSQL**, **MongoDB**, and **MariaDB**.
- Initial setup for monitoring and visualization using **Grafana**.

## Technologies Used

- **Frontend**: React (created with Vite), React Bootstrap for dynamic form design.
- **Backend**: Spring Boot (currently under development).
- **Monitoring and Visualization**: Grafana and Prometheus.
- **Databases**: MongoDB, PostgreSQL, and MariaDB.
- **Containers**: Docker and Docker Compose for service orchestration.

## Features

1. **Database Connection Configuration**:
    - Users can specify credentials for connecting to **MongoDB**, **PostgreSQL**, and **MariaDB** through a dynamic form in the React application.
    - The tool allows combinations of databases for monitoring: for instance, monitoring only **MongoDB**, **PostgreSQL**, or **MariaDB**, or combinations like **MongoDB+PostgreSQL**.

2. **Dynamic Monitoring**:
    - The **Spring Boot** backend (upcoming feature) will receive the credentials provided by the user and configure connections to the databases.
    - Metrics are collected using **Prometheus** and visualized in **Grafana**.

3. **Grafana Visualization**:
    - Pre-configured **Grafana** dashboards are activated depending on the databases selected by the user.

## Project Structure

```
.
├── frontend/                    # React Application
│   ├── src/
│   │   ├── components/          # React components (SwitchToggle, Forms, etc.)
│   │   └── App.js               # Main React entry point
│   └── public/                  # Static files
├── backend/                     # Upcoming: Spring Boot backend
├── docker-compose.yml           # Docker Compose configuration
├── prometheus.yml               # Prometheus configuration
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

### 3. Run Services with Docker Compose

```bash
docker-compose up -d
```

This will start the following services:
- **Grafana**: Accessible at `http://localhost:3000` (username: `admin`, password: `admin`).
- **Prometheus**: Accessible at `http://localhost:9090`.
- **PostgreSQL Exporter**: Accessible at `http://localhost:9187`.
- **MongoDB Exporter**: Accessible at `http://localhost:9216`.

### 4. Configure Grafana

1. Access **Grafana** at `http://localhost:3000`.
2. Log in using the credentials (`admin/admin`).
3. Add **Prometheus** as a data source:
   - URL: `http://prometheus:9090`.
4. Import the relevant dashboard to view metrics for the selected databases.

### 5. Next Steps

The next step in development is to integrate the **Spring Boot** backend to handle dynamic database connections and automatically configure the Prometheus exporters based on the user-provided credentials.

## Contribution

This is an open-source project, and contributions are welcome! If you would like to contribute, follow these steps:

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push your branch (`git push origin feature/new-feature`).
5. Open a **Pull Request** for review.

## Project Status

This project is under development, and some of the described features are still in progress.

Upcoming features include:
- Full integration with **Spring Boot**.
- Enhanced configuration and customization of **Grafana** dashboards for each database.
- Support for more databases and monitoring systems.

## License

This project is licensed under the [Apache License](LICENSE).
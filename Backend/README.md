# Security Monitoring API

This project is an API for monitoring connections to databases such as PostgreSQL, MariaDB, MongoDB, and additional services like Prometheus and Grafana, using Spring Boot. The API allows the configuration, storage, and update of database credentials, installation of Prometheus exporters, and execution of Docker Compose commands to start containers with these configurations.

## Features

- **Connection Configuration**: Manages connections for multiple databases, allowing saving and updating credentials.
- **Docker Compatibility**: Executes Docker Compose commands to initialize PostgreSQL databases using the configured credentials.
- **Prometheus Exporter Installation**: Allows configuring Prometheus exporters for PostgreSQL, MongoDB, and MariaDB.
- **Grafana Installation**: Manages the configuration and installation of Grafana.
- **Basic Authentication**: Implements basic security using Spring Security and BCrypt for password encoding.
- **Connection Testing**: Provides utilities to test the connection to configured databases.
- **Installation Status**: Allows querying the installation status, including whether it's complete or not.

## Technologies Used

- **Java 17**
- **Spring Boot 3**
- **Spring Security**: For security configuration.
- **JPA / Hibernate**: For data persistence.
- **Docker**: For handling databases via Docker Compose.
- **Lombok**: To reduce boilerplate code.

## Project Structure

- **Controllers**: Contains the REST controllers for managing connections, installations, and exporters.
  - **ConnectionNameController**: Manages connections, including fetching, storing, and updating credentials.
  - **ConfigInstallController**: Manages service installation and configuration, checking installation status, and updating parameters.
  - **ExporterPrometheusInstallController**: Manages the configuration and installation of Prometheus exporters for PostgreSQL, MariaDB, and MongoDB.
  - **GrafanaInstallController**: Manages the installation and configuration of Grafana.
  - **PrometheusInstallController**: Manages the installation and configuration of Prometheus.
  - **UserInstallController**: Manages the installation and configuration of users.

- **Models**: Defines the entities representing connections, credentials, and installation configurations.
  - **ConnectionName**: Entity representing a database connection.
  - **InstallationConfig**: Entity representing the installation configuration for services such as Grafana and Prometheus.
  - **PostgresCredentials, MariaDBCredentials, MongoDBCredentials**: Represent credentials for the different databases.
  - **SystemParameters**: Entity representing system parameters, such as those used to define installation status.

- **Services**: Contains the business logic.
  - **ConnectionNameService**: Provides operations to fetch, save, and update connections.
  - **DockerService**: Executes Docker Compose commands to start PostgreSQL containers with the provided credentials.
  - **PostgresCredentialsService**: Manages PostgreSQL credentials and runs Docker Compose for the databases.
  - **ConfigInstallService**: Manages system installations and checks installation status.
  - **PrometheusExporterInstallService**: Manages the installation and update of Prometheus exporters.
  - **GrafanaInstallService**: Manages the installation and update of Grafana.
  - **PrometheusInstallService**: Manages the installation and update of Prometheus.
  - **UserInstallService**: Manages the installation of users.

- **Repositories**: Interacts with the database using JPA.
  - **ConnectionNameRepository, PostgresCredentialsRepository, MariaDBCredentialsRepository, MongoDBCredentialsRepository**: Repositories for the respective entities.
  - **InstallationConfigRepository**: Manages installation configurations.

- **Security**: Configures basic security using Spring Security.
  - **SecurityConfig**: Allows access to the H2 console and disables CSRF for open endpoints.

- **Utils**: Contains utility classes.
  - **AesEncryptor**: Provides methods to encrypt and decrypt passwords using AES/GCM.
  - **DatabaseUtils**: Provides methods to test database connections.

## Endpoints

### Prometheus Exporter Installation

#### `PUT /api/v1/install/prometheus-exporters`
Updates or saves the configuration of Prometheus exporters for PostgreSQL, MariaDB, and MongoDB.

- **Request Body**:
  ```json
  {
    "postgresPort": 9187,
    "mongoPort": 9216,
    "mariaPort": 9104
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "code": 200,
    "message": "Prometheus exporters updated successfully"
  }
  ```

### Grafana Installation

#### `POST /api/v1/install/grafana`
Saves the Grafana installation configuration.

- **Request Body**:
  ```json
  {
    "usuario": "admin",
    "password": "admin123",
    "internalPort": 3000,
    "externalPort": 8080
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "code": 200,
    "message": "Grafana installation saved successfully",
    "data": {
      "id": 1,
      "internalPort": 3000,
      "externalPort": 8080,
      "usuario": "admin"
    }
  }
  ```

#### `GET /api/v1/install/grafana`
Fetches the Grafana installation configuration.

- **Response**:
  ```json
  {
    "success": true,
    "code": 200,
    "message": "Grafana installation retrieved successfully",
    "data": {
      "id": 1,
      "internalPort": 3000,
      "externalPort": 8080,
      "usuario": "admin"
    }
  }
  ```

### Prometheus Installation

#### `POST /api/v1/install/prometheus`
Saves the Prometheus installation configuration.

- **Request Body**:
  ```json
  {
    "usuario": "prometheus",
    "password": "prometheus123",
    "internalPort": 9090,
    "externalPort": 9090
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "code": 200,
    "message": "Prometheus installation saved successfully"
  }
  ```

#### `GET /api/v1/install/prometheus`
Fetches the Prometheus installation configuration.

- **Response**:
  ```json
  {
    "success": true,
    "code": 200,
    "message": "Prometheus installation retrieved successfully",
    "data": {
      "id": 1,
      "internalPort": 9090,
      "externalPort": 9090,
      "usuario": "prometheus"
    }
  }
  ```

### User Installation

#### `POST /api/v1/install/user`
Saves the user installation configuration.

- **Request Body**:
  ```json
  {
    "nombreUsuario": "user1",
    "password": "userpass"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "code": 200,
    "message": "User registration saved successfully"
  }
  ```

### Installation Status

#### `GET /api/v1/install/status`
Checks if the installation is complete.

- **Response**:
  ```json
  {
    "success": true,
    "code": 200,
    "message": "Installation status retrieved successfully",
    "data": true
  }
  ```

#### `PUT /api/v1/install/complete`
Updates the installation status to complete.

- **Response**:
  ```json
  {
    "success": true,
    "code": 200,
    "message": "COMPLETE_INSTALL parameter updated successfully"
  }
  ```

## Configuration

### Prerequisites

- Docker and Docker Compose must be installed to run Docker services correctly.
- PostgreSQL, MariaDB, or MongoDB must be properly configured for connection testing.

### Environment Variables

- POSTGRES_USER: PostgreSQL database user.
- POSTGRES_PASSWORD: PostgreSQL database password.
- POSTGRES_HOST: PostgreSQL database host.
- POSTGRES_PORT_HOST: PostgreSQL host port.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Anyel-ec/SecurityMonitoring/Backend
```

2. Configure your `application.properties` file or use an `.env` file for the database credentials.

3. Run the application:

```bash
./mvnw spring-boot:run
```

4. Access the API at [http://localhost:8080](http://localhost:8080).

## Running Docker Compose

To run Docker Compose with the configured PostgreSQL credentials, ensure you have the `docker-compose.yml` file set up in the path indicated in `DockerService.java`.

## Testing

- To test the database connection, you can use the provided endpoints. The response will indicate whether the connection was successful or not.

## Contributions

If you wish to contribute to this project, please open an issue or submit a pull request.

## License

This project is licensed under the [Apache License 2.0](LICENSE).


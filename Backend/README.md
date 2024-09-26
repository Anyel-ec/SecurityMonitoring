# Security Monitoring API

This project is a connection monitoring API for databases like PostgreSQL, MariaDB, and MongoDB, built using Spring Boot. It allows the configuration, storage, and updating of database credentials, as well as executing Docker Compose commands to start containers with these configurations.

## Features

- **Connection Configuration**: Manages connections for various databases, allowing the storage and updating of credentials.
- **Docker Compatibility**: Executes Docker Compose commands to initialize PostgreSQL databases using the configured credentials.
- **Basic Authentication**: Implements basic security using Spring Security and password encoding with BCrypt.
- **Connection Testing**: Provides utilities to test the connection to configured databases.

## Technologies Used

- **Java 17**
- **Spring Boot 3**
- **Spring Security**: For security configuration.
- **JPA / Hibernate**: For data persistence.
- **Docker**: For managing databases through Docker Compose.
- **Lombok**: To reduce boilerplate code.

## Project Structure

- **Controllers**: Contains the REST controllers for managing connections and credentials.
  - `ConnectionNameController`: Manages connections, including retrieving, storing, and updating credentials.
  
- **Models**: Defines the entities representing connections and credentials.
  - `ConnectionName`: Entity representing a database connection.
  - `PostgresCredentials`, `MariaDBCredentials`, `MongoDBCredentials`: Represent credentials for various databases.
  
- **Services**: Contains the business logic.
  - `ConnectionNameService`: Provides operations to retrieve, store, and update connections.
  - `DockerService`: Executes Docker Compose commands to bring up PostgreSQL containers with the provided credentials.
  - `PostgresCredentialsService`: Manages PostgreSQL credentials and executes Docker Compose for databases.
  
- **Repositories**: Interacts with the database using JPA.
  - `ConnectionNameRepository`, `PostgresCredentialsRepository`, `MariaDBCredentialsRepository`, `MongoDBCredentialsRepository`: Repositories for their respective entities.

- **Security**: Configures basic security using Spring Security.
  - `SecurityConfig`: Allows access to the H2 console and disables CSRF for open endpoints.

- **Utils**: Contains utility classes.
  - `DatabaseUtils`: Provides methods to test database connections.

## Endpoints

### GET `/api/v1/connection/name/{connectionName}`
Configures a PostgreSQL connection based on the connection name.

- **Path Variable**: `connectionName` - The name of the connection.
- **Response**: Returns the PostgreSQL credentials configured for that connection.

### GET `/api/v1/connection/names`
Retrieves all the configured connection names.

- **Response**: Returns a list of connection names.

### POST `/api/v1/connection/save`
Saves or updates a database connection.

- **Request Body**: `ConnectionName` - The connection data to be saved or updated.
- **Response**: Returns the status of the operation.

## Configuration

### Prerequisites

- Docker and Docker Compose must be installed to correctly run the Docker service.
- PostgreSQL, MariaDB, or MongoDB must be properly configured for connection testing.

### Environment Variables

- `POSTGRES_USER`: PostgreSQL database user.
- `POSTGRES_PASSWORD`: PostgreSQL database password.
- `POSTGRES_HOST`: PostgreSQL database host.
- `POSTGRES_PORT_HOST`: PostgreSQL host port.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Anyel-ec/SecurityMonitoring****
   ```

2. Configure your `application.properties` file or use a `.env` file for the database credentials.

3. Run the application:

   ```bash
   ./mvnw spring-boot:run
   ```

4. Access the API at `http://localhost:8080`.

## Running Docker Compose

To execute Docker Compose with the configured PostgreSQL credentials, make sure the `docker-compose.yml` file is properly set up in the path specified in `DockerService.java`.

## Testing

- To test the database connection, you can use the provided endpoints. The response will indicate whether the connection was successful or failed.

## Contributions

If you would like to contribute to this project, please open an issue or submit a pull request.

## License

This project is licensed under the [Apache License 2.0](LICENSE).

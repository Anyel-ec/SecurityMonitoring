package ec.edu.espe.security.monitoring.services.impl;

import ec.edu.espe.security.monitoring.dto.request.CreateDatabaseRequestDto;
import ec.edu.espe.security.monitoring.models.credentials.DatabaseCredentials;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.*;

@Service
@Slf4j
@RequiredArgsConstructor
public class CreateDatabaseServiceImpl {

    /**
     * Creates a new database on the specified DBMS server using the provided credentials and database name.
     */
    public boolean createDatabase(CreateDatabaseRequestDto request, String dbType) {
        String jdbcUrl = buildJdbcUrl(request, dbType);

        if (jdbcUrl == null) {
            log.error("Error: Tipo de base de datos no soportado: {}", dbType);
            return false;
        }

        // Validate that the database name contains only letters, numbers, and underscores
        if (!isValidDatabaseName(request.getNameDatabase())) {
            log.error("Error: Nombre de base de datos no válido.");
            return false;
        }

        // Create the SQL query to create the database
        String createDbSql = String.format("CREATE DATABASE %s;", request.getNameDatabase());

        try (Connection connection = DriverManager.getConnection(jdbcUrl, request.getUsername(), request.getPassword());
             Statement statement = connection.createStatement()) {

            statement.executeUpdate(createDbSql);
            log.info("Base de datos '{}' creada exitosamente para el servidor {}", request.getNameDatabase(), dbType);
            return true;
        } catch (SQLException e) {
            log.error("Error al crear la base de datos: {}", e.getMessage());
            return false;
        }
    }

    /**
     * Only allow letters (uppercase and lowercase), numbers, and underscores in the database name
     */
    private boolean isValidDatabaseName(String dbName) {
        return dbName != null && dbName.matches("^[a-zA-Z0-9_]+$");
    }

    /**
     * Build the JDBC URL based on the DBMS type and provided configuration
     */
    private String buildJdbcUrl(DatabaseCredentials config, String dbType) {
        return switch (dbType.toLowerCase()) {
            case "postgresql" -> String.format("jdbc:postgresql://%s:%d/", config.getHost(), config.getPort());
            case "mariadb", "mysql" -> String.format(
                    "jdbc:mysql://%s:%d/?allowPublicKeyRetrieval=true&useSSL=false", config.getHost(), config.getPort());
            default -> null;
        };
    }
}

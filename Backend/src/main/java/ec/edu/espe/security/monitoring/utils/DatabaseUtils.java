package ec.edu.espe.security.monitoring.utils;

import ec.edu.espe.security.monitoring.models.DatabaseCredential;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

@Component
@Slf4j
public class DatabaseUtils {

    /**
     * Tests the connection to a database using the provided credentials and database type.
     */
    public boolean testDatabaseConnection(DatabaseCredential config) {
        if (config.getSystemParameter() == null || config.getSystemParameter().getName() == null) {
            log.error("Error: El tipo de base de datos no está especificado en los parámetros del sistema.");
            return false;
        }

        String dbType = config.getSystemParameter().getName();
        String jdbcUrl = buildJdbcUrl(config, dbType);

        if (jdbcUrl == null) {
            log.error("Error: Tipo de base de datos no soportado: {}", dbType);
            return false;
        }

        try (Connection connection = DriverManager.getConnection(jdbcUrl, config.getUsername(), config.getPassword())) {
            return connection != null && !connection.isClosed();
        } catch (SQLException e) {
            log.error("Error al intentar conectarse al servidor: {}", e.getMessage());
            return false;
        }
    }

    /**
     * Builds the JDBC URL based on the provided database type and credentials.
     */

    /**
     * Builds the JDBC URL based on the provided database type and credentials.
     */
    private String buildJdbcUrl(DatabaseCredential config, String dbType) {
        return switch (dbType.toUpperCase()) {
            case "POSTGRESQL" -> String.format("jdbc:postgresql://%s:%d/", config.getHost(), config.getPort());
            case "MARIADB" -> String.format("jdbc:mariadb://%s:%d/", config.getHost(), config.getPort());
            case "MONGODB" -> String.format("mongodb://%s:%d/", config.getHost(), config.getPort());
            default -> null;
        };
    }
}

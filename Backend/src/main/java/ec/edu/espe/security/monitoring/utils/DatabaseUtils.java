package ec.edu.espe.security.monitoring.utils;

import ec.edu.espe.security.monitoring.models.PostgresCredentials;
import jakarta.validation.constraints.NotNull;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
@Component
public class DatabaseUtils {
    public boolean testDatabaseConnection(@NotNull PostgresCredentials config) {
        String jdbcUrl = String.format("jdbc:postgresql://%s:%d/%s",
                config.getHost(),
                config.getPort(),
                config.getDatabase());
        try (Connection connection = DriverManager.getConnection(jdbcUrl, config.getUsername(), config.getPassword())) {
            return connection != null && !connection.isClosed();
        } catch (SQLException e) {
            System.err.println("Error al intentar conectarse a la base de datos: " + e.getMessage());
            return false;
        }
    }
}

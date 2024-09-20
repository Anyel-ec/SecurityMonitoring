package ec.edu.espe.security.monitoring.utils;

import ec.edu.espe.security.monitoring.models.PostgresCredentials;
import jakarta.validation.constraints.NotNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
@Component
@Slf4j
public class DatabaseUtils {
    public boolean testDatabaseConnection(PostgresCredentials config) {
        String jdbcUrl = String.format("jdbc:postgresql://%s:%d/",
                config.getHost(),
                config.getPort());
        try (Connection connection = DriverManager.getConnection(jdbcUrl, config.getUsername(), config.getPassword())) {
            return connection != null && !connection.isClosed();
        } catch (SQLException e) {
            log.error("Error al intentar conectarse al servidor: {}", e.getMessage());
            return false;
        }
    }

}

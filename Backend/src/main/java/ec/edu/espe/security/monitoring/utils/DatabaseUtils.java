package ec.edu.espe.security.monitoring.utils;

import ec.edu.espe.security.monitoring.models.DatabaseCredentials;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

@Component
@Slf4j
public class DatabaseUtils {

    public boolean testDatabaseConnection(DatabaseCredentials config, String dbType) {
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

    private String buildJdbcUrl(DatabaseCredentials config, String dbType) {
        switch (dbType.toLowerCase()) {
            case "postgresql":
                return String.format("jdbc:postgresql://%s:%d/", config.getHost(), config.getPort());
            case "mariadb":
                return String.format("jdbc:mariadb://%s:%d/", config.getHost(), config.getPort());
            case "mongodb":
                // Para MongoDB, normalmente no se usa JDBC directamente, pero puedes construir la URL estándar
                return String.format("mongodb://%s:%d/", config.getHost(), config.getPort());
            default:
                return null;
        }
    }
}

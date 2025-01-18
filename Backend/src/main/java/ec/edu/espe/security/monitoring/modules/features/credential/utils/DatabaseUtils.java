package ec.edu.espe.security.monitoring.modules.features.credential.utils;


import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import ec.edu.espe.security.monitoring.modules.features.credential.dto.DatabaseCredentialRequestDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 04/11/2024
 */
@Component
@Slf4j
public class DatabaseUtils {

    /**
     * Tests the connection to a database using the provided credentials and database type.
     */
    public boolean testDatabaseConnection(DatabaseCredentialRequestDto config) {
        if (config.getSystemParameter() == null || config.getSystemParameter().getName() == null) {
            log.error("Error: El tipo de base de datos no está especificado en los parámetros del sistema.");
            return false;
        }

        String dbType = config.getSystemParameter().getName();

        if (dbType.equalsIgnoreCase("MONGODB")) {
            return testMongoDBConnection(config);
        } else {
            return testSQLConnection(config, dbType);
        }
    }

    /**
     * Tests the connection to a MongoDB database.
     */
    private boolean testMongoDBConnection(DatabaseCredentialRequestDto config) {
        String uri = String.format("mongodb://%s:%d/", config.getHost(), config.getPort());

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            mongoClient.getDatabase("admin").listCollectionNames();
            log.info("Conexión exitosa a MongoDB en {}:{}", config.getHost(), config.getPort());
            return true;
        } catch (Exception e) {
            log.error("Error al intentar conectarse a MongoDB: {}", e.getMessage());
            return false;
        }
    }

    /**
     * Tests the connection to a MongoDB database.
     */
    private boolean testSQLConnection(DatabaseCredentialRequestDto config, String dbType) {
        String jdbcUrl = buildJdbcUrl(config, dbType);

        if (jdbcUrl == null) {
            log.error("Error: Tipo de base de datos no soportado: {}", dbType);
            return false;
        }

        try (Connection connection = DriverManager.getConnection(jdbcUrl, config.getUsername(), config.getPassword())) {
            return connection != null && !connection.isClosed();
        } catch (SQLException e) {
            log.error("Error al intentar conectarse al servidor SQL: {}", e.getMessage());
            return false;
        }
    }

    /**
     * Builds the JDBC URL based on the provided database type and credentials.
     */
    private String buildJdbcUrl(DatabaseCredentialRequestDto config, String dbType) {
        return switch (dbType.toUpperCase()) {
            case "POSTGRESQL" -> String.format("jdbc:postgresql://%s:%d/", config.getHost(), config.getPort());
            case "MARIADB" -> String.format("jdbc:mariadb://%s:%d/", config.getHost(), config.getPort());
            default -> null;
        };
    }

}

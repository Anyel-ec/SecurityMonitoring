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

    public boolean createDatabase(CreateDatabaseRequestDto request, String dbType) {
        String jdbcUrl = buildJdbcUrl(request, dbType);

        if (jdbcUrl == null) {
            log.error("Error: Tipo de base de datos no soportado: {}", dbType);
            return false;
        }

        // Validar que el nombre de la base de datos contenga solo letras, números y guiones bajos
        if (!isValidDatabaseName(request.getNameDatabase())) {
            log.error("Error: Nombre de base de datos no válido.");
            return false;
        }

        // Crear la consulta para crear la base de datos
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

    private boolean isValidDatabaseName(String dbName) {
        // Solo permite letras (mayúsculas y minúsculas), números y guiones bajos en el nombre de la base de datos
        return dbName != null && dbName.matches("^[a-zA-Z0-9_]+$");
    }


    private String buildJdbcUrl(DatabaseCredentials config, String dbType) {
        return switch (dbType.toLowerCase()) {
            case "postgresql" -> String.format("jdbc:postgresql://%s:%d/", config.getHost(), config.getPort());
            case "mariadb", "mysql" -> String.format(
                    "jdbc:mysql://%s:%d/?allowPublicKeyRetrieval=true&useSSL=false", config.getHost(), config.getPort());
            default -> null;
        };
    }
}
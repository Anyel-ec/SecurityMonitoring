package ec.edu.espe.security.monitoring.services.impl;

import ec.edu.espe.security.monitoring.models.*;
import ec.edu.espe.security.monitoring.repositories.ConnectionNameRepository;
import ec.edu.espe.security.monitoring.repositories.PostgresCredentialsRepository;
import ec.edu.espe.security.monitoring.repositories.MariadbCredentialsRepository;
import ec.edu.espe.security.monitoring.repositories.MongodbCredentialsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DatabaseCredentialsServiceImpl {

    private final PasswordEncoder passwordEncoder;
    private final PostgresCredentialsRepository postgresCredentialsRepository;
    private final MariadbCredentialsRepository mariadbCredentialsRepository;
    private final MongodbCredentialsRepository mongodbCredentialsRepository;
    private final ConnectionNameRepository nameConnectionRepository;
    private final DockerServiceImpl dockerService;

    /**
     * Guardar o actualizar credenciales de cualquier base de datos y ejecutar Docker Compose
     */
    public void saveCredentialsAndRunCompose(DatabaseCredentials credentials, String connectionName, String dbType) throws IOException {
        // Buscar la conexión por el nombre
        Optional<ConnectionName> connectionOpt = nameConnectionRepository.findByConnectionName(connectionName);

        if (connectionOpt.isPresent()) {
            ConnectionName connection = connectionOpt.get();

            // **1.** Ejecutar Docker Compose con las credenciales en texto claro
            dockerService.runDockerCompose(credentials, dbType);

            // **2.** Encriptar la contraseña después de ejecutar Docker
            credentials.setPassword(passwordEncoder.encode(credentials.getPassword()));

            // **3.** Guardar las credenciales según el tipo de base de datos
            saveOrUpdateCredentials(connection, credentials, dbType);
        } else {
            throw new IllegalArgumentException("No se encontró la conexión con nombre: " + connectionName);
        }
    }

    /**
     * Guardar o actualizar credenciales de cualquier tipo de base de datos en la conexión.
     */
    private void saveOrUpdateCredentials(ConnectionName connection, DatabaseCredentials credentials, String dbType) {
        switch (dbType.toLowerCase()) {
            case "postgresql":
                PostgresCredentials postgresCredentials = new PostgresCredentials();
                copyDatabaseCredentials(postgresCredentials, credentials);
                if (connection.getPostgresCredentials() != null) {
                    updateExistingCredentials(connection.getPostgresCredentials(), postgresCredentials);
                } else {
                    connection.setPostgresCredentials(postgresCredentials);
                    postgresCredentialsRepository.save(postgresCredentials);
                }
                break;

            case "mariadb":
                MariadbCredentials mariadbCredentials = new MariadbCredentials();
                copyDatabaseCredentials(mariadbCredentials, credentials);
                if (connection.getMariadbCredentials() != null) {
                    updateExistingCredentials(connection.getMariadbCredentials(), mariadbCredentials);
                } else {
                    connection.setMariadbCredentials(mariadbCredentials);
                    mariadbCredentialsRepository.save(mariadbCredentials);
                }
                break;

            case "mongodb":
                MongodbCredentials mongodbCredentials = new MongodbCredentials();
                copyDatabaseCredentials(mongodbCredentials, credentials);
                if (connection.getMongodbCredentials() != null) {
                    updateExistingCredentials(connection.getMongodbCredentials(), mongodbCredentials);
                } else {
                    connection.setMongodbCredentials(mongodbCredentials);
                    mongodbCredentialsRepository.save(mongodbCredentials);
                }
                break;

            default:
                throw new IllegalArgumentException("Tipo de base de datos no soportado: " + dbType);
        }

        nameConnectionRepository.save(connection);  // Guardar la conexión con las credenciales actualizadas
    }

    /**
     * Actualizar credenciales existentes.
     */
    private void updateExistingCredentials(DatabaseCredentials existingCredentials, DatabaseCredentials newCredentials) {
        existingCredentials.setHost(newCredentials.getHost());
        existingCredentials.setPort(newCredentials.getPort());
        existingCredentials.setUsername(newCredentials.getUsername());
        existingCredentials.setPassword(newCredentials.getPassword());

        if (existingCredentials instanceof PostgresCredentials postgresCredentials) {
            postgresCredentialsRepository.save(postgresCredentials);
        } else if (existingCredentials instanceof MariadbCredentials) {
            mariadbCredentialsRepository.save((MariadbCredentials) existingCredentials);
        } else if (existingCredentials instanceof MongodbCredentials) {
            mongodbCredentialsRepository.save((MongodbCredentials) existingCredentials);
        }
    }

    /**
     * Método auxiliar para copiar las propiedades genéricas de DatabaseCredentials a credenciales específicas
     */
    private void copyDatabaseCredentials(DatabaseCredentials target, DatabaseCredentials source) {
        target.setHost(source.getHost());
        target.setPort(source.getPort());
        target.setUsername(source.getUsername());
        target.setPassword(source.getPassword());
    }
}

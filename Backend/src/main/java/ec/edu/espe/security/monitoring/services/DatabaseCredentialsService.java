package ec.edu.espe.security.monitoring.services;

import ec.edu.espe.security.monitoring.models.ConnectionName;
import ec.edu.espe.security.monitoring.models.DatabaseCredentials;
import ec.edu.espe.security.monitoring.models.PostgresCredentials;
import ec.edu.espe.security.monitoring.models.MariaDBCredentials;
import ec.edu.espe.security.monitoring.models.MongoDBCredentials;
import ec.edu.espe.security.monitoring.repositories.ConnectionNameRepository;
import ec.edu.espe.security.monitoring.repositories.PostgresCredentialsRepository;
import ec.edu.espe.security.monitoring.repositories.MariaDBCredentialsRepository;
import ec.edu.espe.security.monitoring.repositories.MongoDBCredentialsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DatabaseCredentialsService {

    private final PasswordEncoder passwordEncoder;
    private final PostgresCredentialsRepository postgresCredentialsRepository;
    private final MariaDBCredentialsRepository mariadbCredentialsRepository;
    private final MongoDBCredentialsRepository mongodbCredentialsRepository;
    private final ConnectionNameRepository nameConnectionRepository;
    private final DockerService dockerService;

    /**
     * Guardar o actualizar credenciales de cualquier base de datos y ejecutar Docker Compose
     */
    public void saveCredentialsAndRunCompose(DatabaseCredentials credentials, String connectionName, String dbType) throws IOException {
        // Buscar la conexión por el nombre
        Optional<ConnectionName> connectionOpt = nameConnectionRepository.findByConnectionName(connectionName);

        if (connectionOpt.isPresent()) {
            ConnectionName connection = connectionOpt.get();

            // Guardar las credenciales según el tipo de base de datos
            saveOrUpdateCredentials(connection, credentials, dbType);

            // Ejecutar Docker Compose con las credenciales proporcionadas o actualizadas
            dockerService.runDockerCompose(credentials, dbType);
        } else {
            throw new IllegalArgumentException("No se encontró la conexión con nombre: " + connectionName);
        }
    }

    /**
     * Guardar o actualizar credenciales de cualquier tipo de base de datos en la conexión.
     */
    private void saveOrUpdateCredentials(ConnectionName connection, DatabaseCredentials credentials, String dbType) {
        // Encriptar la contraseña antes de guardar
        credentials.setPassword(passwordEncoder.encode(credentials.getPassword()));

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
                MariaDBCredentials mariadbCredentials = new MariaDBCredentials();
                copyDatabaseCredentials(mariadbCredentials, credentials);
                if (connection.getMariadbCredentials() != null) {
                    updateExistingCredentials(connection.getMariadbCredentials(), mariadbCredentials);
                } else {
                    connection.setMariadbCredentials(mariadbCredentials);
                    mariadbCredentialsRepository.save(mariadbCredentials);
                }
                break;

            case "mongodb":
                MongoDBCredentials mongodbCredentials = new MongoDBCredentials();
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

        // Guardar según el tipo de credenciales (No necesitas el repositorio genérico, usa los repositorios específicos)
        if (existingCredentials instanceof PostgresCredentials) {
            postgresCredentialsRepository.save((PostgresCredentials) existingCredentials);
        } else if (existingCredentials instanceof MariaDBCredentials) {
            mariadbCredentialsRepository.save((MariaDBCredentials) existingCredentials);
        } else if (existingCredentials instanceof MongoDBCredentials) {
            mongodbCredentialsRepository.save((MongoDBCredentials) existingCredentials);
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

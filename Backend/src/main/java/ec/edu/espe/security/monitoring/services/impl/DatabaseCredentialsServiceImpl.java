package ec.edu.espe.security.monitoring.services.impl;

import ec.edu.espe.security.monitoring.models.*;
import ec.edu.espe.security.monitoring.models.credentials.DatabaseCredentials;
import ec.edu.espe.security.monitoring.models.credentials.MariadbCredentials;
import ec.edu.espe.security.monitoring.models.credentials.MongodbCredentials;
import ec.edu.espe.security.monitoring.models.credentials.PostgresCredentials;
import ec.edu.espe.security.monitoring.repositories.ConnectionNameRepository;
import ec.edu.espe.security.monitoring.repositories.PostgresCredentialsRepository;
import ec.edu.espe.security.monitoring.repositories.MariadbCredentialsRepository;
import ec.edu.espe.security.monitoring.repositories.MongodbCredentialsRepository;
import ec.edu.espe.security.monitoring.services.impl.docker.DockerComposeServiceImpl;
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
    private final DockerComposeServiceImpl dockerService;

    /**
     * Save or update credentials for any database and run Docker Compose
     */
    public void saveCredentialsAndRunCompose(DatabaseCredentials credentials, String connectionName, String dbType) throws IOException {
        // Search for the connection by name
        Optional<ConnectionName> connectionOpt = nameConnectionRepository.findByConnectionName(connectionName);

        if (connectionOpt.isPresent()) {
            ConnectionName connection = connectionOpt.get();

            // **1.** Run Docker Compose with the credentials in plain text
            dockerService.runDockerComposeWithDatabase(credentials, dbType);

            // **2.** Encrypt the password after running Docker
            credentials.setPassword(passwordEncoder.encode(credentials.getPassword()));

            // **3.** Save the credentials based on the database type
            saveOrUpdateCredentials(connection, credentials, dbType);
        } else {
            throw new IllegalArgumentException("No connection found with name: " + connectionName);
        }
    }

    /**
     * Save or update credentials for any database type in the connection.
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

        nameConnectionRepository.save(connection);  // Save the connection with updated credentials
    }

    /**
     * Update existing credentials.
     */
    private void updateExistingCredentials(DatabaseCredentials existingCredentials, DatabaseCredentials newCredentials) {
        existingCredentials.setHost(newCredentials.getHost());
        existingCredentials.setPort(newCredentials.getPort());
        existingCredentials.setUsername(newCredentials.getUsername());
        existingCredentials.setPassword(newCredentials.getPassword());

        if (existingCredentials instanceof PostgresCredentials postgresCredentials) {
            postgresCredentialsRepository.save(postgresCredentials);
        } else if (existingCredentials instanceof MariadbCredentials mariadbCredentials) {
            mariadbCredentialsRepository.save(mariadbCredentials);
        } else if (existingCredentials instanceof MongodbCredentials mongodbCredentials) {
            mongodbCredentialsRepository.save(mongodbCredentials);
        }
    }


    /**
     * Helper method to copy generic properties from DatabaseCredentials to specific credentials
     */
    private void copyDatabaseCredentials(DatabaseCredentials target, DatabaseCredentials source) {
        target.setHost(source.getHost());
        target.setPort(source.getPort());
        target.setUsername(source.getUsername());
        target.setPassword(source.getPassword());
    }
}

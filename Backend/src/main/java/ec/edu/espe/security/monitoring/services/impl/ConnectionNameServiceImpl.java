package ec.edu.espe.security.monitoring.services.impl;

import ec.edu.espe.security.monitoring.models.ConnectionName;
import ec.edu.espe.security.monitoring.models.credentials.PostgresCredentials;
import ec.edu.espe.security.monitoring.repositories.ConnectionNameRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ConnectionNameServiceImpl {
    private final ConnectionNameRepository connectionNameRepository;

    /**
     * Retrieves a list of all connection names from the database.
     */
    public List<ConnectionName> getAllConnectionNames() {
        return connectionNameRepository.findAll();
    }

    /**
     * Deletes a connection from the database by its ID.
     **/
    public void deleteConnectionById(Long id) {
        connectionNameRepository.deleteById(id);
    }

    /**
     * Method to get PostgreSQL credentials based on the connection name
     */
    public PostgresCredentials getCredentialsByProfile(String connectionName) {
        // Find the connection by name using the repository
        Optional<ConnectionName> connectionOpt = connectionNameRepository.findByConnectionName(connectionName);

        if (connectionOpt.isEmpty() || connectionOpt.get().getPostgresCredentials() == null) {
            throw new IllegalArgumentException("Perfil o credenciales de PostgreSQL no encontrados para la conexión: " + connectionName);
        }

        // Return the PostgreSQL credentials associated with the connection
        return connectionOpt.get().getPostgresCredentials();
    }

    /**
     * Method to save or update a connection
     */
    public ConnectionName saveOrUpdateConnection(ConnectionName newConnection) {
        // Check if a connection with the same name already exists
        Optional<ConnectionName> existingConnectionOpt = connectionNameRepository.findByConnectionName(newConnection.getConnectionName());

        if (existingConnectionOpt.isPresent()) {
            // If the connection already exists, update the existing fields
            ConnectionName existingConnection = existingConnectionOpt.get();

            // Update credentials if new ones are provided
            if (newConnection.getPostgresCredentials() != null) {
                existingConnection.setPostgresCredentials(newConnection.getPostgresCredentials());
            }
            if (newConnection.getMariadbCredentials() != null) {
                existingConnection.setMariadbCredentials(newConnection.getMariadbCredentials());
            }
            if (newConnection.getMongodbCredentials() != null) {
                existingConnection.setMongodbCredentials(newConnection.getMongodbCredentials());
            }

            // Update the comment if necessary
            if (newConnection.getComment() != null) {
                existingConnection.setComment(newConnection.getComment());
            }

            // Update the last connection time
            existingConnection.setLastConnection(newConnection.getLastConnection());

            // Save the updated connection in the database
            return connectionNameRepository.save(existingConnection);
        } else {
            // If not, create a new connection
            return connectionNameRepository.save(newConnection);
        }
    }
}

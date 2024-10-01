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
    public List<ConnectionName> getAllConnectionNames() {
        return connectionNameRepository.findAll();
    }

    // Método para obtener las credenciales de PostgreSQL basadas en el nombre de la conexión
    public PostgresCredentials getCredentialsByProfile(String connectionName) {
        // Buscar la conexión por nombre usando el repositorio
        Optional<ConnectionName> connectionOpt = connectionNameRepository.findByConnectionName(connectionName);

        if (connectionOpt.isEmpty() || connectionOpt.get().getPostgresCredentials() == null) {
            throw new IllegalArgumentException("No se encontró el perfil o las credenciales de PostgreSQL para la conexión: " + connectionName);
        }

        // Devolver las credenciales de PostgreSQL asociadas a la conexión
        return connectionOpt.get().getPostgresCredentials();
    }


    // Método para guardar o actualizar una conexión
    public ConnectionName saveOrUpdateConnection(ConnectionName newConnection) {
        // Buscar si ya existe una conexión con el mismo nombre
        Optional<ConnectionName> existingConnectionOpt = connectionNameRepository.findByConnectionName(newConnection.getConnectionName());

        if (existingConnectionOpt.isPresent()) {
            // Si la conexión ya existe, actualizar los campos existentes
            ConnectionName existingConnection = existingConnectionOpt.get();

            // Actualizar las credenciales si se proporcionan nuevas
            if (newConnection.getPostgresCredentials() != null) {
                existingConnection.setPostgresCredentials(newConnection.getPostgresCredentials());
            }
            if (newConnection.getMariadbCredentials() != null) {
                existingConnection.setMariadbCredentials(newConnection.getMariadbCredentials());
            }
            if (newConnection.getMongodbCredentials() != null) {
                existingConnection.setMongodbCredentials(newConnection.getMongodbCredentials());
            }

            // Actualizar el comentario si es necesario
            if (newConnection.getComment() != null) {
                existingConnection.setComment(newConnection.getComment());
            }

            // Actualizar el tiempo de la última conexión
            existingConnection.setLastConnection(newConnection.getLastConnection());

            // Guardar la conexión actualizada en la base de datos
            return connectionNameRepository.save(existingConnection);
        } else {
            // Si no existe, crear una nueva conexión
            return connectionNameRepository.save(newConnection);
        }
    }

    public void deleteConnectionById(Long id) {
        connectionNameRepository.deleteById(id);
    }

}

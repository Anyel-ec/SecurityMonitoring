package ec.edu.espe.security.monitoring.services;

import ec.edu.espe.security.monitoring.models.ConnectionName;
import ec.edu.espe.security.monitoring.models.PostgresCredentials;
import ec.edu.espe.security.monitoring.repositories.ConnectionNameRepository;
import ec.edu.espe.security.monitoring.repositories.PostgresCredentialsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostgresCredentialsService {

    private final PasswordEncoder passwordEncoder;
    private final PostgresCredentialsRepository postgresCredentialsRepository;
    private final ConnectionNameRepository nameConnectionRepository;
    private final DockerService dockerService;

    /// Guardar o actualizar credenciales de PostgreSQL y ejecutar Docker Compose
    public void saveCredentialsAndRunCompose(PostgresCredentials credentials, String connectionName) throws IOException {
        // Buscar la conexión por el nombre
        Optional<ConnectionName> connectionOpt = nameConnectionRepository.findByConnectionName(connectionName);

        if (connectionOpt.isPresent()) {
            ConnectionName connection = connectionOpt.get();

            if (connection.getPostgresCredentials() != null) {
                // Actualizar las credenciales existentes
                PostgresCredentials existingCredentials = connection.getPostgresCredentials();
                existingCredentials.setPassword(passwordEncoder.encode(credentials.getPassword()));
                existingCredentials.setHost(credentials.getHost());
                existingCredentials.setPort(credentials.getPort());

                postgresCredentialsRepository.save(existingCredentials);  // Actualizar en la base de datos
            } else {
                // Si no hay credenciales previas, asignar nuevas credenciales
                credentials.setPassword(passwordEncoder.encode(credentials.getPassword()));
                postgresCredentialsRepository.save(credentials);
                connection.setPostgresCredentials(credentials);  // Asignar las credenciales a la conexión
                nameConnectionRepository.save(connection);  // Guardar la conexión con las credenciales
            }

            // Ejecutar Docker Compose con las credenciales proporcionadas o actualizadas
            dockerService.runDockerCompose(credentials);
        } else {
            throw new IllegalArgumentException("No se encontró la conexión con nombre: " + connectionName);
        }
    }
}
package ec.edu.espe.security.monitoring.services;

import ec.edu.espe.security.monitoring.models.PostgresCredentials;
import ec.edu.espe.security.monitoring.repositories.PostgresCredentialsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class PostgresCredentialsService {

    private final PasswordEncoder passwordEncoder;
    private final PostgresCredentialsRepository postgresCredentialsRepository;
    private final DockerCredentialService dockerComposeService;  // Asumo que este es el servicio para ejecutar Docker Compose

    public PostgresCredentials getCredentialsByProfile(String profile) {
        return postgresCredentialsRepository.findByConnectionName(profile)
                .orElseThrow(() -> new IllegalArgumentException("No se encontró el perfil: " + profile));
    }

    public void saveCredentialsAndRunCompose(PostgresCredentials credentials) throws IOException {
        // Buscar si ya existe una entrada para el mismo connectionName
        PostgresCredentials existingCredentials = postgresCredentialsRepository.findByConnectionName(credentials.getConnectionName()).orElse(null);

        if (existingCredentials != null) {
            // Si existe, actualizar las credenciales
            existingCredentials.setPassword(passwordEncoder.encode(credentials.getPassword()));
            existingCredentials.setHost(credentials.getHost());
            existingCredentials.setPort(credentials.getPort());
            existingCredentials.setDatabase(credentials.getDatabase());
            existingCredentials.setComment(credentials.getComment());

            postgresCredentialsRepository.save(existingCredentials);  // Actualizar en la base de datos
        } else {
            // Si no existe, encriptar la contraseña y guardar las nuevas credenciales
            credentials.setPassword(passwordEncoder.encode(credentials.getPassword()));
            postgresCredentialsRepository.save(credentials);  // Guardar nuevas credenciales en la base de datos
        }

        // Ejecutar Docker Compose con las credenciales proporcionadas o actualizadas
        dockerComposeService.runDockerCompose(credentials);
    }
}
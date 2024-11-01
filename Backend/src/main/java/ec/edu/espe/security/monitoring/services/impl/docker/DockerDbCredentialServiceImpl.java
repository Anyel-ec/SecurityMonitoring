package ec.edu.espe.security.monitoring.services.impl.docker;

import ec.edu.espe.security.monitoring.models.DatabaseCredential;
import ec.edu.espe.security.monitoring.repositories.DatabaseCredentialRepository;
import ec.edu.espe.security.monitoring.services.interfaces.docker.DockerDbCredentialService;
import ec.edu.espe.security.monitoring.utils.AesEncryptor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class DockerDbCredentialServiceImpl implements DockerDbCredentialService {
    // Injected dependencies
    private final DatabaseCredentialRepository databaseCredentialRepository;
    private final DockerInstallationServiceImpl dockerInstallationService;

    /**
     * Runs a Docker Compose process to set up a database container based on the provided DBMS type and credentials.
     */
    @Override
    public void runDockerComposeWithDatabase() {


        try {
            dockerInstallationService.runDockerComposeWithActiveInstallations();
            log.info("Docker Compose ejecutado con las credenciales de base de datos activas.");
        } catch (IOException e) {
            log.error("Error al ejecutar Docker Compose con credenciales de base de datos: {}", e.getMessage());
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Error al ejecutar Docker Compose con credenciales de base de datos", e);
        }
    }
}

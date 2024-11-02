package ec.edu.espe.security.monitoring.services.impl.docker;

import ec.edu.espe.security.monitoring.models.DatabaseCredential;
import ec.edu.espe.security.monitoring.models.InstallationConfig;
import ec.edu.espe.security.monitoring.repositories.DatabaseCredentialRepository;
import ec.edu.espe.security.monitoring.repositories.InstallationConfigRepository;
import ec.edu.espe.security.monitoring.services.interfaces.docker.DockerDbCredentialService;
import ec.edu.espe.security.monitoring.utils.AesEncryptorUtil;
import ec.edu.espe.security.monitoring.utils.DockerEnvironmentUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

import static ec.edu.espe.security.monitoring.utils.PrometheusConfigUtil.generatePrometheusConfig;

@Service
@Slf4j
@RequiredArgsConstructor
public class DockerDbCredentialServiceImpl implements DockerDbCredentialService {

    // Injected dependencies
    private final InstallationConfigRepository installationConfigRepository;
    private final DatabaseCredentialRepository databaseCredentialRepository;
    private final AesEncryptorUtil aesEncryptor;

    /**
     * Runs a Docker Compose process to set up a database container based on the provided DBMS type and credentials.
     */
    @Override
    public void runDockerComposeWithDatabase() {
        try {
            List<DatabaseCredential> activeCredentials = databaseCredentialRepository.findByIsActiveTrue();
            List<InstallationConfig> activeInstallations = installationConfigRepository.findByIsActiveTrue();

            // Paths to the Prometheus configuration files
            String templatePath = "../.container/prometheus.template.yml";
            String outputPath = "../.container/prometheus.yml";

            // Generate the prometheus.yml file dynamically with environment variables
            generatePrometheusConfig(activeInstallations, templatePath, outputPath);

            if (activeCredentials.isEmpty()) {
                log.warn("No se encontraron credenciales de base de datos activas. No se ejecutará Docker Compose.");
                return;
            }

            ProcessBuilder processBuilder = new ProcessBuilder(
                    "docker-compose",
                    "-f", "../.container/docker-compose.yml",
                    "up", "-d"
            );

            for (InstallationConfig config : activeInstallations) {
                String decryptedPassword = DockerEnvironmentUtil.decryptPassword(config.getPassword(), aesEncryptor);
                DockerEnvironmentUtil.configureInstallationEnv(processBuilder, config, decryptedPassword);
            }

            for (DatabaseCredential config : activeCredentials) {
                String decryptedPassword = DockerEnvironmentUtil.decryptPassword(config.getPassword(), aesEncryptor);
                DockerEnvironmentUtil.configureDatabaseEnv(processBuilder, config, decryptedPassword);
            }

            // Start the Docker Compose process
            processBuilder.inheritIO().start();
            log.info("Docker Compose ejecutado exitosamente con las credenciales de base de datos activas.");

        } catch (IOException e) {
            log.error("Error al ejecutar Docker Compose: {}", e.getMessage());
            throw new IllegalStateException("Error al ejecutar Docker Compose con credenciales de base de datos", e);
        } catch (Exception e) {
            log.error("Error inesperado al configurar el entorno Docker Compose: {}", e.getMessage());
            throw new IllegalStateException("Error inesperado en la configuración del entorno Docker Compose", e);
        }
    }
}
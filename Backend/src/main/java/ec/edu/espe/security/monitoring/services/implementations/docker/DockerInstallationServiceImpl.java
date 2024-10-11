package ec.edu.espe.security.monitoring.services.implementations.docker;

import ec.edu.espe.security.monitoring.models.InstallationConfig;
import ec.edu.espe.security.monitoring.repositories.InstallationConfigRepository;
import ec.edu.espe.security.monitoring.services.interfaces.docker.DockerInstallationService;
import ec.edu.espe.security.monitoring.utils.AesEncryptor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class DockerInstallationServiceImpl implements DockerInstallationService {
    private final InstallationConfigRepository installationConfigRepository;
    private final AesEncryptor aesEncryptor;

    /**
     * Runs a Docker Compose process to set up the services based on the active installation configurations.
     */
    public void runDockerComposeWithActiveInstallations() throws IOException {
        // Retrieve all active installations
        List<InstallationConfig> activeInstallations = installationConfigRepository.findByIsActiveTrue();

        // Create the ProcessBuilder for docker-compose
        ProcessBuilder processBuilder = new ProcessBuilder(
                "docker-compose",
                "-f", "../.container/docker-compose.yml",
                "up", "-d"
        );

        // Configure the environment variables based on the active installations
        for (InstallationConfig config : activeInstallations) {
            String decryptedPassword = null;
            try {
                if (config.getPassword() != null) {
                    decryptedPassword = aesEncryptor.decrypt(config.getPassword());
                }
            } catch (Exception e) {
                log.error("Error decrypting the password for the installation with ID: {}", config.getId(), e);
                throw new IllegalStateException("Error decrypting the password", e);
            }

            // Only configure environment variables for known installation types
            if ("GRAFANA_INSTALL".equals(config.getSystemParameter().getName())) {
                addEnvVariable(processBuilder, "GRAFANA_PORT_EXTERNAL", String.valueOf(config.getExternalPort()));
                addEnvVariable(processBuilder, "GRAFANA_PORT_INTERNAL", String.valueOf(config.getInternalPort()));
                addEnvVariable(processBuilder, "GRAFANA_USER", config.getUsuario());
                addEnvVariable(processBuilder, "GRAFANA_PASSWORD", decryptedPassword);
            } else if ("PROMETHEUS_INSTALL".equals(config.getSystemParameter().getName())) {
                addEnvVariable(processBuilder, "PROMETHEUS_PORT_EXTERNAL", String.valueOf(config.getExternalPort()));
                addEnvVariable(processBuilder, "PROMETHEUS_PORT_INTERNAL", String.valueOf(config.getInternalPort()));
            } else if ("PROMETHEUS_EXPORTER_POSTGRESQL".equals(config.getSystemParameter().getName())) {
                addEnvVariable(processBuilder, "EXPORT_POSTGRES_PORT_EXTERNAL", String.valueOf(config.getExternalPort()));
                addEnvVariable(processBuilder, "EXPORT_POSTGRES_PORT_INTERNAL", String.valueOf(config.getInternalPort()));
                addEnvVariable(processBuilder, "POSTGRES_USER", config.getUsuario());
                addEnvVariable(processBuilder, "POSTGRES_PASSWORD", decryptedPassword);
            } else {
                log.warn("No environment variables configured for the parameter: {}", config.getSystemParameter().getName());
            }
        }

        // Execute docker-compose
        processBuilder.inheritIO().start();
    }

    /**
     * Adds environment variable to the ProcessBuilder and logs the value.
     */
    private void addEnvVariable(ProcessBuilder processBuilder, String key, String value) {
        if (value != null && !value.isEmpty()) {
            processBuilder.environment().put(key, value);
            log.info("Setting environment variable: {} = {}", key, value);  // Log the environment variable
        } else {
            log.warn("Environment variable {} not set because value is null or empty", key);
        }
    }

}

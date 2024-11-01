package ec.edu.espe.security.monitoring.services.impl.docker;

import ec.edu.espe.security.monitoring.models.DatabaseCredential;
import ec.edu.espe.security.monitoring.models.InstallationConfig;
import ec.edu.espe.security.monitoring.repositories.DatabaseCredentialRepository;
import ec.edu.espe.security.monitoring.repositories.InstallationConfigRepository;
import ec.edu.espe.security.monitoring.services.interfaces.docker.DockerInstallationService;
import ec.edu.espe.security.monitoring.utils.AesEncryptor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

import static ec.edu.espe.security.monitoring.utils.DockerUtils.*;
import static ec.edu.espe.security.monitoring.utils.PrometheusUtils.generatePrometheusConfig;

@Service
@Slf4j
@RequiredArgsConstructor
public class DockerInstallationServiceImpl implements DockerInstallationService {
    private final InstallationConfigRepository installationConfigRepository;
    private final DatabaseCredentialRepository databaseCredentialRepository;
    private final AesEncryptor aesEncryptor;



    /**
     * Runs a Docker Compose process to set up the services based on the active installation configurations.
     */


    public void runDockerComposeWithActiveInstallations() throws IOException {
        List<DatabaseCredential> activeCredentials = databaseCredentialRepository.findByIsActiveTrue();

        if (activeCredentials.isEmpty()) {
            log.warn("No se encontraron credenciales de base de datos activas. No se ejecutará Docker Compose.");
            return;
        }

        // Retrieve all active installations
        List<InstallationConfig> activeInstallations = installationConfigRepository.findByIsActiveTrue();

        // Generate the prometheus.yml file dynamically with environment variables
        generatePrometheusConfig(activeInstallations);

        // Create the ProcessBuilder for docker-compose
        ProcessBuilder dockerComposeProcessBuilder = new ProcessBuilder(
                "docker-compose",
                "-f", "../.container/docker-compose.yml",
                "up", "-d"
        );

        // Configure the environment variables based on the active installations
        for (InstallationConfig config : activeInstallations) {
            String decryptedPassword = decryptPassword(config.getPassword(), config.getId());
            // Only configure environment variables for known installation types
            if ("GRAFANA_INSTALL".equals(config.getSystemParameter().getName())) {
                addEnvVariable(dockerComposeProcessBuilder, "GRAFANA_PORT_EXTERNAL", String.valueOf(config.getExternalPort()));
                addEnvVariable(dockerComposeProcessBuilder, "GRAFANA_PORT_INTERNAL", String.valueOf(config.getInternalPort()));
                addEnvVariable(dockerComposeProcessBuilder, "GRAFANA_USER", config.getUsername());
                addEnvVariable(dockerComposeProcessBuilder, "GRAFANA_PASSWORD", decryptedPassword);
            } else if ("PROMETHEUS_INSTALL".equals(config.getSystemParameter().getName())) {
                addEnvVariable(dockerComposeProcessBuilder, "PROMETHEUS_PORT_EXTERNAL", String.valueOf(config.getExternalPort()));
                addEnvVariable(dockerComposeProcessBuilder, "PROMETHEUS_PORT_INTERNAL", String.valueOf(config.getInternalPort()));
            } else if ("PROMETHEUS_EXPORTER_POSTGRESQL".equals(config.getSystemParameter().getName())) {
                addEnvVariable(dockerComposeProcessBuilder, "EXPORT_POSTGRES_PORT_EXTERNAL", String.valueOf(config.getExternalPort()));
                addEnvVariable(dockerComposeProcessBuilder, "EXPORT_POSTGRES_PORT_INTERNAL", String.valueOf(config.getInternalPort()));
                addEnvVariable(dockerComposeProcessBuilder, "POSTGRES_USER", config.getUsername());
                addEnvVariable(dockerComposeProcessBuilder, "POSTGRES_PASSWORD", decryptedPassword);
            } else {
                log.warn("No environment variables configured for the parameter: {}", config.getSystemParameter().getName());
            }
        }

        for (DatabaseCredential config : activeCredentials) {
            String decryptedPassword = decryptPassword(config.getPassword(), config.getId());
            String host = "localhost".equals(config.getHost()) || "127.0.0.1".equals(config.getHost()) ? "host.docker.internal" : config.getHost();

            String dbType = config.getSystemParameter().getName().toUpperCase();
            switch (dbType) {
                case "POSTGRESQL":
                    addDatabaseEnv(dockerComposeProcessBuilder, "POSTGRES_USER", config.getUsername(), host, config.getPort(), decryptedPassword);
                    break;
                case "MARIADB":
                    addDatabaseEnv(dockerComposeProcessBuilder, "MARIADB_USER", config.getUsername(), host, config.getPort(), decryptedPassword);
                    break;
                case "MONGODB":
                    addDatabaseEnv(dockerComposeProcessBuilder, "MONGODB_USER", config.getUsername(), host, config.getPort(), decryptedPassword);
                    break;
                default:
                    log.warn("Tipo de base de datos no soportado para SystemParameter: {}", dbType);
            }
        }
        // Execute docker-compose
        dockerComposeProcessBuilder.inheritIO().start();
    }
}

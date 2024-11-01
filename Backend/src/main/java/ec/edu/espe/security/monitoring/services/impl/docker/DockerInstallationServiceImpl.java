package ec.edu.espe.security.monitoring.services.impl.docker;

import ec.edu.espe.security.monitoring.models.DatabaseCredential;
import ec.edu.espe.security.monitoring.models.InstallationConfig;
import ec.edu.espe.security.monitoring.repositories.DatabaseCredentialRepository;
import ec.edu.espe.security.monitoring.repositories.InstallationConfigRepository;
import ec.edu.espe.security.monitoring.services.interfaces.docker.DockerInstallationService;
import ec.edu.espe.security.monitoring.utils.AesEncryptorUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

<<<<<<< HEAD
import static ec.edu.espe.security.monitoring.utils.PrometheusConfigUtil.generatePrometheusConfig;
=======
import static ec.edu.espe.security.monitoring.utils.DockerUtils.*;
import static ec.edu.espe.security.monitoring.utils.PrometheusUtils.generatePrometheusConfig;
>>>>>>> ae50512728bb4cd03e0b6adc0b5de73e0d40ee32

@Service
@Slf4j
@RequiredArgsConstructor
public class DockerInstallationServiceImpl implements DockerInstallationService {
    private final InstallationConfigRepository installationConfigRepository;
<<<<<<< HEAD
    private final AesEncryptorUtil aesEncryptor;
=======
    private final DatabaseCredentialRepository databaseCredentialRepository;
    private final AesEncryptor aesEncryptor;
>>>>>>> ae50512728bb4cd03e0b6adc0b5de73e0d40ee32



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

        // Paths to the Prometheus configuration files
        String templatePath = "../.container/prometheus.template.yml";
        String outputPath = "../.container/prometheus.yml";

        // Generate the prometheus.yml file dynamically with environment variables
        generatePrometheusConfig(activeInstallations, templatePath, outputPath);

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
<<<<<<< HEAD

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

=======
>>>>>>> ae50512728bb4cd03e0b6adc0b5de73e0d40ee32
}

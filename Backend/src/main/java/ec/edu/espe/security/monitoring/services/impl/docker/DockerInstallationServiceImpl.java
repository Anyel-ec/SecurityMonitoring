package ec.edu.espe.security.monitoring.services.impl.docker;

import ec.edu.espe.security.monitoring.models.InstallationConfig;
import ec.edu.espe.security.monitoring.repositories.InstallationConfigRepository;
import ec.edu.espe.security.monitoring.services.interfaces.docker.DockerInstallationService;
import ec.edu.espe.security.monitoring.utils.AesEncryptorUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

import static ec.edu.espe.security.monitoring.utils.PrometheusConfigUtil.generatePrometheusConfig;

@Service
@Slf4j
@RequiredArgsConstructor
public class DockerInstallationServiceImpl implements DockerInstallationService {
    private final InstallationConfigRepository installationConfigRepository;
    private final AesEncryptorUtil aesEncryptor;

    /**
     * Runs a Docker Compose process to set up the services based on the active installation configurations.
     */
    public void runDockerComposeWithActiveInstallations() throws IOException, InterruptedException {
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
            String decryptedPassword = null;
            try {
                if (config.getPassword() != null) {
                    decryptedPassword = aesEncryptor.decrypt(config.getPassword());
                }
            } catch (Exception e) {
                log.error("Error decrypting the password for the installation with ID: {}", config.getId(), e);
                throw new IllegalStateException("Error decrypting the password", e);
            }

            // Set environment variables directly with processBuilder.environment().put()
            if ("GRAFANA_INSTALL".equals(config.getSystemParameter().getName())) {
                dockerComposeProcessBuilder.environment().put("GRAFANA_PORT_EXTERNAL", String.valueOf(config.getExternalPort()));
                dockerComposeProcessBuilder.environment().put("GRAFANA_PORT_INTERNAL", String.valueOf(config.getInternalPort()));
                dockerComposeProcessBuilder.environment().put("GRAFANA_USER", config.getUsername());
                dockerComposeProcessBuilder.environment().put("GRAFANA_PASSWORD", decryptedPassword);
            } else if ("PROMETHEUS_INSTALL".equals(config.getSystemParameter().getName())) {
                dockerComposeProcessBuilder.environment().put("PROMETHEUS_PORT_EXTERNAL", String.valueOf(config.getExternalPort()));
                dockerComposeProcessBuilder.environment().put("PROMETHEUS_PORT_INTERNAL", String.valueOf(config.getInternalPort()));
            } else if ("PROMETHEUS_EXPORTER_POSTGRESQL".equals(config.getSystemParameter().getName())) {
                dockerComposeProcessBuilder.environment().put("EXPORT_POSTGRES_PORT_EXTERNAL", String.valueOf(config.getExternalPort()));
                dockerComposeProcessBuilder.environment().put("EXPORT_POSTGRES_PORT_INTERNAL", String.valueOf(config.getInternalPort()));
                dockerComposeProcessBuilder.environment().put("POSTGRES_USER", config.getUsername());
                dockerComposeProcessBuilder.environment().put("POSTGRES_PASSWORD", decryptedPassword);
            } else {
                log.warn("No environment variables configured for the parameter: {}", config.getSystemParameter().getName());
            }
        }

        // Execute docker-compose
        dockerComposeProcessBuilder.inheritIO().start();
    }

}

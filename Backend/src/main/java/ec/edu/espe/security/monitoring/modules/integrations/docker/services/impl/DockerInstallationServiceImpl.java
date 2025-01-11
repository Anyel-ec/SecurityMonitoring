package ec.edu.espe.security.monitoring.modules.integrations.docker.services.impl;

import ec.edu.espe.security.monitoring.modules.features.installation.models.InstallationConfig;
import ec.edu.espe.security.monitoring.modules.features.installation.repositories.InstallationConfigRepository;
import ec.edu.espe.security.monitoring.modules.integrations.docker.services.interfaces.DockerInstallationService;
import ec.edu.espe.security.monitoring.common.encrypt.utils.AesEncryptorUtil;
import ec.edu.espe.security.monitoring.modules.integrations.docker.utils.AlertManagerConfigUtil;
import ec.edu.espe.security.monitoring.modules.integrations.docker.utils.DockerEnvironmentUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;

import static ec.edu.espe.security.monitoring.modules.integrations.docker.utils.PrometheusConfigUtil.generatePrometheusConfig;

@Service
@Slf4j
@RequiredArgsConstructor
public class DockerInstallationServiceImpl implements DockerInstallationService {
    // Injected dependencies
    private final InstallationConfigRepository installationConfigRepository;
    private final AesEncryptorUtil aesEncryptor;
    private final AlertManagerConfigUtil alertManagerConfigUtil;

    /**
     * Checks if the Docker containers for Grafana and Prometheus are currently running.
     * @return true if both containers are up, otherwise false.
     */
    @Override
    public boolean areDockerContainersUp() {
        try {
            Process process = new ProcessBuilder("docker", "ps").start();
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                List<String> lines = reader.lines().toList();
                boolean grafanaUp = lines.stream().anyMatch(line -> line.contains("grafana") && line.contains("Up"));
                boolean prometheusUp = lines.stream().anyMatch(line -> line.contains("prometheus") && line.contains("Up"));
                return grafanaUp && prometheusUp;
            }
        } catch (IOException e) {
            throw new IllegalStateException("Error checking Docker container status", e);
        }
    }

    /**
     * Runs a Docker Compose process to set up the services based on the active installation configurations.
     */
    public void runDockerComposeWithActiveInstallations() {
        try {
            // Retrieve all active installations
            List<InstallationConfig> activeInstallations = installationConfigRepository.findByIsActiveTrue();

            // Paths to the Prometheus configuration files
            String basePath = "src/main/resources/docker/integraciones_security_monitoring/";
            String templatePath = basePath + "prometheus.template.yml";
            String outputPath = basePath + "prometheus.yml";
            String alertManagerTemplatePath = basePath + "alertmanager/alertmanager.template.yml";
            String alertManagerOutputPath = basePath + "alertmanager/alertmanager.yml";
            String dockerComposePath = basePath + "docker-compose.yml";

            // Ensure files exist
            if (!new File(dockerComposePath).exists()) {
                throw new IllegalStateException("El archivo docker-compose.yml no fue encontrado en: " + dockerComposePath);
            }

            // Generate configuration files
            generatePrometheusConfig(activeInstallations, templatePath, outputPath);
            alertManagerConfigUtil.generateAlertManagerConfig(alertManagerTemplatePath, alertManagerOutputPath);

            // Create the ProcessBuilder for docker-compose
            ProcessBuilder dockerComposeProcessBuilder = new ProcessBuilder(
                    "docker-compose",
                    "-f", dockerComposePath,
                    "up", "-d"
            );

            // Configure the environment variables based on the active installations
            for (InstallationConfig config : activeInstallations) {
                String decryptedPassword = DockerEnvironmentUtil.decryptPassword(config.getPassword(), aesEncryptor);
                DockerEnvironmentUtil.configureInstallationEnv(dockerComposeProcessBuilder, config, decryptedPassword);
            }

            dockerComposeProcessBuilder.inheritIO().start().waitFor();
            log.info("Docker Compose ejecutado exitosamente con las configuraciones activas de instalación.");

        } catch (IOException | InterruptedException e) {
            log.error("Error al ejecutar Docker Compose: {}", e.getMessage());
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Error al ejecutar Docker Compose con configuraciones de instalación activas", e);
        }
    }
}

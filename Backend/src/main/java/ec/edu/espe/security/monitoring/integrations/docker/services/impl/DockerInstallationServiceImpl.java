package ec.edu.espe.security.monitoring.integrations.docker.services.impl;

import ec.edu.espe.security.monitoring.features.installation.models.InstallationConfig;
import ec.edu.espe.security.monitoring.features.installation.repositories.InstallationConfigRepository;
import ec.edu.espe.security.monitoring.integrations.docker.services.interfaces.DockerInstallationService;
import ec.edu.espe.security.monitoring.shared.encrypt.utils.AesEncryptorUtil;
import ec.edu.espe.security.monitoring.integrations.docker.utils.AlertManagerConfigUtil;
import ec.edu.espe.security.monitoring.integrations.docker.utils.DockerEnvironmentUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;

import static ec.edu.espe.security.monitoring.integrations.docker.utils.PrometheusConfigUtil.generatePrometheusConfig;

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
            // Run the "docker ps" command to list active containers
            Process process = new ProcessBuilder("docker", "ps").start();
    
            // Use try-with-resources to ensure BufferedReader is closed properly
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                List<String> lines = reader.lines().toList();
    
                boolean grafanaUp = lines.stream().anyMatch(line -> line.contains("grafana") && line.contains("Up"));
                boolean prometheusUp = lines.stream().anyMatch(line -> line.contains("prometheus") && line.contains("Up"));
    
                // Return true if both Grafana and Prometheus containers are up, otherwise false
                if (grafanaUp && prometheusUp) {
                    log.info("Tanto los contenedores Grafana como Prometheus están activos.");
                    return true;
                } else {
                    log.warn("Uno o ambos contenedores no están arriba.");
                    return false;
                }
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
            String templatePath = "../.container/prometheus.template.yml";
            String outputPath = "../.container/prometheus.yml";
            String alertManagerTemplatePath = "../.container/alertmanager/alertmanager.template.yml";
            String alertManagerOutputPath = "../.container/alertmanager/alertmanager.yml";

            // Generate the prometheus.yml file dynamically with environment variables
            generatePrometheusConfig(activeInstallations, templatePath, outputPath);

            // Generate the alertmanager.yml file dynamically
            alertManagerConfigUtil.generateAlertManagerConfig(alertManagerTemplatePath, alertManagerOutputPath);

            // Create the ProcessBuilder for docker-compose
            ProcessBuilder dockerComposeProcessBuilder = new ProcessBuilder(
                    "docker-compose",
                    "-f", "../.container/docker-compose.yml",
                    "up", "-d"
            );

            // Configure the environment variables based on the active installations
            for (InstallationConfig config : activeInstallations) {
                String decryptedPassword = DockerEnvironmentUtil.decryptPassword(config.getPassword(), aesEncryptor);
                DockerEnvironmentUtil.configureInstallationEnv(dockerComposeProcessBuilder, config, decryptedPassword);
            }

            // Execute docker-compose
            dockerComposeProcessBuilder.inheritIO().start();
            log.info("Docker Compose ejecutado exitosamente con las configuraciones activas de instalación.");
        } catch (IOException e) {
            log.error("Error al ejecutar Docker Compose: {}", e.getMessage());
            throw new IllegalStateException("Error al ejecutar Docker Compose con configuraciones de instalación activas", e);
        } catch (Exception e) {
            log.error("Error inesperado en la configuración del entorno Docker Compose: {}", e.getMessage());
            throw new IllegalStateException("Error inesperado en la configuración del entorno Docker Compose", e);
        }
    }
}
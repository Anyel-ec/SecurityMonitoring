package ec.edu.espe.security.monitoring.services.impl.docker;

import ec.edu.espe.security.monitoring.models.InstallationConfig;
import ec.edu.espe.security.monitoring.repositories.InstallationConfigRepository;
import ec.edu.espe.security.monitoring.services.interfaces.docker.DockerInstallationService;
import ec.edu.espe.security.monitoring.services.interfaces.grafana.GrafanaDashboardService;
import ec.edu.espe.security.monitoring.services.interfaces.grafana.GrafanaDatasourceService;
import ec.edu.espe.security.monitoring.utils.AesEncryptorUtil;
import ec.edu.espe.security.monitoring.utils.DockerEnvironmentUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import static ec.edu.espe.security.monitoring.utils.PrometheusConfigUtil.generatePrometheusConfig;

@Service
@Slf4j
@RequiredArgsConstructor
public class DockerInstallationServiceImpl implements DockerInstallationService {
    // Injected dependencies
    private final InstallationConfigRepository installationConfigRepository;
    private final GrafanaDashboardService grafanaDashboardService;
    private final GrafanaDatasourceService grafanaDatasourceService;
    private final AesEncryptorUtil aesEncryptor;

    public boolean areDockerContainersUp() {
        try {
            // Run the "docker ps" command to list active containers
            Process process = new ProcessBuilder("docker", "ps").start();
            List<String> lines = new BufferedReader(new InputStreamReader(process.getInputStream())).lines().toList();

            boolean grafanaUp = lines.stream().anyMatch(line -> line.contains("grafana") && line.contains("Up"));
            boolean prometheusUp = lines.stream().anyMatch(line -> line.contains("prometheus") && line.contains("Up"));

            // Return true if both Grafana and Prometheus containers are up, otherwise false
            if (grafanaUp && prometheusUp) {
                log.info("Both Grafana and Prometheus containers are up.");
                return true;
            } else {
                log.warn("One or both containers are not up.");
                return false;
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
                String decryptedPassword = DockerEnvironmentUtil.decryptPassword(config.getPassword(), aesEncryptor);
                DockerEnvironmentUtil.configureInstallationEnv(dockerComposeProcessBuilder, config, decryptedPassword);
            }

            // Execute docker-compose
            dockerComposeProcessBuilder.inheritIO().start();
            log.info("Docker Compose ejecutado exitosamente con las configuraciones activas de instalación.");
        } catch (IOException e) {
            log.error("Error al ejecutar Docker Compose: {}", e.getMessage(), e);
            throw new IllegalStateException("Error al ejecutar Docker Compose con configuraciones de instalación activas", e);
        } catch (Exception e) {
            log.error("Error inesperado en la configuración del entorno Docker Compose: {}", e.getMessage(), e);
            throw new IllegalStateException("Error inesperado en la configuración del entorno Docker Compose", e);
        }
    }
}
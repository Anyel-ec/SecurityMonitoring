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

    public void waitForDockerContainersUp() {
        boolean grafanaUp = false;
        boolean prometheusUp = false;

        // Loop until both Grafana and Prometheus containers are confirmed to be "up"
        while (!grafanaUp || !prometheusUp) {
            try {
                // Run the "docker ps" command to list active containers
                ProcessBuilder processBuilder = new ProcessBuilder("docker", "ps");
                Process process = processBuilder.start();

                // Read the output of the "docker ps" command
                BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
                String line;

                // Reset container statuses for each iteration
                grafanaUp = false;
                prometheusUp = false;

                // Check each line in the output to see if the required containers are "up"
                while ((line = reader.readLine()) != null) {
                    if (line.contains("grafana") && line.contains("Up")) {
                        grafanaUp = true;
                    }
                    if (line.contains("prometheus") && line.contains("Up")) {
                        prometheusUp = true;
                    }
                }

                // If either container is not "up", wait 3 seconds before checking again
                if (!grafanaUp || !prometheusUp) {
                    Thread.sleep(3000); // sleep 3s
                    log.info("Waiting for Grafana and Prometheus to be up. Sleeping for 3 seconds.");
                }

            } catch (IOException e) {
                throw new IllegalStateException("Error checking Docker container status", e);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                throw new IllegalStateException("Process was interrupted while checking Docker status", e);
            }
        }

        // When both Grafana and Prometheus are confirmed "up," proceed with post-installation tasks
        log.info("Both Grafana and Prometheus containers are up. Executing post-installation tasks...");
        runPostInstallationTasks();
    }

    private void runPostInstallationTasks() {
        log.info("Ya se acabaron de instalar");
        grafanaDatasourceService.createPrometheusDatasource();
        log.info("Se creo el datasource de prometheus");
        grafanaDashboardService.createDashboard();
        log.info("Se creo dashboard de grafana");
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
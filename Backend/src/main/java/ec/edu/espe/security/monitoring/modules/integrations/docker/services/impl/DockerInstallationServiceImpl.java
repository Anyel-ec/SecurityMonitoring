package ec.edu.espe.security.monitoring.modules.integrations.docker.services.impl;

import ec.edu.espe.security.monitoring.common.encrypt.utils.AesEncryptorUtil;
import ec.edu.espe.security.monitoring.modules.features.installation.models.InstallationConfig;
import ec.edu.espe.security.monitoring.modules.features.installation.repositories.InstallationConfigRepository;
import ec.edu.espe.security.monitoring.modules.integrations.docker.services.interfaces.DockerInstallationService;
import ec.edu.espe.security.monitoring.modules.integrations.docker.utils.AlertManagerConfigUtil;
import ec.edu.espe.security.monitoring.modules.integrations.docker.utils.DockerEnvironmentUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
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

    @Value("${app.shared.volume.path}")
    private String sharedVolumePath;

    @Value("${app.prometheus.template.path}")
    private String prometheusTemplatePath;

    @Value("${app.prometheus.output.path}")
    private String prometheusOutputPath;

    @Value("${app.alertmanager.template.path}")
    private String alertManagerTemplatePath;

    @Value("${app.alertmanager.output.path}")
    private String alertManagerOutputPath;

    @Value("${app.docker.compose.path}")
    private String dockerComposePath;

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
    @Override
    public void runDockerComposeWithActiveInstallations() {
        try {
            // get active installation configurations
            List<InstallationConfig> activeInstallations = installationConfigRepository.findByIsActiveTrue();

            // validate shared volume
            File sharedVolume = new File(sharedVolumePath);
            if (!sharedVolume.exists()) {
                sharedVolume.mkdirs();
                log.warn("El volumen compartido no existía, se creó: {}", sharedVolumePath);
            }

            // generate Prometheus and AlertManager configurations
            generatePrometheusConfig(activeInstallations, prometheusTemplatePath, prometheusOutputPath);
            alertManagerConfigUtil.generateAlertManagerConfig(alertManagerTemplatePath, alertManagerOutputPath);

            // Verificar archivos generados correctamente
            if (!new File(prometheusOutputPath).exists()) {
                throw new IllegalStateException("El archivo prometheus.yml no se generó correctamente.");
            }
            if (!new File(alertManagerOutputPath).exists()) {
                throw new IllegalStateException("El archivo alertmanager.yml no se generó correctamente.");
            }

            // set up the Docker Compose process
            ProcessBuilder dockerComposeProcessBuilder = new ProcessBuilder(
                    "docker-compose",
                    "-f", dockerComposePath,
                    "up", "-d"
            );

            // config environment variables for active installations
            for (InstallationConfig config : activeInstallations) {
                String decryptedPassword = DockerEnvironmentUtil.decryptPassword(config.getPassword(), aesEncryptor);
                DockerEnvironmentUtil.configureInstallationEnv(dockerComposeProcessBuilder, config, decryptedPassword);
            }

            // execute the Docker Compose process
            dockerComposeProcessBuilder.inheritIO().start().waitFor();
            log.info("Docker Compose ejecutado exitosamente desde el volumen compartido.");

        } catch (IOException | InterruptedException e) {
            log.error("Error al ejecutar Docker Compose: {}", e.getMessage());
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Error al ejecutar Docker Compose con configuraciones activas", e);
        }
    }
}

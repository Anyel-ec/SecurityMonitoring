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

    private static final String SHARED_VOLUME_PATH = "/app/docker/integraciones_security_monitoring/";


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
            // Recuperar todas las instalaciones activas
            List<InstallationConfig> activeInstallations = installationConfigRepository.findByIsActiveTrue();

            // Definir rutas de los archivos de configuración dentro del volumen compartido
            String templatePath = SHARED_VOLUME_PATH + "prometheus.template.yml";
            String outputPath = SHARED_VOLUME_PATH + "prometheus.yml";
            String alertManagerTemplatePath = SHARED_VOLUME_PATH + "alertmanager/alertmanager.template.yml";
            String alertManagerOutputPath = SHARED_VOLUME_PATH + "alertmanager/alertmanager.yml";
            String dockerComposePath = SHARED_VOLUME_PATH + "docker-compose.yml";

            // Validar existencia del volumen compartido
            File sharedVolume = new File(SHARED_VOLUME_PATH);
            if (!sharedVolume.exists()) {
                sharedVolume.mkdirs();  // Crear la carpeta si no existe
                log.warn("El volumen compartido no existía, se creó: {}", SHARED_VOLUME_PATH);
            }

            // Generar archivos de configuración
            generatePrometheusConfig(activeInstallations, templatePath, outputPath);
            alertManagerConfigUtil.generateAlertManagerConfig(alertManagerTemplatePath, alertManagerOutputPath);

            // Verificar archivos generados correctamente
            if (!new File(outputPath).exists()) {
                throw new IllegalStateException("El archivo prometheus.yml no se generó correctamente.");
            }
            if (!new File(alertManagerOutputPath).exists()) {
                throw new IllegalStateException("El archivo alertmanager.yml no se generó correctamente.");
            }

            // Asegurar que el volumen nombrado esté correctamente mapeado y declarado
            ProcessBuilder dockerComposeProcessBuilder = new ProcessBuilder(
                    "docker-compose",
                    "-f", dockerComposePath,
                    "up", "-d"
            );

            // Configurar variables de entorno solo si no son nulas
            for (InstallationConfig config : activeInstallations) {
                String decryptedPassword = DockerEnvironmentUtil.decryptPassword(config.getPassword(), aesEncryptor);
                DockerEnvironmentUtil.configureInstallationEnv(dockerComposeProcessBuilder, config, decryptedPassword);
            }

            // Ejecutar el proceso de Docker Compose
            dockerComposeProcessBuilder.inheritIO().start().waitFor();
            log.info("Docker Compose ejecutado exitosamente desde el volumen compartido.");

        } catch (IOException | InterruptedException e) {
            log.error("Error al ejecutar Docker Compose: {}", e.getMessage());
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Error al ejecutar Docker Compose con configuraciones activas", e);
        }
    }
}

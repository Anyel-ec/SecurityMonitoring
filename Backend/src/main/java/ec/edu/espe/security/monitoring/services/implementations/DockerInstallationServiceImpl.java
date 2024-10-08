package ec.edu.espe.security.monitoring.services.implementations;

import ec.edu.espe.security.monitoring.models.InstallationConfig;
import ec.edu.espe.security.monitoring.repositories.InstallationConfigRepository;
import ec.edu.espe.security.monitoring.utils.AesEncryptor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class DockerInstallationServiceImpl {
    private final InstallationConfigRepository installationConfigRepository;
    private final AesEncryptor aesEncryptor;


    /**
     * Runs a Docker Compose process to set up the services based on the active installation configurations.
     */
    public void runDockerComposeWithActiveInstallations() throws IOException {
        // Obtener todas las instalaciones activas
        List<InstallationConfig> activeInstallations = installationConfigRepository.findByIsActiveTrue();

        // Crear el ProcessBuilder para docker-compose
        ProcessBuilder processBuilder = new ProcessBuilder(
                "docker-compose",
                "-f", "../.container/docker-compose.yml",
                "up", "-d"
        );

        // Configurar las variables de entorno según las instalaciones activas
        for (InstallationConfig config : activeInstallations) {
            String decryptedPassword = null;
            try {
                if (config.getPassword() != null) {
                    decryptedPassword = aesEncryptor.decrypt(config.getPassword());
                }
            } catch (Exception e) {
                log.error("Error al desencriptar la contraseña para la instalación con ID: {}", config.getId(), e);
                throw new IllegalStateException("Error al desencriptar la contraseña", e);
            }

            switch (config.getSystemParameter().getName()) {
                case "GRAFANA_INSTALL":
                    processBuilder.environment().put("GRAFANA_PORT_EXTERNAL", String.valueOf(config.getExternalPort()));
                    processBuilder.environment().put("GRAFANA_PORT_INTERNAL", String.valueOf(config.getInternalPort()));
                    processBuilder.environment().put("GRAFANA_USER", config.getUsuario());
                    processBuilder.environment().put("GRAFANA_PASSWORD", decryptedPassword);
                    break;
                case "PROMETHEUS_INSTALL":
                    processBuilder.environment().put("PROMETHEUS_PORT_EXTERNAL", String.valueOf(config.getExternalPort()));
                    processBuilder.environment().put("PROMETHEUS_PORT_INTERNAL", String.valueOf(config.getInternalPort()));
                    break;
                case "PROMETHEUS_EXPORTER_POSTGRESQL":
                    processBuilder.environment().put("EXPORT_POSTGRES_PORT_EXTERNAL", String.valueOf(config.getExternalPort()));
                    processBuilder.environment().put("EXPORT_POSTGRES_PORT_INTERNAL", String.valueOf(config.getInternalPort()));
                    processBuilder.environment().put("POSTGRES_USER", config.getUsuario());
                    processBuilder.environment().put("POSTGRES_PASSWORD", decryptedPassword);
                    break;
                default:
                    log.warn("No hay variables de entorno configuradas para el parámetro: {}", config.getSystemParameter().getName());
                    break;
            }
        }

        // Ejecutar docker-compose
        processBuilder.inheritIO().start();
    }
}

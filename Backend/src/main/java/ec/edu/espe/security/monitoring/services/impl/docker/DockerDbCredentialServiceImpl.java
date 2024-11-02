package ec.edu.espe.security.monitoring.services.impl.docker;

import ec.edu.espe.security.monitoring.models.DatabaseCredential;
import ec.edu.espe.security.monitoring.models.InstallationConfig;
import ec.edu.espe.security.monitoring.repositories.DatabaseCredentialRepository;
import ec.edu.espe.security.monitoring.repositories.InstallationConfigRepository;
import ec.edu.espe.security.monitoring.services.interfaces.docker.DockerDbCredentialService;
import ec.edu.espe.security.monitoring.utils.AesEncryptorUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class DockerDbCredentialServiceImpl implements DockerDbCredentialService {

    // Injected dependencies
    private final InstallationConfigRepository installationConfigRepository;
    private final DatabaseCredentialRepository databaseCredentialRepository;
    private final AesEncryptorUtil aesEncryptor;

    /**
     * Runs a Docker Compose process to set up a database container based on the provided DBMS type and credentials.
     */
    @Override
    public void runDockerComposeWithDatabase() throws IOException, InterruptedException {
        List<DatabaseCredential> activeCredentials = databaseCredentialRepository.findByIsActiveTrue();
        List<InstallationConfig> activeInstallations = installationConfigRepository.findByIsActiveTrue();

        if (activeCredentials.isEmpty()) {
            log.warn("No se encontraron credenciales de base de datos activas. No se ejecutará Docker Compose.");
            return;
        }

        ProcessBuilder processBuilder = new ProcessBuilder(
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

            // Only configure environment variables for known installation types
            if ("GRAFANA_INSTALL".equals(config.getSystemParameter().getName())) {
                processBuilder.environment().put("GRAFANA_PORT_EXTERNAL", String.valueOf(config.getExternalPort()));
                processBuilder.environment().put("GRAFANA_PORT_INTERNAL", String.valueOf(config.getInternalPort()));
                processBuilder.environment().put("GRAFANA_USER", config.getUsername());
                processBuilder.environment().put("GRAFANA_PASSWORD", decryptedPassword);
            } else if ("PROMETHEUS_INSTALL".equals(config.getSystemParameter().getName())) {
                processBuilder.environment().put("PROMETHEUS_PORT_EXTERNAL", String.valueOf(config.getExternalPort()));
                processBuilder.environment().put("PROMETHEUS_PORT_INTERNAL", String.valueOf(config.getInternalPort()));
            } else if ("PROMETHEUS_EXPORTER_POSTGRESQL".equals(config.getSystemParameter().getName())) {
                processBuilder.environment().put("EXPORT_POSTGRES_PORT_EXTERNAL", String.valueOf(config.getExternalPort()));
                processBuilder.environment().put("EXPORT_POSTGRES_PORT_INTERNAL", String.valueOf(config.getInternalPort()));
                processBuilder.environment().put("POSTGRES_USER", config.getUsername());
                processBuilder.environment().put("POSTGRES_PASSWORD", decryptedPassword);
            } else {
                log.warn("No environment variables configured for the parameter: {}", config.getSystemParameter().getName());
            }
        }

        for (DatabaseCredential config : activeCredentials) {


            String host = config.getHost();
            if ("localhost".equals(host) || "127.0.0.1".equals(host)) {
                host = "host.docker.internal";
            }

            String decryptedPassword = null;
            try {
                if (config.getPassword() != null) {
                    decryptedPassword = aesEncryptor.decrypt(config.getPassword());
                }
            } catch (Exception e) {
                log.error("Error al desencriptar la contraseña para la configuración con ID: {}", config.getId(), e);
                throw new IllegalStateException("Error al desencriptar la contraseña", e);
            }

            String dbType = config.getSystemParameter().getName().toUpperCase();
            switch (dbType) {
                case "POSTGRESQL":
                    log.info("Configurando PostgreSQL con host {}, usuario {}, puerto {}, password {}", host, config.getUsername(), config.getPort(), decryptedPassword);
                    processBuilder.environment().put("POSTGRES_USER", config.getUsername());
                    processBuilder.environment().put("POSTGRES_PASSWORD", decryptedPassword);
                    processBuilder.environment().put("POSTGRES_HOST", host);
                    processBuilder.environment().put("POSTGRES_PORT", String.valueOf(config.getPort()));
                    break;

                case "MARIADB":
                    log.info("Configurando MariaDB con host {}, usuario {}, puerto {}.", host, config.getUsername(), config.getPort());
                    processBuilder.environment().put("MARIADB_USER", config.getUsername());
                    processBuilder.environment().put("MARIADB_PASSWORD", decryptedPassword);
                    processBuilder.environment().put("MARIADB_HOST", host);
                    processBuilder.environment().put("MARIADB_PORT", String.valueOf(config.getPort()));
                    break;

                case "MONGODB":
                    log.info("Configurando MongoDB con host {}, usuario {}, puerto {}.", host, config.getUsername(), config.getPort());
                    processBuilder.environment().put("MONGODB_USER", config.getUsername());
                    processBuilder.environment().put("MONGODB_PASSWORD", decryptedPassword);
                    processBuilder.environment().put("MONGODB_HOST", host);
                    processBuilder.environment().put("MONGODB_PORT", String.valueOf(config.getPort()));
                    break;

                default:
                    log.warn("Tipo de base de datos no soportado para SystemParameter: {}", dbType);
                    continue;
            }

            try {
                processBuilder.inheritIO().start();
                log.info("Docker Compose ejecutado exitosamente para {}", dbType);
            } catch (IOException e) {
                log.error("Error al ejecutar Docker Compose para {}: {}", dbType, e.getMessage());
            }
        }
    }
}

package ec.edu.espe.security.monitoring.services.impl.docker;

import ec.edu.espe.security.monitoring.models.DatabaseCredential;
import ec.edu.espe.security.monitoring.repositories.DatabaseCredentialRepository;
import ec.edu.espe.security.monitoring.services.interfaces.docker.DockerDbCredentialService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class DockerDbCredentialServiceImpl implements DockerDbCredentialService {
    private final DatabaseCredentialRepository databaseCredentialRepository;
    private boolean isExecuted = false;

    /**
     * Runs Docker Compose to bring up the services defined in the docker-compose.yml file.
     * This method simply executes the docker-compose up -d command.
     */
    @Override
    public void runDockerCompose() {
        if (isExecuted) {
            log.info("Docker Compose ya ha sido ejecutado. No se volverá a ejecutar.");
            return;
        }
        ProcessBuilder processBuilder = new ProcessBuilder(
                "docker-compose",
                "-f", "../.container/docker-compose.yml",
                "up", "-d"
        );

        try {
            // Log before execution
            log.info("Executing docker-compose up -d to bring up services...");

            // Inherit IO to display output in the current terminal and start the process
            processBuilder.inheritIO().start().waitFor();
            isExecuted = true;  // Mark as executed after successful execution
            log.info("Docker Compose executed successfully.");
        } catch (IOException | InterruptedException e) {
            log.error("Error while executing docker-compose up: ", e);
            Thread.currentThread().interrupt();  // Restore the interrupted status if interrupted
        }
    }

    /**
     * Indicates whether the Docker Compose process has been executed.
     * @return true if the process has already been executed, false otherwise
     */
    public boolean hasBeenExecuted() {
        return isExecuted;
    }

    /**
     * Runs a Docker Compose process to set up a database container based on the provided DBMS type and credentials.
     */
    @Override
    public void runDockerComposeWithDatabase() {
        List<DatabaseCredential> activeCredentials = databaseCredentialRepository.findByIsActiveTrue();

        if (activeCredentials.isEmpty()) {
            log.warn("No se encontraron credenciales de base de datos activas. No se ejecutará Docker Compose.");
            return;
        }

        for (DatabaseCredential config : activeCredentials) {
            ProcessBuilder processBuilder = new ProcessBuilder(
                    "docker-compose",
                    "-f", "../.container/docker-compose.yml",
                    "up", "-d"
            );

            String host = config.getHost();
            if ("localhost".equals(host) || "127.0.0.1".equals(host)) {
                host = "host.docker.internal";
            }

            String dbType = config.getSystemParameter().getName().toUpperCase();
            switch (dbType) {
                case "POSTGRESQL":
                    log.info("Configurando PostgreSQL con host {}, usuario {}, puerto {}.", host, config.getUsername(), config.getPort());
                    processBuilder.environment().put("POSTGRES_USER", config.getUsername());
                    processBuilder.environment().put("POSTGRES_PASSWORD", config.getPassword());
                    processBuilder.environment().put("POSTGRES_HOST", host);
                    processBuilder.environment().put("POSTGRES_PORT", String.valueOf(config.getPort()));
                    break;

                case "MARIADB":
                    log.info("Configurando MariaDB con host {}, usuario {}, puerto {}.", host, config.getUsername(), config.getPort());
                    processBuilder.environment().put("MARIADB_USER", config.getUsername());
                    processBuilder.environment().put("MARIADB_PASSWORD", config.getPassword());
                    processBuilder.environment().put("MARIADB_HOST", host);
                    processBuilder.environment().put("MARIADB_PORT", String.valueOf(config.getPort()));
                    break;

                case "MONGODB":
                    log.info("Configurando MongoDB con host {}, usuario {}, puerto {}.", host, config.getUsername(), config.getPort());
                    processBuilder.environment().put("MONGODB_USER", config.getUsername());
                    processBuilder.environment().put("MONGODB_PASSWORD", config.getPassword());
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

package ec.edu.espe.security.monitoring.services.implementations.docker;

import ec.edu.espe.security.monitoring.models.credentials.DatabaseCredentials;
import ec.edu.espe.security.monitoring.services.interfaces.docker.DockerComposeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@Slf4j
public class DockerComposeServiceImpl implements DockerComposeService {
    /**
     * Runs Docker Compose to bring up the services defined in the docker-compose.yml file.
     * This method simply executes the docker-compose up -d command.
     */
    @Override
    public void runDockerCompose() {
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

            log.info("Docker Compose executed successfully.");
        } catch (IOException | InterruptedException e) {
            log.error("Error while executing docker-compose up: ", e);
            Thread.currentThread().interrupt();  // Restore the interrupted status if interrupted
        }
    }

    /**
     * Runs a Docker Compose process to set up a database container based on the provided DBMS type and credentials.
     */
    @Override
    public void runDockerComposeWithDatabase(DatabaseCredentials config, String dbType) throws IOException {
        ProcessBuilder processBuilder = new ProcessBuilder(
                "docker-compose",
                "-f", "../.container/docker-compose.yml",
                "up", "-d"
        );

        String host = config.getHost();
        if ("localhost".equals(host) || "127.0.0.1".equals(host)) {
            host = "host.docker.internal";
        }

        switch (dbType.toLowerCase()) {
            case "postgresql":
                log.error("Los datos son {}, {}, {}, {}", config.getUsername(), config.getPassword(), host, config.getPort());
                processBuilder.environment().put("POSTGRES_USER", config.getUsername());
                processBuilder.environment().put("POSTGRES_PASSWORD", config.getPassword());
                processBuilder.environment().put("POSTGRES_HOST", host);
                processBuilder.environment().put("POSTGRES_PORT", String.valueOf(config.getPort()));
                break;

            case "mariadb":
                processBuilder.environment().put("MARIADB_USER", config.getUsername());
                processBuilder.environment().put("MARIADB_PASSWORD", config.getPassword());
                processBuilder.environment().put("MARIADB_HOST", host);
                processBuilder.environment().put("MARIADB_PORT", String.valueOf(config.getPort()));
                break;

            case "mongodb":
                processBuilder.environment().put("MONGODB_USER", config.getUsername());
                processBuilder.environment().put("MONGODB_PASSWORD", config.getPassword());
                processBuilder.environment().put("MONGODB_HOST", host);
                processBuilder.environment().put("MONGODB_PORT", String.valueOf(config.getPort()));
                break;

            default:
                throw new IllegalArgumentException("Tipo de base de datos no soportado: " + dbType);
        }

        processBuilder.inheritIO().start();
    }
}

package ec.edu.espe.security.monitoring.services;

import ec.edu.espe.security.monitoring.models.PostgresCredentials;
import org.springframework.stereotype.Service;

import java.io.IOException;
@Service
public class DockerCredentialService {
    public void runDockerCompose(PostgresCredentials config) throws IOException {
        ProcessBuilder processBuilder = new ProcessBuilder(
                "docker-compose",
                "-f", "../.container/docker-compose.yml",
                "up", "-d"
        );

        String postgresHost = config.getHost();
        if ("localhost".equals(postgresHost) || "127.0.0.1".equals(postgresHost)) {
            postgresHost = "host.docker.internal";
        }

        // Establecer las variables de entorno para PostgreSQL
        processBuilder.environment().put("POSTGRES_USER", config.getUsername());
        processBuilder.environment().put("POSTGRES_PASSWORD", config.getPassword());
        processBuilder.environment().put("POSTGRES_DB", config.getDatabase());
        processBuilder.environment().put("POSTGRES_HOST", postgresHost);
        processBuilder.environment().put("POSTGRES_PORT_HOST", String.valueOf(config.getPort()));

        processBuilder.inheritIO().start();
        processBuilder.inheritIO().start();
    }
}

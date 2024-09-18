package ec.edu.espe.security.monitoring.services;

import org.springframework.stereotype.Service;

import java.io.IOException;
@Service
public class DockerComposeService {

    public void runDockerCompose(String postgresUser, String postgresPassword, String postgresDb, String postgresHost,
                                 int postgresPortHost, int postgresPortContainer,
                                 String mongoUser, String mongoPassword, String mongoDb, String mongoHost,
                                 int mongoPortHost, int mongoPortContainer,
                                 String mysqlRootPassword, String mysqlDatabase, String mysqlUser, String mysqlPassword,
                                 String mysqlHost, int mysqlPortHost, int mysqlPortContainer) throws IOException {

        // Crea el comando docker-compose con las variables dinámicas
        ProcessBuilder processBuilder = new ProcessBuilder(
                "docker-compose",
                "-f", "../.devcontainer/docker-compose.yml",
                "up", "-d"
        );

        // Establece las variables de entorno para PostgreSQL
        processBuilder.environment().put("POSTGRES_USER", postgresUser);
        processBuilder.environment().put("POSTGRES_PASSWORD", postgresPassword);
        processBuilder.environment().put("POSTGRES_DB", postgresDb);
        processBuilder.environment().put("POSTGRES_HOST", postgresHost);
        processBuilder.environment().put("POSTGRES_PORT_HOST", String.valueOf(postgresPortHost));
        processBuilder.environment().put("POSTGRES_PORT_CONTAINER", String.valueOf(postgresPortContainer));

        // Establece las variables de entorno para MongoDB
        processBuilder.environment().put("MONGODB_USER", mongoUser);
        processBuilder.environment().put("MONGODB_PASSWORD", mongoPassword);
        processBuilder.environment().put("MONGODB_DB", mongoDb);
        processBuilder.environment().put("MONGODB_HOST", mongoHost);
        processBuilder.environment().put("MONGODB_PORT_HOST", String.valueOf(mongoPortHost));
        processBuilder.environment().put("MONGODB_PORT_CONTAINER", String.valueOf(mongoPortContainer));

        // Establece las variables de entorno para MariaDB/MySQL
        processBuilder.environment().put("MYSQL_ROOT_PASSWORD", mysqlRootPassword);
        processBuilder.environment().put("MYSQL_DATABASE", mysqlDatabase);
        processBuilder.environment().put("MYSQL_USER", mysqlUser);
        processBuilder.environment().put("MYSQL_PASSWORD", mysqlPassword);
        processBuilder.environment().put("MYSQL_HOST", mysqlHost);
        processBuilder.environment().put("MYSQL_PORT_HOST", String.valueOf(mysqlPortHost));
        processBuilder.environment().put("MYSQL_PORT_CONTAINER", String.valueOf(mysqlPortContainer));

        // Inicia el proceso
        processBuilder.inheritIO().start();
    }
}

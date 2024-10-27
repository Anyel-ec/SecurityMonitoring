package ec.edu.espe.security.monitoring.services.interfaces.docker;

import ec.edu.espe.security.monitoring.models.credentials.DatabaseCredentials;

import java.io.IOException;

public interface DockerComposeService {
    void runDockerCompose();

    void runDockerComposeWithDatabase(DatabaseCredentials config, String dbType) throws IOException;
}

package ec.edu.espe.security.monitoring.services.interfaces.docker;

import ec.edu.espe.security.monitoring.models.DatabaseCredential;

import java.io.IOException;

public interface DockerDbCredentialService {

    void runDockerComposeWithDatabase() throws IOException, InterruptedException;
}

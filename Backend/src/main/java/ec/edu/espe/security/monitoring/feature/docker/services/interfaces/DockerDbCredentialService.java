package ec.edu.espe.security.monitoring.feature.docker.services.interfaces;

import java.io.IOException;

public interface DockerDbCredentialService {

    void runDockerComposeWithDatabase() throws IOException, InterruptedException;
}

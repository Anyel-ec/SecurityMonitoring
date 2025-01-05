package ec.edu.espe.security.monitoring.modules.integrations.docker.services.interfaces;

import java.io.IOException;

public interface DockerDbCredentialService {

    void runDockerComposeWithDatabase() throws IOException, InterruptedException;
}

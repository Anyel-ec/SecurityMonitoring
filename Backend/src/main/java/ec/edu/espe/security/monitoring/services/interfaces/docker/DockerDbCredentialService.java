package ec.edu.espe.security.monitoring.services.interfaces.docker;

import java.io.IOException;

public interface DockerDbCredentialService {

    void runDockerComposeWithDatabase() throws IOException, InterruptedException;
}

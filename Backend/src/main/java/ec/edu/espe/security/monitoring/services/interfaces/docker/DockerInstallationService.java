package ec.edu.espe.security.monitoring.services.interfaces.docker;

import java.io.IOException;

public  interface DockerInstallationService {
    void runDockerComposeWithActiveInstallations () throws IOException;
}

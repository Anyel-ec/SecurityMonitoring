package ec.edu.espe.security.monitoring.feature.docker.services.interfaces;

import java.io.IOException;

public  interface DockerInstallationService {
    void runDockerComposeWithActiveInstallations () throws IOException, InterruptedException;
    boolean areDockerContainersUp();
}

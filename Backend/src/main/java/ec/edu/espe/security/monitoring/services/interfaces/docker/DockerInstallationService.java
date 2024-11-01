package ec.edu.espe.security.monitoring.services.interfaces.docker;

import ec.edu.espe.security.monitoring.models.DatabaseCredential;

import java.io.IOException;
import java.util.List;

public  interface DockerInstallationService {
    void runDockerComposeWithActiveInstallations() throws IOException;
}

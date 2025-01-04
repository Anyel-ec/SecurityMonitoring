package ec.edu.espe.security.monitoring.integrations.docker.services.interfaces;

public interface DockerRunService {
    boolean isDockerRunning();

    boolean hasBeenExecuted();
    void runDockerCompose();
}

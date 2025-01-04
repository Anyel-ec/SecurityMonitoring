package ec.edu.espe.security.monitoring.feature.docker.services.interfaces;

public interface DockerRunService {
    boolean isDockerRunning();

    boolean hasBeenExecuted();
    void runDockerCompose();
}

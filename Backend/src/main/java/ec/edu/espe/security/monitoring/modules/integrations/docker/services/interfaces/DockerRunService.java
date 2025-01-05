package ec.edu.espe.security.monitoring.modules.integrations.docker.services.interfaces;

public interface DockerRunService {
    boolean isDockerRunning();

    boolean hasBeenExecuted();
    void runDockerCompose();
}

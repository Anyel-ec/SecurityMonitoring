package ec.edu.espe.security.monitoring.services.interfaces.docker;

public interface DockerRunService {
    boolean isDockerRunning();

    boolean hasBeenExecuted();
    void runDockerCompose();
}

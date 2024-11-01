package ec.edu.espe.security.monitoring.services.impl.docker;

import ec.edu.espe.security.monitoring.services.interfaces.docker.DockerRunService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@Service
@Slf4j
public class DockerRunServiceImpl implements DockerRunService {

    private boolean isExecuted = false;

    /**
     * This service checks whether Docker is currently running on the system.
     * It does this by executing the command "docker version" and analyzing the output.
     * If Docker is not running, the method looks for common error messages in the error stream,
     * such as "docker daemon is not running" or "error during connect".
     * If no errors are found and the output contains "Version", it indicates that Docker is running.
     *
     * @return boolean - true if Docker is running, false if not.
     */
    public boolean isDockerRunning() {
        try {
            ProcessBuilder processBuilder = new ProcessBuilder("docker", "version");
            Process process = processBuilder.start();

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getErrorStream()));
            String line;
            StringBuilder errorMessage = new StringBuilder();

            while ((line = reader.readLine()) != null) {
                errorMessage.append(line).append("\n");
            }

            // Check if the error message contains an indication that Docker is not running
            if (errorMessage.toString().contains("The system cannot find the file specified")
                    || errorMessage.toString().contains("error during connect")
                    || errorMessage.toString().contains("docker daemon is not running")) {
                log.error("Docker daemon is not running: " + errorMessage);
                return false;  // Docker daemon is not running
            }

            // If there were no errors and the message contains the word "Version", Docker is running
            BufferedReader successReader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            while ((line = successReader.readLine()) != null) {
                if (line.contains("Version")) {
                    return true;  // Docker daemon is running
                }
            }

            process.waitFor();
        } catch (IOException e) {
            // Specific handling for I/O errors
           log.error("Error checking Docker status (IOException): " + e.getMessage());
        } catch (InterruptedException e) {
            // Restore the interrupted status of the current thread
            Thread.currentThread().interrupt();
            log.error("Thread was interrupted while checking Docker status: " + e.getMessage());
        }
        return false;  // Docker daemon is not running
    }

    /**
     * Runs Docker Compose to bring up the services defined in the docker-compose.yml file.
     * This method simply executes the docker-compose up -d command.
     */
    @Override
    public void runDockerCompose() {
        if (isExecuted) {
            log.info("Docker Compose ya ha sido ejecutado. No se volverá a ejecutar.");
            return;
        }
        ProcessBuilder processBuilder = new ProcessBuilder(
                "docker-compose",
                "-f", "../.container/docker-compose.yml",
                "up", "-d"
        );

        try {
            // Log before execution
            log.info("Executing docker-compose up -d to bring up services...");

            // Inherit IO to display output in the current terminal and start the process
            processBuilder.inheritIO().start().waitFor();
            isExecuted = true;  // Mark as executed after successful execution
            log.info("Docker Compose executed successfully.");
        } catch (IOException | InterruptedException e) {
            log.error("Error while executing docker-compose up: ", e);
            Thread.currentThread().interrupt();  // Restore the interrupted status if interrupted
        }
    }

    /**
     * Indicates whether the Docker Compose process has been executed.
     * @return true if the process has already been executed, false otherwise
     */
    public boolean hasBeenExecuted() {
        return isExecuted;
    }
}

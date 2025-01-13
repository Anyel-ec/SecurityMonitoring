package ec.edu.espe.security.monitoring.modules.integrations.docker.services.impl;

import ec.edu.espe.security.monitoring.modules.integrations.docker.services.interfaces.DockerRunService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Files;
import java.nio.file.Path;

@Service
@Slf4j
@RequiredArgsConstructor
public class DockerRunServiceImpl implements DockerRunService {

    private boolean isExecuted = false;

    @Value("${app.docker.compose.path}")
    private String dockerComposePath;

    /**
     * verify if Docker is running
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

            if (errorMessage.toString().contains("The system cannot find the file specified")
                    || errorMessage.toString().contains("error during connect")
                    || errorMessage.toString().contains("docker daemon is not running")) {
                log.error("Docker daemon no está en ejecución: {}", errorMessage);
                return false;
            }

            // Validar si el proceso devuelve una versión
            BufferedReader successReader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            while ((line = successReader.readLine()) != null) {
                if (line.contains("Version")) {
                    log.info("Docker daemon está activo y corriendo.");
                    return true;
                }
            }

            process.waitFor();
        } catch (IOException | InterruptedException e) {
            log.error("Error verificando el estado de Docker: {}", e.getMessage());
            Thread.currentThread().interrupt();
        }
        return false;
    }

    /**
     * execute Docker Compose
     */
    @Override
    public void runDockerCompose() {
        if (isExecuted) {
            log.info("Docker Compose ya fue ejecutado anteriormente. No se repetirá la ejecución.");
            return;
        }

        try {
            // validate if the docker-compose file exists
            if (!Files.exists(Path.of(dockerComposePath))) {
                throw new IllegalStateException("El archivo docker-compose.yml no fue encontrado en: " + dockerComposePath);
            }

            // configure the ProcessBuilder
            ProcessBuilder processBuilder = new ProcessBuilder(
                    "docker-compose",
                    "-f", dockerComposePath,
                    "up", "-d"
            );

            log.info("Ejecutando: docker-compose up -d usando el archivo en: {}", dockerComposePath);
            Process process = processBuilder.inheritIO().start();
            int exitCode = process.waitFor();

            if (exitCode == 0) {
                log.info("Docker Compose ejecutado exitosamente.");
                isExecuted = true;
            } else {
                log.error("Error: Docker Compose terminó con código de salida {}", exitCode);
            }

        } catch (IOException e) {
            log.error("Error al intentar ejecutar docker-compose: {}", e.getMessage(), e);
            throw new IllegalStateException("Error al intentar ejecutar Docker Compose.", e);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            log.error("El proceso fue interrumpido: {}", e.getMessage());
            throw new IllegalStateException("El proceso fue interrumpido durante la ejecución de Docker Compose.", e);
        }
    }

    /**
     *  verify if Docker Compose has been executed
     */
    @Override
    public boolean hasBeenExecuted() {
        return isExecuted;
    }
}

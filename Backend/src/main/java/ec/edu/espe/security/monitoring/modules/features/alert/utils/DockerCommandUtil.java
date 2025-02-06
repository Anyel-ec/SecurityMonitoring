package ec.edu.espe.security.monitoring.modules.features.alert.utils;

import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 05/02/2025
 */
@Slf4j
@UtilityClass
public class DockerCommandUtil {
    public static void restartContainer(String containerName) {
        try {
            log.info("Reiniciando contenedor Docker: {}", containerName);

            ProcessBuilder processBuilder = new ProcessBuilder("docker", "restart", containerName);
            processBuilder.inheritIO().start().waitFor();

            log.info("Reinicio del contenedor {} completado.", containerName);
        } catch (IOException | InterruptedException e) {
            log.error("Error al reiniciar el contenedor {}: {}", containerName, e.getMessage());
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Error al reiniciar el contenedor Docker: " + containerName, e);
        }
    }
}

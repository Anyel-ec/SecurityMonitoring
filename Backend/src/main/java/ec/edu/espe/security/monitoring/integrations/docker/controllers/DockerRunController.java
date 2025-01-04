package ec.edu.espe.security.monitoring.integrations.docker.controllers;

import ec.edu.espe.security.monitoring.common.dto.JsonResponseDto;
import ec.edu.espe.security.monitoring.integrations.docker.services.interfaces.DockerDbCredentialService;
import ec.edu.espe.security.monitoring.integrations.docker.services.interfaces.DockerInstallationService;
import ec.edu.espe.security.monitoring.integrations.docker.services.interfaces.DockerRunService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("api/v1/docker")
@RestController
@RequiredArgsConstructor
@Slf4j
public class DockerRunController {
    private final DockerRunService dockerRunService;
    private final DockerDbCredentialService dockerComposeService;
    private final DockerInstallationService dockerInstallationService;

    /**
     * Endpoint to check if Docker is currently running.
     * @return ResponseEntity with JSON response indicating Docker's running status.
     */
    @GetMapping("/isActive")
    public ResponseEntity<JsonResponseDto> checkDockerStatus() {
        try {
            if (!dockerRunService.isDockerRunning()) {
                log.error("Docker no está en ejecución");
                return ResponseEntity.status(500).body(new JsonResponseDto(false, 500, "Docker no está en ejecución", null));
            }

            return ResponseEntity.ok(new JsonResponseDto(true, 200, "Docker está en ejecución", null));

        } catch (Exception e) {
            log.error("Error inesperado al verificar el estado de Docker {}", e.getMessage());
            return ResponseEntity.status(500).body(new JsonResponseDto(false, 500, "Ocurrió un error inesperado", null));
        }
    }

    /**
     * Endpoint to check if Docker Compose has been executed.
     * If not, it triggers Docker Compose execution.
     * @return ResponseEntity with JSON response indicating execution status.
     */
    @GetMapping("/hasBeenExecuted")
    public ResponseEntity<JsonResponseDto> checkIfComposeExecuted() {
        try {
            boolean hasExecuted = dockerRunService.hasBeenExecuted();

            if (!hasExecuted) {
                log.info("Docker Compose no ha sido ejecutado. Ejecutando Docker Compose...");
                dockerInstallationService.runDockerComposeWithActiveInstallations();
                return ResponseEntity.ok(new JsonResponseDto(true, 200, "Docker Compose no había sido ejecutado y ahora ha sido iniciado.", null));
            } else {
                return ResponseEntity.ok(new JsonResponseDto(true, 200, "Docker Compose ya ha sido ejecutado.", true));
            }

        } catch (InterruptedException ie) {
            log.error("Proceso interrumpido al verificar o ejecutar Docker Compose: {}", ie.getMessage());
            Thread.currentThread().interrupt();
            return ResponseEntity.status(500).body(new JsonResponseDto(false, 500, "Proceso interrumpido durante la verificación o ejecución de Docker Compose", null));
        } catch (Exception e) {
            log.error("Error al verificar y ejecutar Docker Compose si no ha sido ejecutado: {}", e.getMessage());
            return ResponseEntity.status(500).body(new JsonResponseDto(false, 500, "Error al verificar o ejecutar Docker Compose", null));
        }
    }

    /**
     * Endpoint to run Docker Compose with database credentials.
     * @return ResponseEntity with JSON response indicating success or error.
     */
    @GetMapping("/runComposeWithDatabase")
    public ResponseEntity<JsonResponseDto> runDockerComposeWithDatabase() {
        try {
            dockerComposeService.runDockerComposeWithDatabase();
            log.info("Docker Compose ejecutado con las credenciales de base de datos activas.");
            return ResponseEntity.ok(new JsonResponseDto(true, 200, "Docker Compose ejecutado con éxito para las credenciales de base de datos activas.", null));
        } catch (InterruptedException ie) {
            log.error("Proceso interrumpido mientras se ejecutaba Docker Compose: {}", ie.getMessage());
            Thread.currentThread().interrupt();
            return ResponseEntity.status(500).body(new JsonResponseDto(false, 500, "Proceso interrumpido durante la ejecución de Docker Compose", null));
        } catch (Exception e) {
            log.error("Error al ejecutar Docker Compose con credenciales de base de datos activas: {}", e.getMessage());
            return ResponseEntity.status(500).body(new JsonResponseDto(false, 500, "Error al ejecutar Docker Compose con credenciales de base de datos", null));
        }
    }

    /**
     * Endpoint to check the running status of Grafana and Prometheus containers.
     * @return ResponseEntity with JSON response indicating container statuses.
     */
    @GetMapping("/checkContainerStatus")
    public ResponseEntity<JsonResponseDto> checkContainerStatus() {
        try {
            log.info("Verificando si los contenedores de Grafana y Prometheus están en funcionamiento.");

            boolean containersUp = dockerInstallationService.areDockerContainersUp();

            if (containersUp) {
                return ResponseEntity.ok(new JsonResponseDto(true, 200, "Ambos contenedores de Grafana y Prometheus están en funcionamiento.", null));
            } else {
                return ResponseEntity.ok(new JsonResponseDto(false, 200, "Uno o ambos contenedores no están en funcionamiento.", null));
            }

        } catch (IllegalStateException e) {
            log.error("Error al verificar el estado de los contenedores: {}", e.getMessage());
            return ResponseEntity.status(500).body(new JsonResponseDto(false, 500, "Error al verificar el estado de los contenedores: " + e.getMessage(), null));
        }
    }
}
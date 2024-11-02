package ec.edu.espe.security.monitoring.controllers.docker;

import ec.edu.espe.security.monitoring.dto.response.JsonResponseDto;
import ec.edu.espe.security.monitoring.services.impl.docker.DockerDbCredentialServiceImpl;
import ec.edu.espe.security.monitoring.services.impl.docker.DockerInstallationServiceImpl;
import ec.edu.espe.security.monitoring.services.impl.docker.DockerRunServiceImpl;
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
    private final DockerRunServiceImpl dockerRunService;
    private final DockerDbCredentialServiceImpl dockerComposeService;
    private final DockerInstallationServiceImpl dockerInstallationService;

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

        } catch (Exception e) {
            log.error("Error al verificar y ejecutar Docker Compose si no ha sido ejecutado: {}", e.getMessage());
            return ResponseEntity.status(500).body(new JsonResponseDto(false, 500, "Error al verificar o ejecutar Docker Compose", null));
        }
    }

    @GetMapping("/runComposeWithDatabase")
    public ResponseEntity<JsonResponseDto> runDockerComposeWithDatabase() {
        try {
            dockerComposeService.runDockerComposeWithDatabase();
            log.info("Docker Compose ejecutado con las credenciales de base de datos activas.");
            return ResponseEntity.ok(new JsonResponseDto(true, 200, "Docker Compose ejecutado con éxito para las credenciales de base de datos activas.", null));
        } catch (Exception e) {
            log.error("Error al ejecutar Docker Compose con credenciales de base de datos activas: {}", e.getMessage());
            return ResponseEntity.status(500).body(new JsonResponseDto(false, 500, "Error al ejecutar Docker Compose con credenciales de base de datos", null));
        }
    }
}

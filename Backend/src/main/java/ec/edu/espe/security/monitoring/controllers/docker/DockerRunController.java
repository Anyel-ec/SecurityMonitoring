package ec.edu.espe.security.monitoring.controllers.docker;

import ec.edu.espe.security.monitoring.dto.response.JsonResponseDto;
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
}

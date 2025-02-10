package ec.edu.espe.security.monitoring.modules.integrations.grafana.controllers;

import ec.edu.espe.security.monitoring.common.dto.JsonResponseDto;
import ec.edu.espe.security.monitoring.modules.integrations.grafana.services.interfaces.GrafanaDatasourceService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@Tag(name = "Operaciones Grafana", description = "Endpoint para la creación de una datasource de Prometheus en Grafana.")
@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("api/v1/grafana")
public class GrafanaDatasourceController {

    // Inject the GrafanaDatasourceServiceImpl
    private final GrafanaDatasourceService grafanaDatasourceService;

    /**
     * Endpoint to create a Prometheus datasource in Grafana.
     * @return ResponseEntity containing a JSON response with the operation result.
     */
    @PostMapping("/datasource")
    public ResponseEntity<JsonResponseDto> createPrometheusDatasource() {
        try {
            // Call the service to create the Prometheus datasource
            String result = grafanaDatasourceService.createPrometheusDatasource();

            // Create a successful response using the JsonResponseDto
            return ResponseEntity.ok(new JsonResponseDto(true, 200, "Datasource creada con éxito", result));
        } catch (Exception e) {
            log.error("Error al crear la datasource de Prometheus: {}", e.getMessage());

            // Create a failure response in case of error
            return ResponseEntity.status(500).body(new JsonResponseDto(false, 500, "Fallo al crear la datasource", null));
        }
    }
}

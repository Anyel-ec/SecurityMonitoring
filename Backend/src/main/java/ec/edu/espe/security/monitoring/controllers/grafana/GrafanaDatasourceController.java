package ec.edu.espe.security.monitoring.controllers.grafana;

import ec.edu.espe.security.monitoring.dto.response.JsonResponseDto;
import ec.edu.espe.security.monitoring.services.implementations.grafana.GrafanaDatasourceServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@Slf4j
@RestController
@RequestMapping("api/v1/grafana")
public class GrafanaDatasourceController {

    // Inject the GrafanaDatasourceServiceImpl
    private final GrafanaDatasourceServiceImpl grafanaDatasourceService;

    @PostMapping("/datasource")
    public ResponseEntity<JsonResponseDto> createPrometheusDatasource() {
        try {
            // Call the service to create the Prometheus datasource
            String result = grafanaDatasourceService.createPrometheusDatasource();

            // Create a successful response using the JsonResponseDto
            JsonResponseDto response = new JsonResponseDto(true, 200, "Datasource created successfully", result);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error creating the Prometheus datasource", e);

            // Create a failure response in case of error
            JsonResponseDto response = new JsonResponseDto(false, 500, "Failed to create the datasource", null);
            return ResponseEntity.status(500).body(response);
        }
    }
}

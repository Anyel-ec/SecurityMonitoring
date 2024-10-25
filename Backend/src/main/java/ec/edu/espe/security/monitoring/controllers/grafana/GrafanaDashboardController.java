package ec.edu.espe.security.monitoring.controllers.grafana;

import ec.edu.espe.security.monitoring.dto.response.JsonResponseDto;
import ec.edu.espe.security.monitoring.services.interfaces.grafana.GrafanaDashboardService;
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
public class GrafanaDashboardController {
    private final GrafanaDashboardService grafanaDashboardService;

    /**
     * Endpoint to create a dashboard in Grafana.
     * @return HTTP response with the result of the dashboard creation.
     */
    @PostMapping("/dashboard/create")
    public ResponseEntity<JsonResponseDto> createDashboard() {
        try {
            // Call the service to create the dashboard
            grafanaDashboardService.createDashboard();

            // If successful, return a success response
            JsonResponseDto response = new JsonResponseDto(true, 200, "Dashboard creado con éxito", null);
            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {
            // If there's a bad request due to illegal arguments
            JsonResponseDto response = new JsonResponseDto(false, 400, e.getMessage(), null);
            return ResponseEntity.badRequest().body(response);

        } catch (Exception e) {
            // Catch unexpected errors
            log.error("Error inesperado al crear el dashboard de Grafana: {}", e.getMessage());
            JsonResponseDto response = new JsonResponseDto(false, 500, "Error interno del servidor", null);
            return ResponseEntity.status(500).body(response);
        }
    }
}

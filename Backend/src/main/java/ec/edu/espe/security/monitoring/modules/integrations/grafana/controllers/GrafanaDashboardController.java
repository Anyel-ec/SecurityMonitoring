package ec.edu.espe.security.monitoring.modules.integrations.grafana.controllers;

import ec.edu.espe.security.monitoring.common.dto.JsonResponseDto;
import ec.edu.espe.security.monitoring.modules.integrations.grafana.dto.GrafanaDashboardRequestDto;
import ec.edu.espe.security.monitoring.modules.integrations.grafana.services.interfaces.GrafanaDashboardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
            return ResponseEntity.ok(new JsonResponseDto(true, 200, "Dashboard creado con éxito", null));

        } catch (IllegalArgumentException e) {
            // If there's a bad request due to illegal arguments
            return ResponseEntity.badRequest().body(new JsonResponseDto(false, 400, e.getMessage(), null));

        } catch (Exception e) {
            // Catch unexpected errors
            log.error("Error inesperado al crear el dashboard de Grafana: {}", e.getMessage());
            return ResponseEntity.status(500).body(new JsonResponseDto(false, 500, "Error interno del servidor", null));
        }
    }

    /**
     * Endpoint to create a Grafana dashboard using a JSON payload provided by the user.
     * @param dashboardRequestDto DTO containing the dashboard JSON and additional options.
     * @return ResponseEntity with the result of the dashboard creation.
     */
    @PostMapping("/dashboard/create/custom")
    public ResponseEntity<JsonResponseDto> createCustomDashboard(@RequestBody GrafanaDashboardRequestDto dashboardRequestDto) {
        try {
            // Llamada al servicio con el JSON recibido
            grafanaDashboardService.createDashboardFromJson(dashboardRequestDto);
            return ResponseEntity.ok(new JsonResponseDto(true, 200, "Dashboard creado con éxito.", null));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new JsonResponseDto(false, 400, e.getMessage(), null));
        } catch (Exception e) {
            log.error("Error inesperado al crear el dashboard: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new JsonResponseDto(false, 500, "Error interno del servidor", null));
        }
    }
}

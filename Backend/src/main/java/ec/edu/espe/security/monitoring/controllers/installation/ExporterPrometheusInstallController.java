package ec.edu.espe.security.monitoring.controllers.installation;

import ec.edu.espe.security.monitoring.dto.request.installation.ExporterPrometheusInstallRequestDto;
import ec.edu.espe.security.monitoring.dto.response.JsonResponseDto;
import ec.edu.espe.security.monitoring.services.interfaces.installation.PrometheusExporterInstallService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/install/prometheus-exporters")
@AllArgsConstructor
@Slf4j
public class ExporterPrometheusInstallController {

    private final PrometheusExporterInstallService prometheusExporterInstallService;

    /**
     * Endpoint to save or update Prometheus exporter configurations.
     * @param requestDto DTO containing the port configurations for PostgreSQL, MariaDB, and MongoDB.
     * @return JsonResponseDto with success or error message.
     */
    @PutMapping
    public ResponseEntity<JsonResponseDto> saveOrUpdatePrometheusExporters(
            @RequestBody ExporterPrometheusInstallRequestDto requestDto) {
        try {
            prometheusExporterInstallService.saveOrUpdatePrometheusExporters(requestDto);

            JsonResponseDto response = new JsonResponseDto(true, 200, "Exportadores de Prometheus actualizados correctamente", null);
            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {
            JsonResponseDto response = new JsonResponseDto(false, 400, e.getMessage(), null);
            return ResponseEntity.badRequest().body(response);

        } catch (Exception e) {
            log.error("Error inesperado al actualizar exportadores de Prometheus: {}", e.getMessage());
            JsonResponseDto response = new JsonResponseDto(false, 500, "Error interno del servidor", null);
            return ResponseEntity.status(500).body(response);
        }
    }
}

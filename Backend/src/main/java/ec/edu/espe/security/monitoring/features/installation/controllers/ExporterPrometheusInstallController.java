package ec.edu.espe.security.monitoring.features.installation.controllers;

import ec.edu.espe.security.monitoring.features.installation.dto.ExporterPrometheusInstallRequestDto;
import ec.edu.espe.security.monitoring.common.dto.JsonResponseDto;
import ec.edu.espe.security.monitoring.features.installation.services.interfaces.PrometheusExporterInstallService;
import jakarta.validation.Valid;
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
     *
     * @param requestDto DTO containing the port configurations for PostgreSQL, MariaDB, and MongoDB.
     * @return JsonResponseDto with success or error message.
     */
    @PutMapping
    public ResponseEntity<JsonResponseDto> saveOrUpdatePrometheusExporters(@Valid @RequestBody ExporterPrometheusInstallRequestDto requestDto) {
        try {
            prometheusExporterInstallService.saveOrUpdatePrometheusExporters(requestDto);

            return ResponseEntity.ok(new JsonResponseDto(true, 200, "Exportadores de Prometheus actualizados correctamente", null));

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new JsonResponseDto(false, 400, e.getMessage(), null));

        } catch (Exception e) {
            log.error("Error inesperado al actualizar exportadores de Prometheus: {}", e.getMessage());
            return ResponseEntity.status(500).body(new JsonResponseDto(false, 500, "Error interno del servidor", null));
        }
    }
}

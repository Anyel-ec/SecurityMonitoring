package ec.edu.espe.security.monitoring.feature.installation.controllers;

import ec.edu.espe.security.monitoring.feature.installation.dto.GrafanaInstallRequestDto;
import ec.edu.espe.security.monitoring.common.dto.response.JsonResponseDto;
import ec.edu.espe.security.monitoring.feature.installation.models.InstallationConfig;
import ec.edu.espe.security.monitoring.feature.installation.services.interfaces.GrafanaInstallService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("api/v1/install/grafana")
public class GrafanaInstallController {

    private final GrafanaInstallService grafanaInstallService;

    /**
     * POST endpoint to save Grafana installation parameters.
     *
     * @param grafanaInstallRequestDTO Data Transfer Object containing installation details.
     * @return ResponseEntity with a JSON response indicating success or failure.
     */
    @PostMapping()
    public ResponseEntity<JsonResponseDto> saveGrafanaInstall(@Valid @RequestBody GrafanaInstallRequestDto grafanaInstallRequestDTO) {
        try {
            // Try to save the Grafana installation
            InstallationConfig savedGrafanaInstall = grafanaInstallService.saveGrafanaInstall(grafanaInstallRequestDTO);

            // Check if the installation was successfully saved
            if (savedGrafanaInstall != null) {
                return ResponseEntity.ok(new JsonResponseDto(true, 200, "Instalación de Grafana guardada exitosamente", savedGrafanaInstall));  // Return 200 OK with the saved configuration
            } else {
                return ResponseEntity.status(500).body(new JsonResponseDto(false, 500, "Error al guardar la instalación de Grafana", null));  // Return 500 Internal Server Error
            }
        } catch (IllegalArgumentException e) {
            // Handle specific exceptions such as invalid data
            return ResponseEntity.badRequest().body(new JsonResponseDto(false, 400, "Solicitud Incorrecta", null));  // Return 400 Bad Request
        } catch (Exception e) {
            // Handle any other unexpected exceptions
            log.error("Error inesperado al guardar la instalación de Grafana", e);
            return ResponseEntity.status(500).body(new JsonResponseDto(false, 500, "Error interno del servidor al guardar la instalación de Grafana", null));  // Return 500 Internal Server Error
        }
    }

    /**
     * GET endpoint to retrieve Grafana installation parameters.
     *
     * @return ResponseEntity with a JSON response containing the installation configuration or error details.
     */
    @GetMapping()
    public ResponseEntity<JsonResponseDto> getGrafanaInstall() {
        try {
            // Retrieve Grafana installation configuration
            InstallationConfig grafanaInstall = grafanaInstallService.getGrafanaInstall();

            // If the configuration is found, return 200 OK with the configuration
            if (grafanaInstall != null) {
                return ResponseEntity.ok(new JsonResponseDto(true, 200, "Instalación de Grafana recuperada exitosamente", grafanaInstall));
            } else {
                // If the configuration is not found, return 404 Not Found
                return ResponseEntity.status(404).body(new JsonResponseDto(false, 404, "Instalación de Grafana no encontrada", null));
            }
        } catch (Exception e) {
            // Handle any unexpected exceptions
            return ResponseEntity.status(500).body(new JsonResponseDto(false, 500, "Error interno del servidor al recuperar la instalación de Grafana", null));
        }
    }
}

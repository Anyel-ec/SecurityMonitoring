package ec.edu.espe.security.monitoring.controllers.installation;

import ec.edu.espe.security.monitoring.dto.request.GrafanaInstallRequestDto;
import ec.edu.espe.security.monitoring.dto.response.JsonResponseDto;
import ec.edu.espe.security.monitoring.models.InstallationConfig;
import ec.edu.espe.security.monitoring.services.interfaces.installation.GrafanaInstallService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("api/v1/install/grafana")
public class GrafanaInstallController
{

    private final GrafanaInstallService grafanaInstallService;

    /*
     * POST endpoint to save Grafana installation parameters
     * @param GrafanaInstallRequestDto grafanaInstallRequestDTO
     * @return ResponseEntity<InstallationConfig>
     */
    @PostMapping()
    public ResponseEntity<JsonResponseDto> saveGrafanaInstall(@Valid @RequestBody GrafanaInstallRequestDto grafanaInstallRequestDTO) {
        try {
            // Try to save the Grafana installation
            InstallationConfig savedGrafanaInstall = grafanaInstallService.saveGrafanaInstall(grafanaInstallRequestDTO);

            // Check if the installation was successfully saved
            if (savedGrafanaInstall != null) {
                JsonResponseDto response = new JsonResponseDto(true, 200, "Instalación de Grafana guardada exitosamente", savedGrafanaInstall);
                return ResponseEntity.ok(response);  // Return 200 OK with the saved configuration
            } else {
                JsonResponseDto response = new JsonResponseDto(false, 500, "Error al guardar la instalación de Grafana", null);
                return ResponseEntity.status(500).body(response);  // Return 500 Internal Server Error
            }
        } catch (IllegalArgumentException e) {
            // Handle specific exceptions such as invalid data
            JsonResponseDto response = new JsonResponseDto(false, 400, "Solicitud Incorrecta", null);
            return ResponseEntity.badRequest().body(response);  // Return 400 Bad Request
        } catch (Exception e) {
            // Handle any other unexpected exceptions
            log.error("Error inesperado al guardar la instalación de Grafana", e);
            JsonResponseDto response = new JsonResponseDto(false, 500, "Error interno del servidor al guardar la instalación de Grafana", null);
            return ResponseEntity.status(500).body(response);  // Return 500 Internal Server Error
        }
    }

    /*
     * GET endpoint to retrieve Grafana installation parameters
     * @return ResponseEntity<InstallationConfig>
     */
    @GetMapping()
    public ResponseEntity<JsonResponseDto> getGrafanaInstall() {
        try {
            // Retrieve Grafana installation configuration
            InstallationConfig grafanaInstall = grafanaInstallService.getGrafanaInstall();

            // If the configuration is found, return 200 OK with the configuration
            if (grafanaInstall != null) {
                JsonResponseDto response = new JsonResponseDto(true, 200, "Instalación de Grafana recuperada exitosamente", grafanaInstall);
                return ResponseEntity.ok(response);
            } else {
                // If the configuration is not found, return 404 Not Found
                JsonResponseDto response = new JsonResponseDto(false, 404, "Instalación de Grafana no encontrada", null);
                return ResponseEntity.status(404).body(response);
            }
        } catch (Exception e) {
            // Handle any unexpected exceptions
            JsonResponseDto response = new JsonResponseDto(false, 500, "Error interno del servidor al recuperar la instalación de Grafana", null);
            return ResponseEntity.status(500).body(response);
        }
    }
}

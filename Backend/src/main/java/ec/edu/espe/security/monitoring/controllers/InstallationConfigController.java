package ec.edu.espe.security.monitoring.controllers;

import ec.edu.espe.security.monitoring.dto.request.GrafanaInstallDto;
import ec.edu.espe.security.monitoring.dto.response.JsonResponseDto;
import ec.edu.espe.security.monitoring.models.InstallationConfig;
import ec.edu.espe.security.monitoring.services.interfaces.InstallationConfigService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("api/v1/install")
public class InstallationConfigController {
    private final InstallationConfigService grafanaInstallService;

    /*
     * POST endpoint to save Grafana installation parameters
     * @param GrafanaInstallDto grafanaInstallDTO
     * @return ResponseEntity<InstallationConfig>
     */
    @PostMapping("/grafana")
    public ResponseEntity<JsonResponseDto> saveGrafanaInstall(@Valid @RequestBody GrafanaInstallDto grafanaInstallDTO) {
        try {
            // Try to save the Grafana installation
            InstallationConfig savedGrafanaInstall = grafanaInstallService.saveGrafanaInstall(grafanaInstallDTO);

            // Check if the installation was successfully saved
            if (savedGrafanaInstall != null) {
                JsonResponseDto response = new JsonResponseDto(true, 200, "Grafana installation saved successfully", savedGrafanaInstall);
                return ResponseEntity.ok(response);  // Return 200 OK with the saved configuration
            } else {
                JsonResponseDto response = new JsonResponseDto(false, 500, "Failed to save Grafana installation", null);
                return ResponseEntity.status(500).body(response);  // Return 500 Internal Server Error
            }
        } catch (IllegalArgumentException e) {
            // Handle specific exceptions such as invalid data
            JsonResponseDto response = new JsonResponseDto(false, 400, e.getMessage(), null);
            return ResponseEntity.badRequest().body(response);  // Return 400 Bad Request
        } catch (Exception e) {
            // Handle any other unexpected exceptions
            log.error("Unexpected error while saving Grafana installation", e);
            JsonResponseDto response = new JsonResponseDto(false, 500, "Internal server error while saving Grafana installation", null);
            return ResponseEntity.status(500).body(response);  // Return 500 Internal Server Error
        }
    }

}

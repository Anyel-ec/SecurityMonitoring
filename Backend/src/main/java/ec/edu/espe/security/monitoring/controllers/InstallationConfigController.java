package ec.edu.espe.security.monitoring.controllers;

import ec.edu.espe.security.monitoring.dto.request.GrafanaInstallDto;
import ec.edu.espe.security.monitoring.dto.request.PrometheusInstallDto;
import ec.edu.espe.security.monitoring.dto.request.UserInstallDto;
import ec.edu.espe.security.monitoring.dto.response.JsonResponseDto;
import ec.edu.espe.security.monitoring.models.InstallationConfig;
import ec.edu.espe.security.monitoring.services.interfaces.InstallationConfigService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("api/v1/install")
public class InstallationConfigController {

    private final InstallationConfigService installationConfigService;


    /*
     * POST endpoint to save Grafana installation parameters
     * @param GrafanaInstallDto grafanaInstallDTO
     * @return ResponseEntity<InstallationConfig>
     */
    @PostMapping("/grafana")
    public ResponseEntity<JsonResponseDto> saveGrafanaInstall(@Valid @RequestBody GrafanaInstallDto grafanaInstallDTO) {
        try {
            // Try to save the Grafana installation
            InstallationConfig savedGrafanaInstall = installationConfigService.saveGrafanaInstall(grafanaInstallDTO);

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
            JsonResponseDto response = new JsonResponseDto(false, 400, e.getMessage(), null);
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
    @GetMapping("/grafana")
    public ResponseEntity<JsonResponseDto> getGrafanaInstall() {
        try {
            // Retrieve Grafana installation configuration
            InstallationConfig grafanaInstall = installationConfigService.getGrafanaInstall();

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



    /*
     * POST endpoint to save Prometheus installation parameters
     * @param PrometheusInstallDto prometheusInstallDto
     * @return ResponseEntity<JsonResponseDto>
     */
    @PostMapping("/prometheus")
    public ResponseEntity<JsonResponseDto> savePrometheusInstall(@Valid @RequestBody PrometheusInstallDto prometheusInstallDto) {
        try {
            // Try to save the Prometheus installation
            InstallationConfig savedPrometheusInstall = installationConfigService.savePrometheusInstall(prometheusInstallDto);

            // Check if the installation was successfully saved
            if (savedPrometheusInstall != null) {
                JsonResponseDto response = new JsonResponseDto(true, 200, "Instalación de Prometheus guardada exitosamente", savedPrometheusInstall);
                return ResponseEntity.ok(response);  // Return 200 OK with the saved configuration
            } else {
                JsonResponseDto response = new JsonResponseDto(false, 500, "Error al guardar la instalación de Prometheus", null);
                return ResponseEntity.status(500).body(response);  // Return 500 Internal Server Error
            }
        } catch (IllegalArgumentException e) {
            // Handle specific exceptions such as invalid data
            JsonResponseDto response = new JsonResponseDto(false, 400, e.getMessage(), null);
            return ResponseEntity.badRequest().body(response);  // Return 400 Bad Request
        } catch (Exception e) {
            // Handle any other unexpected exceptions
            log.error("Error inesperado al guardar la instalación de Prometheus", e);
            JsonResponseDto response = new JsonResponseDto(false, 500, "Error interno del servidor al guardar la instalación de Prometheus", null);
            return ResponseEntity.status(500).body(response);  // Return 500 Internal Server Error
        }
    }

    @GetMapping("/prometheus")
    public ResponseEntity<JsonResponseDto> getPrometheusInstall() {
        try {
            // Retrieve Prometheus installation configuration
            InstallationConfig prometheusInstall = installationConfigService.getPrometheusInstall();

            // If the configuration is found, return 200 OK with the configuration
            if (prometheusInstall != null) {
                JsonResponseDto response = new JsonResponseDto(true, 200, "Instalación de Prometheus recuperada exitosamente", prometheusInstall);
                return ResponseEntity.ok(response);
            } else {
                // If the configuration is not found, return 404 Not Found
                JsonResponseDto response = new JsonResponseDto(false, 404, "Instalación de Prometheus no encontrada", null);
                return ResponseEntity.status(404).body(response);
            }
        } catch (IllegalArgumentException e) {
            // Handle error if parameters are not found, return 400 Bad Request
            JsonResponseDto response = new JsonResponseDto(false, 400, e.getMessage(), null);
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            // Handle any unexpected exception, return 500 Internal Server Error
            JsonResponseDto response = new JsonResponseDto(false, 500, "Error interno del servidor al recuperar la instalación de Prometheus", null);
            return ResponseEntity.status(500).body(response);
        }
    }


    /*
     * POST endpoint to save user registration
     * @param UserInstallDto userInstallDto
     * @return ResponseEntity<JsonResponseDto>
     */
    @PostMapping("/user")
    public ResponseEntity<JsonResponseDto> saveUserInstall(@Valid @RequestBody UserInstallDto userInstallDto) {
        try {
            // Try to save the user registration
            InstallationConfig savedUserInstall = installationConfigService.saveUserInstall(userInstallDto);

            // Check if the registration was successfully saved
            if (savedUserInstall != null) {
                JsonResponseDto response = new JsonResponseDto(true, 200, "Registro de usuario guardado exitosamente", savedUserInstall);
                return ResponseEntity.ok(response);  // Return 200 OK with the saved registration
            } else {
                JsonResponseDto response = new JsonResponseDto(false, 500, "Error al guardar el registro de usuario", null);
                return ResponseEntity.status(500).body(response);  // Return 500 Internal Server Error
            }
        } catch (IllegalArgumentException e) {
            // Handle specific exceptions such as invalid data
            JsonResponseDto response = new JsonResponseDto(false, 400, e.getMessage(), null);
            return ResponseEntity.badRequest().body(response);  // Return 400 Bad Request
        } catch (Exception e) {
            // Handle any other unexpected exceptions
            log.error("Unexpected error while saving user registration", e);
            JsonResponseDto response = new JsonResponseDto(false, 500, "Error interno del servidor al guardar el registro de usuario", null);
            return ResponseEntity.status(500).body(response);  // Return 500 Internal Server Error
        }
    }


    @GetMapping("/active")
    public ResponseEntity<JsonResponseDto> getActiveInstallations() {
        List<InstallationConfig> activeInstallations = installationConfigService.getActiveInstallations();
        JsonResponseDto response = new JsonResponseDto(true, 200, "Active installations retrieved successfully", activeInstallations);
        return ResponseEntity.ok(response);
    }

    /*
     * GET endpoint to check if the installation is complete
     * @return ResponseEntity<JsonResponseDto>
     */
    @GetMapping("/status")
    public ResponseEntity<JsonResponseDto> getInstallationCompleteStatus() {
        try {
            // Use the service to check if the installation is complete
            boolean isComplete = installationConfigService.isInstallationComplete();

            // Return the installation status in a JsonResponseDto
            JsonResponseDto response = new JsonResponseDto(true, 200, "Estado de la instalación recuperado exitosamente", isComplete);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            // Handle error if the system parameter is not found
            JsonResponseDto response = new JsonResponseDto(false, 400, e.getMessage(), null);
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            // Handle any unexpected errors
            JsonResponseDto response = new JsonResponseDto(false, 500, "Error interno del servidor al recuperar el estado de instalación", null);
            return ResponseEntity.status(500).body(response);
        }
    }

}

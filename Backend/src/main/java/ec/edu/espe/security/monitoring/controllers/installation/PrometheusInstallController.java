package ec.edu.espe.security.monitoring.controllers.installation;

import ec.edu.espe.security.monitoring.dto.request.PrometheusInstallRequestDto;
import ec.edu.espe.security.monitoring.dto.response.JsonResponseDto;
import ec.edu.espe.security.monitoring.models.InstallationConfig;
import ec.edu.espe.security.monitoring.services.interfaces.installation.PrometheusInstallService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("api/v1/install/prometheus")
public class PrometheusInstallController {

    private final PrometheusInstallService prometheusInstallService;


    /*
     * POST endpoint to save Prometheus installation parameters
     * @param PrometheusInstallRequestDto prometheusInstallRequestDto
     * @return ResponseEntity<JsonResponseDto>
     */
    @PostMapping()
    public ResponseEntity<JsonResponseDto> savePrometheusInstall(@Valid @RequestBody PrometheusInstallRequestDto prometheusInstallRequestDto) {
        try {
            // Try to save the Prometheus installation
            InstallationConfig savedPrometheusInstall = prometheusInstallService.savePrometheusInstall(prometheusInstallRequestDto);

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

    @GetMapping()
    public ResponseEntity<JsonResponseDto> getPrometheusInstall() {
        try {
            // Retrieve Prometheus installation configuration
            InstallationConfig prometheusInstall = prometheusInstallService.getPrometheusInstall();

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
}

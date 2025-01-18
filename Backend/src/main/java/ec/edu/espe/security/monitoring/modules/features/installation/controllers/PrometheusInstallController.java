package ec.edu.espe.security.monitoring.modules.features.installation.controllers;

import ec.edu.espe.security.monitoring.modules.features.installation.dto.PrometheusInstallRequestDto;
import ec.edu.espe.security.monitoring.common.dto.JsonResponseDto;
import ec.edu.espe.security.monitoring.modules.features.installation.models.InstallationConfig;
import ec.edu.espe.security.monitoring.modules.features.installation.services.interfaces.PrometheusInstallService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 04/11/2024
 */

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("api/v1/install/prometheus")
public class PrometheusInstallController {

    private final PrometheusInstallService prometheusInstallService;


    /**
     * POST endpoint to save Prometheus installation parameters.
     *
     * @param prometheusInstallRequestDto Data Transfer Object containing installation details.
     * @return ResponseEntity with a JSON response indicating success or failure.
     */
    @PostMapping
    public ResponseEntity<JsonResponseDto> savePrometheusInstall(@Valid @RequestBody PrometheusInstallRequestDto prometheusInstallRequestDto) {
        try {
            // Try to save the Prometheus and Alertmanager installations
            Map<String, InstallationConfig> savedInstallations = prometheusInstallService.savePrometheusInstall(prometheusInstallRequestDto);

            // Check if the installations were successfully saved
            if (savedInstallations != null && !savedInstallations.isEmpty()) {
                return ResponseEntity.ok(new JsonResponseDto(true, 200,
                        "Instalación de Prometheus y Alertmanager guardadas exitosamente",
                        savedInstallations));  // Return 200 OK with the saved configurations
            } else {
                return ResponseEntity.status(500).body(new JsonResponseDto(false, 500,
                        "Error al guardar la instalación de Prometheus y Alertmanager", null));  // Return 500 Internal Server Error
            }
        } catch (IllegalArgumentException e) {
            // Handle specific exceptions such as invalid data
            return ResponseEntity.badRequest().body(new JsonResponseDto(false, 400, e.getMessage(), null));  // Return 400 Bad Request
        } catch (Exception e) {
            // Handle any other unexpected exceptions
            log.error("Error inesperado al guardar la instalación: {}", e.getMessage());
            return ResponseEntity.status(500).body(new JsonResponseDto(false, 500,
                    "Error interno del servidor al guardar la instalación", null));  // Return 500 Internal Server Error
        }
    }


    /**
     * GET endpoint to retrieve Prometheus installation parameters.
     *
     * @return ResponseEntity with a JSON response containing the installation configuration or error details.
     */
    @GetMapping
    public ResponseEntity<JsonResponseDto> getPrometheusInstall() {
        try {
            // Retrieve Prometheus installation configuration
            InstallationConfig prometheusInstall = prometheusInstallService.getPrometheusInstall();

            // If the configuration is found, return 200 OK with the configuration
            if (prometheusInstall != null) {
                return ResponseEntity.ok(new JsonResponseDto(true, 200, "Instalación de Prometheus recuperada exitosamente", prometheusInstall));
            } else {
                // If the configuration is not found, return 404 Not Found
                return ResponseEntity.status(404).body(new JsonResponseDto(false, 404, "Instalación de Prometheus no encontrada", null));
            }
        } catch (IllegalArgumentException e) {
            // Handle error if parameters are not found, return 400 Bad Request
            return ResponseEntity.badRequest().body(new JsonResponseDto(false, 400, e.getMessage(), null));
        } catch (Exception e) {
            // Handle any unexpected exception, return 500 Internal Server Error
            return ResponseEntity.status(500).body(new JsonResponseDto(false, 500, "Error interno del servidor al recuperar la instalación de Prometheus", null));
        }
    }

    /**
     * GET endpoint to retrieve Alertmanager installation parameters.
     *
     * @return ResponseEntity with a JSON response containing the installation configuration or error details.
     */
    @GetMapping("/alertmanager")
    public ResponseEntity<JsonResponseDto> getAlertmanagerInstall() {
        try {
            // Retrieve Prometheus installation configuration
            InstallationConfig alertmanagerInstall = prometheusInstallService.getAlertmanagerInstall();

            // If the configuration is found, return 200 OK with the configuration
            if (alertmanagerInstall != null) {
                return ResponseEntity.ok(new JsonResponseDto(true, 200, "Instalación de Alertmanager recuperada exitosamente", alertmanagerInstall));
            } else {
                // If the configuration is not found, return 404 Not Found
                return ResponseEntity.status(404).body(new JsonResponseDto(false, 404, "Instalación de Alertmanager no encontrada", null));
            }
        } catch (IllegalArgumentException e) {
            // Handle error if parameters are not found, return 400 Bad Request
            return ResponseEntity.badRequest().body(new JsonResponseDto(false, 400, e.getMessage(), null));
        } catch (Exception e) {
            // Handle any unexpected exception, return 500 Internal Server Error
            return ResponseEntity.status(500).body(new JsonResponseDto(false, 500, "Error interno del servidor al recuperar la instalación de Alertmanager", null));
        }
    }
}

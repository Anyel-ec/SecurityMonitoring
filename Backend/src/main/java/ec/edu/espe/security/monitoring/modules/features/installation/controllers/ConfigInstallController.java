package ec.edu.espe.security.monitoring.modules.features.installation.controllers;

import ec.edu.espe.security.monitoring.common.dto.JsonResponseDto;
import ec.edu.espe.security.monitoring.modules.features.installation.models.InstallationConfig;
import ec.edu.espe.security.monitoring.modules.core.initializer.models.SystemParameters;
import ec.edu.espe.security.monitoring.modules.integrations.docker.services.interfaces.DockerInstallationService;
import ec.edu.espe.security.monitoring.modules.features.installation.services.interfaces.ConfigInstallService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 04/11/2024
 */

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("api/v1/install")
public class ConfigInstallController {

    private final ConfigInstallService configInstallService;
    private final DockerInstallationService dockerInstallationService;

    /**
     * Endpoint to retrieve all active installations.
     * @return ResponseEntity with JSON response containing active installations.
     */
    @GetMapping("/active")
    public ResponseEntity<JsonResponseDto> getActiveInstallations() {
        try {
            List<InstallationConfig> activeInstallations = configInstallService.getActiveInstallations();
            JsonResponseDto response = new JsonResponseDto(true, 200, "Instalaciones activas recuperadas exitosamente", activeInstallations);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error al obtener las instalaciones activas: {}", e.getMessage());
            JsonResponseDto response = new JsonResponseDto(false, 500, "Error al recuperar las instalaciones activas", null);
            return ResponseEntity.status(500).body(response);
        }
    }

    /**
     * Endpoint to check if the installation is complete.
     * @return ResponseEntity containing a JSON response with the installation completion status.
     */
    @GetMapping("/status")
    public ResponseEntity<JsonResponseDto> getInstallationCompleteStatus() {
        try {
            // Use the service to check if the installation is complete
            boolean isComplete = configInstallService.isInstallationComplete();
            // Return the installation status in a JsonResponseDto
            return ResponseEntity.ok(new JsonResponseDto(true, 200, "Estado de la instalación recuperado exitosamente", isComplete));
        } catch (IllegalArgumentException e) {
            // Handle error if the system parameter is not found
            return ResponseEntity.badRequest().body(new JsonResponseDto(false, 400, "No se encuentra", null));
        } catch (Exception e) {
            // Handle any unexpected errors
            return ResponseEntity.status(500).body(new JsonResponseDto(false, 500, "Error interno del servidor al recuperar el estado de instalación", null));
        }
    }

    /**
     * Endpoint to update the COMPLETE_INSTALL parameter.
     * @return ResponseEntity containing a JSON response with the updated parameter.
     */
    @PutMapping("/complete")
    public ResponseEntity<JsonResponseDto> updateCompleteInstall() {
        try {
            // Update the COMPLETE_INSTALL parameter using the service
            SystemParameters updatedParam = configInstallService.updateCompleteInstallParameter();

            // Create a success response using JsonResponseDto
            return ResponseEntity.ok(new JsonResponseDto(true, 200, "El parámetro COMPLETE_INSTALL fue actualizado exitosamente.", updatedParam));
        } catch (IllegalArgumentException e) {
            // Handle error if the parameter was not found
            return ResponseEntity.badRequest().body(new JsonResponseDto(false, 400, e.getMessage(), null));
        } catch (Exception e) {
            // Handle any unexpected errors
            return ResponseEntity.status(500).body(new JsonResponseDto(false, 500, "Error interno del servidor al actualizar el parámetro COMPLETE_INSTALL.", null));
        }
    }

    /**
     * Endpoint to run the Docker Compose installation process.
     * @return ResponseEntity with JSON response indicating success or error.
     */
    @GetMapping("/docker/install")
    public ResponseEntity<JsonResponseDto> runDockerInstall() {
        try {
            // Call the service to execute Docker Compose
            dockerInstallationService.runDockerComposeWithActiveInstallations();
            // Create a success response
            return ResponseEntity.ok(new JsonResponseDto(true, 200, "Docker Compose se inició correctamente", null));
        } catch (IOException e) {
            log.error("Error al ejecutar Docker Compose", e);
            JsonResponseDto response = new JsonResponseDto(false, 500, "Error al iniciar Docker Compose", null);
            return ResponseEntity.status(500).body(response);
        } catch (InterruptedException e) {
            // Log the interruption and rethrow the exception
            log.error("El hilo se interrumpió mientras se ejecutaba Docker Compose", e);
            Thread.currentThread().interrupt();  // Restore interrupted status
            return ResponseEntity.status(500).body(new JsonResponseDto(false, 500, "Proceso interrumpido", null));
        } catch (Exception e) {
            log.error("Error inesperado al iniciar Docker Compose: {}", e.getMessage());
            return ResponseEntity.status(500).body(new JsonResponseDto(false, 500, "Ocurrió un error inesperado", null));
        }
    }

}
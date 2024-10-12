package ec.edu.espe.security.monitoring.controllers.installation;

import ec.edu.espe.security.monitoring.dto.response.JsonResponseDto;
import ec.edu.espe.security.monitoring.models.InstallationConfig;
import ec.edu.espe.security.monitoring.models.SystemParameters;
import ec.edu.espe.security.monitoring.services.interfaces.docker.DockerComposeService;
import ec.edu.espe.security.monitoring.services.interfaces.docker.DockerInstallationService;
import ec.edu.espe.security.monitoring.services.interfaces.installation.ConfigInstallService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;
@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("api/v1/install")
public class ConfigInstallController {

    private final ConfigInstallService configInstallService;
    private final DockerInstallationService dockerInstallationService;
    @GetMapping("/active")
    public ResponseEntity<JsonResponseDto> getActiveInstallations() {
        try {
            List<InstallationConfig> activeInstallations = configInstallService.getActiveInstallations();
            JsonResponseDto response = new JsonResponseDto(true, 200, "Instalaciones activas recuperadas exitosamente", activeInstallations);
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Error al obtener las instalaciones activas", e);
            JsonResponseDto response = new JsonResponseDto(false, 500, "Error al recuperar las instalaciones activas", null);
            return ResponseEntity.status(500).body(response);
        }
    }

    /*
     * GET endpoint to check if the installation is complete
     * @return ResponseEntity<JsonResponseDto>
     */
    @GetMapping("/status")
    public ResponseEntity<JsonResponseDto> getInstallationCompleteStatus() {
        try {
            // Use the service to check if the installation is complete
            boolean isComplete = configInstallService.isInstallationComplete();

            // Return the installation status in a JsonResponseDto
            JsonResponseDto response = new JsonResponseDto(true, 200, "Estado de la instalación recuperado exitosamente", isComplete);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            // Handle error if the system parameter is not found
            JsonResponseDto response = new JsonResponseDto(false, 400, "No se encuentra", null);
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            // Handle any unexpected errors
            JsonResponseDto response = new JsonResponseDto(false, 500, "Error interno del servidor al recuperar el estado de instalación", null);
            return ResponseEntity.status(500).body(response);
        }
    }

    /*
     * PUT endpoint to update the COMPLETE_INSTALL parameter
     * @return ResponseEntity<JsonResponseDto>
     */
    @PutMapping("/complete")
    public ResponseEntity<JsonResponseDto> updateCompleteInstall() {
        try {
            // Update the COMPLETE_INSTALL parameter using the service
            SystemParameters updatedParam = configInstallService.updateCompleteInstallParameter();

            // Create a success response using JsonResponseDto
            JsonResponseDto response = new JsonResponseDto(true, 200, "El parámetro COMPLETE_INSTALL fue actualizado exitosamente.", updatedParam);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            // Handle error if the parameter was not found
            JsonResponseDto response = new JsonResponseDto(false, 400, e.getMessage(), null);
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            // Handle any unexpected errors
            return ResponseEntity.status(500).body(new JsonResponseDto(false, 500, "Error interno del servidor al actualizar el parámetro COMPLETE_INSTALL.", null));
        }
    }

    // Endpoint run the Docker Compose installation process
    @GetMapping("/docker/install")
    public ResponseEntity<JsonResponseDto> runDockerInstall() {
        try {
            // Call the service to execute Docker Compose
            dockerInstallationService.runDockerComposeWithActiveInstallations();

            // Create a success response
            JsonResponseDto response = new JsonResponseDto(true, 200, "Docker Compose se inició correctamente", null);
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            log.error("Error al ejecutar Docker Compose", e);
            JsonResponseDto response = new JsonResponseDto(false, 500, "Error al iniciar Docker Compose", null);
            return ResponseEntity.status(500).body(response);
        } catch (InterruptedException e) {
            // Log and restore the interrupted status
            log.error("El hilo se interrumpió mientras se ejecutaba Docker Compose", e);
            Thread.currentThread().interrupt(); // Restore interrupted status
            return ResponseEntity.status(500).body(new JsonResponseDto(false, 500, "Proceso interrumpido", null));
        } catch (Exception e) {
            log.error("Error inesperado al iniciar Docker Compose", e);
            return ResponseEntity.status(500).body(new JsonResponseDto(false, 500, "Ocurrió un error inesperado", null));
        }
    }

}
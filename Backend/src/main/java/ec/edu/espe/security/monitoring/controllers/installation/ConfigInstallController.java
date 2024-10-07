package ec.edu.espe.security.monitoring.controllers.installation;

import ec.edu.espe.security.monitoring.dto.response.JsonResponseDto;
import ec.edu.espe.security.monitoring.models.InstallationConfig;
import ec.edu.espe.security.monitoring.models.SystemParameters;
import ec.edu.espe.security.monitoring.services.interfaces.installation.ConfigInstallService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("api/v1/install")
public class ConfigInstallController {

    private final ConfigInstallService configInstallService;

    @GetMapping("/active")
    public ResponseEntity<JsonResponseDto> getActiveInstallations() {
        List<InstallationConfig> activeInstallations = configInstallService.getActiveInstallations();
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
            boolean isComplete = configInstallService.isInstallationComplete();

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
}

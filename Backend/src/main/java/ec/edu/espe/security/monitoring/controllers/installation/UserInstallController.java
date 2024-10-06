package ec.edu.espe.security.monitoring.controllers.installation;

import ec.edu.espe.security.monitoring.dto.request.UserInstallRequestDto;
import ec.edu.espe.security.monitoring.dto.response.JsonResponseDto;
import ec.edu.espe.security.monitoring.models.InstallationConfig;
import ec.edu.espe.security.monitoring.services.interfaces.installation.UserInstallService;
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
@RequestMapping("api/v1/install/user")
public class UserInstallController {
    private final UserInstallService userInstallService;

    /*
     * POST endpoint to save user registration
     * @param UserInstallRequestDto userInstallRequestDto
     * @return ResponseEntity<JsonResponseDto>
     */
    @PostMapping()
    public ResponseEntity<JsonResponseDto> saveUserInstall(@Valid @RequestBody UserInstallRequestDto userInstallRequestDto) {
        try {
            // Try to save the user registration
            InstallationConfig savedUserInstall = userInstallService.saveUserInstall(userInstallRequestDto);

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
}

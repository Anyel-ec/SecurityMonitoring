package ec.edu.espe.security.monitoring.modules.features.installation.controllers;

import ec.edu.espe.security.monitoring.modules.features.installation.dto.UserInstallRequestDto;
import ec.edu.espe.security.monitoring.shared.dto.JsonResponseDto;
import ec.edu.espe.security.monitoring.modules.features.auth.model.UserInfo;
import ec.edu.espe.security.monitoring.modules.features.installation.services.interfaces.UserInstallService;
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

    /**
     * POST endpoint to save user registration.
     *
     * @param userInstallRequestDto Data Transfer Object containing user registration details.
     * @return ResponseEntity with a JSON response indicating success or failure.
     */
    @PostMapping()
    public ResponseEntity<JsonResponseDto> saveUserInstall(@Valid @RequestBody UserInstallRequestDto userInstallRequestDto) {
        try {
            // Try to save the user registration
            UserInfo savedUserInstall = userInstallService.saveUserInstall(userInstallRequestDto);

            // Check if the registration was successfully saved
            if (savedUserInstall != null) {
                return ResponseEntity.ok(new JsonResponseDto(true, 200, "Registro de usuario guardado exitosamente", savedUserInstall));  // Return 200 OK with the saved registration
            } else {
                return ResponseEntity.status(500).body(new JsonResponseDto(false, 500, "Error al guardar el registro de usuario", null));  // Return 500 Internal Server Error
            }
        } catch (IllegalArgumentException e) {
            // Handle specific exceptions such as invalid data
            return ResponseEntity.badRequest().body(new JsonResponseDto(false, 400, e.getMessage(), null));  // Return 400 Bad Request
        } catch (Exception e) {
            // Handle any other unexpected exceptions
            log.error("Unexpected error while saving user registration: {}", e.getMessage());
            return ResponseEntity.status(500).body(new JsonResponseDto(false, 500, "Error interno del servidor al guardar el registro de usuario", null));  // Return 500 Internal Server Error
        }
    }
}

package ec.edu.espe.security.monitoring.modules.features.auth.controller;

import ec.edu.espe.security.monitoring.modules.features.auth.dto.LoginRequestDto;
import ec.edu.espe.security.monitoring.common.dto.JsonResponseDto;
import ec.edu.espe.security.monitoring.modules.features.auth.model.UserInfo;
import ec.edu.espe.security.monitoring.modules.features.auth.service.interfaces.AuthService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 10/01/2025
 */
@Tag(name = "Autenticación", description = "Endpoints para la autenticación y gestión de usuarios")
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/auth")
public class AuthController {
    private final AuthService authService;

    /**
     * Endpoint to retrieve all active users.
     *
     * @return ResponseEntity containing a JSON response with active user data.
     */
    @GetMapping("/active-users")
    public ResponseEntity<JsonResponseDto> getAllActiveUsers() {
        try {
            List<UserInfo> activeUsers = authService.getAllActiveUsers();
            JsonResponseDto response = new JsonResponseDto(true, 200, "Usuarios activos obtenidos correctamente", activeUsers);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error al obtener usuarios activos {}", e.getMessage());
            JsonResponseDto response = new JsonResponseDto(false, 500, "Error al obtener usuarios activos", null);
            return ResponseEntity.status(500).body(response);
        }
    }

    /**
     * Login endpoint to authenticate a user and return a token.
     * @param loginRequest The request body containing user credentials.
     * @return ResponseEntity containing the authentication status and either the token or error message.
     */
    @PostMapping("/login")
    public ResponseEntity<JsonResponseDto> login(@RequestBody LoginRequestDto loginRequest) {
        log.info("Login request received: {}", loginRequest.getUsername());
        try {
            // Call the authentication method from AuthServiceImpl
            JsonResponseDto response = authService.authenticate(loginRequest);

            // Check the 'success' field in JsonResponseDto and return appropriate response
            if (response.success()) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

        } catch (Exception e) {
            log.error("Error en la autenticación: {}", e.getMessage());
            JsonResponseDto response = new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error interno en la autenticación", null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/userDetails")
    public ResponseEntity<JsonResponseDto> userDetails(@RequestHeader("Authorization") String authorizationHeader) {
        try {
            String token = authorizationHeader.replace("Bearer ", "");
            JsonResponseDto response = authService.getUserDetails(token);
            return ResponseEntity.status(response.httpCode()).body(response);
        } catch (Exception e) {
            log.error("Error en la obtención de detalles del usuario: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al procesar la solicitud", null));
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<JsonResponseDto> logout(@RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.replace("Bearer ", "");
            JsonResponseDto response = authService.revokeToken(token);
            return ResponseEntity.status(response.httpCode()).body(response);
        }
        return ResponseEntity.badRequest().body(new JsonResponseDto(false, 400, "Encabezado Authorization no encontrado o malformado.", null));
    }

    @PostMapping("/disable-first-login")
    public ResponseEntity<JsonResponseDto> disableFirstLogin(
            @RequestHeader("Authorization") String authorizationHeader) {
        log.info("Disabling first login for user");
        try {
            String token = authorizationHeader.replace("Bearer ", "");
            JsonResponseDto response = authService.disableFirstLogin(token);
            return ResponseEntity.status(response.httpCode()).body(response);
        } catch (Exception e) {
            log.error("Error al deshabilitar primer inicio de sesión: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al procesar la solicitud", null));
        }
    }
}

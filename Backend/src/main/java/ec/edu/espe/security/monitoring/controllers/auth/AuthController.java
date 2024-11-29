package ec.edu.espe.security.monitoring.controllers.auth;

import ec.edu.espe.security.monitoring.dto.request.LoginRequestDto;
import ec.edu.espe.security.monitoring.dto.response.JsonResponseDto;
import ec.edu.espe.security.monitoring.models.UserInfo;
import ec.edu.espe.security.monitoring.services.impl.auth.AuthServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/auth")
public class AuthController {
    private final AuthServiceImpl authService;

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

    @PostMapping("/login")
    public ResponseEntity<JsonResponseDto> login(@RequestBody LoginRequestDto loginRequest) {
        try {
            String token = authService.authenticate(loginRequest);
            JsonResponseDto response = new JsonResponseDto(true, 200, "Autenticación exitosa", token);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error en la autenticación {}", e.getMessage());
            JsonResponseDto response = new JsonResponseDto(false, 401, "Error en la autenticación: Credenciales inválidas", null);
            return ResponseEntity.status(401).body(response);
        }
    }
}

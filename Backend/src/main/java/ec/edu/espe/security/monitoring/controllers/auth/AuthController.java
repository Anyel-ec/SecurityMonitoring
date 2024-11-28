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
        log.info("Solicitud para obtener todos los usuarios activos");

        List<UserInfo> activeUsers = authService.getAllActiveUsers();
        JsonResponseDto response = new JsonResponseDto(true, 200, "Usuarios activos obtenidos correctamente", activeUsers);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<JsonResponseDto> login(@RequestBody LoginRequestDto loginRequest) {
        log.info("Solicitud para autenticar y generar token JWT");
        String token = authService.authenticate(loginRequest);
        JsonResponseDto response = new JsonResponseDto(true, 200, "Autenticación exitosa", token);

        return ResponseEntity.ok(response);
    }
}

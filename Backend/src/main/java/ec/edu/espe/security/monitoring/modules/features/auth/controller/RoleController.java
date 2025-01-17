package ec.edu.espe.security.monitoring.modules.features.auth.service.impl;
import ec.edu.espe.security.monitoring.common.dto.JsonResponseDto;
import ec.edu.espe.security.monitoring.modules.features.auth.service.interfaces.RoleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 17/01/2025
 */
@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/roles")
public class RoleController {

    private final RoleService roleService;

    // Endpoint para obtener todos los roles
    @GetMapping
    public ResponseEntity<JsonResponseDto> getAllRoles() {
        try {
            JsonResponseDto response = roleService.getAllRoles();
            return ResponseEntity.status(response.httpCode()).body(response);
        } catch (Exception e) {
            log.error("Error al obtener roles: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al procesar la solicitud", null));
        }
    }
}
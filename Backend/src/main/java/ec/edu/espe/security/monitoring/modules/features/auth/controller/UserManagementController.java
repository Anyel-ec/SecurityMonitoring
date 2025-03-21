package ec.edu.espe.security.monitoring.modules.features.auth.controller;

import ec.edu.espe.security.monitoring.common.dto.JsonResponseDto;
import ec.edu.espe.security.monitoring.modules.features.auth.dto.UserCreateDto;
import ec.edu.espe.security.monitoring.modules.features.auth.service.interfaces.UserManagementService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 16/01/2025
 */
@Tag(name = "Gestión de Usuarios", description = "Endpoints para la administración de usuarios del sistema")

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/users")
public class UserManagementController {

    private final UserManagementService userManagementService;

    @PostMapping("/create")
    public ResponseEntity<JsonResponseDto> createUser(
            @RequestHeader("Authorization") String authorizationHeader,
            @Valid @RequestBody UserCreateDto userCreateDto) {
        log.info("Creating user: {}", userCreateDto);
        try {
            String token = authorizationHeader.replace("Bearer ", "");
            JsonResponseDto response = userManagementService.createUser(token, userCreateDto);
            return ResponseEntity.status(response.httpCode()).body(response);
        } catch (Exception e) {
            log.error("Error al crear usuario: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al procesar la solicitud", null));
        }
    }


    @GetMapping
    public ResponseEntity<JsonResponseDto> getAllUsers(@RequestHeader("Authorization") String authorizationHeader) {
        try {
            String token = authorizationHeader.replace("Bearer ", "");
            JsonResponseDto response = userManagementService.getAllUsers(token);
            return ResponseEntity.status(response.httpCode()).body(response);
        } catch (Exception e) {
            log.error("Error al obtener lista de usuarios: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al procesar la solicitud", null));
        }
    }

    @PutMapping("/update/{userId}")
    public ResponseEntity<JsonResponseDto> updateUser(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable Long userId,
            @Valid @RequestBody UserCreateDto userUpdateDto) {
        try {
            String token = authorizationHeader.replace("Bearer ", "");
            JsonResponseDto response = userManagementService.updateUser(token, userId, userUpdateDto);
            return ResponseEntity.status(response.httpCode()).body(response);
        } catch (Exception e) {
            log.error("Error al actualizar usuario: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al procesar la solicitud", null));
        }
    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<JsonResponseDto> deleteUser(
            @RequestHeader("Authorization") String authorizationHeader,
            @PathVariable Long userId) {
        try {
            String token = authorizationHeader.replace("Bearer ", "");
            JsonResponseDto response = userManagementService.deleteUser(token, userId);
            return ResponseEntity.status(response.httpCode()).body(response);
        } catch (Exception e) {
            log.error("Error al eliminar usuario: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al procesar la solicitud", null));
        }
    }
}


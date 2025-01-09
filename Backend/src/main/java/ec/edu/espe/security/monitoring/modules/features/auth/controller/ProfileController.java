package ec.edu.espe.security.monitoring.modules.features.auth.controller;

import ec.edu.espe.security.monitoring.common.dto.JsonResponseDto;
import ec.edu.espe.security.monitoring.modules.features.auth.dto.ProfileDto;
import ec.edu.espe.security.monitoring.modules.features.auth.dto.ProfilePasswordDto;
import ec.edu.espe.security.monitoring.modules.features.auth.service.ProfileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/profile")
public class ProfileController {

    private final ProfileService profileService;

    // Obtener los datos del perfil
    @GetMapping
    public ResponseEntity<JsonResponseDto> profile(@RequestHeader("Authorization") String authorizationHeader) {
        try {
            String token = authorizationHeader.replace("Bearer ", "");
            JsonResponseDto response = profileService.getProfile(token);
            return ResponseEntity.status(response.httpCode()).body(response);
        } catch (Exception e) {
            log.error("Error en la obtención perfil del usuario: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al procesar la solicitud", null));
        }
    }

    // Actualizar los datos del perfil
    @PutMapping("/update")
    public ResponseEntity<JsonResponseDto> updateProfile(
            @RequestBody ProfileDto updateUserRequestDto,
            @RequestHeader("Authorization") String authorizationHeader) {
        try {
            String token = authorizationHeader.replace("Bearer ", "");
            JsonResponseDto response = profileService.updateProfile(token, updateUserRequestDto);
            return ResponseEntity.status(response.httpCode()).body(response);
        } catch (Exception e) {
            log.error("Error al actualizar perfil del usuario: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al procesar la solicitud", null));
        }
    }

    // Actualizar la contraseña
    @PutMapping("/update-password")
    public ResponseEntity<JsonResponseDto> updatePassword(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestBody ProfilePasswordDto profilePasswordDto) {
        try {
            String token = authorizationHeader.replace("Bearer ", "");
            JsonResponseDto response = profileService.updatePassword(token, profilePasswordDto);
            return ResponseEntity.status(response.httpCode()).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al actualizar la contraseña.", null));
        }
    }

}

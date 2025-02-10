package ec.edu.espe.security.monitoring.modules.features.auth.controller;

import ec.edu.espe.security.monitoring.common.dto.JsonResponseDto;
import ec.edu.espe.security.monitoring.modules.features.auth.dto.VerifyRecoveryCodeRequestDto;
import ec.edu.espe.security.monitoring.modules.features.auth.model.UserInfo;
import ec.edu.espe.security.monitoring.modules.features.auth.service.interfaces.RecoveryService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 13/01/2025
 */
@Tag(name = "Recuperación de contraseña", description = "Endpoints para la recuperación de cuentas de usuario")

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/recovery")
public class RecoveryController {

    private final RecoveryService recoveryService;

    @PostMapping("/recovery_password")
    public ResponseEntity<JsonResponseDto> generateRecoveryCode(@RequestBody UserInfo userInfo) {
        try {
            JsonResponseDto response = recoveryService.generateRecoveryCode(userInfo.getEmail());
            return ResponseEntity.status(response.httpCode()).body(response);
        } catch (Exception e) {
            log.error("Error al generar código de recuperación: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al generar el código de recuperación.", null));
        }
    }

    @PostMapping("/verify_code")
    public ResponseEntity<JsonResponseDto> verifyRecoveryCode(@RequestBody VerifyRecoveryCodeRequestDto requestDto) {
        try {
            String email = requestDto.getEmail();
            String code = requestDto.getCode();
            JsonResponseDto response = recoveryService.verifyRecoveryCode(email, code);
            return ResponseEntity.status(response.httpCode()).body(response);
        } catch (Exception e) {
            log.error("Error al verificar el código de recuperación: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al verificar el código de recuperación.", null));
        }
    }
    @PostMapping("/reset_password")
    public ResponseEntity<JsonResponseDto> resetPassword(@RequestBody VerifyRecoveryCodeRequestDto requestDto) {
        try {
            String email = requestDto.getEmail();
            String code = requestDto.getCode();
            String newPassword = requestDto.getNewPassword();
            JsonResponseDto response = recoveryService.resetPassword(email, code, newPassword);
            return ResponseEntity.status(response.httpCode()).body(response);
        } catch (Exception e) {
            log.error("Error al restablecer la contraseña: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al restablecer la contraseña.", null));
        }
    }

}
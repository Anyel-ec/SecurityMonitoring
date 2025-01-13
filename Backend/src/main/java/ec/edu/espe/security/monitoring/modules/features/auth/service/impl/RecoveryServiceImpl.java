package ec.edu.espe.security.monitoring.modules.features.auth.service.impl;

import ec.edu.espe.security.monitoring.common.dto.JsonResponseDto;
import ec.edu.espe.security.monitoring.modules.features.auth.dto.RecoveryCodeResponseDto;
import ec.edu.espe.security.monitoring.modules.features.auth.model.PasswordRecovery;
import ec.edu.espe.security.monitoring.modules.features.auth.model.UserInfo;
import ec.edu.espe.security.monitoring.modules.features.auth.repository.PasswordRecoveryRepository;
import ec.edu.espe.security.monitoring.modules.features.auth.repository.UserInfoRepository;
import ec.edu.espe.security.monitoring.modules.features.auth.service.interfaces.MailService;
import ec.edu.espe.security.monitoring.modules.features.auth.service.interfaces.RecoveryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 13/01/2025
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class RecoveryServiceImpl implements RecoveryService {

    private final UserInfoRepository userRepository;
    private final PasswordRecoveryRepository recoveryRepository;
    private final PasswordEncoder passwordEncoder;
    private final MailService mailService;

    @Value("${otp.expiration.minutes}")
    private int otpExpirationMinutes;

    private static final Random RANDOM_GENERATOR = new Random();

    @Override
    public JsonResponseDto generateRecoveryCode(String email) {
        try {
            log.info("Verificando el correo: {}", email);
            UserInfo user = userRepository.findByEmailAndIsActiveTrue(email);
            if (user == null) {
                return new JsonResponseDto(false, HttpStatus.NOT_FOUND.value(), "Usuario no encontrado.", null);
            }

            // Desactivar códigos anteriores
            user.getPasswordRecoveries().forEach(r -> r.setIsActive(false));

            String recoveryCode = String.format("%06d", RANDOM_GENERATOR.nextInt(999999));
            String encryptedRecoveryCode = passwordEncoder.encode(recoveryCode);
            LocalDateTime expirationDate = LocalDateTime.now().plusMinutes(otpExpirationMinutes);

            PasswordRecovery newRecovery = PasswordRecovery.builder()
                    .user(user)
                    .recoveryCode(encryptedRecoveryCode)
                    .recoveryExpirationDate(expirationDate)
                    .isActive(true)
                    .build();

            user.getPasswordRecoveries().add(newRecovery);
            recoveryRepository.save(newRecovery);
            mailService.sendRecoveryEmail(user, recoveryCode);

            return new JsonResponseDto(true, HttpStatus.OK.value(), "Código de recuperación generado con éxito.",
                    new RecoveryCodeResponseDto(recoveryCode, expirationDate));

        } catch (Exception e) {
            log.error("Error al generar el código de recuperación: {}", e.getMessage());
            return new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error interno del servidor.", null);
        }
    }

    @Override
    public JsonResponseDto verifyRecoveryCode(String email, String code) {
        try {
            UserInfo user = userRepository.findByEmailAndIsActiveTrue(email);
            if (user == null || user.getPasswordRecoveries().isEmpty()) {
                return new JsonResponseDto(false, HttpStatus.NOT_FOUND.value(), "Código no encontrado o usuario no existe.", null);
            }

            // Buscar un código activo
            PasswordRecovery validRecovery = user.getPasswordRecoveries().stream()
                    .filter(r -> r.getIsActive() && passwordEncoder.matches(code, r.getRecoveryCode()))
                    .findFirst()
                    .orElse(null);

            if (validRecovery == null || validRecovery.getRecoveryExpirationDate().isBefore(LocalDateTime.now())) {
                return new JsonResponseDto(false, HttpStatus.BAD_REQUEST.value(), "Código inválido o expirado.", null);
            }

            return new JsonResponseDto(true, HttpStatus.OK.value(), "Código válido.", null);
        } catch (Exception e) {
            log.error("Error al verificar el código de recuperación: {}", e.getMessage());
            return new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error interno del servidor.", null);
        }
    }

    @Override
    public JsonResponseDto resetPassword(String email, String code, String newPassword) {
        try {
            UserInfo user = userRepository.findByEmailAndIsActiveTrue(email);
            if (user == null) {
                return new JsonResponseDto(false, HttpStatus.NOT_FOUND.value(), "Usuario no encontrado.", null);
            }

            PasswordRecovery validRecovery = user.getPasswordRecoveries().stream()
                    .filter(r -> r.getIsActive() && passwordEncoder.matches(code, r.getRecoveryCode()))
                    .findFirst()
                    .orElse(null);

            if (validRecovery == null || validRecovery.getRecoveryExpirationDate().isBefore(LocalDateTime.now())) {
                return new JsonResponseDto(false, HttpStatus.BAD_REQUEST.value(), "Código inválido o expirado.", null);
            }

            // Actualizar contraseña
            user.setPassword(passwordEncoder.encode(newPassword));
            validRecovery.setIsActive(false);
            userRepository.save(user);

            return new JsonResponseDto(true, HttpStatus.OK.value(), "Contraseña restablecida con éxito.", null);
        } catch (Exception e) {
            log.error("Error al restablecer la contraseña: {}", e.getMessage());
            return new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error interno del servidor.", null);
        }
    }
}

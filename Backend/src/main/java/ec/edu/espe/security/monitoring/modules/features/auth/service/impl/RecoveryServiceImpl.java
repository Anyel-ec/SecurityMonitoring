package ec.edu.espe.security.monitoring.modules.features.auth.service.impl;
import ec.edu.espe.security.monitoring.common.dto.JsonResponseDto;
import ec.edu.espe.security.monitoring.modules.features.auth.dto.RecoveryCodeResponseDto;
import ec.edu.espe.security.monitoring.modules.features.auth.model.UserInfo;
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
import java.util.HashMap;
import java.util.Map;
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
                log.warn("Usuario no encontrado o inactivo para el correo :  {}", email);
                return new JsonResponseDto(false, HttpStatus.NOT_FOUND.value(), "Usuario no encontrado.", null);
            }
            // generate a random 6-digit recovery code
            String recoveryCode = String.format("%06d", RANDOM_GENERATOR.nextInt(999999));
            // Calculate the expiration date of the code
            LocalDateTime expirationDate = LocalDateTime.now().plusMinutes(otpExpirationMinutes);

            // Update the user with the recovery code and expiration date
            user.setRecoveryCode(recoveryCode);
            user.setRecoveryExpirationDate(expirationDate);
            log.info("Envio de correo");

            mailService.sendRecoveryEmail(user, recoveryCode);
            userRepository.save(user);
            log.info("Código de recuperación generado exitosamente para el correo: {}", email);

            log.info("Despues del envio de correo");

            userRepository.save(user);

            RecoveryCodeResponseDto responseData = new RecoveryCodeResponseDto(recoveryCode, expirationDate);

            return new JsonResponseDto(true, HttpStatus.OK.value(), "Código de recuperación generado con éxito.", responseData);
        } catch (Exception e) {
            log.error("Error al generar el código de recuperación: {}", e.getMessage());
            return new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al procesar la solicitud.", null);
        }
    }

    @Override
    public JsonResponseDto verifyRecoveryCode(String email, String code) {
        try {
            log.info("Verificando el código de recuperación para el correo: {}", email);
            UserInfo user = userRepository.findByEmailAndIsActiveTrue(email);
            if (user == null) {
                log.warn("Usuario no encontrado o inactivo para el correo: {}", email);
                return new JsonResponseDto(false, HttpStatus.NOT_FOUND.value(), "Usuario no encontrado.", null);
            }
            if (!code.equals(user.getRecoveryCode())) {
                log.warn("El código proporcionado no coincide para el correo: {}", email);
                return new JsonResponseDto(false, HttpStatus.BAD_REQUEST.value(), "El código de recuperación es incorrecto.", null);
            }
            if (user.getRecoveryExpirationDate() == null || user.getRecoveryExpirationDate().isBefore(LocalDateTime.now())) {
                log.warn("El código de recuperación ha expirado para el correo: {}", email);
                return new JsonResponseDto(false, HttpStatus.BAD_REQUEST.value(), "El código de recuperación ha expirado.", null);
            }
            log.info("El código de recuperación es válido para el correo: {}", email);
            return new JsonResponseDto(true, HttpStatus.OK.value(), "El código de recuperación es válido.", null);
        } catch (Exception e) {
            log.error("Error al verificar el código de recuperación: {}", e.getMessage());
            return new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al procesar la solicitud.", null);
        }
    }
    @Override
    public JsonResponseDto resetPassword(String email, String code, String newPassword) {
        try {
            log.info("Intentando restablecer la contraseña para el correo: {}", email);

            UserInfo user = userRepository.findByEmailAndIsActiveTrue(email);
            if (user == null) {
                log.warn("Usuario no encontrado o inactivo para el correo: {}", email);
                return new JsonResponseDto(false, HttpStatus.NOT_FOUND.value(), "Usuario no encontrado.", null);
            }

            if (!code.equals(user.getRecoveryCode())) {
                log.warn("El código proporcionado no coincide para el correo: {}", email);
                return new JsonResponseDto(false, HttpStatus.BAD_REQUEST.value(), "El código de recuperación es incorrecto.", null);
            }

            String encryptedPassword = passwordEncoder.encode(newPassword);
            user.setPassword(encryptedPassword);
            user.setRecoveryCode(null);
            user.setRecoveryExpirationDate(null);
            userRepository.save(user);
            log.info("Contraseña restablecida exitosamente para el correo: {}", email);
            return new JsonResponseDto(true, HttpStatus.OK.value(), "Contraseña restablecida con éxito.", null);
        } catch (Exception e) {
            log.error("Error al restablecer la contraseña: {}", e.getMessage());
            return new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al procesar la solicitud.", null);
        }
    }
}
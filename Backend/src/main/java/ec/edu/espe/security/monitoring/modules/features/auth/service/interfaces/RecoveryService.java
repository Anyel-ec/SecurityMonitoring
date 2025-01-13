package ec.edu.espe.security.monitoring.modules.features.auth.service.interfaces;
import ec.edu.espe.security.monitoring.common.dto.JsonResponseDto;
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 13/01/2025
 */

public interface RecoveryService {
    JsonResponseDto generateRecoveryCode(String email);
    JsonResponseDto verifyRecoveryCode(String email, String code);
    JsonResponseDto resetPassword(String email, String code, String newPassword);
}

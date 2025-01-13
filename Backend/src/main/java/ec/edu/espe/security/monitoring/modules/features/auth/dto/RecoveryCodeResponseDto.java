package ec.edu.espe.security.monitoring.modules.features.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDateTime;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 13/01/2025
 */

@Data
@AllArgsConstructor
public class RecoveryCodeResponseDto {
    private String recoveryCode;
    private LocalDateTime expirationDate;
}
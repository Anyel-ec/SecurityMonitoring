package ec.edu.espe.security.monitoring.modules.features.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 13/01/2025
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VerifyRecoveryCodeRequestDto {
    private String email;
    private String code;
    private String newPassword;

}
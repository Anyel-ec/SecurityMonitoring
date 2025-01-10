package ec.edu.espe.security.monitoring.modules.features.auth.dto;

import lombok.Data;

import java.util.Map;
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 10/01/2025
 */
@Data
public class LoginEncryptRequestDto {

    private Map<String, String> payloadLogin;

}

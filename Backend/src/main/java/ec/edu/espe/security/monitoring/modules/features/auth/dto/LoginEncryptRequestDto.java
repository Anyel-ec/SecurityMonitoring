package ec.edu.espe.security.monitoring.modules.features.auth.dto;

import lombok.Data;

import java.util.Map;

@Data
public class LoginEncryptRequestDto {

    private Map<String, String> payloadLogin;

}

package ec.edu.espe.security.monitoring.feature.auth.dto;

import lombok.Data;

import java.util.Map;

@Data
public class LoginEncryptRequestDto {

    private Map<String, String> payloadLogin;

}

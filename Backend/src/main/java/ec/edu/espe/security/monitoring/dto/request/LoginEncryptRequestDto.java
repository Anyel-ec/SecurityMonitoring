package ec.edu.espe.security.monitoring.dto.request;

import lombok.Data;

import java.util.Map;

@Data
public class LoginEncryptRequestDto {

    private Map<String, String> payloadLogin;

}

package ec.edu.espe.security.monitoring.modules.features.auth.dto;

import lombok.Data;

@Data
public class LoginRequestDto {
    private String username;
    private String password;
}

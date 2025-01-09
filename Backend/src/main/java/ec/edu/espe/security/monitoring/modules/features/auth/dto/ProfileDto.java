package ec.edu.espe.security.monitoring.modules.features.auth.dto;

import lombok.Data;

@Data
public class ProfileDto {
    private String username;
    private String phone;
    private String email;
    private String password;
}

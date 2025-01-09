package ec.edu.espe.security.monitoring.modules.features.auth.dto;

import lombok.Data;

@Data
public class ProfilePasswordDto {
    private String currentPassword;
    private String newPassword;
}

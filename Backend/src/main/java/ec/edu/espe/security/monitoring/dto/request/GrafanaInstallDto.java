package ec.edu.espe.security.monitoring.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class GrafanaInstallDto {

    @NotNull(message = "El nombre de usuario no puede ser nulo")
    @Size(min = 3, max = 50, message = "El nombre de usuario debe tener entre 3 y 50 caracteres")
    private String usuario;

    @NotNull(message = "La contraseña no puede ser nula")
    @Size(min = 5, message = "La contraseña debe tener al menos 5 caracteres")
    private String password;

    @Min(value = 1, message = "El puerto interno debe ser mayor a 0")
    @Max(value = 65535, message = "El puerto interno debe ser menor o igual a 65535")
    private int internalPort;

    @Min(value = 1, message = "El puerto externo debe ser mayor a 0")
    @Max(value = 65535, message = "El puerto externo debe ser menor o igual a 65535")
    private int externalPort;
}
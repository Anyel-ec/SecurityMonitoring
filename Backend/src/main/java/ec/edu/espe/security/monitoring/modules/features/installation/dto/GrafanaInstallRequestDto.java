package ec.edu.espe.security.monitoring.modules.features.installation.dto;

import ec.edu.espe.security.monitoring.modules.features.installation.validations.PortNotInUse;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 04/11/2024
 */
@Data
public class GrafanaInstallRequestDto {

    @NotNull(message = "El nombre de usuario no puede ser nulo")
    @Size(min = 3, max = 50, message = "El nombre de usuario debe tener entre 3 y 50 caracteres")
    private String usuario;

    @NotNull(message = "La contraseña no puede ser nula")
    @Size(min = 5, message = "La contraseña debe tener al menos 5 caracteres")
    private String password;

    @Min(value = 1, message = "El puerto interno debe ser mayor a 0")
    @Max(value = 65535, message = "El puerto interno debe ser menor o igual a 65535")
    @PortNotInUse(message = "El puerto interno ya está en uso por Docker", checkDocker = true)
    private int internalPort;

    @Min(value = 1, message = "El puerto externo debe ser mayor a 0")
    @Max(value = 65535, message = "El puerto externo debe ser menor o igual a 65535")
    @PortNotInUse(message = "El puerto externo ya está en uso")
    private int externalPort;
}
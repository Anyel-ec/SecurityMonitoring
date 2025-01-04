package ec.edu.espe.security.monitoring.feature.installation.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserInstallRequestDto {

    @NotNull(message = "El nombre de usuario no puede ser nulo")
    @Size(min = 3, max = 50, message = "El nombre de usuario debe tener entre 3 y 50 caracteres")
    private String usuario;

    @NotNull(message = "La contraseña no puede ser nula")
    @Size(min = 5, message = "La contraseña debe tener al menos 6 caracteres")
    private String password;

    @NotNull(message = "El número de teléfono no puede ser nulo")
    private String numberPhone;

    @NotNull(message = "El correo electrónico no puede ser nulo")
    @Email(message = "El formato del correo electrónico no es válido")
    private String email;
}
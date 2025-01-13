package ec.edu.espe.security.monitoring.modules.features.installation.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserInstallRequestDto {

    @NotBlank(message = "El nombre de usuario no puede estar en blanco")
    @Size(min = 3, max = 50, message = "El nombre de usuario debe tener entre 3 y 50 caracteres")
    private String usuario;

    @NotBlank(message = "La contraseña no puede estar en blanco")
    @Size(min = 5, message = "La contraseña debe tener al menos 5 caracteres")
    private String password;

    @NotBlank(message = "El número de teléfono no puede estar en blanco")
    private String numberPhone;

    @NotBlank(message = "El correo electrónico no puede estar en blanco")
    @Email(message = "El formato del correo electrónico no es válido")
    private String email;

    @NotBlank(message = "El nombre no puede estar en blanco")
    @Size(min = 3, max = 50, message = "El nombre debe tener entre 3 y 50 caracteres")
    private String name;

    @NotBlank(message = "El apellido no puede estar en blanco")
    @Size(min = 3, max = 50, message = "El apellido debe tener entre 3 y 50 caracteres")
    private String lastname;

    @NotBlank(message = "La empresa no puede estar en blanco")
    @Size(min = 3, max = 50, message = "La empresa debe tener entre 3 y 50 caracteres")
    private String company;
}
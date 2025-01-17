package ec.edu.espe.security.monitoring.modules.features.auth.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 10/01/2025
 */
@Data
public class ProfileDto {
    @NotBlank
    private String username;

    @NotBlank
    private String phone;

    @NotBlank
    @Email
    @Size(min = 3, max = 50, message = "El correo electrónico debe tener entre 3 y 50 caracteres")
    private String email;

    @Size(min = 3, max = 50, message = "El nombre debe tener entre 3 y 50 caracteres")
    @NotBlank
    private String name;
    @NotBlank(message = "El apellido no puede estar en blanco")
    @Size(min = 3, max = 50, message = "El apellido debe tener entre 3 y 50 caracteres")
    private String lastname;

    @NotBlank(message = "La empresa no puede estar en blanco")
    @Size(min = 3, max = 50, message = "La empresa debe tener entre 3 y 50 caracteres")
    private String company;

    @NotBlank(message = "La contraseña no puede estar en blanco")
    private String password;
}

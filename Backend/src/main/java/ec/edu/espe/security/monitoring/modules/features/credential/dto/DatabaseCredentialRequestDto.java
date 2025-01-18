package ec.edu.espe.security.monitoring.modules.features.credential.dto;

import ec.edu.espe.security.monitoring.modules.core.initializer.models.SystemParameters;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 04/11/2024
 */

@Data
public class DatabaseCredentialRequestDto {

    @NotBlank(message = "El host no puede estar vacío")
    private String host;

    @Min(value = 1, message = "El puerto debe ser mayor que 0")
    @Max(value = 65535, message = "El puerto debe ser menor o igual a 65535")
    private int port;

    private String username;
    private String password;

    private SystemParameters systemParameter;

    @Size(max = 255, message = "El comentario no puede tener más de 255 caracteres")
    private String comment;
}
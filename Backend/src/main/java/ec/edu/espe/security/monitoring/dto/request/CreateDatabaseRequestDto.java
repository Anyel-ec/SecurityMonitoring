package ec.edu.espe.security.monitoring.dto.request;

import ec.edu.espe.security.monitoring.models.DatabaseCredentials;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@Schema(description = "DTO de petición para la creación de una base de datos según el servidor especificado, utilizando las credenciales correspondientes.")
public class CreateDatabaseRequestDto extends DatabaseCredentials {
    private String nameDatabase;
}


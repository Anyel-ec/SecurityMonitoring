package ec.edu.espe.security.monitoring.dto.request;

import ec.edu.espe.security.monitoring.models.credentials.DatabaseCredentials;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@Schema(description = "Request DTO for creating a database on the specified server, using the corresponding credentials.")
public class CreateDatabaseRequestDto extends DatabaseCredentials {
    private String nameDatabase;
}


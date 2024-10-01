package ec.edu.espe.security.monitoring.dto.request;

import ec.edu.espe.security.monitoring.models.credentials.DatabaseCredentials;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.ArrayList;
import java.util.Map;
import java.util.List;

@Data
@Schema(description = "DTO de petición para crear una conexión, especificar los tipos de DBMS y guardar las credenciales asociadas")
public class ConnectionRequestDto {
    private String connectionName;
    private List<String> types = new ArrayList<>();
    private Map<String, DatabaseCredentials> credentials;
}

package ec.edu.espe.security.monitoring.dto.request;

import ec.edu.espe.security.monitoring.models.credentials.DatabaseCredentials;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.ArrayList;
import java.util.Map;
import java.util.List;

@Data
@Schema(description = "Request DTO for creating a connection, specifying the types of DBMS, and saving the associated credentials")
public class ConnectionRequestDto {
    private String connectionName;
    private List<String> types = new ArrayList<>();
    private Map<String, DatabaseCredentials> credentials;
}

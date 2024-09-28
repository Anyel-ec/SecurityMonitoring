package ec.edu.espe.security.monitoring.dto;

import ec.edu.espe.security.monitoring.models.DatabaseCredentials;
import lombok.Data;
import java.util.Map;
import java.util.List;

@Data
public class ConnectionRequestDto {
    private String connectionName;
    private List<String> types;
    private Map<String, DatabaseCredentials> credentials;
}
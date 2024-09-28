package ec.edu.espe.security.monitoring.dto.request;

import ec.edu.espe.security.monitoring.models.DatabaseCredentials;
import lombok.Data;

import java.util.ArrayList;
import java.util.Map;
import java.util.List;

@Data
public class ConnectionRequestDto {
    private String connectionName;
    private List<String> types = new ArrayList<>();
    private Map<String, DatabaseCredentials> credentials;
}
package ec.edu.espe.security.monitoring.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@MappedSuperclass
public class DatabaseCredentials {
    private String host;
    private int port;
    private String username;
    private String password;
}

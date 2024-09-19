package ec.edu.espe.security.monitoring.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class PostgresCredentials {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String postgresUser;
    private String postgresPassword;
    private String postgresDb;
    private String postgresHost;
    private int postgresPortHost;
    private int postgresPortContainer;

}
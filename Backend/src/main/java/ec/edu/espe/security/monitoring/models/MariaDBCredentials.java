package ec.edu.espe.security.monitoring.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class MariaDBCredentials {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String mysqlRootPassword;
    private String mysqlUser;
    private String mysqlPassword;
    private String mysqlHost;
    private int mysqlPortHost;

}
package ec.edu.espe.security.monitoring.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
@Entity
@Data
public class DatabaseCredentials {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // PostgreSQL variables
    private String postgresUser;
    private String postgresPassword;
    private String postgresDb;
    private String postgresHost;
    private int postgresPortHost;
    private int postgresPortContainer;

    // MongoDB variables
    private String mongodbUser;
    private String mongodbPassword;
    private String mongodbDb;
    private String mongodbHost;
    private int mongodbPortHost;
    private int mongodbPortContainer;

    // MariaDB variables
    private String mysqlRootPassword;
    private String mysqlDatabase;
    private String mysqlUser;
    private String mysqlPassword;
    private String mysqlHost;
    private int mysqlPortHost;
    private int mysqlPortContainer;
}
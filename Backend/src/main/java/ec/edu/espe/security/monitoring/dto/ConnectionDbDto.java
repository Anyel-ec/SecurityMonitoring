package ec.edu.espe.security.monitoring.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ConnectionDbDto {

    // PostgreSQL
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

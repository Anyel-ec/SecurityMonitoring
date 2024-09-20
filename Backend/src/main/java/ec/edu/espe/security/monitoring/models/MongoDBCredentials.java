package ec.edu.espe.security.monitoring.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class MongoDBCredentials {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String mongodbUser;
    private String mongodbPassword;
    private String mongodbHost;
    private int mongodbPortHost;

}

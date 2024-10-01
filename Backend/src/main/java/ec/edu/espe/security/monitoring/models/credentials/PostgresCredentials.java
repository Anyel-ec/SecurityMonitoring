package ec.edu.espe.security.monitoring.models.credentials;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class PostgresCredentials extends DatabaseCredentials{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

}
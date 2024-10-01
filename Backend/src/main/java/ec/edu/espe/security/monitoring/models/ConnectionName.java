package ec.edu.espe.security.monitoring.models;

import ec.edu.espe.security.monitoring.models.credentials.MariadbCredentials;
import ec.edu.espe.security.monitoring.models.credentials.MongodbCredentials;
import ec.edu.espe.security.monitoring.models.credentials.PostgresCredentials;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
public class ConnectionName {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String connectionName;

    @CreationTimestamp
    private LocalDateTime lastConnection;

    private String comment;

    @OneToOne
    @JoinColumn(name = "postgres_credentials_id", referencedColumnName = "id")
    private PostgresCredentials postgresCredentials;

    @OneToOne
    @JoinColumn(name = "mariadb_credentials_id", referencedColumnName = "id")
    private MariadbCredentials mariadbCredentials;

    @OneToOne
    @JoinColumn(name = "mongodb_credentials_id", referencedColumnName = "id")
    private MongodbCredentials mongodbCredentials;
}
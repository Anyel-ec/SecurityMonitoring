package ec.edu.espe.security.monitoring.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@JsonIgnoreProperties(value = {"createdAt"},
        allowGetters = true)
public class DatabaseCredential {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String host;
    private int port;
    private String username;
    private String password;

    // Only BD
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "type_bd", referencedColumnName = "id")
    private SystemParameters systemParameter;


    @Column(columnDefinition = "TEXT")
    private String comment;

    private String paramValue;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(columnDefinition = "boolean default true")
    private Boolean isActive;

}

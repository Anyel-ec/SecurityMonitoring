package ec.edu.espe.security.monitoring.features.credential.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import ec.edu.espe.security.monitoring.core.system.models.SystemParameters;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
@Builder
@Entity
@Data
@JsonIgnoreProperties(value = {"createdAt"},allowGetters = true)
@AllArgsConstructor
@RequiredArgsConstructor
public class DatabaseCredential {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String host;
    private int port;
    private String username;
    private String password;

    // Only BD
    @OneToOne
    @JoinColumn(name = "type_bd", referencedColumnName = "id")
    private SystemParameters systemParameter;

    /*@ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private UserInfo user;*/

    @Column(columnDefinition = "TEXT")
    private String comment;

    private String paramValue;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(columnDefinition = "boolean default true")
    private Boolean isActive;
}
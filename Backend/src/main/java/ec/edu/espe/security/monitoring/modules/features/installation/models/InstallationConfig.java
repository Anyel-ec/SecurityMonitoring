package ec.edu.espe.security.monitoring.modules.features.installation.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import ec.edu.espe.security.monitoring.core.system.models.SystemParameters;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(value = {"createdAt"},
        allowGetters = true)
public class InstallationConfig {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int internalPort;
    private int externalPort;
    private String username;
    private String password;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "type", referencedColumnName = "id")
    private SystemParameters systemParameter;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(columnDefinition = "boolean default true")
    private Boolean isActive;
    // Constructor for testing purposes
    public InstallationConfig(int internalPort, Integer externalPort, SystemParameters systemParameter, boolean isActive) {
        this.internalPort = internalPort;
        this.externalPort = externalPort;
        this.systemParameter = systemParameter;
        this.isActive = isActive;
    }

}

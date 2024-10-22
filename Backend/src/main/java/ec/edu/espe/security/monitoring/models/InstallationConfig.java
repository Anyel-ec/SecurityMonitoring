package ec.edu.espe.security.monitoring.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    private String numberPhone;
    private String email;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "type", referencedColumnName = "id")
    private SystemParameters systemParameter;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(columnDefinition = "boolean default true")
    private Boolean isActive;

}

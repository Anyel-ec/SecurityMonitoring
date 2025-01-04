package ec.edu.espe.security.monitoring.common.audit.models;
import ec.edu.espe.security.monitoring.feature.auth.model.UserInfo;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 12/12/2024
 */
@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class AuditLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Transient // not is a column in the database
    private String username;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private UserInfo user;

    @Column(nullable = false)
    private String ipAddress;

    @Column(nullable = false)
    private String endpoint;

    @Column(nullable = false)
    private String httpMethod;

    @Column(columnDefinition = "TEXT")
    private String requestParams;

    @Column(nullable = false)
    private int responseStatus;

    @Column(columnDefinition = "TEXT")
    private String resultMessage;

    @CreationTimestamp
    private LocalDateTime timestamp;

    @Column(nullable = false)
    private String actionType; // Example: "LOGIN", "CREATE", "DELETE", etc.

}

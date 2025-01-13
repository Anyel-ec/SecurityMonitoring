package ec.edu.espe.security.monitoring.modules.features.auth.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.Objects;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 13/01/2025
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PasswordRecovery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private UserInfo user;

    @Column(nullable = false)
    private String recoveryCode;

    @Column(nullable = false)
    private LocalDateTime recoveryExpirationDate;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(columnDefinition = "boolean default true")
    private Boolean isActive;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PasswordRecovery)) return false;
        PasswordRecovery that = (PasswordRecovery) o;
        return id != null && id.equals(that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}

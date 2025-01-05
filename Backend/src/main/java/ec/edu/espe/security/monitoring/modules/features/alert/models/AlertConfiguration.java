package ec.edu.espe.security.monitoring.modules.features.alert.models;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 06/12/2024
 */
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AlertConfiguration {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name; // e.g., CPU, RAM, Disk, Network

    @Column(nullable = false)
    private Double threshold; // Percentage or value for the threshold

    @Column(nullable = false)
    private String duration; // Time for alert trigger, e.g., '5m', '1h'

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Severity severity; // CRITICAL or WARNING

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Column(columnDefinition = "boolean default true")
    private Boolean isActive;

    public enum Severity {
        CRITICAL,
        WARNING,
        INFO
    }
}

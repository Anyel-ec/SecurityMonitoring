package ec.edu.espe.security.monitoring.feature.alert.models;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 06/12/2024
 */
import ec.edu.espe.security.monitoring.common.system.models.SystemParameters;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class EmailConfiguration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String smtpServer;

    @Column(nullable = false)
    private int port;

    @OneToOne
    private SystemParameters security;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String fromEmail;

    @Column(nullable = false)
    private String toEmail;


    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(columnDefinition = "boolean default true")
    private Boolean isActive;
}
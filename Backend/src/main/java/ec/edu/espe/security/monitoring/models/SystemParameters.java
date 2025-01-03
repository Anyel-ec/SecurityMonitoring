package ec.edu.espe.security.monitoring.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@JsonIgnoreProperties(value = {"createdAt", "updatedAt"},
        allowGetters = true)
@AllArgsConstructor
@NoArgsConstructor
public class SystemParameters {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(unique = true, nullable = false)
    private String name;

    private String description;

    private String paramValue;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(columnDefinition = "boolean default true")
    private boolean isActive;

    public SystemParameters(String name, String description, String paramValue, boolean isActive) {
        this.name = name;
        this.description = description;
        this.paramValue = paramValue;
        this.isActive = isActive;
    }

    public SystemParameters(String prometheusInstall, boolean bValue) {
        this.name = prometheusInstall;
        this.isActive = bValue;
    }
}

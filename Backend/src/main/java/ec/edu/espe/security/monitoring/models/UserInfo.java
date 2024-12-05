package ec.edu.espe.security.monitoring.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
@JsonIgnoreProperties(value = {"createdAt", "updatedAt"},
        allowGetters = true)
@Entity
@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
@Builder
public class UserInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private long id;

    private String username;

    private String email;

    private String phone;

    @JsonIgnore
    private String password;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(columnDefinition = "boolean default true")
    private Boolean isActive;

    @ManyToMany(fetch = FetchType.EAGER)
    private Set<UserRole> roles = new HashSet<>();

}
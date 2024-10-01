package ec.edu.espe.security.monitoring.models.installed;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table
@Data
public class GrafanaInstall extends PortsInstall {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userAdmin;
    private String passwordAdmin;


}

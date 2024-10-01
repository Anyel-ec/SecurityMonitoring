package ec.edu.espe.security.monitoring.models.installed;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class PrometheusInstall extends PortsInstall {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

}

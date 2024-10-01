package ec.edu.espe.security.monitoring.models.installed;

import jakarta.persistence.MappedSuperclass;
import lombok.Data;

@Data
@MappedSuperclass
public class PortsInstall {
    private int internalPort;
    private int externalPort;
}

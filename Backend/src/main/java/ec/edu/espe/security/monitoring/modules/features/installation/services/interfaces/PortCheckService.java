package ec.edu.espe.security.monitoring.modules.integrations.test.services.interfaces;

import java.util.List;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 03/01/2025
 */
public interface PortCheckService {
    boolean isPortInUse(int port);
    boolean isPortDockerInUse(int port);
    List<Integer> getUsedDockerPorts();
}

package ec.edu.espe.security.monitoring.modules.integrations.test.services.impl;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 03/01/2025
 */
import ec.edu.espe.security.monitoring.modules.integrations.test.services.interfaces.PortCheckService;
import org.springframework.stereotype.Service;
import java.io.IOException;
import java.net.ServerSocket;

@Service
public class PortCheckServiceImpl implements PortCheckService {

    @Override
    public boolean isPortInUse(int port) {
        try (ServerSocket serverSocket = new ServerSocket(port)) {
            return false;
        } catch (IOException e) {
            return true;
        }
    }
}

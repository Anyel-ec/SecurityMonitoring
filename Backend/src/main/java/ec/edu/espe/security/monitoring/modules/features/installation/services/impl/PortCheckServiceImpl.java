package ec.edu.espe.security.monitoring.modules.integrations.test.services.impl;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 03/01/2025
 */
import ec.edu.espe.security.monitoring.modules.integrations.test.services.interfaces.PortCheckService;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.ServerSocket;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Slf4j
@Service
public class PortCheckServiceImpl implements PortCheckService {

    @Override
    public boolean isPortInUse(int port) {
        try (ServerSocket ignored = new ServerSocket(port)) {
            return false;
        } catch (IOException e) {
            return true;
        }
    }

    @Override
    public boolean isPortDockerInUse(int port) {
        try {
            // execute docker command to list ports
            Process process = Runtime.getRuntime().exec("docker ps --format \"{{.Ports}}\"");
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                if (line.contains(":" + port + "->")) {
                    return true;
                }
            }
            return false;
        } catch (IOException e) {
            log.error("Error al ejecutar el comando Docker: {}", e.getMessage());
            throw new IllegalStateException("Error al ejecutar el comando Docker", e);
        }
    }

    @Override
    public List<Integer> getUsedDockerPorts() {
        try {
            // execute docker command to list ports
            Process process = Runtime.getRuntime().exec("docker ps --format \"{{.Ports}}\"");
            Set<Integer> usedPorts = extractUsedPortFromDocker(process);

            // Convert the set to a list
            return new ArrayList<>(usedPorts);
        } catch (IOException e) {
            log.error("Error al listar los puertos usados de Docker: {}", e.getMessage());
            throw new IllegalStateException("Error al ejecutar el comando Docker", e);
        }
    }


    @NotNull
    private static Set<Integer> extractUsedPortFromDocker(Process process) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
        Set<Integer> usedPorts = new HashSet<>();

        String line;
        while ((line = reader.readLine()) != null) {
            String[] parts = line.split(",");
            for (String part : parts) {
                if (part.contains("->")) {
                    String portStr = part.split(":")[1].split("->")[0];
                    usedPorts.add(Integer.parseInt(portStr));
                }
            }
        }
        return usedPorts;
    }


}

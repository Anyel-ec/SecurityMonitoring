package ec.edu.espe.security.monitoring.services.implementations.docker;

import ec.edu.espe.security.monitoring.models.InstallationConfig;
import ec.edu.espe.security.monitoring.repositories.InstallationConfigRepository;
import ec.edu.espe.security.monitoring.services.interfaces.docker.DockerInstallationService;
import ec.edu.espe.security.monitoring.utils.AesEncryptor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class DockerInstallationServiceImpl implements DockerInstallationService {
    private final InstallationConfigRepository installationConfigRepository;
    private final AesEncryptor aesEncryptor;

    /**
     * Runs a Docker Compose process to set up the services based on the active installation configurations.
     */
    public void runDockerComposeWithActiveInstallations() throws IOException, InterruptedException {
        // Retrieve all active installations
        List<InstallationConfig> activeInstallations = installationConfigRepository.findByIsActiveTrue();

        // Generate the prometheus.yml file dynamically with environment variables
        generatePrometheusConfig(activeInstallations);

        // Create the ProcessBuilder for docker-compose
        ProcessBuilder dockerComposeProcessBuilder = new ProcessBuilder(
                "docker-compose",
                "-f", "../.container/docker-compose.yml",
                "up", "-d"
        );

        // Configure the environment variables based on the active installations
        for (InstallationConfig config : activeInstallations) {
            String decryptedPassword = null;
            try {
                if (config.getPassword() != null) {
                    decryptedPassword = aesEncryptor.decrypt(config.getPassword());
                }
            } catch (Exception e) {
                log.error("Error decrypting the password for the installation with ID: {}", config.getId(), e);
                throw new IllegalStateException("Error decrypting the password", e);
            }

            // Only configure environment variables for known installation types
            if ("GRAFANA_INSTALL".equals(config.getSystemParameter().getName())) {
                addEnvVariable(dockerComposeProcessBuilder, "GRAFANA_PORT_EXTERNAL", String.valueOf(config.getExternalPort()));
                addEnvVariable(dockerComposeProcessBuilder, "GRAFANA_PORT_INTERNAL", String.valueOf(config.getInternalPort()));
                addEnvVariable(dockerComposeProcessBuilder, "GRAFANA_USER", config.getUsuario());
                addEnvVariable(dockerComposeProcessBuilder, "GRAFANA_PASSWORD", decryptedPassword);
            } else if ("PROMETHEUS_INSTALL".equals(config.getSystemParameter().getName())) {
                addEnvVariable(dockerComposeProcessBuilder, "PROMETHEUS_PORT_EXTERNAL", String.valueOf(config.getExternalPort()));
                addEnvVariable(dockerComposeProcessBuilder, "PROMETHEUS_PORT_INTERNAL", String.valueOf(config.getInternalPort()));
            } else if ("PROMETHEUS_EXPORTER_POSTGRESQL".equals(config.getSystemParameter().getName())) {
                addEnvVariable(dockerComposeProcessBuilder, "EXPORT_POSTGRES_PORT_EXTERNAL", String.valueOf(config.getExternalPort()));
                addEnvVariable(dockerComposeProcessBuilder, "EXPORT_POSTGRES_PORT_INTERNAL", String.valueOf(config.getInternalPort()));
                addEnvVariable(dockerComposeProcessBuilder, "POSTGRES_USER", config.getUsuario());
                addEnvVariable(dockerComposeProcessBuilder, "POSTGRES_PASSWORD", decryptedPassword);
            } else {
                log.warn("No environment variables configured for the parameter: {}", config.getSystemParameter().getName());
            }
        }

        // Execute docker-compose
        dockerComposeProcessBuilder.inheritIO().start();
    }
    /**
     * Generates prometheus.yml file dynamically based on the active installation configurations.
     */
    private void generatePrometheusConfig(List<InstallationConfig> activeInstallations) throws IOException {
        // Load the template prometheus.yml
        String templatePath = "../.container/prometheus.template.yml";
        String outputPath = "../.container/prometheus.yml";
        StringBuilder prometheusConfig = new StringBuilder();

        try (BufferedReader reader = new BufferedReader(new FileReader(templatePath))) {
            String line;
            while ((line = reader.readLine()) != null) {
                // Replace placeholders with actual values
                for (InstallationConfig config : activeInstallations) {
                    if ("PROMETHEUS_INSTALL".equals(config.getSystemParameter().getName())) {
                        line = line.replace("${PROMETHEUS_PORT_INTERNAL}", String.valueOf(config.getInternalPort()));
                    } else if ("PROMETHEUS_EXPORTER_POSTGRESQL".equals(config.getSystemParameter().getName())) {
                        line = line.replace("${EXPORT_POSTGRES_PORT_INTERNAL}", String.valueOf(config.getInternalPort()));
                    }
                }
                prometheusConfig.append(line).append("\n");
            }
        }

        // Write the new prometheus.yml
        try (FileWriter writer = new FileWriter(outputPath)) {
            writer.write(prometheusConfig.toString());
        }

        log.info("Prometheus configuration generated at: {}", outputPath);
    }


    /**
     * Adds environment variable to the ProcessBuilder and logs the value.
     */
    private void addEnvVariable(ProcessBuilder processBuilder, String key, String value) {
        if (value != null && !value.isEmpty()) {
            processBuilder.environment().put(key, value);
            log.info("Setting environment variable: {} = {}", key, value);  // Log the environment variable
        } else {
            log.warn("Environment variable {} not set because value is null or empty", key);
        }
    }

}

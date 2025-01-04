package ec.edu.espe.security.monitoring.shared.utils;

import ec.edu.espe.security.monitoring.feature.installation.models.InstallationConfig;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

@UtilityClass
@Slf4j
public class PrometheusConfigUtil {

    /**
     * Generates prometheus.yml file dynamically based on the active installation configurations.
     */
    public static void generatePrometheusConfig(List<InstallationConfig> activeInstallations, String templatePath, String outputPath) throws IOException {
        StringBuilder prometheusConfig = new StringBuilder();

        // Load the template prometheus.yml
        try (BufferedReader reader = new BufferedReader(new FileReader(templatePath))) {
            String line;
            while ((line = reader.readLine()) != null) {
                // Replace placeholders with actual values
                for (InstallationConfig config : activeInstallations) {
                    String systemParameter = config.getSystemParameter().getName();
                    switch (systemParameter) {
                        case "PROMETHEUS_INSTALL":
                            line = line.replace("${PROMETHEUS_PORT_INTERNAL}", String.valueOf(config.getInternalPort()));
                            break;
                        case "PROMETHEUS_EXPORTER_POSTGRESQL":
                            line = line.replace("${EXPORT_POSTGRES_PORT_INTERNAL}", String.valueOf(config.getInternalPort()));
                            break;
                        case "PROMETHEUS_EXPORTER_MONGODB":
                            line = line.replace("${EXPORT_MONGO_PORT_INTERNAL}", String.valueOf(config.getInternalPort()));
                            break;
                        case "PROMETHEUS_EXPORTER_MARIADB":
                            line = line.replace("${EXPORT_MARIADB_PORT_INTERNAL}", String.valueOf(config.getInternalPort()));
                            break;
                        default:
                            log.warn("No matching placeholder found for system parameter: {}", systemParameter);
                            break;
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
}

package ec.edu.espe.security.monitoring.utils;

import ec.edu.espe.security.monitoring.models.InstallationConfig;
import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;
@UtilityClass
@Slf4j
public class PrometheusUtils {
    /**
     * Generates prometheus.yml file dynamically based on the active installation configurations.
     */
    public void generatePrometheusConfig(List<InstallationConfig> activeInstallations) throws IOException {
        String templatePath = "../.container/prometheus.template.yml";
        String outputPath = "../.container/prometheus.yml";
        StringBuilder prometheusConfig = new StringBuilder();

        try (BufferedReader reader = new BufferedReader(new FileReader(templatePath))) {
            String line;
            while ((line = reader.readLine()) != null) {
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

        try (FileWriter writer = new FileWriter(outputPath)) {
            writer.write(prometheusConfig.toString());
        }
        log.info("Prometheus configuration generated at: {}", outputPath);
    }
}

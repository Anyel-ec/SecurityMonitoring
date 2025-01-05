package ec.edu.espe.security.monitoring.features.alert.services;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 04/01/2025
 */
@Service
public class AlertService {

    public String readAlertingRules() throws IOException {
        // get the project root path
        Path projectRoot = Paths.get(System.getProperty("user.dir"));

        // built the path to the prometheus.yml file
        Path alertingRulesPath = projectRoot.resolve("../.container/prometheus.yml");

        // read the prometheus.yml file and modify the rule_files section
        if (Files.exists(alertingRulesPath)) {
            String content = Files.readString(alertingRulesPath);
            if (content.contains("rule_files:")) {
                content = content.replace("rule_files:", "rule_files:\n  - /etc/prometheus/alerting_rules_mongo.yml");
                Files.writeString(alertingRulesPath, content);
            }
            return content;
        } else {
            throw new IOException("El archivo prometheus.yml no se encontró en: " + alertingRulesPath.toString());
        }
    }
}

package ec.edu.espe.security.monitoring.modules.features.alert.services;

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

    public String readAlertingRules(String databaseType) throws IOException {

        // get the project root path
        Path projectRoot = Paths.get(System.getProperty("user.dir"));

        // built the path to the prometheus.yml file
        Path alertingRulesPath = projectRoot.resolve("../.container/prometheus.yml");

        // read the prometheus.yml file and verify if the alerting rule exists
        if (Files.exists(alertingRulesPath)) {
            String content = Files.readString(alertingRulesPath);
            String rulePath = "/etc/prometheus/alerting_rules_" + databaseType.toLowerCase() + ".yml";

            if (content.contains(rulePath)) {
                System.out.println("Alerting rule already exists for " + databaseType);
            } else {
                content = content.replace("rule_files:", "rule_files:\n  - " + rulePath);
                Files.writeString(alertingRulesPath, content);
                createAlertBasedOnDatabase(databaseType);
            }
            return content;
        } else {
            throw new IOException("El archivo prometheus.yml no se encontró en: " + alertingRulesPath.toString());
        }
    }

    private void createAlertBasedOnDatabase(String databaseType) throws IOException {
        Path alertingRulesPath = Paths.get("/etc/prometheus/alerting_rules_" + databaseType.toLowerCase() + ".yml");
        if (!Files.exists(alertingRulesPath)) {
            Files.createFile(alertingRulesPath);
            System.out.println("Alerting rules file created for " + databaseType);
        } else {
            System.out.println("Alerting rules file already exists for " + databaseType);
        }
    }
}

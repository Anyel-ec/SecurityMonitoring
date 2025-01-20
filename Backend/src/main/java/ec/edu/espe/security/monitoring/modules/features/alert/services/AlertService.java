package ec.edu.espe.security.monitoring.modules.features.alert.services;

import ec.edu.espe.security.monitoring.common.dto.JsonResponseDto;
import ec.edu.espe.security.monitoring.modules.features.alert.dto.AlertResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 04/01/2025
 */
@Slf4j
@Service
public class AlertService {

    private final Path projectRoot = Paths.get(System.getProperty("user.dir"));
    private final Path alertingRulesPath = projectRoot.resolve("../.container/prometheus.template.yml");
    private final Path dockerComposePath = projectRoot.resolve("../.container/docker-compose.yml");

    private String getRulePath(String databaseType) {
        return "/etc/prometheus/alerting_rules_" + databaseType.toLowerCase() + ".yml";
    }

    public JsonResponseDto doesRuleExist(String databaseType) {
        try {
            String rulePath = getRulePath(databaseType);
            if (Files.exists(alertingRulesPath) && Files.exists(dockerComposePath)) {
                String prometheusContent = Files.readString(alertingRulesPath);
                String dockerComposeContent = Files.readString(dockerComposePath);
                boolean exists = prometheusContent.contains(rulePath) && dockerComposeContent.contains(rulePath);
                log.info("Existen dichos archivos. ");
                return new JsonResponseDto(true, 200, "Check completed", exists);
            }
            return new JsonResponseDto(false, 404, "Prometheus or Docker Compose file not found", false);
        } catch (IOException e) {
            return new JsonResponseDto(false, 500, "Error checking rule existence", e.getMessage());
        }
    }

    public JsonResponseDto addRuleFile(String databaseType) {
        try {
            JsonResponseDto existsResponse = doesRuleExist(databaseType);
            if (existsResponse.result() instanceof Boolean exists && Boolean.TRUE.equals(exists)) {
                return new JsonResponseDto(false, 409, "Rule already exists", null);
            }
            String rulePath = getRulePath(databaseType);
            String prometheusContent = Files.readString(alertingRulesPath);
            String dockerComposeContent = Files.readString(dockerComposePath);

            prometheusContent = prometheusContent.replace("rule_files:", "rule_files:\n  - " + rulePath);
            dockerComposeContent = dockerComposeContent.replace("- ./prometheus.yml:/etc/prometheus/prometheus.yml:ro",
                    "- ./prometheus.yml:/etc/prometheus/prometheus.yml:ro\n      - ./alertmanager/alerting_rules_" + databaseType.toLowerCase() + ".yml:" + rulePath + ":ro");
            log.info("Se ha escrito en el archivo de alertas de Prometheus. {} docker", prometheusContent);
            Files.writeString(alertingRulesPath, prometheusContent);
            log.info("Se ha escrito en el archivo de alertas de Prometheus. {} docker", dockerComposeContent);
            Files.writeString(dockerComposePath, dockerComposeContent);
            return new JsonResponseDto(true, 200, "Rule added successfully", null);
        } catch (IOException e) {
            return new JsonResponseDto(false, 500, "Error adding rule", e.getMessage());
        }
    }

    public JsonResponseDto deleteRuleFile(String databaseType) {
        try {
            JsonResponseDto existsResponse = doesRuleExist(databaseType);
            if (existsResponse.result() instanceof Boolean exists && !exists) {
                return new JsonResponseDto(false, 404, "Rule not found", null);
            }

            String rulePath = getRulePath(databaseType);

            String prometheusContent = Files.readString(alertingRulesPath);
            String dockerComposeContent = Files.readString(dockerComposePath);

            // delete the rule from the prometheus file (without modifying the structure)
            List<String> prometheusLines = prometheusContent.lines().collect(Collectors.toList());
            prometheusLines.removeIf(line -> line.trim().equals("- " + rulePath));

            // delete the rule from the docker-compose file (without modifying the structure)
            List<String> dockerComposeLines = dockerComposeContent.lines().collect(Collectors.toList());
            dockerComposeLines.removeIf(line -> line.trim().contains("./alertmanager/alerting_rules_" + databaseType.toLowerCase() + ".yml"));

            // rewrite the files
            Files.writeString(alertingRulesPath, String.join("\n", prometheusLines) + "\n");
            Files.writeString(dockerComposePath, String.join("\n", dockerComposeLines) + "\n");

            return new JsonResponseDto(true, 200, "Rule deleted successfully", null);
        } catch (IOException e) {
            return new JsonResponseDto(false, 500, "Error deleting rule", e.getMessage());
        }
    }

    public JsonResponseDto checkMultipleRuleExistence() {
        boolean activeMongo = doesRuleExist("mongo").result() instanceof Boolean exists && exists;
        boolean activeMaria = doesRuleExist("maria").result() instanceof Boolean exists && exists;
        boolean activePostgres = doesRuleExist("postgres").result() instanceof Boolean exists && exists;

        AlertResponseDto alertResponse = new AlertResponseDto(activeMongo, activeMaria, activePostgres);
        return new JsonResponseDto(true, 200, "Existing rules", alertResponse);
    }

}

package ec.edu.espe.security.monitoring.modules.features.alert.services;

import ec.edu.espe.security.monitoring.common.dto.JsonResponseDto;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
@Service
public class AlertService {

    private final Path projectRoot = Paths.get(System.getProperty("user.dir"));
    private final Path alertingRulesPath = projectRoot.resolve("../.container/prometheus.yml");

    private String getRulePath(String databaseType) {
        return "/etc/prometheus/alerting_rules_" + databaseType.toLowerCase() + ".yml";
    }

    public JsonResponseDto doesRuleExist(String databaseType) {
        try {
            String rulePath = getRulePath(databaseType);
            if (Files.exists(alertingRulesPath)) {
                String content = Files.readString(alertingRulesPath);
                boolean exists = content.contains(rulePath);
                return new JsonResponseDto(true, 200, "Check completed", exists);
            }
            return new JsonResponseDto(false, 404, "Prometheus file not found :( ", null);
        } catch (IOException e) {
            return new JsonResponseDto(false, 500, "Error checking rule existence", e.getMessage());
        }
    }

    public JsonResponseDto addRuleFile(String databaseType) {
        try {
            String rulePath = getRulePath(databaseType);
            if (Files.exists(alertingRulesPath)) {
                String content = Files.readString(alertingRulesPath);
                if (!content.contains(rulePath)) {
                    content = content.replace("rule_files:", "rule_files:\n  - " + rulePath);
                    Files.writeString(alertingRulesPath, content);
                    return new JsonResponseDto(true, 200, "Rule added successfully", null);
                } else {
                    return new JsonResponseDto(false, 409, "Rule already exists", null);
                }
            }
            return new JsonResponseDto(false, 404, "Prometheus file not found", null);
        } catch (IOException e) {
            return new JsonResponseDto(false, 500, "Error adding rule", e.getMessage());
        }
    }

    public JsonResponseDto deleteRuleFile(String databaseType) {
        try {
            String rulePath = getRulePath(databaseType);
            if (Files.exists(alertingRulesPath)) {
                String content = Files.readString(alertingRulesPath);
                if (content.contains(rulePath)) {
                    content = content.replace("  - " + rulePath + "\n", "");
                    Files.writeString(alertingRulesPath, content);
                    return new JsonResponseDto(true, 200, "Rule deleted successfully", null);
                } else {
                    return new JsonResponseDto(false, 404, "Rule not found", null);
                }
            }
            return new JsonResponseDto(false, 404, "Prometheus file not found", null);
        } catch (IOException e) {
            return new JsonResponseDto(false, 500, "Error deleting rule", e.getMessage());
        }
    }
}

package ec.edu.espe.security.monitoring.shared.utils;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 25/11/2024
 */
@Component
@Slf4j
@Data
public class AlertManagerConfigUtil {

    @Value("${alertmanager.smtp.host}")
    private String smtpHost;

    @Value("${alertmanager.smtp.from}")
    private String smtpFrom;

    @Value("${alertmanager.smtp.user}")
    private String smtpUser;

    @Value("${alertmanager.smtp.password}")
    private String smtpPassword;

    @Value("${alertmanager.smtp.to}")
    private String smtpTo;

    public void generateAlertManagerConfig(String templatePath, String outputPath) throws IOException {
        StringBuilder alertManagerConfig = new StringBuilder();

        // Load the template alertmanager.yml
        try (BufferedReader reader = new BufferedReader(new FileReader(templatePath))) {
            String line;
            while ((line = reader.readLine()) != null) {
                // Replace placeholders with actual values from injected properties
                line = line.replace("${ALERT_SMTP_HOST}", smtpHost)
                        .replace("${ALERT_SMTP_FROM}", smtpFrom)
                        .replace("${ALERT_SMTP_USER}", smtpUser)
                        .replace("${ALERT_SMTP_PASSWORD}", smtpPassword)
                        .replace("${ALERT_SMTP_TO}", smtpTo);
                alertManagerConfig.append(line).append("\n");
            }
        }

        // Write the new alertmanager.yml
        try (FileWriter writer = new FileWriter(outputPath)) {
            writer.write(alertManagerConfig.toString());
        } catch (IOException e) {
            throw new IOException("Error writing alertmanager.yml file", e);
        }

        log.info("AlertManager configuration generated at: {}", outputPath);
    }


}

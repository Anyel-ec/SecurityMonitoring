package ec.edu.espe.security.monitoring.utils;

import lombok.experimental.UtilityClass;
import lombok.extern.slf4j.Slf4j;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Properties;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 25/11/2024
 */
@UtilityClass
@Slf4j
public class AlertManagerConfigUtil {
    /**
     * Generates alertmanager.yml file dynamically based on the properties provided.
     *
     * @param propertiesPath Path to the properties file.
     * @param templatePath   Path to the alertmanager template file.
     * @param outputPath     Path where the generated alertmanager.yml should be saved.
     */
    public static void generateAlertManagerConfig(String propertiesPath, String templatePath, String outputPath) throws IOException {
        StringBuilder alertManagerConfig = new StringBuilder();
        Properties properties = new Properties();

        // Load properties
        try (BufferedReader propertiesReader = new BufferedReader(new FileReader(propertiesPath))) {
            properties.load(propertiesReader);
        }

        // Load the template alertmanager.yml
        try (BufferedReader reader = new BufferedReader(new FileReader(templatePath))) {
            String line;
            while ((line = reader.readLine()) != null) {
                // Replace placeholders with actual values from properties
                line = line.replace("${ALERT_SMTP_HOST}", properties.getProperty("alertmanager.smtp.host", ""))
                        .replace("${ALERT_SMTP_FROM}", properties.getProperty("alertmanager.smtp.from", ""))
                        .replace("${ALERT_SMTP_USER}", properties.getProperty("alertmanager.smtp.user", ""))
                        .replace("${ALERT_SMTP_PASSWORD}", properties.getProperty("alertmanager.smtp.password", ""))
                        .replace("${ALERT_SMTP_TO}", properties.getProperty("alertmanager.smtp.to", ""));
                alertManagerConfig.append(line).append("\n");
            }
        }

        // Write the new alertmanager.yml
        try (FileWriter writer = new FileWriter(outputPath)) {
            writer.write(alertManagerConfig.toString());

        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        log.info("AlertManager configuration generated at: {}", outputPath);
    }
}

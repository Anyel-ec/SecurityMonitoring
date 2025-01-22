package ec.edu.espe.security.monitoring;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableJpaAuditing
@SpringBootApplication
@EnableScheduling
public class BackendApplication {

    public static void main(String[] args) {
        // Load the .env file using Dotenv
        Dotenv dotenv = Dotenv.configure().load();

        // Set environment variables as system properties so Spring can access them
        System.setProperty("BD_USERNAME", dotenv.get("BD_USERNAME", ""));
        System.setProperty("BD_PASSWORD", dotenv.get("BD_PASSWORD", ""));
        System.setProperty("SECRET_KEY_AES", dotenv.get("SECRET_KEY_AES", ""));
        System.setProperty("PUBLIC_KEY_RSA", dotenv.get("PUBLIC_KEY_RSA", ""));
        System.setProperty("PRIVATE_KEY_RSA", dotenv.get("PRIVATE_KEY_RSA", ""));
        System.setProperty("SECRET_KEY_JWT", dotenv.get("SECRET_KEY_JWT", ""));
        System.setProperty("DEFAULT_EMPTY_PASSWORD", dotenv.get("DEFAULT_EMPTY_PASSWORD", ""));

        // Add alertmanager-related environment variables
        System.setProperty("ALERT_SMTP_HOST", dotenv.get("ALERT_SMTP_HOST", ""));
        System.setProperty("ALERT_SMTP_FROM", dotenv.get("ALERT_SMTP_FROM", ""));
        System.setProperty("ALERT_SMTP_USER", dotenv.get("ALERT_SMTP_USER", ""));
        System.setProperty("ALERT_SMTP_PASSWORD", dotenv.get("ALERT_SMTP_PASSWORD", ""));
        System.setProperty("ALERT_SMTP_TO", dotenv.get("ALERT_SMTP_TO", ""));
        System.setProperty("ALERT_SMTP_PORT", dotenv.get("ALERT_SMTP_PORT", ""));
        System.setProperty("ALERT_SMTP_HOST_WITHOUT_PORT", dotenv.get("ALERT_SMTP_HOST_WITHOUT_PORT", ""));


        // URL
        System.setProperty("URL_SERVER_DEPLOY", dotenv.get("URL_SERVER_DEPLOY", ""));

        // Run the Spring Boot application
        SpringApplication.run(BackendApplication.class, args);
    }
}

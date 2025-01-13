package ec.edu.espe.security.monitoring;

import io.github.cdimascio.dotenv.Dotenv;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
/*
@SpringBootTest(properties = "spring.profiles.active=test")

class BackendApplicationTests {

    @Test
    void contextLoads() {
    }

    @BeforeAll
    static void setup() {
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
    }

}
*/
package ec.edu.espe.security.monitoring;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
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
        // Run the Spring Boot application
        SpringApplication.run(BackendApplication.class, args);
    }
}

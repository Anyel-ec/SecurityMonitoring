package ec.edu.espe.security.monitoring;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        // Load the .env file using Dotenv
        Dotenv dotenv = Dotenv.configure().load();

        // Set environment variables as system properties so Spring can access them
        System.setProperty("BD_USERNAME", dotenv.get("BD_USERNAME", "sa"));
        System.setProperty("BD_PASSWORD", dotenv.get("BD_PASSWORD", ""));

        // Run the Spring Boot application
        SpringApplication.run(BackendApplication.class, args);
    }
}

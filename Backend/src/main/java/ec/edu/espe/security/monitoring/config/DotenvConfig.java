package ec.edu.espe.security.monitoring.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DotenvConfig {

    @Bean
    public Dotenv dotenv() {
        // Dynamically gets the project's directory
        String projectDir = System.getProperty("user.dir");

        return Dotenv.configure()
                .directory(projectDir)  // Sets the dynamic path here
                .load();
    }

}

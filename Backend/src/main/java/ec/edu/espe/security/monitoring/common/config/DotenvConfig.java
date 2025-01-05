package ec.edu.espe.security.monitoring.common.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DotenvConfig {

    /**
     * Bean definition for Dotenv.
     * This loads environment variables from a .env file located in the project's directory.
     * @return Dotenv instance with loaded environment variables.
     */
    @Bean
    public Dotenv dotenv() {
        // Dynamically gets the project's directory
        String projectDir = System.getProperty("user.dir");

        return Dotenv.configure()
                .directory(projectDir)  // Sets the dynamic path here
                .load();
    }

}

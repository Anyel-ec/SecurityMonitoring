package ec.edu.espe.security.monitoring.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.info.License;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Security Monitoring",
                version = "1.0",
                description = "Open source tool service for dynamic monitoring of three DBMS: MongoDB, PostgreSQL, and MariaDB/MySQL.",
                contact = @Contact(name = "Developed by Angel Patiño EC", email = "cyberdevmatrix@gmail.com"),
                license = @License(name = "Apache License 2.0", url = "https://github.com/Anyel-ec/SecurityMonitoring/blob/main/LICENSE")
        ),
        servers = @Server(url = "http://localhost:8080")
)
public class OpenApiConfig {
}


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
                description = """
                    Open source tool service for dynamic monitoring of three DBMS: MongoDB, PostgreSQL, and MariaDB/MySQL.
                    
                    **Project Manager: Ing. Luis Chica Moncayo, Mgtr** [Linkedin Profile](https://www.linkedin.com/in/luis-chica-moncayo-7970232a/) - [Github Profile](https://github.com/LuisChica18)
                    
                    **Developer: Ing. Angel Patiño**  [Linkedin Profile](https://www.linkedin.com/in/anyel-ec/) - [GitHub Profile](https://github.com/Anyel-ec)
                    """,
                contact = @Contact(name = "Developed by Angel Patiño", email = "appatino@espe.edu.ec", url = "www.anyel.top"),
                license = @License(name = "Apache License 2.0", url = "https://github.com/Anyel-ec/SecurityMonitoring/blob/main/LICENSE")
        ),
        servers = @Server(url = "http://localhost:8080")
)
public class OpenApiConfig {
}

package ec.edu.espe.security.monitoring.services;

import ec.edu.espe.security.monitoring.models.DatabaseCredentials;
import ec.edu.espe.security.monitoring.repositories.DatabaseCredentialsRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@AllArgsConstructor
public class DatabaseMonitoringService {

    private final DatabaseCredentialsRepository credentialsRepository;
    private final DockerComposeService dockerComposeService;
    private final PasswordEncoder passwordEncoder;

    public void saveCredentialsAndRunCompose(DatabaseCredentials credentials) throws IOException {
        // Encriptar las contraseñas antes de guardar en la base de datos
        credentials.setPostgresPassword(passwordEncoder.encode(credentials.getPostgresPassword()));
        credentials.setMongodbPassword(passwordEncoder.encode(credentials.getMongodbPassword()));
        credentials.setMysqlPassword(passwordEncoder.encode(credentials.getMysqlPassword()));
        credentials.setMysqlRootPassword(passwordEncoder.encode(credentials.getMysqlRootPassword()));

        // Guardar las credenciales en la base de datos
        credentialsRepository.save(credentials);

        // Ejecutar Docker Compose con las credenciales
        dockerComposeService.runDockerCompose(

                // PostgreSQL
                credentials.getPostgresUser(),
                credentials.getPostgresPassword(),
                credentials.getPostgresDb(),
                credentials.getPostgresHost(),
                credentials.getPostgresPortHost(),
                credentials.getPostgresPortContainer(),

                // MongoDB
                credentials.getMongodbUser(),
                credentials.getMongodbPassword(),
                credentials.getMongodbDb(),
                credentials.getMongodbHost(),
                credentials.getMongodbPortHost(),
                credentials.getMongodbPortContainer(),

                // MariaDB --> OpenSource / MySQL --> Oracle
                credentials.getMysqlRootPassword(),
                credentials.getMysqlDatabase(),
                credentials.getMysqlUser(),
                credentials.getMysqlPassword(),
                credentials.getMysqlHost(),
                credentials.getMysqlPortHost(),
                credentials.getMysqlPortContainer()
        );
    }
}

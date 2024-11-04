package ec.edu.espe.security.monitoring.config;

import ec.edu.espe.security.monitoring.models.SystemParameters;
import ec.edu.espe.security.monitoring.models.UserRole;
import ec.edu.espe.security.monitoring.repositories.SystemParametersRepository;
import ec.edu.espe.security.monitoring.repositories.UserRoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class SystemInitializerConfig implements CommandLineRunner {

    // Injected dependencies
    private final SystemParametersRepository systemParametersRepository;
    private final UserRoleRepository userRoleRepository;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void run(String... args) throws Exception {
        log.info("Verificando e insertando parámetros de sistema si no existen...");

        // List the parameters to insert in BD
        List<SystemParameters> parameters = List.of(
                new SystemParameters("GRAFANA_INSTALL", "Configuration for installing Grafana", null, true),
                new SystemParameters("PROMETHEUS_INSTALL", "Configuration for installing Prometheus", null, true),
                new SystemParameters("COMPLETE_INSTALL", "Configuration for installing complete", "0", true),
                new SystemParameters("PROMETHEUS_EXPORTER_POSTGRESQL", "Configuration for Prometheus PostgreSQL exporter", null, true),
                new SystemParameters("PROMETHEUS_EXPORTER_MONGODB", "Configuration for Prometheus MongoDB exporter", null, true),
                new SystemParameters("PROMETHEUS_EXPORTER_MARIADB", "Configuration for Prometheus MariaDB exporter", null, true),
                new SystemParameters("POSTGRESQL", "Configuration for PostgreSQL database", null, true),
                new SystemParameters("MARIADB", "Configuration for MariaDB database", null, true),
                new SystemParameters("MONGODB", "Configuration for MongoDB database", null, true)
        );
        // Filter out existing parameters
        List<SystemParameters> newParameters = parameters.stream()
                .filter(param -> systemParametersRepository.findByNameAndIsActiveTrue(param.getName()).isEmpty())
                .toList();

        if (!newParameters.isEmpty()) {
            log.info("Insertando nuevos parámetros: {}", newParameters);
            systemParametersRepository.saveAll(newParameters);  // Batch insert
        }

        List<UserRole> roles = List.of(
                new UserRole( "superadmin", "Highest privilege role", 1, true),
                new UserRole ("admin", "Administrator role", 2, true),
                new UserRole( "user", "Standard user role", 3, true)
        );

        List<UserRole> newRoles = roles.stream()
                .filter(role -> userRoleRepository.findByNameAndIsActiveTrue(role.getName()).isEmpty())
                .toList();

        if (!newRoles.isEmpty()) {
            log.info("Insertando nuevos roles: {}", newRoles);
            userRoleRepository.saveAll(newRoles);  // Batch insert
        }


        log.info("Parámetros de sistema verificados/inicializados correctamente.");
    }
}
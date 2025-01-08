package ec.edu.espe.security.monitoring.modules.core.initializer.config;

import ec.edu.espe.security.monitoring.modules.core.initializer.models.SystemParameters;
import ec.edu.espe.security.monitoring.modules.features.auth.model.UserRole;
import ec.edu.espe.security.monitoring.modules.core.initializer.repositories.SystemParametersRepository;
import ec.edu.espe.security.monitoring.modules.features.auth.repository.UserRoleRepository;
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
                new SystemParameters("GRAFANA_INSTALL", "Configuración para instalar Grafana", null, true),
                new SystemParameters("PROMETHEUS_INSTALL", "Configuración para instalar Prometheus", null, true),
                new SystemParameters("COMPLETE_INSTALL", "Configuración para la instalación completa", "0", true),
                new SystemParameters("PROMETHEUS_EXPORTER_POSTGRESQL", "Configuración para el exportador de PostgreSQL en Prometheus", null, true),
                new SystemParameters("PROMETHEUS_EXPORTER_MONGODB", "Configuración para el exportador de MongoDB en Prometheus", null, true),
                new SystemParameters("PROMETHEUS_EXPORTER_MARIADB", "Configuración para el exportador de MariaDB en Prometheus", null, true),
                new SystemParameters("POSTGRESQL", "Configuración para la base de datos PostgreSQL", null, true),
                new SystemParameters("MARIADB", "Configuración para la base de datos MariaDB", null, true),
                new SystemParameters("MONGODB", "Configuración para la base de datos MongoDB", null, true),
                new SystemParameters("ALERTMANAGER_INSTALL", "Configuración para instalar Alertmanager", null, true)
        );

        // Filter out existing parameters
        List<SystemParameters> newParameters = parameters.stream()
                .filter(param -> systemParametersRepository.findByNameAndIsActiveTrue(param.getName()).isEmpty())
                .toList();

        if (!newParameters.isEmpty()) {
            log.debug("Insertando parámetros de instalacion : {}", newParameters);
            systemParametersRepository.saveAll(newParameters);  // Batch insert
        }

        List<UserRole> roles = List.of(
                new UserRole("superadmin", "Rol con los privilegios más altos", 1, true),
                new UserRole("admin", "Rol de administrador", 2, true),
                new UserRole("user", "Rol de usuario estándar", 3, true)
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
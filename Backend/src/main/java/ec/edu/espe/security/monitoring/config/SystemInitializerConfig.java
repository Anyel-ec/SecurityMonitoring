package ec.edu.espe.security.monitoring.config;

import ec.edu.espe.security.monitoring.models.SystemParameters;
import ec.edu.espe.security.monitoring.repositories.SystemParametersRepository;
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

    private final SystemParametersRepository systemParametersRepository;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void run(String... args) throws Exception {
        log.info("Verificando e insertando parámetros de sistema si no existen...");

        // List the parameters to insert in BD
        List<SystemParameters> parameters = List.of(
                new SystemParameters("GRAFANA_INSTALL", "Configuration for installing Grafana", null, true),
                new SystemParameters("PROMETHEUS_INSTALL", "Configuration for installing Prometheus", null, true),
                new SystemParameters("USERS_INSTALL", "Configuration for installing user accounts", null, true),
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


        log.info("Parámetros de sistema verificados/inicializados correctamente.");
    }
}
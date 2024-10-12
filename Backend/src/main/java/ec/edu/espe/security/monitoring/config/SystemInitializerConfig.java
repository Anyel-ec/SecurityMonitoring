package ec.edu.espe.security.monitoring.config;

import ec.edu.espe.security.monitoring.models.SystemParameters;
import ec.edu.espe.security.monitoring.repositories.SystemParametersRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class SystemInitializerConfig implements CommandLineRunner {

    private final SystemParametersRepository systemParametersRepository;

    @Override
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
                new SystemParameters("PROMETHEUS_EXPORTER_MARIADB", "Configuration for Prometheus MariaDB exporter", null, true)
        );
        // Check if each parameter exists in the database; if not, insert it
        parameters.forEach(param -> {
            boolean exists = systemParametersRepository.findByNameAndIsActiveTrue(param.getName()).isPresent();
            if (!exists) {
                log.info("Insertando parámetro de sistema: {}", param.getName());
                systemParametersRepository.save(param);
            }
        });

        log.info("Parámetros de sistema verificados/inicializados correctamente.");
    }
}
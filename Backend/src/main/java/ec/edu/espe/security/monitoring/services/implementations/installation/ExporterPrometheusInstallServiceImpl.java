package ec.edu.espe.security.monitoring.services.implementations.installation;
import ec.edu.espe.security.monitoring.dto.request.installation.ExporterPrometheusInstallRequestDto;
import ec.edu.espe.security.monitoring.models.InstallationConfig;
import ec.edu.espe.security.monitoring.models.SystemParameters;
import ec.edu.espe.security.monitoring.repositories.InstallationConfigRepository;
import ec.edu.espe.security.monitoring.repositories.SystemParametersRepository;
import ec.edu.espe.security.monitoring.services.interfaces.installation.PrometheusExporterInstallService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
@Slf4j
@AllArgsConstructor
public class ExporterPrometheusInstallServiceImpl implements PrometheusExporterInstallService {

    private final InstallationConfigRepository installationConfigRepository;
    private final SystemParametersRepository systemParametersRepository;

    @Override
    public void saveOrUpdatePrometheusExporters(ExporterPrometheusInstallRequestDto requestDto) {
        saveOrUpdateExporter("PROMETHEUS_EXPORTER_POSTGRESQL", requestDto.getInternalPortPostgres(), requestDto.getExternalPortPostgres());
        saveOrUpdateExporter("PROMETHEUS_EXPORTER_MARIADB", requestDto.getInternalPortMariadb(), requestDto.getExternalPortMariadb());
        saveOrUpdateExporter("PROMETHEUS_EXPORTER_MONGODB", requestDto.getInternalPortMongodb(), requestDto.getExternalPortMongodb());
    }

    private void saveOrUpdateExporter(String paramName, int internalPort, int externalPort) {
        try {
            // Buscar el SystemParameter correspondiente
            SystemParameters systemParameter = systemParametersRepository
                    .findByNameAndIsActiveTrue(paramName)
                    .orElseThrow(() -> new IllegalArgumentException(paramName + " parameter not found"));

            // Buscar si ya existe una configuración activa para este parámetro
            Optional<InstallationConfig> existingConfigOpt = installationConfigRepository
                    .findFirstBySystemParameterAndIsActiveTrue(systemParameter);

            InstallationConfig config;

            if (existingConfigOpt.isPresent()) {
                // Si ya existe una configuración, actualizamos
                config = existingConfigOpt.get();
                config.setInternalPort(internalPort);
                config.setExternalPort(externalPort);
                log.info("Actualizando configuración de {}", paramName);
            } else {
                // Si no existe, creamos una nueva configuración
                config = InstallationConfig.builder()
                        .internalPort(internalPort)
                        .externalPort(externalPort)
                        .systemParameter(systemParameter)
                        .isActive(true)
                        .build();
                log.info("Creando nueva configuración de {}", paramName);
            }

            // Guardar o actualizar la configuración
            installationConfigRepository.save(config);
            log.info("Configuración de {} guardada con éxito.", paramName);

        } catch (IllegalArgumentException e) {
            log.error("Error: {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            log.error("Error inesperado al guardar o actualizar la configuración para {}", paramName, e);
            throw new IllegalStateException("Error interno del servidor al guardar la configuración", e);
        }
    }
}

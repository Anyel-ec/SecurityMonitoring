package ec.edu.espe.security.monitoring.modules.features.installation.services.impl;
import ec.edu.espe.security.monitoring.modules.features.installation.dto.ExporterPrometheusInstallRequestDto;
import ec.edu.espe.security.monitoring.modules.features.installation.models.InstallationConfig;
import ec.edu.espe.security.monitoring.modules.features.installation.services.interfaces.PrometheusExporterInstallService;
import ec.edu.espe.security.monitoring.modules.core.initializer.models.SystemParameters;
import ec.edu.espe.security.monitoring.modules.features.installation.repositories.InstallationConfigRepository;
import ec.edu.espe.security.monitoring.modules.core.initializer.repositories.SystemParametersRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 04/11/2024
 */
@Service
@Slf4j
@AllArgsConstructor
public class ExporterPrometheusInstallServiceImpl implements PrometheusExporterInstallService {

    private final InstallationConfigRepository installationConfigRepository;
    private final SystemParametersRepository systemParametersRepository;

    @Override
    public void saveOrUpdatePrometheusExporters(ExporterPrometheusInstallRequestDto requestDto) {
        // validate unique ports
        requestDto.validateUniquePorts();

        saveOrUpdateExporter("PROMETHEUS_EXPORTER_POSTGRESQL", requestDto.getInternalPortPostgres(), requestDto.getExternalPortPostgres());
        saveOrUpdateExporter("PROMETHEUS_EXPORTER_MARIADB", requestDto.getInternalPortMariadb(), requestDto.getExternalPortMariadb());
        saveOrUpdateExporter("PROMETHEUS_EXPORTER_MONGODB", requestDto.getInternalPortMongodb(), requestDto.getExternalPortMongodb());
    }

    private void saveOrUpdateExporter(String paramName, int internalPort, int externalPort) {
        try {
            // search for the system parameter
            SystemParameters systemParameter = systemParametersRepository
                    .findByNameAndIsActiveTrue(paramName)
                    .orElseThrow(() -> new IllegalArgumentException(paramName + " parameter not found"));

            // search for the existing configuration
            Optional<InstallationConfig> existingConfigOpt = installationConfigRepository
                    .findFirstBySystemParameterAndIsActiveTrue(systemParameter);

            InstallationConfig config;

            if (existingConfigOpt.isPresent()) {
                config = existingConfigOpt.get();
                config.setInternalPort(internalPort);
                config.setExternalPort(externalPort);
                log.info("Actualizando configuración de {}", paramName);
            } else {
                config = InstallationConfig.builder()
                        .internalPort(internalPort)
                        .externalPort(externalPort)
                        .systemParameter(systemParameter)
                        .isActive(true)
                        .build();
                log.info("Creando nueva configuración de {}", paramName);
            }


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

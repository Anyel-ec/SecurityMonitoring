package ec.edu.espe.security.monitoring.modules.features.installation.services.impl;

import ec.edu.espe.security.monitoring.modules.features.installation.dto.PrometheusInstallRequestDto;
import ec.edu.espe.security.monitoring.modules.features.installation.models.InstallationConfig;
import ec.edu.espe.security.monitoring.modules.features.installation.services.interfaces.PrometheusInstallService;
import ec.edu.espe.security.monitoring.modules.core.initializer.models.SystemParameters;
import ec.edu.espe.security.monitoring.modules.features.installation.repositories.InstallationConfigRepository;
import ec.edu.espe.security.monitoring.modules.core.initializer.repositories.SystemParametersRepository;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.info.GitProperties;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
@AllArgsConstructor
public class PrometheusInstallServiceImpl implements PrometheusInstallService {
    private final InstallationConfigRepository installationConfigRepository;
    private final SystemParametersRepository systemParametersRepository;

    @Override
    public Map<String, InstallationConfig> savePrometheusInstall(PrometheusInstallRequestDto prometheusInstallRequestDto) {
        try {
            prometheusInstallRequestDto.validateUniquePorts();
            InstallationConfig prometheusInstall = savePrometheusConfig(prometheusInstallRequestDto);
            InstallationConfig alertmanagerInstall = saveAlertmanagerConfig(prometheusInstallRequestDto);

            log.info("Datos a guardar de Prometheus: {} y Alertmanager: {}", prometheusInstall, alertmanagerInstall);

            installationConfigRepository.save(prometheusInstall);
            installationConfigRepository.save(alertmanagerInstall);

            Map<String, InstallationConfig> result = new HashMap<>();
            result.put("prometheus", prometheusInstall);
            result.put("alertmanager", alertmanagerInstall);

            return result;
        } catch (IllegalArgumentException e) {
            log.error(e.getMessage());
            throw e;
        } catch (Exception e) {
            log.error("Error inesperado al guardar la instalación", e);
            throw new IllegalStateException("Error interno del servidor al guardar la instalación", e);
        }
    }

    private InstallationConfig savePrometheusConfig(PrometheusInstallRequestDto prometheusInstallRequestDto) {
        prometheusInstallRequestDto.validateUniquePorts();
        SystemParameters prometheusParameter = systemParametersRepository
                .findByNameAndIsActiveTrue("PROMETHEUS_INSTALL")
                .orElseThrow(() -> new IllegalArgumentException("El parámetro PROMETHEUS_INSTALL no fue encontrado"));

        InstallationConfig prometheusInstall = installationConfigRepository
                .findFirstBySystemParameterAndIsActiveTrue(prometheusParameter)
                .orElse(null);

        if (prometheusInstall != null) {
            prometheusInstall.setInternalPort(prometheusInstallRequestDto.getInternalPort());
            prometheusInstall.setExternalPort(prometheusInstallRequestDto.getExternalPort());
        } else {
            prometheusInstall = InstallationConfig.builder()
                    .internalPort(prometheusInstallRequestDto.getInternalPort())
                    .externalPort(prometheusInstallRequestDto.getExternalPort())
                    .systemParameter(prometheusParameter)
                    .isActive(true)
                    .build();
        }
        return prometheusInstall;
    }

    private InstallationConfig saveAlertmanagerConfig(PrometheusInstallRequestDto prometheusInstallRequestDto) {
        prometheusInstallRequestDto.validateUniquePorts();
        SystemParameters alertmanagerParameter = systemParametersRepository
                .findByNameAndIsActiveTrue("ALERTMANAGER_INSTALL")
                .orElseThrow(() -> new IllegalArgumentException("El parámetro ALERTMANAGER_INSTALL no fue encontrado"));

        InstallationConfig alertmanagerInstall = installationConfigRepository
                .findFirstBySystemParameterAndIsActiveTrue(alertmanagerParameter)
                .orElse(null);

        if (alertmanagerInstall != null) {
            alertmanagerInstall.setInternalPort(prometheusInstallRequestDto.getInternalPortAlertmanager());
            alertmanagerInstall.setExternalPort(prometheusInstallRequestDto.getExternalPortAlertmanager());
        } else {
            alertmanagerInstall = InstallationConfig.builder()
                    .internalPort(prometheusInstallRequestDto.getInternalPortAlertmanager())
                    .externalPort(prometheusInstallRequestDto.getExternalPortAlertmanager())
                    .systemParameter(alertmanagerParameter)
                    .isActive(true)
                    .build();
        }
        return alertmanagerInstall;
    }

    @Override
    public InstallationConfig getPrometheusInstall() {
        try {
            SystemParameters prometheusParameter = systemParametersRepository
                    .findByNameAndIsActiveTrue("PROMETHEUS_INSTALL")
                    .orElseThrow(() -> new IllegalArgumentException("El parámetro PROMETHEUS_INSTALL no fue encontrado"));

            return installationConfigRepository
                    .findFirstBySystemParameterAndIsActiveTrue(prometheusParameter)
                    .orElseThrow(() -> new IllegalArgumentException("No se encontró la configuración de instalación de Prometheus"));
        } catch (IllegalArgumentException e) {
            log.error(e.getMessage());
            throw e;
        } catch (Exception e) {
            log.error("Error inesperado al recuperar la instalación de Prometheus", e);
            throw new IllegalStateException("Error interno del servidor al recuperar la instalación de Prometheus", e);
        }
    }

    @Override
    public InstallationConfig getAlertmanagerInstall() {
        try {
            SystemParameters alertmanagerParameter = systemParametersRepository
                    .findByNameAndIsActiveTrue("ALERTMANAGER_INSTALL")
                    .orElseThrow(() -> new IllegalArgumentException("El parámetro ALERTMANAGER_INSTALL no fue encontrado"));

            return installationConfigRepository
                    .findFirstBySystemParameterAndIsActiveTrue(alertmanagerParameter)
                    .orElseThrow(() -> new IllegalArgumentException("No se encontró la configuración de instalación de Alertmanager"));
        } catch (IllegalArgumentException e) {
            log.error(e.getMessage());
            throw e;
        } catch (Exception e) {
            log.error("Error inesperado al recuperar la instalación de Alertmanager", e);
            throw new IllegalStateException("Error interno del servidor al recuperar la instalación de Alertmanager", e);
        }
    }
}

package ec.edu.espe.security.monitoring.features.installation.services.impl;

import ec.edu.espe.security.monitoring.features.installation.dto.PrometheusInstallRequestDto;
import ec.edu.espe.security.monitoring.features.installation.models.InstallationConfig;
import ec.edu.espe.security.monitoring.features.installation.services.interfaces.PrometheusInstallService;
import ec.edu.espe.security.monitoring.core.system.models.SystemParameters;
import ec.edu.espe.security.monitoring.features.installation.repositories.InstallationConfigRepository;
import ec.edu.espe.security.monitoring.core.system.repositories.SystemParametersRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
@Service
@Slf4j
@AllArgsConstructor
public class PrometheusInstallServiceImpl implements PrometheusInstallService {
    private final InstallationConfigRepository installationConfigRepository;
    private final SystemParametersRepository systemParametersRepository;

    @Override
    public InstallationConfig savePrometheusInstall(PrometheusInstallRequestDto prometheusInstallRequestDto) {
        try {
            // Fetch the PROMETHEUS_INSTALL system parameter
            SystemParameters systemParameter = systemParametersRepository
                    .findByNameAndIsActiveTrue("PROMETHEUS_INSTALL")
                    .orElseThrow(() -> new IllegalArgumentException("El parámetro PROMETHEUS_INSTALL no fue encontrado"));

            // Check if a Prometheus installation with this parameter already exists
            InstallationConfig prometheusInstall = installationConfigRepository
                    .findFirstBySystemParameterAndIsActiveTrue(systemParameter)
                    .orElse(null);

            // If it exists, update the necessary fields
            if (prometheusInstall != null) {
                prometheusInstall.setInternalPort(prometheusInstallRequestDto.getInternalPort());
                prometheusInstall.setExternalPort(prometheusInstallRequestDto.getExternalPort());
            } else {
                // If it doesn't exist, create a new installation
                prometheusInstall = InstallationConfig.builder()
                        .internalPort(prometheusInstallRequestDto.getInternalPort())
                        .externalPort(prometheusInstallRequestDto.getExternalPort())
                        .systemParameter(systemParameter)
                        .isActive(true)
                        .build();
            }
            log.info("Los datos a guardar de prometheus es: {}", prometheusInstall);
            // Save or update the installation in the database
            return installationConfigRepository.save(prometheusInstall);
        } catch (IllegalArgumentException e) {
            log.error(e.getMessage());
            throw e; // Rethrow to handle specific exception (400 Bad Request)
        } catch (Exception e) {
            log.error("Error inesperado al guardar la instalación de Prometheus", e);
            throw new IllegalStateException("Error interno del servidor al guardar la instalación de Prometheus", e); // Handle unexpected errors (500)
        }
    }


    @Override
    public InstallationConfig getPrometheusInstall() {
        try {
            // Search for the active system parameter PROMETHEUS_INSTALL
            SystemParameters systemParameter = systemParametersRepository
                    .findByNameAndIsActiveTrue("PROMETHEUS_INSTALL")
                    .orElseThrow(() -> new IllegalArgumentException("El parámetro PROMETHEUS_INSTALL no fue encontrado"));

            // Search for the Prometheus installation configuration using the system parameter
            return installationConfigRepository
                    .findFirstBySystemParameterAndIsActiveTrue(systemParameter)
                    .orElseThrow(() -> new IllegalArgumentException("No se encontró la configuración de instalación de Prometheus"));
        } catch (IllegalArgumentException e) {
            log.error(e.getMessage());
            throw e; // Throw specific exception (400 Bad Request)
        } catch (Exception e) {
            log.error("Error inesperado al recuperar la instalación de Prometheus", e);
            throw new IllegalStateException("Error interno del servidor al recuperar la instalación de Prometheus", e); // Error 500
        }
    }
}

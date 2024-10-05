package ec.edu.espe.security.monitoring.services.impl;

import ec.edu.espe.security.monitoring.dto.request.GrafanaInstallDto;
import ec.edu.espe.security.monitoring.dto.request.PrometheusInstallDto;
import ec.edu.espe.security.monitoring.dto.request.UserInstallDto;
import ec.edu.espe.security.monitoring.models.InstallationConfig;
import ec.edu.espe.security.monitoring.models.SystemParameters;
import ec.edu.espe.security.monitoring.repositories.InstallationConfigRepository;
import ec.edu.espe.security.monitoring.repositories.SystemParametersRepository;
import ec.edu.espe.security.monitoring.services.interfaces.installation.InstallationConfigService;
import ec.edu.espe.security.monitoring.utils.AesEncryptor;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@AllArgsConstructor
public class InstallationConfigServiceImpl implements InstallationConfigService {

    private final InstallationConfigRepository installationConfigRepository;
    private final SystemParametersRepository systemParametersRepository;
    private final AesEncryptor aesEncryptor;

    // Save Grafana installation credentials with encrypted password
    @Override
    public InstallationConfig saveGrafanaInstall(GrafanaInstallDto grafanaInstallDto) {
        try {
            SystemParameters systemParameter = systemParametersRepository
                    .findByNameAndIsActiveTrue("GRAFANA_INSTALL")
                    .orElseThrow(() -> new IllegalArgumentException("GRAFANA_INSTALL parameter not found"));

            // Encrypt the password
            String encryptedPassword = aesEncryptor.encrypt(grafanaInstallDto.getPassword());

            // Use the Builder to create the InstallationConfig object
            InstallationConfig grafanaInstall = InstallationConfig.builder()
                    .usuario(grafanaInstallDto.getUsuario())
                    .password(encryptedPassword)
                    .internalPort(grafanaInstallDto.getInternalPort())
                    .externalPort(grafanaInstallDto.getExternalPort())
                    .systemParameter(systemParameter)
                    .build();

            // Save the InstallationConfig entity to the database
            return installationConfigRepository.save(grafanaInstall);
        } catch (IllegalArgumentException e) {
            log.error(e.getMessage());
            throw e;
        } catch (Exception e) {
            log.error("Error inesperado al guardar la instalación de Grafana", e);
            throw new IllegalStateException("Error interno del servidor al guardar la instalación de Grafana", e);
        }
    }

    @Override
    public InstallationConfig savePrometheusInstall(PrometheusInstallDto prometheusInstallDto) {
        try {
            // Fetch the PROMETHEUS_INSTALL system parameter
            SystemParameters systemParameter = systemParametersRepository
                    .findByNameAndIsActiveTrue("PROMETHEUS_INSTALL")
                    .orElseThrow(() -> new IllegalArgumentException("El parámetro PROMETHEUS_INSTALL no fue encontrado"));

            // Build the InstallationConfig for Prometheus
            InstallationConfig prometheusInstall = InstallationConfig.builder()
                    .internalPort(prometheusInstallDto.getInternalPort())
                    .externalPort(prometheusInstallDto.getExternalPort())
                    .systemParameter(systemParameter)
                    .build();

            // Save the InstallationConfig entity to the database
            return installationConfigRepository.save(prometheusInstall);
        } catch (IllegalArgumentException e) {
            log.error(e.getMessage());
            throw e; // Rethrow to handle specific exception (400 Bad Request)
        } catch (Exception e) {
            log.error("Error inesperado al guardar la instalación de Prometheus", e);
            throw new IllegalStateException("Error interno del servidor al guardar la instalación de Prometheus", e); // Manejar errores inesperados (500)
        }
    }


    public InstallationConfig saveUserInstall(UserInstallDto userInstallDto) {
        try {
            // Fetch the USERS_INSTALL system parameter
            SystemParameters systemParameter = systemParametersRepository
                    .findByNameAndIsActiveTrue("USERS_INSTALL")
                    .orElseThrow(() -> new IllegalArgumentException("El parámetro USERS_INSTALL no fue encontrado"));

            // Encrypt the password
            String encryptedPassword = aesEncryptor.encrypt(userInstallDto.getPassword());

            // Build the InstallationConfig for user registration
            InstallationConfig userInstall = InstallationConfig.builder()
                    .usuario(userInstallDto.getUsuario())
                    .password(encryptedPassword)
                    .numberPhone(userInstallDto.getNumberPhone())
                    .email(userInstallDto.getEmail())
                    .systemParameter(systemParameter)
                    .build();

            // Save the InstallationConfig entity to the database
            return installationConfigRepository.save(userInstall);
        } catch (IllegalArgumentException e) {
            log.error(e.getMessage());
            throw e; // Rethrow to handle specific exception (400 Bad Request)
        } catch (Exception e) {
            log.error("Error inesperado al guardar el registro de usuario", e);
            throw new IllegalStateException("Error interno del servidor al guardar el registro de usuario", e); // Handle unexpected errors (500)
        }
    }


}

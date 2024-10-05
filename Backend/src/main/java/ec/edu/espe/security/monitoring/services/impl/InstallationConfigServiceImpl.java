package ec.edu.espe.security.monitoring.services.impl;

import ec.edu.espe.security.monitoring.dto.request.GrafanaInstallDto;
import ec.edu.espe.security.monitoring.models.InstallationConfig;
import ec.edu.espe.security.monitoring.models.SystemParameters;
import ec.edu.espe.security.monitoring.repositories.InstallationConfigRepository;
import ec.edu.espe.security.monitoring.repositories.SystemParametersRepository;
import ec.edu.espe.security.monitoring.services.interfaces.InstallationConfigService;
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
}

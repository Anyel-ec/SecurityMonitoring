package ec.edu.espe.security.monitoring.services.implementations.installation;

import ec.edu.espe.security.monitoring.dto.request.installation.GrafanaInstallRequestDto;
import ec.edu.espe.security.monitoring.models.InstallationConfig;
import ec.edu.espe.security.monitoring.models.SystemParameters;
import ec.edu.espe.security.monitoring.repositories.InstallationConfigRepository;
import ec.edu.espe.security.monitoring.services.implementations.grafana.GrafanaCredentialServiceImpl;
import ec.edu.espe.security.monitoring.services.interfaces.installation.GrafanaInstallService;
import ec.edu.espe.security.monitoring.utils.AesEncryptor;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@AllArgsConstructor
public class GrafanaInstallServiceImpl implements GrafanaInstallService {

    private final InstallationConfigRepository installationConfigRepository;
    private final GrafanaCredentialServiceImpl grafanaCredentialService;
    private final AesEncryptor aesEncryptor;

    @Override
    public InstallationConfig saveGrafanaInstall(GrafanaInstallRequestDto grafanaInstallRequestDto) {
        try {
            SystemParameters systemParameter = grafanaCredentialService.getGrafanaInstallParameter();

            // Encrypt the password
            String encryptedPassword = aesEncryptor.encrypt(grafanaInstallRequestDto.getPassword());

            InstallationConfig grafanaInstall = installationConfigRepository
                    .findFirstBySystemParameterAndIsActiveTrue(systemParameter)
                    .orElse(null);

            if (grafanaInstall != null) {
                grafanaInstall.setUsername(grafanaInstallRequestDto.getUsuario());
                grafanaInstall.setPassword(encryptedPassword);
                grafanaInstall.setInternalPort(grafanaInstallRequestDto.getInternalPort());
                grafanaInstall.setExternalPort(grafanaInstallRequestDto.getExternalPort());
                grafanaInstall.setSystemParameter(systemParameter);
                grafanaInstall.setIsActive(true);
                log.error("Se actualiza las credenciales de Grafana");
            } else {
                grafanaInstall = InstallationConfig.builder()
                        .username(grafanaInstallRequestDto.getUsuario())
                        .password(encryptedPassword)
                        .internalPort(grafanaInstallRequestDto.getInternalPort())
                        .externalPort(grafanaInstallRequestDto.getExternalPort())
                        .systemParameter(systemParameter)
                        .isActive(true)
                        .build();
            }
            log.info("Lo que se va ha instalar de grafana es: {}", grafanaInstall);
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
    public InstallationConfig getGrafanaInstall() {
        try {
            // Search for the system parameter "GRAFANA_INSTALL"
            SystemParameters systemParameter = grafanaCredentialService.getGrafanaInstallParameter();

            // Search for the active installation associated with the found SystemParameter
            InstallationConfig grafanaInstall = grafanaCredentialService.getActiveInstallationConfig(systemParameter);

            // If no installation is found, throw an exception
            String decryptedPassword = aesEncryptor.decrypt(grafanaInstall.getPassword());
            grafanaInstall.setPassword(decryptedPassword);

            return grafanaInstall;

        } catch (Exception e) {
            throw new IllegalStateException("Error al obtener la instalación de Grafana", e);
        }
    }
}

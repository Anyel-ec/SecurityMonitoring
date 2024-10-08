package ec.edu.espe.security.monitoring.services.implementations.installation;

import ec.edu.espe.security.monitoring.models.InstallationConfig;
import ec.edu.espe.security.monitoring.models.SystemParameters;
import ec.edu.espe.security.monitoring.repositories.InstallationConfigRepository;
import ec.edu.espe.security.monitoring.repositories.SystemParametersRepository;
import ec.edu.espe.security.monitoring.services.interfaces.installation.ConfigInstallService;
import ec.edu.espe.security.monitoring.utils.AesEncryptor;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@AllArgsConstructor
public class ConfigInstallServiceImpl implements ConfigInstallService {
    private final InstallationConfigRepository installationConfigRepository;
    private final SystemParametersRepository systemParametersRepository;
    private final AesEncryptor aesEncryptor;

    @Override
    public List<InstallationConfig> getActiveInstallations() {
        // get all config active
        List<InstallationConfig> activeInstallations = installationConfigRepository.findByIsActiveTrue();

        // Iterate over each configuration to decrypt the password
        for (InstallationConfig config : activeInstallations) {
            try {
                // if a password is present, it is decrypted
                if (config.getPassword() != null) {
                    String decryptedPassword = aesEncryptor.decrypt(config.getPassword());
                    config.setPassword(decryptedPassword);
                }
            } catch (IllegalArgumentException e) {
                log.error("Error: {}", e.getMessage());
                throw e;
            } catch (Exception e) {
                log.error("Error inesperado al recuperar", e);
                throw new IllegalStateException("Error interno del servidor", e);
            }
        }
        // return the decrypted active installations
        return activeInstallations;
    }


    @Override
    public boolean isInstallationComplete() {
        try {
            // Fetch the system parameter COMPLETE_INSTALL
            SystemParameters completeInstallParam = systemParametersRepository
                    .findByNameAndIsActiveTrue("COMPLETE_INSTALL")
                    .orElseThrow(() -> new IllegalArgumentException("El parámetro COMPLETE_INSTALL no fue encontrado"));

            // Check if the installation is marked as complete (case-insensitive comparison)
            return completeInstallParam.getParamValue() != null && completeInstallParam.getParamValue().equalsIgnoreCase("1");

        } catch (Exception e) {
            log.error("Error al verificar el estado de la instalación", e);
            throw new IllegalStateException("Error interno del servidor al verificar el estado de la instalación", e);
        }
    }


    public SystemParameters updateCompleteInstallParameter() {
        try {
            SystemParameters completeInstallParam = systemParametersRepository
                    .findByNameAndIsActiveTrue("COMPLETE_INSTALL")
                    .orElseThrow(() -> new IllegalArgumentException("El parámetro COMPLETE_INSTALL no fue encontrado"));

            completeInstallParam.setParamValue("1");

            return systemParametersRepository.save(completeInstallParam);
        } catch (IllegalArgumentException e) {
            throw new IllegalStateException("No se pudo actualizar el parámetro COMPLETE_INSTALL", e);
        }
    }
}

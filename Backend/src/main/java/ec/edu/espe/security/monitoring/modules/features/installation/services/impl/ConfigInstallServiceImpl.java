package ec.edu.espe.security.monitoring.modules.features.installation.services.impl;

import ec.edu.espe.security.monitoring.modules.features.installation.models.InstallationConfig;
import ec.edu.espe.security.monitoring.modules.features.installation.services.interfaces.ConfigInstallService;
import ec.edu.espe.security.monitoring.modules.core.initializer.models.SystemParameters;
import ec.edu.espe.security.monitoring.modules.features.installation.repositories.InstallationConfigRepository;
import ec.edu.espe.security.monitoring.modules.core.initializer.repositories.SystemParametersRepository;
import ec.edu.espe.security.monitoring.common.encrypt.utils.AesEncryptorUtil;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 04/11/2024
 */
@Service
@Slf4j
@AllArgsConstructor
public class ConfigInstallServiceImpl implements ConfigInstallService {
    private final InstallationConfigRepository installationConfigRepository;
    private final SystemParametersRepository systemParametersRepository;
    private final AesEncryptorUtil aesEncryptor;

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
                log.info("Obteniendo todas las configuraciones de Instalacion ");
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
            log.error("Error al verificar el estado de la instalación: {}", e.getMessage());
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

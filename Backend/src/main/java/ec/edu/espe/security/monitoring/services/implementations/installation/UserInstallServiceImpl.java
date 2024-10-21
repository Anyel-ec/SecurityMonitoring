package ec.edu.espe.security.monitoring.services.implementations.installation;

import ec.edu.espe.security.monitoring.dto.request.installation.UserInstallRequestDto;
import ec.edu.espe.security.monitoring.models.InstallationConfig;
import ec.edu.espe.security.monitoring.models.SystemParameters;
import ec.edu.espe.security.monitoring.repositories.InstallationConfigRepository;
import ec.edu.espe.security.monitoring.repositories.SystemParametersRepository;
import ec.edu.espe.security.monitoring.services.interfaces.installation.UserInstallService;
import ec.edu.espe.security.monitoring.utils.AesEncryptor;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@AllArgsConstructor
public class UserInstallServiceImpl implements UserInstallService {

    private final InstallationConfigRepository installationConfigRepository;
    private final SystemParametersRepository systemParametersRepository;
    private final AesEncryptor aesEncryptor;

    @Override
    public InstallationConfig saveUserInstall(UserInstallRequestDto userInstallRequestDto) {
        try {
            // Fetch the USERS_INSTALL system parameter
            SystemParameters systemParameter = systemParametersRepository.findByNameAndIsActiveTrue("USERS_INSTALL").orElseThrow(() -> new IllegalArgumentException("El parámetro USERS_INSTALL no fue encontrado"));

            // Encrypt the password
            String encryptedPassword = aesEncryptor.encrypt(userInstallRequestDto.getPassword());

            // Check if there is an active installation for USERS_INSTALL
            InstallationConfig userInstall = installationConfigRepository.findFirstBySystemParameterAndIsActiveTrue(systemParameter).orElse(null);

            if (userInstall != null) {
                // If it exists, update the data
                userInstall.setUsername(userInstallRequestDto.getUsuario());
                userInstall.setPassword(encryptedPassword);
                userInstall.setNumberPhone(userInstallRequestDto.getNumberPhone());
                userInstall.setEmail(userInstallRequestDto.getEmail());
                userInstall.setSystemParameter(systemParameter);
                userInstall.setIsActive(true);
                log.info("Se actualiza la instalación de usuario.");
            } else {
                // If it doesn't exist, create a new installation
                userInstall = InstallationConfig.builder().username(userInstallRequestDto.getUsuario()).password(encryptedPassword).numberPhone(userInstallRequestDto.getNumberPhone()).email(userInstallRequestDto.getEmail()).systemParameter(systemParameter).isActive(true).build();
                log.info("Se crea una nueva instalación de usuario.");
            }
            log.info("Datos a guardar del usuario: {}", userInstall);
            // Save the installation configuration to the database
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

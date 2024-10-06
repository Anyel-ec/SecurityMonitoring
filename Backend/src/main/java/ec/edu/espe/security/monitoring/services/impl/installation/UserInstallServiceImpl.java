package ec.edu.espe.security.monitoring.services.impl.installation;

import ec.edu.espe.security.monitoring.dto.request.UserInstallRequestDto;
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

    public InstallationConfig saveUserInstall(UserInstallRequestDto userInstallRequestDto) {
        try {
            // Fetch the USERS_INSTALL system parameter
            SystemParameters systemParameter = systemParametersRepository
                    .findByNameAndIsActiveTrue("USERS_INSTALL")
                    .orElseThrow(() -> new IllegalArgumentException("El parámetro USERS_INSTALL no fue encontrado"));

            // Encrypt the password
            String encryptedPassword = aesEncryptor.encrypt(userInstallRequestDto.getPassword());

            // Build the InstallationConfig for user registration
            InstallationConfig userInstall = InstallationConfig.builder()
                    .usuario(userInstallRequestDto.getUsuario())
                    .password(encryptedPassword)
                    .numberPhone(userInstallRequestDto.getNumberPhone())
                    .email(userInstallRequestDto.getEmail())
                    .systemParameter(systemParameter)
                    .isActive(true)
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

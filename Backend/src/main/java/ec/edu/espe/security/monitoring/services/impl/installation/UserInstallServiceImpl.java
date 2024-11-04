package ec.edu.espe.security.monitoring.services.impl.installation;

import ec.edu.espe.security.monitoring.dto.request.installation.UserInstallRequestDto;
import ec.edu.espe.security.monitoring.models.InstallationConfig;
import ec.edu.espe.security.monitoring.models.SystemParameters;
import ec.edu.espe.security.monitoring.models.UserInfo;
import ec.edu.espe.security.monitoring.models.UserRole;
import ec.edu.espe.security.monitoring.repositories.InstallationConfigRepository;
import ec.edu.espe.security.monitoring.repositories.SystemParametersRepository;
import ec.edu.espe.security.monitoring.repositories.UserInfoRepository;
import ec.edu.espe.security.monitoring.repositories.UserRoleRepository;
import ec.edu.espe.security.monitoring.services.interfaces.installation.UserInstallService;
import ec.edu.espe.security.monitoring.utils.AesEncryptorUtil;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@Slf4j
@AllArgsConstructor
public class UserInstallServiceImpl implements UserInstallService {

    private final UserInfoRepository userInfoRepository;
    private final UserRoleRepository userRoleRepository;
    private final AesEncryptorUtil aesEncryptor;

    @Override
    public UserInfo saveUserInstall(UserInstallRequestDto userInstallRequestDto) {
        try {
            // Encrypt the password
            String encryptedPassword = aesEncryptor.encrypt(userInstallRequestDto.getPassword());

            // Check if a user with the same username already exists
            UserInfo existingUser = userInfoRepository.findByUsernameAndIsActiveTrue(userInstallRequestDto.getUsuario());
            if (existingUser != null) {
                throw new IllegalArgumentException("El nombre de usuario ya existe.");
            }

            // Retrieve the "superadmin" role
            UserRole superAdminRole = userRoleRepository.findByNameAndIsActiveTrue("superadmin")
                    .orElseThrow(() -> new IllegalArgumentException("El rol superadmin no fue encontrado"));

            // Create a new user with the superadmin role
            UserInfo user = new UserInfo();
            user.setUsername(userInstallRequestDto.getUsuario());
            user.setPassword(encryptedPassword);
            user.setPhone(userInstallRequestDto.getNumberPhone());
            user.setEmail(userInstallRequestDto.getEmail());
            user.setIsActive(true);

            // Set roles
            Set<UserRole> roles = new HashSet<>();
            roles.add(superAdminRole);
            user.setRoles(roles);

            // Save the user in the database
            log.info("Guardando nuevo usuario con rol superadmin: {}", user);
            return userInfoRepository.save(user);
        } catch (IllegalArgumentException e) {
            log.error(e.getMessage());
            throw e; // Rethrow to handle specific exception (400 Bad Request)
        } catch (Exception e) {
            log.error("Error inesperado al guardar el usuario {}", e.getMessage());
            throw new IllegalStateException("Error interno del servidor al guardar el usuario", e); // Handle unexpected errors (500)
        }
    }
}

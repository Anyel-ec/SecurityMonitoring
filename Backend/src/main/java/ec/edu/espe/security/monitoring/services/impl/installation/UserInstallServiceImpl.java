package ec.edu.espe.security.monitoring.services.impl.installation;

import ec.edu.espe.security.monitoring.dto.request.installation.UserInstallRequestDto;
import ec.edu.espe.security.monitoring.models.UserInfo;
import ec.edu.espe.security.monitoring.models.UserRole;
import ec.edu.espe.security.monitoring.repositories.UserInfoRepository;
import ec.edu.espe.security.monitoring.repositories.UserRoleRepository;
import ec.edu.espe.security.monitoring.services.interfaces.installation.UserInstallService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@Slf4j
@AllArgsConstructor
public class UserInstallServiceImpl implements UserInstallService {

    private final UserInfoRepository userInfoRepository;
    private final UserRoleRepository userRoleRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    public UserInfo saveUserInstall(UserInstallRequestDto userInstallRequestDto) {
        try {
            // Encrypt the password using BCrypt
            String encryptedPassword = passwordEncoder.encode(userInstallRequestDto.getPassword());

            // Retrieve the "superadmin" role
            UserRole superAdminRole = userRoleRepository.findByNameAndIsActiveTrue("superadmin")
                    .orElseThrow(() -> new IllegalArgumentException("El rol superadmin no fue encontrado"));

            // Check if a user with the same username already exists
            UserInfo user = userInfoRepository.findByUsernameAndIsActiveTrue(userInstallRequestDto.getUsuario());

            if (user != null) {
                log.info("Actualizando usuario existente con rol superadmin: {}", user.getUsername());
                user = UserInfo.builder()
                        .id(user.getId())
                        .username(user.getUsername())
                        .password(encryptedPassword)
                        .email(userInstallRequestDto.getEmail())
                        .phone(userInstallRequestDto.getNumberPhone())
                        .isActive(true)
                        .roles(user.getRoles()) // Mantener roles existentes
                        .build();
            } else {
                // Crear nuevo usuario
                log.info("Creando nuevo usuario con rol superadmin: {}", userInstallRequestDto.getUsuario());
                user = UserInfo.builder()
                        .username(userInstallRequestDto.getUsuario())
                        .password(encryptedPassword)
                        .email(userInstallRequestDto.getEmail())
                        .phone(userInstallRequestDto.getNumberPhone())
                        .isActive(true)
                        .build();
            }

            // Set roles (ensuring superadmin role is added)
            Set<UserRole> roles = user.getRoles() != null ? user.getRoles() : new HashSet<>();
            roles.add(superAdminRole);
            user.setRoles(roles);

            // Save the user in the database
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

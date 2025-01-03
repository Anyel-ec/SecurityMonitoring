package ec.edu.espe.security.monitoring.services.impl.auth;

import ec.edu.espe.security.monitoring.dto.request.LoginRequestDto;
import ec.edu.espe.security.monitoring.dto.response.JsonResponseDto;
import ec.edu.espe.security.monitoring.models.UserInfo;
import ec.edu.espe.security.monitoring.repositories.UserInfoRepository;
import ec.edu.espe.security.monitoring.security.jwt.JwtProvider;
import ec.edu.espe.security.monitoring.security.jwt.JwtRevokedToken;
import ec.edu.espe.security.monitoring.services.interfaces.auth.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserInfoRepository userRepository;
    private final PasswordEncoder encoder;
    private final JwtProvider jwtProvider;
    private final JwtRevokedToken jwtRevokedToken;

    // Retrieves all active users from the database
    @Override
    public List<UserInfo> getAllActiveUsers() {
        log.info("Obteniendo todos los usuarios activos");
        return userRepository.findByIsActiveTrue();
    }

    // Authenticates a user and returns a JWT token
    @Override
    public JsonResponseDto authenticate(LoginRequestDto login) {
        try {
            String username = login.getUsername() != null ? login.getUsername().trim() : "";
            String pass = login.getPassword() != null ? login.getPassword().trim() : "";
            // Validate that username and password are not empty
            if (username.isEmpty() || pass.isEmpty()) {
                return new JsonResponseDto(false, HttpStatus.BAD_REQUEST.value(), "Usuario y contraseña son requeridos.", null);
            }

            // Search for the user in the database
            UserInfo user = userRepository.findByUsernameAndIsActiveTrue(username);
            if (user == null) {
                return new JsonResponseDto(false, HttpStatus.BAD_REQUEST.value(), "Usuario no encontrado.", null);
            }

            // Check if the password matches
            if (!encoder.matches(pass, user.getPassword())) {
                return new JsonResponseDto(false, HttpStatus.BAD_REQUEST.value(), "Contraseña incorrecta.", null);
            }
            // Generate a JWT token for the user
            String jwt = jwtProvider.generateJwtByUsername(user);
            return new JsonResponseDto(true, HttpStatus.OK.value(), "Login exitoso", jwt);
        } catch (Exception e) {
            log.info("Error en el login: {}", e.getMessage());
            return new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error en el login", null);
        }
    }

    // Retrieves user details from the token
    @Override
    public JsonResponseDto getUserDetails(String token) {
        try {
            // Extract the username from the token
            String username = jwtProvider.getNombreUsuarioFromToken(token);

            // Fetch the user from the database
            UserInfo user = userRepository.findByUsernameAndIsActiveTrue(username);

            if (user == null) {
                return new JsonResponseDto(false, HttpStatus.NOT_FOUND.value(), "Usuario no encontrado.", null);
            }

            // Return the user's details
            return new JsonResponseDto(true, HttpStatus.OK.value(), "Detalles del usuario obtenidos con éxito", user);

        } catch (Exception e) {
            log.error("Error al obtener detalles del usuario: {}", e.getMessage());
            return new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al obtener detalles del usuario", null);
        }
    }

    // Revokes a specific token by adding it to the revoked token list
    @Override
    public JsonResponseDto revokeToken(String token) {
        try {
            if (token == null || token.trim().isEmpty()) {
                return new JsonResponseDto(false, HttpStatus.BAD_REQUEST.value(), "Token no proporcionado.", null);
            }

            jwtRevokedToken.revokeToken(token);
            log.info("Token revocado: {}", token);

            return new JsonResponseDto(true, HttpStatus.OK.value(), "Token revocado con éxito.", null);
        } catch (Exception e) {
            log.error("Error al revocar el token: {}", e.getMessage());
            return new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al revocar el token.", null);
        }
    }

}

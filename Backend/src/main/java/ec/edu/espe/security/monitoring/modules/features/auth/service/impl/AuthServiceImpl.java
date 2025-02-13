package ec.edu.espe.security.monitoring.modules.features.auth.service.impl;

import ec.edu.espe.security.monitoring.modules.features.auth.dto.LoginRequestDto;
import ec.edu.espe.security.monitoring.common.dto.JsonResponseDto;
import ec.edu.espe.security.monitoring.modules.features.auth.model.UserInfo;
import ec.edu.espe.security.monitoring.modules.features.auth.repository.UserInfoRepository;
import ec.edu.espe.security.monitoring.common.security.jwt.JwtProvider;
import ec.edu.espe.security.monitoring.common.security.jwt.JwtRevokedToken;
import ec.edu.espe.security.monitoring.modules.features.auth.service.interfaces.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 04/11/2024
 */

@Service
@Slf4j
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserInfoRepository userRepository;
    private final PasswordEncoder encoder;
    private final JwtProvider jwtProvider;
    private final JwtRevokedToken jwtRevokedToken;
    private final UserInfoRepository userInfoRepository;

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

    @Override
    public JsonResponseDto disableFirstLogin(String token) {
        try {
            // Obtener el nombre de usuario desde el token
            String username = jwtProvider.getNombreUsuarioFromToken(token);
            UserInfo user = userInfoRepository.findByUsernameAndIsActiveTrue(username);

            if (user == null) {
                return new JsonResponseDto(false, HttpStatus.NOT_FOUND.value(), "Usuario no encontrado", null);
            }

            // Verificar si el usuario ya ha deshabilitado el primer login
            if (!user.isFirstLogin()) {
                return new JsonResponseDto(false, HttpStatus.BAD_REQUEST.value(), "El usuario ya ha iniciado sesión antes", null);
            }

            // Cambiar el estado de firstLogin a false
            user.setFirstLogin(false);
            userInfoRepository.save(user);

            return new JsonResponseDto(true, HttpStatus.OK.value(), "Primer inicio de sesión deshabilitado con éxito", null);
        } catch (Exception e) {
            log.error("Error al deshabilitar primer inicio de sesión: {}", e.getMessage());
            return new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al procesar la solicitud", null);
        }
    }

}

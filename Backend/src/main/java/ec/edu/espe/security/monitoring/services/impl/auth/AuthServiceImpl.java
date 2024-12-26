package ec.edu.espe.security.monitoring.services.impl.auth;

import ec.edu.espe.security.monitoring.dto.request.LoginRequestDto;
import ec.edu.espe.security.monitoring.dto.response.JsonResponseDto;
import ec.edu.espe.security.monitoring.models.UserInfo;
import ec.edu.espe.security.monitoring.repositories.UserInfoRepository;
import ec.edu.espe.security.monitoring.security.jwt.JwtProvider;
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

    public List<UserInfo> getAllActiveUsers() {
        log.info("Obteniendo todos los usuarios activos");
        return userRepository.findByIsActiveTrue();
    }

    @Override
    public JsonResponseDto authenticate(LoginRequestDto login) {
        try {
            log.info("loginCustom: " + login.getUsername());
            String username = login.getUsername() != null ? login.getUsername().trim() : "";
            String pass = login.getPassword() != null ? login.getPassword().trim() : "";

            if (username.isEmpty() || pass.isEmpty()) {
                return new JsonResponseDto(false, HttpStatus.BAD_REQUEST.value(), "Usuario y contraseña son requeridos.", null);
            }

            UserInfo user = userRepository.findByUsernameAndIsActiveTrue(username);
            if (user == null) {
                return new JsonResponseDto(false, HttpStatus.BAD_REQUEST.value(), "Usuario no encontrado.", null);
            }

            if (!encoder.matches(pass, user.getPassword())) {
                return new JsonResponseDto(false, HttpStatus.BAD_REQUEST.value(), "Contraseña incorrecta.", null);
            }
            String jwt = jwtProvider.generateJwtByUsername(user);
            return new JsonResponseDto(true, HttpStatus.OK.value(), "Login exitoso", jwt);
        } catch (Exception e) {
            log.error("Catch loginCustom: " + e.getMessage());
            return new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error en el login", null);
        }
    }

}

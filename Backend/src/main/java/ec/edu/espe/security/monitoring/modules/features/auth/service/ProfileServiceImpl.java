package ec.edu.espe.security.monitoring.modules.features.auth.service;

import ec.edu.espe.security.monitoring.common.dto.JsonResponseDto;
import ec.edu.espe.security.monitoring.common.security.jwt.JwtProvider;
import ec.edu.espe.security.monitoring.common.security.jwt.JwtRevokedToken;
import ec.edu.espe.security.monitoring.modules.features.auth.dto.ProfileDto;
import ec.edu.espe.security.monitoring.modules.features.auth.dto.ProfilePasswordDto;
import ec.edu.espe.security.monitoring.modules.features.auth.model.UserInfo;
import ec.edu.espe.security.monitoring.modules.features.auth.repository.UserInfoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 10/01/2025
 */

@Service
@Slf4j
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final UserInfoRepository userInfoRepository;
    private final PasswordEncoder encoder;
    private final JwtProvider jwtProvider;
    private final JwtRevokedToken jwtRevokedToken;

    @Override
    public JsonResponseDto getProfile(String token) {
        try {
            // Extract the username from the token
            String username = jwtProvider.getNombreUsuarioFromToken(token);

            // Fetch the user from the database
            UserInfo user = userInfoRepository.findByUsernameAndIsActiveTrue(username);

            if (user == null) {
                return new JsonResponseDto(false, HttpStatus.NOT_FOUND.value(), "Usuario no encontrado.", null);
            }

            return new JsonResponseDto(true, HttpStatus.OK.value(), "Detalles del usuario obtenidos con éxito", user);
        } catch (Exception e) {
            log.error("Error en la obtención perfil del usuario: {}", e.getMessage());
            return new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al procesar la solicitud", null);
        }
    }


    @Override
    public JsonResponseDto updateProfile(String token, ProfileDto updateUserRequestDto) {
        try {
            // Extraer el username del token
            String username = jwtProvider.getNombreUsuarioFromToken(token);

            // Buscar al usuario por username
            UserInfo user = userInfoRepository.findByUsernameAndIsActiveTrue(username);

            if (user == null) {
                return new JsonResponseDto(false, HttpStatus.NOT_FOUND.value(), "Usuario no encontrado.", null);
            }

            // Actualizar los datos del usuario
            user.setUsername(updateUserRequestDto.getUsername());
            user.setPhone(updateUserRequestDto.getPhone());
            user.setEmail(updateUserRequestDto.getEmail());

            // Guardar los cambios
            userInfoRepository.save(user);

            return new JsonResponseDto(true, HttpStatus.OK.value(), "Usuario actualizado con éxito", user);
        } catch (Exception e) {
            log.error("Error al actualizar perfil del usuario: {}", e.getMessage());
            return new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al procesar la solicitud", null);
        }
    }


    @Override
    public JsonResponseDto updatePassword(String token, ProfilePasswordDto profilePasswordDto) {
        try {
            // Extraer el username del token
            String username = jwtProvider.getNombreUsuarioFromToken(token);

            // Buscar al usuario por username
            UserInfo user = userInfoRepository.findByUsernameAndIsActiveTrue(username);
            if (user == null) {
                return new JsonResponseDto(false, HttpStatus.NOT_FOUND.value(), "Usuario no encontrado.", null);
            }

            // Validar que la contraseña actual proporcionada coincida con la almacenada
            if (!encoder.matches(profilePasswordDto.getCurrentPassword(), user.getPassword())) {
                return new JsonResponseDto(false, HttpStatus.UNAUTHORIZED.value(), "La contraseña actual es incorrecta.", null);
            }

            // Validar que la nueva contraseña cumpla las reglas de seguridad
            if (profilePasswordDto.getNewPassword().length() < 8) {
                return new JsonResponseDto(false, HttpStatus.BAD_REQUEST.value(), "La nueva contraseña debe tener al menos 8 caracteres.", null);
            }

            // Actualizar la contraseña en el modelo
            user.setPassword(encoder.encode(profilePasswordDto.getNewPassword()));

            // Guardar los cambios en la base de datos
            userInfoRepository.save(user);

            return new JsonResponseDto(true, HttpStatus.OK.value(), "Contraseña actualizada con éxito.", null);

        } catch (Exception e) {
            return new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al actualizar la contraseña.", null);
        }
    }


}

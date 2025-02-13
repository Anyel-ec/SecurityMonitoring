package ec.edu.espe.security.monitoring.modules.features.auth.service.impl;

import ec.edu.espe.security.monitoring.common.dto.JsonResponseDto;
import ec.edu.espe.security.monitoring.common.security.jwt.JwtProvider;
import ec.edu.espe.security.monitoring.modules.features.auth.dto.UserCreateDto;
import ec.edu.espe.security.monitoring.modules.features.auth.model.UserInfo;
import ec.edu.espe.security.monitoring.modules.features.auth.model.UserRole;
import ec.edu.espe.security.monitoring.modules.features.auth.repository.UserInfoRepository;
import ec.edu.espe.security.monitoring.modules.features.auth.repository.UserRoleRepository;
import ec.edu.espe.security.monitoring.modules.features.auth.service.interfaces.MailService;
import ec.edu.espe.security.monitoring.modules.features.auth.service.interfaces.UserManagementService;
import ec.edu.espe.security.monitoring.modules.features.auth.utils.PasswordUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 16/01/2025
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class UserManagementServiceImpl implements UserManagementService {

    private final UserInfoRepository userInfoRepository;
    private final UserRoleRepository userRoleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final MailService mailService;

    @Override
    public JsonResponseDto createUser(String token, UserCreateDto userCreateDto) {
        try {
            String creatorUsername = jwtProvider.getNombreUsuarioFromToken(token);
            UserInfo creator = userInfoRepository.findByUsernameAndIsActiveTrue(creatorUsername);


            if (creator == null) {
                return new JsonResponseDto(false, HttpStatus.UNAUTHORIZED.value(), "No autorizado", null);
            }

            if (userInfoRepository.findByUsernameAndIsActiveTrue(userCreateDto.getUsername()) != null) {
                return new JsonResponseDto(false, HttpStatus.BAD_REQUEST.value(), "El nombre de usuario ya está en uso", null);
            }
            if (userInfoRepository.findByEmailAndIsActiveTrue(userCreateDto.getEmail()) != null) {
                return new JsonResponseDto(false, HttpStatus.BAD_REQUEST.value(), "El correo ya está en uso", null);
            }
            if (userInfoRepository.findByPhoneAndIsActiveTrue(userCreateDto.getPhone()) != null) {
                return new JsonResponseDto(false, HttpStatus.BAD_REQUEST.value(), "El número de teléfono ya está en uso", null);
            }


            // verify if the creator has the necessary permissions
            int creatorHierarchy = creator.getRoles().stream().mapToInt(UserRole::getHierarchy).min().orElse(Integer.MAX_VALUE);
            List<UserRole> assignedRoles = userRoleRepository.findAllById(userCreateDto.getRoles());
            if (assignedRoles.stream().anyMatch(role -> role.getHierarchy() < creatorHierarchy)) {
                return new JsonResponseDto(false, HttpStatus.FORBIDDEN.value(), "No puede asignar roles superiores a su jerarquía", null);
            }

            // Create users
            UserInfo newUser = UserInfo.builder()
                    .username(userCreateDto.getUsername())
                    .email(userCreateDto.getEmail())
                    .phone(userCreateDto.getPhone())
                    .name(userCreateDto.getName())
                    .lastname(userCreateDto.getLastname())
                    .company(userCreateDto.getCompany())
                    .roles(new HashSet<>(userRoleRepository.findAllById(userCreateDto.getRoles())))
                    .firstLogin(true)
                    .isActive(true)
                    .build();
            String plainPassword = PasswordUtil.generatePassword(newUser.getUsername(), newUser.getCompany(), newUser.getPhone());
            newUser.setPassword(passwordEncoder.encode(plainPassword));
            userInfoRepository.save(newUser);

            // send email
            mailService.sendNewUserEmail(newUser, plainPassword);

            return new JsonResponseDto(true, HttpStatus.CREATED.value(), "Usuario creado con éxito", newUser);
        } catch (Exception e) {
            log.error("Error al crear usuario: {}", e.getMessage());
            log.error("Objeto: {}", e);
            return new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al procesar la solicitud", null);
        }
    }


    @Override
    public JsonResponseDto getAllUsers(String token) {
        try {
            String username = jwtProvider.getNombreUsuarioFromToken(token); //anyel
            UserInfo requester = userInfoRepository.findByUsernameAndIsActiveTrue(username);

            if (requester == null) {
                return new JsonResponseDto(false, HttpStatus.UNAUTHORIZED.value(), "No autorizado", null);
            }

            List<UserInfo> users = userInfoRepository.findByIsActiveTrueAndUsernameNot(username);
            return new JsonResponseDto(true, HttpStatus.OK.value(), "Lista de usuarios obtenida con éxito", users);
        } catch (Exception e) {
            log.error("Error al obtener usuarios: {}", e.getMessage());
            return new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al procesar la solicitud", null);
        }
    }

    @Override
    @Transactional
    public JsonResponseDto updateUser(String token, Long userId, UserCreateDto userUpdateDto) {
        try {
            log.info("Iniciando actualización para el usuario ID: {}", userId);

            // Obtener el solicitante
            String username = jwtProvider.getNombreUsuarioFromToken(token);
            UserInfo requester = userInfoRepository.findByUsernameAndIsActiveTrue(username);
            log.info("Usuario solicitante: {}", username);

            if (requester == null) {
                return new JsonResponseDto(false, HttpStatus.UNAUTHORIZED.value(), "No autorizado", null);
            }

            // Verificar si el usuario a actualizar existe
            Optional<UserInfo> userOptional = userInfoRepository.findById(userId);
            if (userOptional.isEmpty()) {
                return new JsonResponseDto(false, HttpStatus.NOT_FOUND.value(), "Usuario no encontrado", null);
            }

            UserInfo userToUpdate = userOptional.get();
            log.info("Usuario encontrado: {}", userToUpdate.getUsername());

            // Actualizar campos
            userToUpdate.setUsername(userUpdateDto.getUsername());
            userToUpdate.setEmail(userUpdateDto.getEmail());
            userToUpdate.setPhone(userUpdateDto.getPhone());
            userToUpdate.setName(userUpdateDto.getName());
            userToUpdate.setLastname(userUpdateDto.getLastname());
            userToUpdate.setCompany(userUpdateDto.getCompany());

            // Actualizar contraseña si se proporciona
            if (userUpdateDto.getPassword() != null && !userUpdateDto.getPassword().isEmpty()) {
                userToUpdate.setPassword(passwordEncoder.encode(userUpdateDto.getPassword()));
                log.info("Contraseña actualizada para el usuario: {}", userToUpdate.getUsername());
            }

            // Actualizar roles
            List<UserRole> roles = userRoleRepository.findAllById(userUpdateDto.getRoles());
            log.info("Roles asignados: {}", roles);
            if (roles.isEmpty()) {
                throw new IllegalArgumentException("No se encontraron roles válidos para los IDs proporcionados.");
            }
            userToUpdate.setRoles(new HashSet<>(roles)); // Utiliza un HashSet mutable

            // Guardar el usuario actualizado
            userInfoRepository.save(userToUpdate);
            log.info("Usuario actualizado con éxito: {}", userToUpdate.getUsername());

            return new JsonResponseDto(true, HttpStatus.OK.value(), "Usuario actualizado con éxito", userToUpdate);
        } catch (Exception e) {
            log.error("Error al actualizar usuario: {}", e.getMessage(), e);
            return new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al procesar la solicitud", null);
        }
    }



    @Override
    public JsonResponseDto deleteUser(String token, Long userId) {
        try {
            String username = jwtProvider.getNombreUsuarioFromToken(token);
            UserInfo requester = userInfoRepository.findByUsernameAndIsActiveTrue(username);

            if (requester == null) {
                return new JsonResponseDto(false, HttpStatus.UNAUTHORIZED.value(), "No autorizado", null);
            }

            Optional<UserInfo> userOptional = userInfoRepository.findById(userId);
            if (userOptional.isEmpty()) {
                return new JsonResponseDto(false, HttpStatus.NOT_FOUND.value(), "Usuario no encontrado", null);
            }

            UserInfo userToDelete = userOptional.get();
            userToDelete.setIsActive(false);
            userInfoRepository.save(userToDelete);

            return new JsonResponseDto(true, HttpStatus.OK.value(), "Usuario eliminado con éxito", null);
        } catch (Exception e) {
            log.error("Error al eliminar usuario: {}", e.getMessage());
            return new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al procesar la solicitud", null);
        }
    }
}
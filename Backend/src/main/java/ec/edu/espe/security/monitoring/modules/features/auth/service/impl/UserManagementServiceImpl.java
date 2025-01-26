package ec.edu.espe.security.monitoring.modules.features.auth.service.impl;

import ec.edu.espe.security.monitoring.common.dto.JsonResponseDto;
import ec.edu.espe.security.monitoring.common.security.jwt.JwtProvider;
import ec.edu.espe.security.monitoring.modules.features.auth.dto.UserCreateDto;
import ec.edu.espe.security.monitoring.modules.features.auth.model.UserInfo;
import ec.edu.espe.security.monitoring.modules.features.auth.model.UserRole;
import ec.edu.espe.security.monitoring.modules.features.auth.repository.UserInfoRepository;
import ec.edu.espe.security.monitoring.modules.features.auth.repository.UserRoleRepository;
import ec.edu.espe.security.monitoring.modules.features.auth.service.interfaces.UserManagementService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

    @Override
    public JsonResponseDto createUser(String token, UserCreateDto userCreateDto) {
        try {
            String creatorUsername = jwtProvider.getNombreUsuarioFromToken(token);
            UserInfo creator = userInfoRepository.findByUsernameAndIsActiveTrue(creatorUsername);

            if (creator == null) {
                return new JsonResponseDto(false, HttpStatus.UNAUTHORIZED.value(), "No autorizado", null);
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
                    .password(passwordEncoder.encode(userCreateDto.getPassword()))
                    .roles(Set.copyOf(assignedRoles))
                    .isActive(true)
                    .build();

            userInfoRepository.save(newUser);
            return new JsonResponseDto(true, HttpStatus.CREATED.value(), "Usuario creado con éxito", newUser);
        } catch (Exception e) {
            log.error("Error al crear usuario: {}", e.getMessage());
            return new JsonResponseDto(false, HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error al procesar la solicitud", null);
        }
    }

    @Override
    public JsonResponseDto getAllUsers(String token) {
        try {
            String username = jwtProvider.getNombreUsuarioFromToken(token);
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
            String username = jwtProvider.getNombreUsuarioFromToken(token);
            UserInfo requester = userInfoRepository.findByUsernameAndIsActiveTrue(username);

            if (requester == null) {
                return new JsonResponseDto(false, HttpStatus.UNAUTHORIZED.value(), "No autorizado", null);
            }

            Optional<UserInfo> userOptional = userInfoRepository.findById(userId);
            if (userOptional.isEmpty()) {
                return new JsonResponseDto(false, HttpStatus.NOT_FOUND.value(), "Usuario no encontrado", null);
            }

            UserInfo userToUpdate = userOptional.get();

            // update user
            userToUpdate.setUsername(userUpdateDto.getUsername());
            userToUpdate.setEmail(userUpdateDto.getEmail());
            userToUpdate.setPhone(userUpdateDto.getPhone());
            userToUpdate.setName(userUpdateDto.getName());
            userToUpdate.setLastname(userUpdateDto.getLastname());
            userToUpdate.setCompany(userUpdateDto.getCompany());

            if (userUpdateDto.getPassword() != null && !userUpdateDto.getPassword().isEmpty()) {
                userToUpdate.setPassword(passwordEncoder.encode(userUpdateDto.getPassword()));
            }

            List<UserRole> roles = userRoleRepository.findAllById(userUpdateDto.getRoles());
            userToUpdate.setRoles(Set.copyOf(roles));

            userInfoRepository.save(userToUpdate);
            return new JsonResponseDto(true, HttpStatus.OK.value(), "Usuario actualizado con éxito", userToUpdate);
        } catch (Exception e) {
            log.error("Error al actualizar usuario: {}", e.getMessage());
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
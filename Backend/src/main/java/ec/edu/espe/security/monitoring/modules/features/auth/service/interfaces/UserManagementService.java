package ec.edu.espe.security.monitoring.modules.features.auth.service.interfaces;

import ec.edu.espe.security.monitoring.common.dto.JsonResponseDto;
import ec.edu.espe.security.monitoring.modules.features.auth.dto.UserCreateDto;
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 16/01/2025
 */
public interface UserManagementService {
    JsonResponseDto createUser(String token, UserCreateDto userCreateDto);
    JsonResponseDto getAllUsers(String token);
    JsonResponseDto updateUser(String token, Long userId, UserCreateDto userUpdateDto);
    JsonResponseDto deleteUser(String token, Long userId);
}

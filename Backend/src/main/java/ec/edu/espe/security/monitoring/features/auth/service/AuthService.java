package ec.edu.espe.security.monitoring.features.auth.service;

import ec.edu.espe.security.monitoring.features.auth.dto.LoginRequestDto;
import ec.edu.espe.security.monitoring.shared.dto.JsonResponseDto;
import ec.edu.espe.security.monitoring.features.auth.model.UserInfo;

import java.util.List;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 25/12/2024
 */
public interface AuthService {
    JsonResponseDto authenticate(LoginRequestDto login);

    JsonResponseDto getUserDetails(String token);

    JsonResponseDto revokeToken(String token);

    List<UserInfo> getAllActiveUsers();
}

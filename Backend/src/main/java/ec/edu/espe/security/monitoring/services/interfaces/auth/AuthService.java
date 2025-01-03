package ec.edu.espe.security.monitoring.services.interfaces.auth;

import ec.edu.espe.security.monitoring.dto.request.LoginRequestDto;
import ec.edu.espe.security.monitoring.dto.response.JsonResponseDto;
import ec.edu.espe.security.monitoring.models.UserInfo;

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

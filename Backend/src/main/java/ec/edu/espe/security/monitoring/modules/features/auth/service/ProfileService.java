package ec.edu.espe.security.monitoring.modules.features.auth.service;

import ec.edu.espe.security.monitoring.common.dto.JsonResponseDto;
import ec.edu.espe.security.monitoring.modules.features.auth.dto.ProfileDto;
import ec.edu.espe.security.monitoring.modules.features.auth.dto.ProfilePasswordDto;

public interface ProfileService {
    JsonResponseDto getProfile(String user);
    JsonResponseDto updateProfile(String token, ProfileDto updateUserRequestDto);
    JsonResponseDto updatePassword(String token, ProfilePasswordDto updatePasswordRequestDto); // Cambiado a ProfilePasswordDto
}

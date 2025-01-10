package ec.edu.espe.security.monitoring.modules.features.auth.service;

import ec.edu.espe.security.monitoring.common.dto.JsonResponseDto;
import ec.edu.espe.security.monitoring.modules.features.auth.dto.ProfileDto;
import ec.edu.espe.security.monitoring.modules.features.auth.dto.ProfilePasswordDto;
<<<<<<< HEAD
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 10/01/2025
 */
=======

>>>>>>> 5cab696e0c6bb6b7b93258d40dba6b4f4b55f302
public interface ProfileService {
    JsonResponseDto getProfile(String user);
    JsonResponseDto updateProfile(String token, ProfileDto updateUserRequestDto);
    JsonResponseDto updatePassword(String token, ProfilePasswordDto updatePasswordRequestDto); // Cambiado a ProfilePasswordDto
<<<<<<< HEAD
}
=======
}
>>>>>>> 5cab696e0c6bb6b7b93258d40dba6b4f4b55f302

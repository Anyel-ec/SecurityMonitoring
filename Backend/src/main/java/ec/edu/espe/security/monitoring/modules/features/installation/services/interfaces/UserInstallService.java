package ec.edu.espe.security.monitoring.modules.features.installation.services.interfaces;

import ec.edu.espe.security.monitoring.modules.features.installation.dto.UserInstallRequestDto;
import ec.edu.espe.security.monitoring.modules.features.auth.model.UserInfo;
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 04/11/2024
 */
public interface UserInstallService {

    // Save User installation configuration
    UserInfo saveUserInstall(UserInstallRequestDto userInstallRequestDto);
}

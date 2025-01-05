package ec.edu.espe.security.monitoring.modules.features.installation.services.interfaces;

import ec.edu.espe.security.monitoring.modules.features.installation.dto.UserInstallRequestDto;
import ec.edu.espe.security.monitoring.modules.features.auth.model.UserInfo;

public interface UserInstallService {

    // Save User installation configuration
    UserInfo saveUserInstall(UserInstallRequestDto userInstallRequestDto);
}

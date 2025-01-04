package ec.edu.espe.security.monitoring.feature.installation.services.interfaces;

import ec.edu.espe.security.monitoring.feature.installation.dto.UserInstallRequestDto;
import ec.edu.espe.security.monitoring.feature.auth.model.UserInfo;

public interface UserInstallService {

    // Save User installation configuration
    UserInfo saveUserInstall(UserInstallRequestDto userInstallRequestDto);
}

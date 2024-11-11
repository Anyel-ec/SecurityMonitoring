package ec.edu.espe.security.monitoring.services.interfaces.installation;

import ec.edu.espe.security.monitoring.dto.request.installation.UserInstallRequestDto;
import ec.edu.espe.security.monitoring.models.UserInfo;

public interface UserInstallService {

    // Save User installation configuration
    UserInfo saveUserInstall(UserInstallRequestDto userInstallRequestDto);
}

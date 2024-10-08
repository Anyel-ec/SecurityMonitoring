package ec.edu.espe.security.monitoring.services.interfaces.installation;

import ec.edu.espe.security.monitoring.dto.request.installation.UserInstallRequestDto;
import ec.edu.espe.security.monitoring.models.InstallationConfig;

public interface UserInstallService {

    // Save User installation configuration
    InstallationConfig saveUserInstall(UserInstallRequestDto userInstallRequestDto);
}

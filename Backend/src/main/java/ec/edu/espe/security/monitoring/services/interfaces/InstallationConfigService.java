package ec.edu.espe.security.monitoring.services.interfaces;

import ec.edu.espe.security.monitoring.dto.request.GrafanaInstallDto;
import ec.edu.espe.security.monitoring.models.InstallationConfig;

public interface InstallationConfigService {
   InstallationConfig saveGrafanaInstall(GrafanaInstallDto grafanaInstallDto);
}

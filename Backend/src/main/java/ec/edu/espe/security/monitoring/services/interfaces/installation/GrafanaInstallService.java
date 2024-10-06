package ec.edu.espe.security.monitoring.services.interfaces.installation;

import ec.edu.espe.security.monitoring.dto.request.GrafanaInstallRequestDto;
import ec.edu.espe.security.monitoring.models.InstallationConfig;

public interface GrafanaInstallService {
    // Save Grafana installation configuration
    InstallationConfig saveGrafanaInstall(GrafanaInstallRequestDto grafanaInstallRequestDto);

    // Retrieve Grafana installation configuration
    InstallationConfig getGrafanaInstall();
}

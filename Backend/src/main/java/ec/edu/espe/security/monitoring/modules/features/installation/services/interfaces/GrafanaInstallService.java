package ec.edu.espe.security.monitoring.modules.features.installation.services.interfaces;

import ec.edu.espe.security.monitoring.modules.features.installation.dto.GrafanaInstallRequestDto;
import ec.edu.espe.security.monitoring.modules.features.installation.models.InstallationConfig;

public interface GrafanaInstallService {
    // Save Grafana installation configuration
    InstallationConfig saveGrafanaInstall(GrafanaInstallRequestDto grafanaInstallRequestDto);

    // Retrieve Grafana installation configuration
    InstallationConfig getGrafanaInstall();
}

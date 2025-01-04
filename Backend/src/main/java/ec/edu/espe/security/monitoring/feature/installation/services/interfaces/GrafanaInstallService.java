package ec.edu.espe.security.monitoring.feature.installation.services.interfaces;

import ec.edu.espe.security.monitoring.feature.installation.dto.GrafanaInstallRequestDto;
import ec.edu.espe.security.monitoring.feature.installation.models.InstallationConfig;

public interface GrafanaInstallService {
    // Save Grafana installation configuration
    InstallationConfig saveGrafanaInstall(GrafanaInstallRequestDto grafanaInstallRequestDto);

    // Retrieve Grafana installation configuration
    InstallationConfig getGrafanaInstall();
}

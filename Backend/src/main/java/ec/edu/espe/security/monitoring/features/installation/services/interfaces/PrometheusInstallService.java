package ec.edu.espe.security.monitoring.features.installation.services.interfaces;

import ec.edu.espe.security.monitoring.features.installation.dto.PrometheusInstallRequestDto;
import ec.edu.espe.security.monitoring.features.installation.models.InstallationConfig;

public interface PrometheusInstallService {
    // Save Prometheus installation configuration
    InstallationConfig savePrometheusInstall(PrometheusInstallRequestDto prometheusInstallRequestDto);

    // Retrieve Prometheus installation configuration
    InstallationConfig getPrometheusInstall();
}

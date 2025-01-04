package ec.edu.espe.security.monitoring.feature.installation.services.interfaces;

import ec.edu.espe.security.monitoring.feature.installation.dto.PrometheusInstallRequestDto;
import ec.edu.espe.security.monitoring.feature.installation.models.InstallationConfig;

public interface PrometheusInstallService {
    // Save Prometheus installation configuration
    InstallationConfig savePrometheusInstall(PrometheusInstallRequestDto prometheusInstallRequestDto);

    // Retrieve Prometheus installation configuration
    InstallationConfig getPrometheusInstall();
}

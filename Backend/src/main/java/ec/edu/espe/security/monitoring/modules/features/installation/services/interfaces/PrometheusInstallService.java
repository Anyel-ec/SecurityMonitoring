package ec.edu.espe.security.monitoring.modules.features.installation.services.interfaces;

import ec.edu.espe.security.monitoring.modules.features.installation.dto.PrometheusInstallRequestDto;
import ec.edu.espe.security.monitoring.modules.features.installation.models.InstallationConfig;

import java.util.Map;

public interface PrometheusInstallService {
    // Retrieve Prometheus installation configuration
    InstallationConfig getPrometheusInstall();

    InstallationConfig getAlertmanagerInstall();
    Map<String, InstallationConfig> savePrometheusInstall(PrometheusInstallRequestDto prometheusInstallRequestDto);
}

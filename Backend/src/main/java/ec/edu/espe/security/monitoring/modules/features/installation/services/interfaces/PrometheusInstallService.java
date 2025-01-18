package ec.edu.espe.security.monitoring.modules.features.installation.services.interfaces;

import ec.edu.espe.security.monitoring.modules.features.installation.dto.PrometheusInstallRequestDto;
import ec.edu.espe.security.monitoring.modules.features.installation.models.InstallationConfig;

import java.util.Map;
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 04/11/2024
 */
public interface PrometheusInstallService {
    // Retrieve Prometheus installation configuration
    InstallationConfig getPrometheusInstall();

    InstallationConfig getAlertmanagerInstall();
    Map<String, InstallationConfig> savePrometheusInstall(PrometheusInstallRequestDto prometheusInstallRequestDto);
}

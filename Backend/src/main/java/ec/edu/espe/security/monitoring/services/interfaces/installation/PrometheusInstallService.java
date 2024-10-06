package ec.edu.espe.security.monitoring.services.interfaces.installation;

import ec.edu.espe.security.monitoring.dto.request.PrometheusInstallRequestDto;
import ec.edu.espe.security.monitoring.dto.request.UserInstallRequestDto;
import ec.edu.espe.security.monitoring.models.InstallationConfig;

public interface PrometheusInstallService {
    // Save Prometheus installation configuration
    InstallationConfig savePrometheusInstall(PrometheusInstallRequestDto prometheusInstallRequestDto);



    // Retrieve Prometheus installation configuration
    InstallationConfig getPrometheusInstall();
}

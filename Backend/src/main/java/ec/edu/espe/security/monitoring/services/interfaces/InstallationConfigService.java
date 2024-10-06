package ec.edu.espe.security.monitoring.services.interfaces;

import ec.edu.espe.security.monitoring.dto.request.GrafanaInstallDto;
import ec.edu.espe.security.monitoring.dto.request.PrometheusInstallDto;
import ec.edu.espe.security.monitoring.dto.request.UserInstallDto;
import ec.edu.espe.security.monitoring.models.InstallationConfig;

import java.util.List;

public interface InstallationConfigService {

   // Save Grafana installation configuration
   InstallationConfig saveGrafanaInstall(GrafanaInstallDto grafanaInstallDto);

   // Save Prometheus installation configuration
   InstallationConfig savePrometheusInstall(PrometheusInstallDto prometheusInstallDto);

   // Save User installation configuration
   InstallationConfig saveUserInstall(UserInstallDto userInstallDto);

   // Retrieve a list of all active installations
   List<InstallationConfig> getActiveInstallations();

   // Retrieve Grafana installation configuration
   InstallationConfig getGrafanaInstall();

   // Retrieve Prometheus installation configuration
   InstallationConfig getPrometheusInstall();

   // Method to check installation status
   boolean isInstallationComplete();
}

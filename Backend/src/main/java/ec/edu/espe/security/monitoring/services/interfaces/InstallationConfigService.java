package ec.edu.espe.security.monitoring.services.interfaces;

import ec.edu.espe.security.monitoring.dto.request.GrafanaInstallRequestDto;
import ec.edu.espe.security.monitoring.dto.request.PrometheusInstallRequestDto;
import ec.edu.espe.security.monitoring.dto.request.UserInstallRequestDto;
import ec.edu.espe.security.monitoring.models.InstallationConfig;
import ec.edu.espe.security.monitoring.models.SystemParameters;

import java.util.List;

public interface InstallationConfigService {

   // Save Grafana installation configuration
   InstallationConfig saveGrafanaInstall(GrafanaInstallRequestDto grafanaInstallRequestDto);

   // Save Prometheus installation configuration
   InstallationConfig savePrometheusInstall(PrometheusInstallRequestDto prometheusInstallRequestDto);

   // Save User installation configuration
   InstallationConfig saveUserInstall(UserInstallRequestDto userInstallRequestDto);

   // Retrieve a list of all active installations
   List<InstallationConfig> getActiveInstallations();

   // Retrieve Grafana installation configuration
   InstallationConfig getGrafanaInstall();

   // Retrieve Prometheus installation configuration
   InstallationConfig getPrometheusInstall();

   // Method to check installation status
   boolean isInstallationComplete();

   // Update the complete installation parameter
   SystemParameters updateCompleteInstallParameter();
}

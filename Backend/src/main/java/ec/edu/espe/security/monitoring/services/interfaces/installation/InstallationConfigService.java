package ec.edu.espe.security.monitoring.services.interfaces.installation;

import ec.edu.espe.security.monitoring.dto.request.GrafanaInstallDto;
import ec.edu.espe.security.monitoring.dto.request.PrometheusInstallDto;
import ec.edu.espe.security.monitoring.dto.request.UserInstallDto;
import ec.edu.espe.security.monitoring.models.InstallationConfig;

import java.util.List;

public interface InstallationConfigService {
   InstallationConfig saveGrafanaInstall(GrafanaInstallDto grafanaInstallDto);
   InstallationConfig savePrometheusInstall(PrometheusInstallDto prometheusInstallDto);

   InstallationConfig saveUserInstall(UserInstallDto userInstallDto);

   List<InstallationConfig> getActiveInstallations();
}

package ec.edu.espe.security.monitoring.feature.grafana.services.interfaces;

import ec.edu.espe.security.monitoring.feature.installation.models.InstallationConfig;
import ec.edu.espe.security.monitoring.models.SystemParameters;

public interface GrafanaCredentialService {
    SystemParameters getGrafanaInstallParameter();
    InstallationConfig getActiveInstallationConfig(SystemParameters systemParameter);
}

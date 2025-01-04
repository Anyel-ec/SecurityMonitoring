package ec.edu.espe.security.monitoring.integrations.grafana.services.interfaces;

import ec.edu.espe.security.monitoring.features.installation.models.InstallationConfig;
import ec.edu.espe.security.monitoring.core.system.models.SystemParameters;

public interface GrafanaCredentialService {
    SystemParameters getGrafanaInstallParameter();
    InstallationConfig getActiveInstallationConfig(SystemParameters systemParameter);
}

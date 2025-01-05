package ec.edu.espe.security.monitoring.modules.integrations.grafana.services.interfaces;

import ec.edu.espe.security.monitoring.modules.features.installation.models.InstallationConfig;
import ec.edu.espe.security.monitoring.core.system.models.SystemParameters;

public interface GrafanaCredentialService {
    SystemParameters getGrafanaInstallParameter();
    InstallationConfig getActiveInstallationConfig(SystemParameters systemParameter);
}

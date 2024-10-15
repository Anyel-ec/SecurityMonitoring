package ec.edu.espe.security.monitoring.services.interfaces.grafana;

import ec.edu.espe.security.monitoring.models.InstallationConfig;
import ec.edu.espe.security.monitoring.models.SystemParameters;

public interface GrafanaCredentialService {
    SystemParameters getGrafanaInstallParameter();
    InstallationConfig getActiveInstallationConfig(SystemParameters systemParameter);
}

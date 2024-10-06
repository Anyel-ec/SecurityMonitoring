package ec.edu.espe.security.monitoring.services.interfaces.installation;

import ec.edu.espe.security.monitoring.models.InstallationConfig;
import ec.edu.espe.security.monitoring.models.SystemParameters;

import java.util.List;

public interface ConfigInstallService {
    // Retrieve a list of all active installations
    List<InstallationConfig> getActiveInstallations();

    // Method to check installation status
    boolean isInstallationComplete();

    // Update the complete installation parameter
    SystemParameters updateCompleteInstallParameter();
}

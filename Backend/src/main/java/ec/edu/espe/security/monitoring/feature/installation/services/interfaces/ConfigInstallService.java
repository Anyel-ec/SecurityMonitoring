package ec.edu.espe.security.monitoring.feature.installation.services.interfaces;

import ec.edu.espe.security.monitoring.feature.installation.models.InstallationConfig;
import ec.edu.espe.security.monitoring.common.system.models.SystemParameters;

import java.util.List;

public interface ConfigInstallService {
    // Retrieve a list of all active installations
    List<InstallationConfig> getActiveInstallations();

    // Method to check installation status
    boolean isInstallationComplete();

    // Update the complete installation parameter
    SystemParameters updateCompleteInstallParameter();
}

package ec.edu.espe.security.monitoring.modules.features.installation.services.interfaces;

import ec.edu.espe.security.monitoring.modules.features.installation.models.InstallationConfig;
import ec.edu.espe.security.monitoring.modules.core.system.models.SystemParameters;

import java.util.List;

public interface ConfigInstallService {
    // Retrieve a list of all active installations
    List<InstallationConfig> getActiveInstallations();

    // Method to check installation status
    boolean isInstallationComplete();

    // Update the complete installation parameter
    SystemParameters updateCompleteInstallParameter();
}

package ec.edu.espe.security.monitoring.modules.features.installation.services.interfaces;

import ec.edu.espe.security.monitoring.modules.features.installation.models.InstallationConfig;
import ec.edu.espe.security.monitoring.modules.core.initializer.models.SystemParameters;

import java.util.List;
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 04/11/2024
 */
public interface ConfigInstallService {
    // Retrieve a list of all active installations
    List<InstallationConfig> getActiveInstallations();

    // Method to check installation status
    boolean isInstallationComplete();

    // Update the complete installation parameter
    SystemParameters updateCompleteInstallParameter();
}

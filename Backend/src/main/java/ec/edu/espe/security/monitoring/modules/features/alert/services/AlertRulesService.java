package ec.edu.espe.security.monitoring.modules.features.alert.services;

import java.io.IOException;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 14/01/2025
 */
public interface AlertRulesService {
    String readAlertRules(String filename) throws IOException;

    void updateAlertRules(String filename, String updates) throws IOException;
}

package ec.edu.espe.security.monitoring.modules.features.auth.service.interfaces;

import ec.edu.espe.security.monitoring.modules.features.auth.model.UserInfo;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 13/01/2025
 */
public interface MailService {
    void sendRecoveryEmail(UserInfo user, String otp);
}

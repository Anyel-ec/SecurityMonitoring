package ec.edu.espe.security.monitoring.services.interfaces.audit;

import ec.edu.espe.security.monitoring.models.AuditLog;
import jakarta.servlet.http.HttpServletRequest;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 02/01/2025
 */
public interface AuditLogService {

    void saveAuditLog(AuditLog auditLog);

    void saveAuditLogFromRequest(String token, String actionType, int status, String resultMessage, HttpServletRequest request, String requestBody);

}

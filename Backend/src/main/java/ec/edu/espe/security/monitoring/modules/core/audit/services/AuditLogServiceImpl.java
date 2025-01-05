package ec.edu.espe.security.monitoring.modules.core.audit.services;

import ec.edu.espe.security.monitoring.modules.core.audit.models.AuditLog;
import ec.edu.espe.security.monitoring.modules.features.auth.model.UserInfo;
import ec.edu.espe.security.monitoring.modules.core.audit.repositories.AuditLogRepository;
import ec.edu.espe.security.monitoring.modules.features.auth.repository.UserInfoRepository;
import ec.edu.espe.security.monitoring.common.security.jwt.JwtProvider;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 25/12/2024
 */
@Service
@AllArgsConstructor
@Slf4j
public class AuditLogServiceImpl implements AuditLogService {
    private final AuditLogRepository auditLogRepository;
    private final UserInfoRepository userInfoRepository;
    private final JwtProvider jwtProvider;

    @Override
    public void saveAuditLog(AuditLog auditLog) {
        // Validate and retrieve the user associated with the username
        if (auditLog.getUsername() != null) {
            String username = auditLog.getUsername();
            UserInfo userInfo = userInfoRepository.findByUsernameAndIsActiveTrue(username);
            if (userInfo == null) {
                throw new IllegalArgumentException("El usuario con username " + username + " no existe o no está activo.");
            }
            auditLog.setUser(userInfo);
            auditLog.setUsername(null); // Clear the transient field
        }
        auditLogRepository.save(auditLog);
    }

    /**
     * Saves an audit log for the current request.
     *
     * @param token        Authorization token from the client.
     * @param actionType   Action type (e.g., "CREATE", "DELETE").
     * @param status       HTTP response status.
     * @param resultMessage Result message to log.
     * @param request      HttpServletRequest containing request details.
     */
    @Override
    public void saveAuditLogFromRequest(String token, String actionType, int status, String resultMessage, HttpServletRequest request, String requestBody) {
        String username = null;

        // Extract username from the token
        try {
            if (token != null && token.startsWith("Bearer ")) {
                String jwt = token.replace("Bearer ", "");
                username = jwtProvider.getNombreUsuarioFromToken(jwt);
            }
        } catch (Exception e) {
            log.error("Error extracting username from token: {}", e.getMessage());
            throw new IllegalArgumentException("Token inválido o expirado.");
        }

        // Use query parameters if available, otherwise use request body
        String queryParams = request.getQueryString();
        String params = queryParams != null ? queryParams : requestBody;

        // Build the audit log entry
        AuditLog auditLog = AuditLog.builder()
                .username(username)
                .ipAddress(request.getRemoteAddr())
                .endpoint(request.getRequestURI())
                .httpMethod(request.getMethod())
                .requestParams(params)
                .responseStatus(status)
                .resultMessage(resultMessage)
                .actionType(actionType)
                .build();

        saveAuditLog(auditLog);
    }



    public List<AuditLog> getAllAuditLogs() {
        return auditLogRepository.findAll();
    }

    public Optional<AuditLog> getAuditLogById(Long id) {
        return auditLogRepository.findById(id);
    }

    public void deleteAuditLog(Long id) {
        auditLogRepository.deleteById(id);
    }
}

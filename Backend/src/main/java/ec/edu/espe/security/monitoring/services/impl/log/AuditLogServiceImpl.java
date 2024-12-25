package ec.edu.espe.security.monitoring.services.impl.log;

import ec.edu.espe.security.monitoring.models.AuditLog;
import ec.edu.espe.security.monitoring.repositories.AuditLogRepository;
import lombok.AllArgsConstructor;
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
public class AuditLogServiceImpl {
    private final AuditLogRepository auditLogRepository;

    public AuditLog saveAuditLog(AuditLog auditLog) {
        return auditLogRepository.save(auditLog);
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

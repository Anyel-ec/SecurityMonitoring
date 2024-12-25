package ec.edu.espe.security.monitoring.repositories;

import ec.edu.espe.security.monitoring.models.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 25/12/2024
 */
@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
}

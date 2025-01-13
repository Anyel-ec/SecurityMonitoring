package ec.edu.espe.security.monitoring.modules.features.auth.repository;

import ec.edu.espe.security.monitoring.modules.features.auth.model.PasswordRecovery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 13/01/2025
 */
@Repository
public interface PasswordRecoveryRepository extends JpaRepository<PasswordRecovery, Long> {
}

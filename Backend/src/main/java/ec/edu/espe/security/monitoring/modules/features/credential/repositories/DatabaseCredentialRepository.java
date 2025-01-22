package ec.edu.espe.security.monitoring.modules.features.credential.repositories;

import ec.edu.espe.security.monitoring.modules.features.auth.model.UserInfo;
import ec.edu.espe.security.monitoring.modules.features.credential.models.DatabaseCredential;
import ec.edu.espe.security.monitoring.modules.core.initializer.models.SystemParameters;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
/*
 * Author: Anyel EC
 * Github: https://github.com/Anyel-ec
 * Creation date: 04/11/2024
 */

@Repository
public interface DatabaseCredentialRepository extends JpaRepository<DatabaseCredential, Long> {

    // Finds an active database credential by host and system parameter
    Optional<DatabaseCredential> findByHostAndSystemParameterAndIsActive(String host, SystemParameters systemParameter, Boolean isActive);

    // Finds an active database credential by system parameter only
    Optional<DatabaseCredential> findBySystemParameterAndIsActive(SystemParameters systemParameter, Boolean isActive);

    // Retrieves all active database credentials
    List<DatabaseCredential> findByIsActiveTrue();

    // Finds all active database credentials by username
    List<DatabaseCredential> findByUser_UsernameAndIsActiveTrue(String username);

    // Find active MariaDB credentials
    List<DatabaseCredential> findBySystemParameterNameAndIsActive(String systemParameterName, Boolean isActive);
    Optional<DatabaseCredential> findByUserAndSystemParameterAndIsActiveTrue(UserInfo user, SystemParameters systemParameter);


}


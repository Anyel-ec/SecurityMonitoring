package ec.edu.espe.security.monitoring.repositories;

import ec.edu.espe.security.monitoring.models.DatabaseCredential;
import ec.edu.espe.security.monitoring.models.SystemParameters;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DatabaseCredentialRepository extends JpaRepository<DatabaseCredential, Long> {

    // Finds an active database credential by host and system parameter
    Optional<DatabaseCredential> findByHostAndSystemParameterAndIsActive(String host, SystemParameters systemParameter, Boolean isActive);

    // Finds an active database credential by system parameter only
    Optional<DatabaseCredential> findBySystemParameterAndIsActive(SystemParameters systemParameter, Boolean isActive);

    // Retrieves all active database credentials
    List<DatabaseCredential> findByIsActiveTrue();
}


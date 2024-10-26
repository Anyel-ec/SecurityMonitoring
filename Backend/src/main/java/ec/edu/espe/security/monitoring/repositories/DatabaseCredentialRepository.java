package ec.edu.espe.security.monitoring.repositories;

import ec.edu.espe.security.monitoring.models.DatabaseCredential;
import ec.edu.espe.security.monitoring.models.SystemParameters;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DatabaseCredentialRepository extends JpaRepository<DatabaseCredential, Long> {
    Optional<DatabaseCredential> findByHostAndSystemParameterAndIsActive(String host, SystemParameters systemParameter, Boolean isActive);
    Optional<DatabaseCredential> findBySystemParameterAndIsActive(SystemParameters systemParameter, Boolean isActive);


}

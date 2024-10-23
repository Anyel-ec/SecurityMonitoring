package ec.edu.espe.security.monitoring.repositories;

import ec.edu.espe.security.monitoring.models.ConnectionName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ConnectionNameRepository extends JpaRepository<ConnectionName, Long> {
    Optional<ConnectionName> findByConnectionName(String connectionName);
}
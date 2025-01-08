package ec.edu.espe.security.monitoring.modules.core.initializer.repositories;

import ec.edu.espe.security.monitoring.modules.core.initializer.models.SystemParameters;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SystemParametersRepository extends JpaRepository<SystemParameters, Long> {
    // Finds an active system parameter by its name
    Optional<SystemParameters> findByNameAndIsActiveTrue(String name);
}
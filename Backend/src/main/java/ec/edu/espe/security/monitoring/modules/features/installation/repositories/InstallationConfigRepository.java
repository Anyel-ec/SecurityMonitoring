package ec.edu.espe.security.monitoring.modules.features.installation.repositories;

import ec.edu.espe.security.monitoring.modules.features.installation.models.InstallationConfig;
import ec.edu.espe.security.monitoring.modules.core.initializer.models.SystemParameters;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface InstallationConfigRepository extends JpaRepository<InstallationConfig, Long> {

    // Find all active installation configurations
    List<InstallationConfig> findByIsActiveTrue();

    // Find the first active installation configuration by system parameter
    Optional<InstallationConfig> findFirstBySystemParameterAndIsActiveTrue(SystemParameters systemParameter);
}

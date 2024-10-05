package ec.edu.espe.security.monitoring.repositories;

import ec.edu.espe.security.monitoring.models.InstallationConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface InstallationConfigRepository extends JpaRepository<InstallationConfig, Long> {
    List<InstallationConfig> findByIsActiveTrue();


}

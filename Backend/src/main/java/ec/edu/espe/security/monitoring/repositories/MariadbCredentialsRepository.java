package ec.edu.espe.security.monitoring.repositories;

import ec.edu.espe.security.monitoring.models.MariadbCredentials;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MariadbCredentialsRepository extends JpaRepository<MariadbCredentials, Long> {
}
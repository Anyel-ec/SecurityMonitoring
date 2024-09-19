package ec.edu.espe.security.monitoring.repositories;

import ec.edu.espe.security.monitoring.models.MariaDBCredentials;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MariaDBCredentialsRepository extends JpaRepository<MariaDBCredentials, Long> {
}
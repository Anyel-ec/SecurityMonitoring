package ec.edu.espe.security.monitoring.repositories;

import ec.edu.espe.security.monitoring.models.DatabaseCredentials;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DatabaseCredentialsRepository extends JpaRepository<DatabaseCredentials, Long> {
}
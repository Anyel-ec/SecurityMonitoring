package ec.edu.espe.security.monitoring.repositories;

import ec.edu.espe.security.monitoring.models.PostgresCredentials;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostgresCredentialsRepository extends JpaRepository<PostgresCredentials, Long> {
}
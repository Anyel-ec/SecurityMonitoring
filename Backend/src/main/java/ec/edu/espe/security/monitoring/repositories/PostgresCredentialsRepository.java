package ec.edu.espe.security.monitoring.repositories;

import ec.edu.espe.security.monitoring.models.PostgresCredentials;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostgresCredentialsRepository extends JpaRepository<PostgresCredentials, Long> {
    Optional<PostgresCredentials> findTopByOrderByIdDesc();

}
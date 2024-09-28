package ec.edu.espe.security.monitoring.repositories;

import ec.edu.espe.security.monitoring.models.MongodbCredentials;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MongodbCredentialsRepository extends JpaRepository<MongodbCredentials, Long> {
}
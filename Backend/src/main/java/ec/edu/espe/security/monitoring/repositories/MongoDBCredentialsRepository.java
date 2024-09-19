package ec.edu.espe.security.monitoring.repositories;

import ec.edu.espe.security.monitoring.models.MongoDBCredentials;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MongoDBCredentialsRepository extends JpaRepository<MongoDBCredentials, Long> {
}
package ec.edu.espe.security.monitoring.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DatabaseCredential extends JpaRepository<DatabaseCredential, Long> {
}

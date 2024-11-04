package ec.edu.espe.security.monitoring.repositories;

import ec.edu.espe.security.monitoring.models.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserInfo, Long> {
    UserInfo findByUsernameAndIsActiveTrue(String username);
}
